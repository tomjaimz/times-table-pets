// Cloud Sync & Passwordless Magic Link Auth (Firebase Auth + Realtime Database)
// Persists authentication indefinitely on each device via browserLocalPersistence + localStorage.

(function () {
  const CFG_STORAGE_KEY = "jemima_firebase_config_v1";
  const MAGIC_EMAIL_KEY = "jemima_magic_email_for_signin";
  const DEVICE_ID_KEY = "jemima_device_id_v1";

  let firebaseApp = null;
  let auth = null;
  let db = null;
  let currentUser = null;
  let userStateRef = null;
  let isApplyingRemote = false;
  let syncStatus = "local"; // "local" | "connecting" | "synced" | "syncing" | "error"
  let statusMessage = "Saved on this device (Offline Mode)";
  let stateChangeCallback = null;
  let getLocalStateCallback = null;

  // Generate or retrieve permanent device ID (never expires)
  function getOrCreateDeviceId() {
    try {
      let id = localStorage.getItem(DEVICE_ID_KEY);
      if (!id) {
        id =
          "dev_" +
          Date.now().toString(36) +
          "_" +
          Math.random().toString(36).substring(2, 10);
        localStorage.setItem(DEVICE_ID_KEY, id);
      }
      return id;
    } catch (e) {
      return "dev_default";
    }
  }

  function getDeviceLabel() {
    const ua = navigator.userAgent || "";
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "📱 iPad";
    if (/iPhone/i.test(ua)) return "📱 iPhone";
    if (/Android/i.test(ua)) return "📱 Android";
    if (/Windows/i.test(ua)) return "💻 Windows PC";
    if (/Macintosh/i.test(ua)) return "💻 Mac";
    return "🌐 Browser";
  }

  // Parse a pasted Firebase config (accepts either raw JSON or JS snippet `const firebaseConfig = { ... };`)
  function parseFirebaseConfigInput(rawText) {
    if (!rawText || typeof rawText !== "string") return null;
    const trimmed = rawText.trim();
    const braceStart = trimmed.indexOf("{");
    const braceEnd = trimmed.lastIndexOf("}");
    if (braceStart === -1 || braceEnd === -1 || braceEnd <= braceStart) return null;

    const objBody = trimmed.slice(braceStart, braceEnd + 1);
    const extractKey = (key) => {
      const regex = new RegExp(`["']?${key}["']?\\s*:\\s*["']([^"']+)["']`);
      const m = objBody.match(regex);
      return m ? m[1].trim() : "";
    };

    const cfg = {
      apiKey: extractKey("apiKey"),
      authDomain: extractKey("authDomain"),
      databaseURL: extractKey("databaseURL"),
      projectId: extractKey("projectId"),
      storageBucket: extractKey("storageBucket"),
      messagingSenderId: extractKey("messagingSenderId"),
      appId: extractKey("appId")
    };

    if (!cfg.apiKey || !cfg.projectId) return null;
    if (!cfg.authDomain) {
      cfg.authDomain = `${cfg.projectId}.firebaseapp.com`;
    }
    if (!cfg.databaseURL) {
      cfg.databaseURL = `https://${cfg.projectId}-default-rtdb.firebaseio.com`;
    }
    return cfg;
  }

  function getEffectiveFirebaseConfig() {
    // 1. Check URL param `?fb_cfg=` (allows 1-tap sharing of project config across devices)
    try {
      const params = new URLSearchParams(window.location.search);
      const fbParam = params.get("fb_cfg");
      if (fbParam) {
        const decoded = JSON.parse(atob(fbParam));
        if (decoded && decoded.apiKey && decoded.projectId) {
          localStorage.setItem(CFG_STORAGE_KEY, JSON.stringify(decoded));
        }
      }
    } catch (e) {
      // Ignore malformed param
    }

    // 2. Check firebase-config.js global
    if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && window.FIREBASE_CONFIG.projectId) {
      const c = { ...window.FIREBASE_CONFIG };
      if (!c.authDomain) c.authDomain = `${c.projectId}.firebaseapp.com`;
      if (!c.databaseURL) c.databaseURL = `https://${c.projectId}-default-rtdb.firebaseio.com`;
      return c;
    }

    // 3. Check localStorage saved config
    try {
      const saved = localStorage.getItem(CFG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.apiKey && parsed.projectId) return parsed;
      }
    } catch (e) {
      // Ignore
    }
    return null;
  }

  // Smartly merge two states so progress, pets, stars, and fact stats are never lost
  function mergeGameStates(local, remote) {
    if (!remote || typeof remote !== "object") return local;
    if (!local || typeof local !== "object") return remote;

    const localTs = Number(local.updatedAt) || 0;
    const remoteTs = Number(remote.updatedAt) || 0;
    const newer = remoteTs >= localTs ? remote : local;
    const older = remoteTs >= localTs ? local : remote;

    // 1. Union of unlocked pets
    const unlockedPets = Array.from(
      new Set([...(local.unlockedPets || ["pet_owl"]), ...(remote.unlockedPets || ["pet_owl"])])
    );

    // 2. Best level progress per node
    const levelProgress = { ...(older.levelProgress || {}) };
    Object.entries(newer.levelProgress || {}).forEach(([nodeId, prog]) => {
      const prev = levelProgress[nodeId];
      if (!prev) {
        levelProgress[nodeId] = { ...prog };
      } else {
        levelProgress[nodeId] = {
          stars: Math.max(prev.stars || 0, prog.stars || 0),
          completions: Math.max(prev.completions || 0, prog.completions || 0),
          bestAvgMs:
            prev.bestAvgMs && prog.bestAvgMs
              ? Math.min(prev.bestAvgMs, prog.bestAvgMs)
              : prev.bestAvgMs || prog.bestAvgMs || null
        };
      }
    });

    // 3. Merge 12x12 factStats (keep entry with more attempts or newer lastSeen)
    const factStats = { ...(older.factStats || {}) };
    Object.entries(newer.factStats || {}).forEach(([key, st]) => {
      const prev = factStats[key];
      if (!prev || (st.attempts || 0) >= (prev.attempts || 0)) {
        factStats[key] = { ...st };
      }
    });

    // 4. Merge coupons by unique ID
    const couponMap = new Map();
    [...(older.coupons || []), ...(newer.coupons || [])].forEach((c) => {
      if (c && c.id) {
        const existing = couponMap.get(c.id);
        if (!existing || (c.redeemed && !existing.redeemed)) {
          couponMap.set(c.id, c);
        }
      }
    });
    const coupons = Array.from(couponMap.values());

    // 5. Merge recentRuns (deduplicate by dateStr + title + avgMs)
    const runMap = new Map();
    [...(newer.recentRuns || []), ...(older.recentRuns || [])].forEach((r) => {
      if (r) {
        const k = `${r.dateStr}_${r.title}_${r.avgMs}`;
        if (!runMap.has(k)) runMap.set(k, r);
      }
    });
    const recentRuns = Array.from(runMap.values()).slice(0, 30);

    // 6. Gems: if one side is still untouched default (50 gems and 0 runs) and the other has progress, keep the active one; else use newer
    const localHasProgress = (local.recentRuns && local.recentRuns.length > 0) || Object.keys(local.factStats || {}).length > 0;
    const remoteHasProgress = (remote.recentRuns && remote.recentRuns.length > 0) || Object.keys(remote.factStats || {}).length > 0;
    let gems = newer.gems ?? 50;
    if (localHasProgress && !remoteHasProgress) gems = local.gems;
    else if (remoteHasProgress && !localHasProgress) gems = remote.gems;

    return {
      ...newer,
      gems,
      unlockedPets,
      levelProgress,
      factStats,
      coupons,
      recentRuns,
      settings: { ...(older.settings || {}), ...(newer.settings || {}) },
      dailyStreak:
        (newer.dailyStreak?.count || 0) >= (older.dailyStreak?.count || 0)
          ? newer.dailyStreak
          : older.dailyStreak,
      updatedAt: Math.max(localTs, remoteTs, Date.now())
    };
  }

  function updateCloudUI() {
    const hudBtn = document.getElementById("hud-cloud-btn");
    const statusBadge = document.getElementById("cloud-modal-status-badge");
    const statusText = document.getElementById("cloud-modal-status-text");
    const signedOutPanel = document.getElementById("cloud-signed-out-panel");
    const signedInPanel = document.getElementById("cloud-signed-in-panel");
    const setupPanel = document.getElementById("cloud-firebase-setup-panel");
    const userEmailEl = document.getElementById("cloud-user-email");
    const deviceIdEl = document.getElementById("cloud-device-id-display");

    const cfg = getEffectiveFirebaseConfig();

    if (hudBtn) {
      if (currentUser && syncStatus === "synced") {
        hudBtn.textContent = "☁️✓";
        hudBtn.classList.add("cloud-connected");
        hudBtn.title = `Cloud Synced (${currentUser.email || "Linked Account"})`;
      } else if (currentUser && syncStatus === "syncing") {
        hudBtn.textContent = "☁️↑";
        hudBtn.title = "Syncing to Cloud...";
      } else if (syncStatus === "error") {
        hudBtn.textContent = "☁️⚠️";
        hudBtn.title = statusMessage;
      } else {
        hudBtn.textContent = "☁️";
        hudBtn.classList.remove("cloud-connected");
        hudBtn.title = "Cloud Backup & Multi-Device Login";
      }
    }

    if (deviceIdEl) {
      deviceIdEl.textContent = `${getDeviceLabel()} (${getOrCreateDeviceId()})`;
    }

    if (setupPanel) {
      setupPanel.style.display = cfg ? "none" : "block";
    }

    if (signedOutPanel && signedInPanel) {
      if (!cfg) {
        signedOutPanel.style.display = "none";
        signedInPanel.style.display = "none";
      } else if (currentUser) {
        signedOutPanel.style.display = "none";
        signedInPanel.style.display = "block";
        if (userEmailEl) userEmailEl.textContent = currentUser.email || "Linked Parent Account";
      } else {
        signedOutPanel.style.display = "block";
        signedInPanel.style.display = "none";
      }
    }

    if (statusBadge && statusText) {
      statusText.textContent = statusMessage;
      statusBadge.className = `cloud-status-pill status-${syncStatus}`;
    }
  }

  function cleanUrlParams(paramNames) {
    try {
      const url = new URL(window.location.href);
      let changed = false;
      paramNames.forEach((p) => {
        if (url.searchParams.has(p)) {
          url.searchParams.delete(p);
          changed = true;
        }
      });
      if (changed) {
        window.history.replaceState({}, document.title, url.toString());
      }
    } catch (e) {
      // Ignore
    }
  }

  async function completeMagicLinkIfPresent() {
    if (!auth) return;
    if (!auth.isSignInWithEmailLink(window.location.href)) return;

    syncStatus = "connecting";
    statusMessage = "Verifying Magic Link...";
    updateCloudUI();

    const params = new URLSearchParams(window.location.search);
    let email = params.get("magic_email") || localStorage.getItem(MAGIC_EMAIL_KEY);

    if (!email) {
      email = window.prompt("Please confirm your email address to complete linking this device:");
    }
    if (!email) {
      syncStatus = "local";
      statusMessage = "Magic Link cancelled.";
      updateCloudUI();
      return;
    }

    try {
      await auth.signInWithEmailLink(email.trim(), window.location.href);
      localStorage.removeItem(MAGIC_EMAIL_KEY);
      cleanUrlParams(["magic_email", "apiKey", "oobCode", "mode", "lang", "continueUrl"]);
      syncStatus = "synced";
      statusMessage = `Device permanently linked to ${email.trim()}!`;
      updateCloudUI();
    } catch (err) {
      console.error("Magic Link sign-in error:", err);
      syncStatus = "error";
      statusMessage = `Magic Link error: ${err.message || "Link expired or already used."}`;
      updateCloudUI();
    }
  }

  function attachRealtimeListener(user) {
    if (!db || !user) return;
    if (userStateRef) {
      userStateRef.off();
    }

    userStateRef = db.ref(`users/${user.uid}/state`);
    const deviceRef = db.ref(`users/${user.uid}/devices/${getOrCreateDeviceId()}`);

    // Register this device under the parent's account
    deviceRef.set({
      deviceId: getOrCreateDeviceId(),
      label: getDeviceLabel(),
      lastSeen: Date.now()
    }).catch(() => {});

    userStateRef.on(
      "value",
      (snapshot) => {
        const remoteState = snapshot.val();
        const localState = getLocalStateCallback ? getLocalStateCallback() : null;

        if (!remoteState && localState) {
          // First time this account syncs: upload current local progress to cloud
          pushStateToCloud(localState);
          syncStatus = "synced";
          statusMessage = `Synced live with ${user.email}`;
          updateCloudUI();
          return;
        }

        if (remoteState && localState) {
          const merged = mergeGameStates(localState, remoteState);
          isApplyingRemote = true;
          if (stateChangeCallback) {
            stateChangeCallback(merged);
          }
          isApplyingRemote = false;

          // If merging added local progress not yet in remote, push merged back
          if ((merged.updatedAt || 0) > (remoteState.updatedAt || 0)) {
            userStateRef.set(merged).catch(() => {});
          }
        }

        syncStatus = "synced";
        statusMessage = `Synced live with ${user.email}`;
        updateCloudUI();
      },
      (err) => {
        console.warn("Realtime DB listener error:", err);
        syncStatus = "error";
        statusMessage = `Database rule/sync error: ${err.message}`;
        updateCloudUI();
      }
    );
  }

  function pushStateToCloud(stateObj) {
    if (!db || !currentUser || !userStateRef || isApplyingRemote) return;
    syncStatus = "syncing";
    updateCloudUI();

    const payload = {
      ...stateObj,
      updatedAt: Date.now(),
      lastModifiedByDevice: getOrCreateDeviceId()
    };

    userStateRef
      .set(payload)
      .then(() => {
        syncStatus = "synced";
        statusMessage = `Synced live with ${currentUser.email}`;
        updateCloudUI();
      })
      .catch((err) => {
        syncStatus = "error";
        statusMessage = `Could not save to cloud: ${err.message}`;
        updateCloudUI();
      });
  }

  function initFirebaseIfConfigured() {
    const cfg = getEffectiveFirebaseConfig();
    if (!cfg) {
      syncStatus = "local";
      statusMessage = "Local Storage Mode (Connect Firebase to sync across devices)";
      updateCloudUI();
      return false;
    }

    if (!window.firebase) {
      syncStatus = "error";
      statusMessage = "Firebase SDK offline — playing in Local Storage mode.";
      updateCloudUI();
      return false;
    }

    try {
      if (!firebaseApp) {
        firebaseApp = window.firebase.apps.length
          ? window.firebase.app()
          : window.firebase.initializeApp(cfg);
        auth = window.firebase.auth();
        db = window.firebase.database();

        // Persist auth indefinitely in localStorage/IndexedDB without expiry
        auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

        auth.onAuthStateChanged((user) => {
          currentUser = user;
          if (user) {
            syncStatus = "connecting";
            statusMessage = `Connecting as ${user.email}...`;
            updateCloudUI();
            attachRealtimeListener(user);
          } else {
            if (userStateRef) {
              userStateRef.off();
              userStateRef = null;
            }
            syncStatus = "local";
            statusMessage = "Ready to sign in with Parent Magic Link";
            updateCloudUI();
          }
        });
      }

      completeMagicLinkIfPresent();
      updateCloudUI();
      return true;
    } catch (err) {
      console.error("Firebase init error:", err);
      syncStatus = "error";
      statusMessage = `Firebase Config Error: ${err.message}`;
      updateCloudUI();
      return false;
    }
  }

  async function sendMagicLink(emailInput) {
    const email = (emailInput || "").trim();
    if (!email || !email.includes("@")) {
      throw new Error("Please enter a valid parent email address.");
    }
    if (!auth) {
      const ok = initFirebaseIfConfigured();
      if (!ok || !auth) throw new Error("Please paste your Firebase project config first.");
    }

    // Build continue URL with ?magic_email= so clicking the link on ANY device/browser works without re-typing email
    const baseUrl = window.location.origin + window.location.pathname;
    const cfg = getEffectiveFirebaseConfig();
    const cfgParam = cfg ? `&fb_cfg=${encodeURIComponent(btoa(JSON.stringify(cfg)))}` : "";
    const continueUrl = `${baseUrl}?magic_email=${encodeURIComponent(email)}${cfgParam}`;

    const actionCodeSettings = {
      url: continueUrl,
      handleCodeInApp: true
    };

    localStorage.setItem(MAGIC_EMAIL_KEY, email);
    await auth.sendSignInLinkToEmail(email, actionCodeSettings);
    return continueUrl;
  }

  async function signInWithGoogle() {
    if (!auth) {
      const ok = initFirebaseIfConfigured();
      if (!ok || !auth) throw new Error("Please paste your Firebase project config first.");
    }
    const provider = new window.firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  }

  async function signOutCloud() {
    if (userStateRef) {
      userStateRef.off();
      userStateRef = null;
    }
    if (auth) {
      await auth.signOut();
    }
    currentUser = null;
    syncStatus = "local";
    statusMessage = "Signed out (Local progress is still kept on this device)";
    updateCloudUI();
  }

  function saveCustomFirebaseConfig(rawText) {
    const parsed = parseFirebaseConfigInput(rawText);
    if (!parsed) {
      throw new Error("Could not find apiKey and projectId in the pasted snippet.");
    }
    localStorage.setItem(CFG_STORAGE_KEY, JSON.stringify(parsed));
    // Reload page cleanly to initialize Firebase with the new config
    window.location.reload();
  }

  function clearCustomFirebaseConfig() {
    localStorage.removeItem(CFG_STORAGE_KEY);
    window.location.reload();
  }

  function getShareableSetupLink() {
    const cfg = getEffectiveFirebaseConfig();
    if (!cfg) return window.location.origin + window.location.pathname;
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?fb_cfg=${encodeURIComponent(btoa(JSON.stringify(cfg)))}`;
  }

  window.CLOUD_SYNC = {
    init: function (options) {
      getLocalStateCallback = options.getLocalState;
      stateChangeCallback = options.onRemoteStateMerge;
      initFirebaseIfConfigured();
    },
    pushState: pushStateToCloud,
    sendMagicLink,
    signInWithGoogle,
    signOut: signOutCloud,
    saveCustomFirebaseConfig,
    clearCustomFirebaseConfig,
    getShareableSetupLink,
    hasConfig: () => Boolean(getEffectiveFirebaseConfig()),
    getCurrentUser: () => currentUser,
    getDeviceId: getOrCreateDeviceId,
    updateUI: updateCloudUI
  };
})();
