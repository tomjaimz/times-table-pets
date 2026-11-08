// Jemima's Magical Pet Academy - Core Game Engine & Mastery Metrics

(function () {
  const STORAGE_KEY = "jemima_pet_academy_v1";

  // Default initial state
  function createDefaultState() {
    const today = new Date().toISOString().slice(0, 10);
    return {
      settings: { ...window.GAME_DATA.defaultSettings },
      gems: 50,
      dailyStreak: {
        count: 1,
        lastDate: today
      },
      activePetId: "pet_owl",
      unlockedPets: ["pet_owl"],
      unlockedStickers: ["stk_star", "stk_blossom", "stk_crown"],
      lobbyBg: "bg_meadow",
      lobbyStickers: [
        { id: "init_stk_1", stickerId: "stk_star", x: 22, y: 28, scale: 1.0, flip: false },
        { id: "init_stk_2", stickerId: "stk_blossom", x: 78, y: 68, scale: 1.0, flip: false }
      ],
      levelProgress: {}, // nodeId -> { stars: 0..3, completions: 0, bestAvgMs: null }
      factStats: {}, // "7x8" -> { a, b, attempts, correct, wrong, timeouts, totalTimeMs, bestTimeMs, lastSeen }
      shopRewards: JSON.parse(JSON.stringify(window.GAME_DATA.defaultShopRewards)),
      coupons: [],
      recentRuns: []
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultState();
      const parsed = JSON.parse(raw);
      const def = createDefaultState();
      const merged = {
        ...def,
        ...parsed,
        settings: { ...def.settings, ...(parsed.settings || {}) },
        dailyStreak: { ...def.dailyStreak, ...(parsed.dailyStreak || {}) }
      };
      if (!Array.isArray(merged.unlockedStickers) || merged.unlockedStickers.length === 0) {
        merged.unlockedStickers = [...def.unlockedStickers];
      }
      if (!Array.isArray(merged.lobbyStickers)) {
        merged.lobbyStickers = [...def.lobbyStickers];
      }
      if (
        Array.isArray(merged.shopRewards) &&
        !merged.shopRewards.some((r) => r.type === "sticker_pack")
      ) {
        merged.shopRewards.unshift(JSON.parse(JSON.stringify(window.GAME_DATA.defaultShopRewards[0])));
      }
      return merged;
    } catch (e) {
      return createDefaultState();
    }
  }

  function saveState(skipCloud = false) {
    try {
      state.updatedAt = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (!skipCloud && window.CLOUD_SYNC) {
        window.CLOUD_SYNC.pushState(state);
      }
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }

  function checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const last = state.dailyStreak.lastDate;
    if (last === today) return;

    const lastDateObj = new Date(last + "T00:00:00");
    const todayObj = new Date(today + "T00:00:00");
    const diffDays = Math.round((todayObj - lastDateObj) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      state.dailyStreak.count += 1;
    } else if (diffDays > 1) {
      state.dailyStreak.count = 1;
    }
    state.dailyStreak.lastDate = today;
    saveState();
  }

  // =========================================================
  // CONFETTI ENGINE
  // =========================================================
  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas.getContext("2d");
  let confettiParticles = [];
  let confettiAnimId = null;

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  function burstConfetti(count = 70) {
    const colors = ["#58cc02", "#1cb0f6", "#ff9600", "#ce82ff", "#ff4b4b", "#ffc800"];
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: window.innerWidth * (0.25 + Math.random() * 0.5),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 15 - 5,
        size: 7 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        life: 1.0
      });
    }
    if (!confettiAnimId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.42; // gravity
      p.rot += p.vRot;
      p.life -= 0.012;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.globalAlpha = Math.max(0, p.life);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      confettiCtx.restore();
    });
    confettiParticles = confettiParticles.filter((p) => p.life > 0 && p.y < confettiCanvas.height + 40);
    if (confettiParticles.length > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // =========================================================
  // HELPERS FOR PETS & STATS
  // =========================================================
  function getPetById(petId) {
    return window.GAME_DATA.pets.find((p) => p.id === petId) || window.GAME_DATA.pets[0];
  }

  function getActivePet() {
    return getPetById(state.activePetId);
  }

  function getFactKey(a, b) {
    return `${a}x${b}`;
  }

  function ensureFactStat(a, b) {
    const key = getFactKey(a, b);
    if (!state.factStats[key]) {
      state.factStats[key] = {
        a,
        b,
        attempts: 0,
        correct: 0,
        wrong: 0,
        timeouts: 0,
        totalTimeMs: 0,
        bestTimeMs: null,
        lastSeen: 0
      };
    }
    return state.factStats[key];
  }

  function recordFactOutcome(a, b, isCorrect, isTimeout, elapsedMs) {
    // Record both a×b and b×a or specifically the ordered pair a×b
    const stat = ensureFactStat(a, b);
    stat.attempts += 1;
    stat.lastSeen = Date.now();
    const clampedMs = Math.min(Math.max(200, Math.round(elapsedMs)), 15000);
    stat.totalTimeMs += clampedMs;

    if (isCorrect) {
      stat.correct += 1;
      if (stat.bestTimeMs === null || clampedMs < stat.bestTimeMs) {
        stat.bestTimeMs = clampedMs;
      }
    } else if (isTimeout) {
      stat.timeouts += 1;
    } else {
      stat.wrong += 1;
    }
    saveState();
  }

  function evaluateFactMastery(a, b) {
    const key = getFactKey(a, b);
    const st = state.factStats[key];
    if (!st || st.attempts === 0) {
      return { status: "none", className: "mastery-none", accuracy: 0, avgMs: null, attempts: 0 };
    }
    const accuracy = (st.correct / st.attempts) * 100;
    const avgMs = Math.round(st.totalTimeMs / st.attempts);

    if (st.attempts >= 2 && accuracy >= 90 && avgMs <= 2200) {
      return { status: "gold", className: "mastery-gold", accuracy, avgMs, attempts: st.attempts };
    }
    if (accuracy >= 80 && avgMs <= 3500) {
      return { status: "green", className: "mastery-green", accuracy, avgMs, attempts: st.attempts };
    }
    if (accuracy >= 50) {
      return { status: "yellow", className: "mastery-yellow", accuracy, avgMs, attempts: st.attempts };
    }
    return { status: "red", className: "mastery-red", accuracy, avgMs, attempts: st.attempts };
  }

  // Combines stats for (t, b) and (b, t) for per-table progress bars
  function getCombinedPairStats(t, b) {
    const s1 = state.factStats[getFactKey(t, b)];
    const s2 = t !== b ? state.factStats[getFactKey(b, t)] : null;
    const attempts = (s1 ? s1.attempts : 0) + (s2 ? s2.attempts : 0);
    const correct = (s1 ? s1.correct : 0) + (s2 ? s2.correct : 0);
    const totalTimeMs = (s1 ? s1.totalTimeMs : 0) + (s2 ? s2.totalTimeMs : 0);
    return { attempts, correct, totalTimeMs };
  }

  function evaluateTablePairMastery(t, b) {
    const comb = getCombinedPairStats(t, b);
    if (comb.attempts === 0) return "none";
    const acc = (comb.correct / comb.attempts) * 100;
    const avgMs = comb.totalTimeMs / comb.attempts;
    if (comb.attempts >= 2 && acc >= 90 && avgMs <= 2200) return "gold";
    if (acc >= 80 && avgMs <= 3500) return "green";
    if (acc >= 50) return "yellow";
    return "red";
  }

  // Returns ranked tricky facts [{ a, b, score, accuracy, avgMs, misses }]
  function getTrickyFactsList(limit = 8) {
    const list = [];
    Object.values(state.factStats).forEach((st) => {
      if (!st || st.attempts === 0) return;
      const misses = st.wrong + st.timeouts;
      const acc = st.correct / st.attempts;
      const avgMs = st.totalTimeMs / st.attempts;
      // Higher trouble score = more misses, lower accuracy, slower response
      const troubleScore = misses * 25 + (1 - acc) * 40 + Math.max(0, (avgMs - 2000) / 150);
      if (misses > 0 || avgMs > 2600) {
        list.push({
          a: st.a,
          b: st.b,
          misses,
          attempts: st.attempts,
          accuracy: Math.round(acc * 100),
          avgMs: Math.round(avgMs),
          troubleScore
        });
      }
    });
    list.sort((x, y) => y.troubleScore - x.troubleScore);
    return list.slice(0, limit);
  }

  // =========================================================
  // TOP HUD & NAVIGATION RENDERING
  // =========================================================
  function t(key, vars = {}) {
    return window.I18N ? window.I18N.t(key, vars) : key;
  }

  function renderHUD() {
    window.CURRENT_LANG = state.settings.language || "en";
    if (window.I18N) {
      window.I18N.applyStaticTranslations(state.settings.playerName, state.settings.defaultStreakLength);
    }
    if (window.CLOUD_SYNC) {
      window.CLOUD_SYNC.updateUI();
    }
    const pet = getActivePet();
    document.getElementById("hud-pet-emoji").textContent = pet.emoji;
    document.getElementById("hud-pet-name").textContent = pet.name;
    document.getElementById("hud-academy-title").textContent = t("academyTitle", {
      name: state.settings.playerName
    });
    document.getElementById("hud-daily-streak").textContent = state.dailyStreak.count;
    document.getElementById("hud-gems").textContent = state.gems;
    document.getElementById("hud-sound-btn").textContent = state.settings.soundEnabled ? "🔊" : "🔇";
    window.soundFX.setEnabled(state.settings.soundEnabled);
  }

  function switchTab(tabId) {
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".tab-view").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `view-${tabId}`);
    });

    if (tabId === "adventure") renderAdventureMap();
    if (tabId === "practice") renderCustomPractice();
    if (tabId === "pets") renderPetsSanctuary();
    if (tabId === "shop") renderShop();
    if (tabId === "stats") renderStatsDashboard();
  }

  function refreshActiveTabUI() {
    const activeBtn = document.querySelector(".nav-tab.active");
    const tabId = activeBtn ? activeBtn.dataset.tab : "adventure";
    switchTab(tabId);
  }

  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.soundFX.tap();
      switchTab(btn.dataset.tab);
    });
  });

  document.getElementById("hud-companion-btn").addEventListener("click", () => {
    window.soundFX.tap();
    switchTab("pets");
  });

  document.getElementById("hud-gems-pill").addEventListener("click", () => {
    window.soundFX.tap();
    switchTab("shop");
  });

  document.getElementById("hud-sound-btn").addEventListener("click", () => {
    state.settings.soundEnabled = !state.settings.soundEnabled;
    window.soundFX.setEnabled(state.settings.soundEnabled);
    if (state.settings.soundEnabled) window.soundFX.tap();
    saveState();
    renderHUD();
  });

  const hudLangBtn = document.getElementById("hud-lang-btn");
  if (hudLangBtn) {
    hudLangBtn.addEventListener("click", () => {
      window.soundFX.tap();
      state.settings.language = state.settings.language === "sv" ? "en" : "sv";
      window.CURRENT_LANG = state.settings.language;
      saveState();
      renderHUD();
      refreshActiveTabUI();
    });
  }

  // =========================================================
  // TAB 1: INTERACTIVE PET LOBBY & ADVENTURE PATH RENDERER
  // =========================================================
  let selectedPlacedStickerId = null;
  let stickerDrawerOpen = false;

  function getStickerById(stkId) {
    return (window.GAME_DATA.stickers || []).find((s) => s.id === stkId) || window.GAME_DATA.stickers[0];
  }

  function addStickerToLobby(stickerId) {
    if (!Array.isArray(state.lobbyStickers)) state.lobbyStickers = [];
    // Randomize safe spot away from exact center so multiple stickers don't stack invisibly
    const angle = Math.random() * Math.PI * 2;
    const rx = 26 + Math.random() * 14;
    const ry = 22 + Math.random() * 14;
    const x = Math.round(Math.min(88, Math.max(12, 50 + Math.cos(angle) * rx)));
    const y = Math.round(Math.min(82, Math.max(18, 50 + Math.sin(angle) * ry)));
    const newItem = {
      id: "stk_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      stickerId,
      x,
      y,
      scale: 1.0,
      flip: false
    };
    state.lobbyStickers.push(newItem);
    selectedPlacedStickerId = newItem.id;
    saveState();
    renderLobbyScene();
  }

  function renderLobbyScene() {
    const canvas = document.getElementById("lobby-scene-canvas");
    if (!canvas) return;

    const pet = getActivePet();
    const totalStickers = (window.GAME_DATA.stickers || []).length;
    const unlockedCount = (state.unlockedStickers || []).length;

    const titleEl = document.getElementById("lobby-room-title");
    if (titleEl) titleEl.textContent = t("lobbyTitle", { name: state.settings.playerName });

    const badgeEl = document.getElementById("lobby-sticker-count-badge");
    if (badgeEl) badgeEl.textContent = t("lobbyStickersBadge", { unlocked: unlockedCount, total: totalStickers });

    const decorateBtn = document.getElementById("btn-toggle-sticker-drawer");
    if (decorateBtn) {
      decorateBtn.textContent = stickerDrawerOpen ? t("btnDoneDecorating") : t("btnDecorate");
    }

    const petEmojiEl = document.getElementById("lobby-pet-emoji");
    const petTagEl = document.getElementById("lobby-pet-tag");
    if (petEmojiEl) petEmojiEl.textContent = pet.emoji;
    if (petTagEl) petTagEl.textContent = pet.name;

    // Apply chosen lobby background
    const bgs = window.GAME_DATA.lobbyBackgrounds || [];
    const activeBg = bgs.find((b) => b.id === state.lobbyBg) || bgs[0];
    if (activeBg) {
      canvas.style.background = activeBg.css;
    }

    canvas.classList.toggle("decorating-active", stickerDrawerOpen);

    // Clear previous placed sticker DOM elements
    canvas.querySelectorAll(".placed-sticker-item").forEach((el) => el.remove());

    // Render placed stickers with pointer drag support
    (state.lobbyStickers || []).forEach((item) => {
      const stkMeta = getStickerById(item.stickerId);
      if (!stkMeta) return;

      const el = document.createElement("div");
      el.className = `placed-sticker-item ${item.id === selectedPlacedStickerId ? "selected-sticker" : ""}`;
      el.textContent = stkMeta.emoji;
      el.title = `${stkMeta.name} (Drag to move)`;
      const scale = item.scale || 1.0;
      const flipX = item.flip ? -1 : 1;
      el.style.left = `${item.x}%`;
      el.style.top = `${item.y}%`;
      el.style.transform = `translate(-50%, -50%) scale(${(scale * flipX).toFixed(2)}, ${scale.toFixed(2)})`;

      // Unified Pointer Events for smooth iPad / Phone / Mouse dragging
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      el.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        selectedPlacedStickerId = item.id;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        el.setPointerCapture(e.pointerId);
        renderStickerToolbar();
        canvas.querySelectorAll(".placed-sticker-item").forEach((node) => node.classList.remove("selected-sticker"));
        el.classList.add("selected-sticker");
      });

      el.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const pctX = ((e.clientX - rect.left) / rect.width) * 100;
        const pctY = ((e.clientY - rect.top) / rect.height) * 100;
        item.x = Math.round(Math.min(93, Math.max(7, pctX)) * 10) / 10;
        item.y = Math.round(Math.min(88, Math.max(12, pctY)) * 10) / 10;
        el.style.left = `${item.x}%`;
        el.style.top = `${item.y}%`;
      });

      const finishDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch (_) {}
        if (Math.hypot(e.clientX - startX, e.clientY - startY) > 3) {
          window.soundFX.tap();
        }
        saveState();
      };

      el.addEventListener("pointerup", finishDrag);
      el.addEventListener("pointercancel", finishDrag);

      canvas.appendChild(el);
    });

    renderStickerToolbar();
    if (stickerDrawerOpen) {
      renderStickerDrawer();
    }
  }

  function renderStickerToolbar() {
    const toolbar = document.getElementById("lobby-sticker-toolbar");
    if (!toolbar) return;
    const item = (state.lobbyStickers || []).find((s) => s.id === selectedPlacedStickerId);
    if (!item) {
      toolbar.style.display = "none";
      return;
    }
    const meta = getStickerById(item.stickerId);
    toolbar.style.display = "flex";
    const label = document.getElementById("toolbar-selected-label");
    if (label && meta) {
      const stkName = window.I18N ? window.I18N.getStickerName(meta) : meta.name;
      label.textContent = t("toolbarSelected", { emoji: meta.emoji, name: stkName });
    }
  }

  function renderStickerDrawer() {
    const bgPillsContainer = document.getElementById("lobby-bg-pills");
    const trayGrid = document.getElementById("sticker-tray-grid");
    const mysteryBtn = document.getElementById("btn-buy-mystery-sticker");
    if (!bgPillsContainer || !trayGrid) return;

    // 1. Render Backdrop Pills
    bgPillsContainer.innerHTML = "";
    (window.GAME_DATA.lobbyBackgrounds || []).forEach((bg) => {
      const btn = document.createElement("button");
      btn.className = `bg-choice-pill ${(state.lobbyBg || "bg_meadow") === bg.id ? "active" : ""}`;
      btn.textContent = window.I18N ? window.I18N.getBackdropName(bg) : bg.name;
      btn.addEventListener("click", () => {
        window.soundFX.tap();
        state.lobbyBg = bg.id;
        saveState();
        renderLobbyScene();
      });
      bgPillsContainer.appendChild(btn);
    });

    if (mysteryBtn) {
      const lockedLeft = (window.GAME_DATA.stickers || []).filter(
        (s) => !(state.unlockedStickers || []).includes(s.id)
      ).length;
      mysteryBtn.disabled = state.gems < 25 || lockedLeft === 0;
      mysteryBtn.textContent =
        lockedLeft === 0 ? t("btnAllStickersUnlocked") : t("btnMysterySticker");
    }

    // 2. Render Sticker Tray (Unlocked -> Tap to Place, Locked -> Tap to Buy with Gems)
    trayGrid.innerHTML = "";
    (window.GAME_DATA.stickers || []).forEach((stk) => {
      const isUnlocked = (state.unlockedStickers || []).includes(stk.id);
      const stkName = window.I18N ? window.I18N.getStickerName(stk) : stk.name;
      const btn = document.createElement("button");
      btn.className = `sticker-tray-btn ${isUnlocked ? "unlocked" : "locked"}`;
      btn.innerHTML = `
        <span class="stk-btn-emoji">${stk.emoji}</span>
        <span class="stk-btn-label">${stkName}</span>
        <span class="stk-btn-action">${isUnlocked ? t("stkPlace") : `💎 ${stk.cost}`}</span>
      `;

      btn.addEventListener("click", () => {
        if (isUnlocked) {
          window.soundFX.correct(2);
          addStickerToLobby(stk.id);
        } else {
          if (state.gems < stk.cost) {
            window.soundFX.reset();
            return;
          }
          state.gems -= stk.cost;
          state.unlockedStickers.push(stk.id);
          window.soundFX.chestOpen();
          burstConfetti(45);
          addStickerToLobby(stk.id);
          renderHUD();
        }
      });

      trayGrid.appendChild(btn);
    });
  }

  // Bind Lobby Controls
  document.getElementById("btn-toggle-sticker-drawer").addEventListener("click", () => {
    window.soundFX.tap();
    stickerDrawerOpen = !stickerDrawerOpen;
    const drawer = document.getElementById("lobby-sticker-drawer");
    const btn = document.getElementById("btn-toggle-sticker-drawer");
    drawer.style.display = stickerDrawerOpen ? "block" : "none";
    btn.textContent = stickerDrawerOpen ? t("btnDoneDecorating") : t("btnDecorate");
    if (!stickerDrawerOpen) {
      selectedPlacedStickerId = null;
    }
    renderLobbyScene();
  });

  document.getElementById("lobby-scene-canvas").addEventListener("pointerdown", () => {
    if (selectedPlacedStickerId) {
      selectedPlacedStickerId = null;
      renderLobbyScene();
    }
  });

  document.getElementById("lobby-pet-centerpiece").addEventListener("click", (e) => {
    e.stopPropagation();
    window.soundFX.correct(3);
    burstConfetti(25);
  });

  document.getElementById("btn-stk-bigger").addEventListener("click", () => {
    const item = (state.lobbyStickers || []).find((s) => s.id === selectedPlacedStickerId);
    if (!item) return;
    window.soundFX.tap();
    item.scale = Math.min(2.0, (item.scale || 1.0) + 0.2);
    saveState();
    renderLobbyScene();
  });

  document.getElementById("btn-stk-smaller").addEventListener("click", () => {
    const item = (state.lobbyStickers || []).find((s) => s.id === selectedPlacedStickerId);
    if (!item) return;
    window.soundFX.tap();
    item.scale = Math.max(0.6, (item.scale || 1.0) - 0.2);
    saveState();
    renderLobbyScene();
  });

  document.getElementById("btn-stk-flip").addEventListener("click", () => {
    const item = (state.lobbyStickers || []).find((s) => s.id === selectedPlacedStickerId);
    if (!item) return;
    window.soundFX.tap();
    item.flip = !item.flip;
    saveState();
    renderLobbyScene();
  });

  document.getElementById("btn-stk-remove").addEventListener("click", () => {
    if (!selectedPlacedStickerId) return;
    window.soundFX.tap();
    state.lobbyStickers = (state.lobbyStickers || []).filter((s) => s.id !== selectedPlacedStickerId);
    selectedPlacedStickerId = null;
    saveState();
    renderLobbyScene();
  });

  document.getElementById("btn-buy-mystery-sticker").addEventListener("click", () => {
    const packItem = {
      id: "reward_sticker_pack",
      title: "Mystery Lobby Sticker Pack",
      cost: 25,
      icon: "✨",
      type: "sticker_pack"
    };
    if (state.gems < packItem.cost) return;
    redeemShopItem(packItem);
  });

  function renderAdventureMap() {
    renderLobbyScene();
    document.getElementById("map-streak-label").textContent = state.settings.defaultStreakLength;

    // Sync speed selector pills
    document.querySelectorAll("#map-speed-pills .speed-pill").forEach((pill) => {
      const sec = Number(pill.dataset.seconds);
      pill.classList.toggle("active", sec === Number(state.settings.defaultTimerSeconds));
    });

    const container = document.getElementById("adventure-worlds-container");
    container.innerHTML = "";

    window.GAME_DATA.worlds.forEach((world) => {
      const section = document.createElement("div");
      section.className = "world-section";
      section.style.background = world.bgGradient;

      const wTxt = window.I18N ? window.I18N.getWorldText(world) : { name: world.name, subtitle: world.subtitle };
      const header = document.createElement("div");
      header.className = "world-header";
      header.innerHTML = `
        <h2>${wTxt.name}</h2>
        <p>${wTxt.subtitle}</p>
      `;
      section.appendChild(header);

      const pathDiv = document.createElement("div");
      pathDiv.className = "nodes-path";

      world.nodes.forEach((node) => {
        const prog = state.levelProgress[node.id] || { stars: 0, completions: 0, bestAvgMs: null };
        const isCompleted = prog.completions > 0;
        const pet = getPetById(node.unlockPetId);
        const petUnlocked = state.unlockedPets.includes(node.unlockPetId);
        const nTxt = window.I18N
          ? window.I18N.getNodeText(node)
          : { title: node.title, description: node.description };

        const starsHtml = [1, 2, 3]
          .map((s) => (s <= prog.stars ? "⭐" : "☆"))
          .join("");

        const bestSpeedBadge = prog.bestAvgMs
          ? `<span style="font-size:0.78rem; font-weight:800; color:#475569;">${t("bestSpeed", { sec: (prog.bestAvgMs / 1000).toFixed(1) })}</span>`
          : "";

        const card = document.createElement("div");
        card.className = `path-node-card ${isCompleted ? "completed" : ""} ${node.isBoss ? "boss-node" : ""}`;
        card.innerHTML = `
          <div class="node-icon-circle">${node.icon}</div>
          <div class="node-info">
            <div class="node-title-row">
              <h3 class="node-title">${nTxt.title}</h3>
            </div>
            <p class="node-desc">${nTxt.description}</p>
            <div class="node-meta-row">
              <span class="node-stars" title="1★=8s, 2★=5s, 3★=3s Blitz">${starsHtml}</span>
              <span class="pet-reward-tag ${petUnlocked ? "unlocked" : ""}">
                ${petUnlocked ? t("unlockedPetTag", { emoji: pet.emoji, name: pet.name }) : t("unlocksPet", { emoji: pet.emoji, name: pet.name })}
              </span>
              ${bestSpeedBadge}
            </div>
          </div>
          <button class="btn-3d ${isCompleted ? "btn-green" : "btn-blue"} node-play-btn" style="padding:10px 16px; font-size:0.95rem;">
            ${t("btnPlay")}
          </button>
        `;

        const launchNodeLevel = (e) => {
          if (e) e.stopPropagation();
          if (currentSession) return;
          window.soundFX.tap();
          startGameSession({
            mode: "adventure",
            nodeId: node.id,
            title: nTxt.title,
            tables: node.tables,
            timerSeconds: Number(state.settings.defaultTimerSeconds),
            streakLength: Number(state.settings.defaultStreakLength),
            baseGems: node.baseGems,
            unlockPetId: node.unlockPetId
          });
        };

        const playBtn = card.querySelector(".node-play-btn");
        if (playBtn) {
          playBtn.addEventListener("click", launchNodeLevel);
        }
        card.addEventListener("click", launchNodeLevel);

        pathDiv.appendChild(card);
      });

      section.appendChild(pathDiv);
      container.appendChild(section);
    });
  }

  document.querySelectorAll("#map-speed-pills .speed-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      window.soundFX.tap();
      state.settings.defaultTimerSeconds = Number(pill.dataset.seconds);
      saveState();
      renderAdventureMap();
    });
  });

  // =========================================================
  // TAB 2: CUSTOM PRACTICE & TRICKY FACTS
  // =========================================================
  let customSelectedTables = new Set([6, 7, 8]);
  let customTimerSec = 3;
  let customStreakLen = 10;
  let customQuestionStyle = state.settings.questionStyle || "mix";

  function renderCustomPractice() {
    const tricky = getTrickyFactsList(6);
    const summaryEl = document.getElementById("practice-tricky-summary");
    if (tricky.length === 0) {
      summaryEl.textContent = t("trickyBoosterEmpty");
    } else {
      const labels = tricky.map((tf) => `${tf.a}×${tf.b}`).join(", ");
      summaryEl.textContent = t("trickyBoosterFound", { name: state.settings.playerName, list: labels });
    }

    const grid = document.getElementById("custom-tables-grid");
    grid.innerHTML = "";
    for (let tbl = 1; tbl <= 12; tbl++) {
      // Calculate quick mastery % for table tbl (combining tbl×b and b×tbl)
      let masteredCount = 0;
      for (let b = 1; b <= 12; b++) {
        const stStatus = evaluateTablePairMastery(tbl, b);
        if (stStatus === "gold" || stStatus === "green") masteredCount++;
      }
      const btn = document.createElement("button");
      btn.className = `table-toggle-btn ${customSelectedTables.has(tbl) ? "selected" : ""}`;
      btn.innerHTML = `
        <span>${t("tableBtnTitle", { t: tbl })}</span>
        <span class="table-sub">${t("tableBtnSub", { count: masteredCount })}</span>
      `;
      btn.addEventListener("click", () => {
        window.soundFX.tap();
        if (customSelectedTables.has(tbl)) {
          if (customSelectedTables.size > 1) customSelectedTables.delete(tbl);
        } else {
          customSelectedTables.add(tbl);
        }
        renderCustomPractice();
      });
      grid.appendChild(btn);
    }

    document.querySelectorAll("#custom-timer-pills .opt-pill").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.val) === customTimerSec);
    });
    document.querySelectorAll("#custom-streak-pills .opt-pill").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.val) === customStreakLen);
    });
    document.querySelectorAll("#custom-style-pills .opt-pill").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.val === customQuestionStyle);
    });
  }

  document.querySelectorAll("#custom-timer-pills .opt-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.soundFX.tap();
      customTimerSec = Number(btn.dataset.val);
      renderCustomPractice();
    });
  });

  document.querySelectorAll("#custom-streak-pills .opt-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.soundFX.tap();
      customStreakLen = Number(btn.dataset.val);
      renderCustomPractice();
    });
  });

  document.querySelectorAll("#custom-style-pills .opt-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.soundFX.tap();
      customQuestionStyle = btn.dataset.val;
      renderCustomPractice();
    });
  });

  document.getElementById("btn-select-all-tables").addEventListener("click", () => {
    window.soundFX.tap();
    customSelectedTables = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    renderCustomPractice();
  });

  document.getElementById("btn-select-hard-tables").addEventListener("click", () => {
    window.soundFX.tap();
    customSelectedTables = new Set([6, 7, 8, 9, 12]);
    renderCustomPractice();
  });

  document.getElementById("btn-clear-tables").addEventListener("click", () => {
    window.soundFX.tap();
    customSelectedTables = new Set([2]);
    renderCustomPractice();
  });

  document.getElementById("btn-start-custom").addEventListener("click", () => {
    window.soundFX.tap();
    const tables = Array.from(customSelectedTables).sort((a, b) => a - b);
    startGameSession({
      mode: "custom",
      nodeId: null,
      title: t("customPracticeSessionTitle", { tables: tables.join(", ×") }),
      tables,
      questionStyle: customQuestionStyle,
      timerSeconds: customTimerSec,
      streakLength: customStreakLen,
      baseGems: Math.round(customStreakLen * 3),
      unlockPetId: null
    });
  });

  function launchTrickyFactsSession() {
    window.soundFX.tap();
    const tricky = getTrickyFactsList(10);
    const customFactPairs = tricky.map((tf) => ({ a: tf.a, b: tf.b }));
    const fallbackTables = [6, 7, 8, 9, 12];
    startGameSession({
      mode: "tricky",
      nodeId: null,
      title: t("trickyBoosterTitle"),
      tables: fallbackTables,
      customFactPairs: customFactPairs.length > 0 ? customFactPairs : null,
      timerSeconds: Number(state.settings.defaultTimerSeconds),
      streakLength: Number(state.settings.defaultStreakLength),
      baseGems: 40,
      unlockPetId: null
    });
  }

  document.getElementById("btn-start-tricky").addEventListener("click", launchTrickyFactsSession);
  document.getElementById("btn-stats-practice-tricky").addEventListener("click", launchTrickyFactsSession);

  // =========================================================
  // TAB 3: MAGICAL PET SANCTUARY
  // =========================================================
  function renderPetsSanctuary() {
    const allPets = window.GAME_DATA.pets;
    document.getElementById("pets-unlocked-count").textContent =
      `${state.unlockedPets.length} / ${allPets.length}`;

    const grid = document.getElementById("pets-sanctuary-grid");
    grid.innerHTML = "";

    allPets.forEach((pet) => {
      const isUnlocked = state.unlockedPets.includes(pet.id);
      const isActive = state.activePetId === pet.id;
      const pTxt = window.I18N ? window.I18N.getPetText(pet) : { species: pet.species, bio: pet.bio };
      const rarityLbl = window.I18N ? window.I18N.getRarityLabel(pet.rarity) : pet.rarity;

      const card = document.createElement("div");
      card.className = `pet-card ${isUnlocked ? "" : "locked"} ${isActive ? "active-companion" : ""}`;

      card.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center;">
          <span class="rarity-badge rarity-${pet.rarity}">${rarityLbl}</span>
          <div class="pet-avatar-circle" style="background:${pet.bg};">
            ${isUnlocked ? pet.emoji : "❓"}
          </div>
          <h3 class="pet-name">${isUnlocked ? pet.name : "???"}</h3>
          <p class="pet-species">${pTxt.species}</p>
          <p class="pet-bio">${isUnlocked ? pTxt.bio : t("petLockedBio")}</p>
        </div>
        <div style="width:100%;">
          ${
            isUnlocked
              ? `<button class="btn-3d ${isActive ? "btn-purple" : "btn-white"}" style="width:100%; padding:8px 12px; font-size:0.88rem;" ${isActive ? "disabled" : ""}>
                  ${isActive ? t("btnActiveCompanion") : t("btnPickCompanion")}
                </button>`
              : `<button class="btn-3d btn-white" style="width:100%; padding:8px 12px; font-size:0.84rem;" disabled>${t("btnLocked")}</button>`
          }
        </div>
      `;

      if (isUnlocked && !isActive) {
        card.querySelector("button").addEventListener("click", () => {
          window.soundFX.correct(4);
          state.activePetId = pet.id;
          saveState();
          renderHUD();
          renderPetsSanctuary();
        });
      }

      grid.appendChild(card);
    });
  }

  // =========================================================
  // TAB 4: GEM SHOP & REAL-LIFE PARENT COUPONS
  // =========================================================
  function renderShop() {
    const shopGrid = document.getElementById("shop-items-grid");
    shopGrid.innerHTML = "";

    state.shopRewards.forEach((item) => {
      const canAfford = state.gems >= item.cost;
      const itemTxt = window.I18N
        ? window.I18N.getShopItemText(item)
        : { title: item.title, description: item.description };
      const card = document.createElement("div");
      card.className = "shop-item-card";
      card.innerHTML = `
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div class="shop-icon">${item.icon}</div>
          <div style="flex:1;">
            <h3 style="margin:0 0 4px; font-size:1.08rem; font-weight:900;">${itemTxt.title}</h3>
            <p style="margin:0; font-size:0.85rem; color:var(--text-muted); font-weight:700;">${itemTxt.description}</p>
          </div>
        </div>
        <button class="btn-3d ${canAfford ? "btn-blue" : "btn-white"}" style="width:100%;" ${canAfford ? "" : "disabled"}>
          ${t("btnRedeemFor", { cost: item.cost })}
        </button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        if (state.gems < item.cost) return;
        redeemShopItem(item);
      });

      shopGrid.appendChild(card);
    });

    // Render Golden Coupons History
    const couponList = document.getElementById("coupons-history-list");
    couponList.innerHTML = "";

    if (state.coupons.length === 0) {
      couponList.innerHTML = `
        <div style="text-align:center; padding:18px; color:var(--text-muted); font-weight:700;">
          ${t("noCouponsYet")}
        </div>
      `;
    } else {
      state.coupons.forEach((cp) => {
        const row = document.createElement("div");
        row.className = `golden-coupon-card ${cp.used ? "redeemed" : ""}`;
        row.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:2rem;">${cp.icon}</span>
            <div>
              <div style="font-weight:900; font-size:1.05rem;">
                ${cp.title} ${cp.used ? `<span style="color:#64748b; font-size:0.82rem;">${t("couponRedeemedTag")}</span>` : `<span style="color:#b45309; font-size:0.82rem;">${t("couponActiveTag")}</span>`}
              </div>
              <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">
                ${t("couponClaimedBy", { name: state.settings.playerName, date: cp.dateStr })}
              </div>
            </div>
          </div>
          <button class="btn-3d ${cp.used ? "btn-white" : "btn-orange"}" style="padding:8px 14px; font-size:0.85rem;">
            ${cp.used ? t("btnCompleted") : t("btnMarkUsed")}
          </button>
        `;

        row.querySelector("button").addEventListener("click", () => {
          window.soundFX.tap();
          cp.used = !cp.used;
          saveState();
          renderShop();
        });

        couponList.appendChild(row);
      });
    }
  }

  function redeemShopItem(item) {
    state.gems -= item.cost;
    window.soundFX.chestOpen();
    burstConfetti(80);

    const popupModal = document.getElementById("reward-popup-modal");
    const popupContent = document.getElementById("reward-popup-content");

    if (item.type === "sticker_pack") {
      const lockedStickers = (window.GAME_DATA.stickers || []).filter(
        (s) => !(state.unlockedStickers || []).includes(s.id)
      );
      if (lockedStickers.length > 0) {
        const won = lockedStickers[Math.floor(Math.random() * lockedStickers.length)];
        state.unlockedStickers.push(won.id);
        addStickerToLobby(won.id);
        const stkName = window.I18N ? window.I18N.getStickerName(won) : won.name;
        popupContent.innerHTML = `
          <h2 style="font-size:1.7rem; font-weight:900; margin:0 0 8px;">${t("popupStickerOpenedTitle")}</h2>
          <div class="hatched-pet-box">
            <div style="font-size:4.2rem; margin:8px 0;">${won.emoji}</div>
            <h3 style="margin:0; font-size:1.4rem; font-weight:900;">${stkName}</h3>
            <p style="margin:6px 0 0; font-size:0.9rem; font-weight:700;">
              ${t("popupStickerOpenedSub", { name: state.settings.playerName })}
            </p>
          </div>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">${t("popupStickerAwesomeBtn")}</button>
        `;
      } else {
        state.gems += 25;
        popupContent.innerHTML = `
          <h2 style="font-size:1.6rem; font-weight:900;">${t("popupAllStickersTitle")}</h2>
          <p style="font-weight:700;">${t("popupAllStickersSub", { name: state.settings.playerName })}</p>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">${t("popupYayBtn")}</button>
        `;
      }
    } else if (item.type === "egg") {
      // Find locked pets
      const lockedPets = window.GAME_DATA.pets.filter((p) => !state.unlockedPets.includes(p.id));
      if (lockedPets.length > 0) {
        const hatched = lockedPets[Math.floor(Math.random() * lockedPets.length)];
        state.unlockedPets.push(hatched.id);
        state.activePetId = hatched.id;
        const pTxt = window.I18N ? window.I18N.getPetText(hatched) : { species: hatched.species, bio: hatched.bio };
        const rarityLbl = window.I18N ? window.I18N.getRarityLabel(hatched.rarity) : hatched.rarity;
        popupContent.innerHTML = `
          <h2 style="font-size:1.7rem; font-weight:900; margin:0 0 8px;">${t("popupEggHatchedTitle")}</h2>
          <div class="hatched-pet-box">
            <span class="rarity-badge rarity-${hatched.rarity}">${rarityLbl}</span>
            <div style="font-size:4.2rem; margin:8px 0;">${hatched.emoji}</div>
            <h3 style="margin:0; font-size:1.4rem; font-weight:900;">${hatched.name}</h3>
            <p style="margin:2px 0 8px; font-weight:800; color:var(--text-muted);">${pTxt.species}</p>
            <p style="margin:0; font-size:0.92rem; font-weight:700;">${pTxt.bio}</p>
          </div>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">${t("popupEggAwesomeBtn")}</button>
        `;
      } else {
        // All 24 pets already unlocked! Refund + bonus
        state.gems += 25;
        popupContent.innerHTML = `
          <h2 style="font-size:1.6rem; font-weight:900;">${t("popupAllPetsTitle")}</h2>
          <p style="font-weight:700;">${t("popupAllPetsSub", { name: state.settings.playerName })}</p>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">${t("popupYayBtn")}</button>
        `;
      }
    } else {
      const itemTxt = window.I18N
        ? window.I18N.getShopItemText(item)
        : { title: item.title, description: item.description };
      const nowStr = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      const coupon = {
        id: "cp_" + Date.now(),
        title: itemTxt.title,
        icon: item.icon,
        cost: item.cost,
        dateStr: nowStr,
        used: false
      };
      state.coupons.unshift(coupon);

      popupContent.innerHTML = `
        <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7); border:3px solid #f59e0b; border-radius:22px; padding:20px; margin-bottom:16px;">
          <div style="font-size:0.85rem; font-weight:900; color:#b45309; text-transform:uppercase; letter-spacing:1px;">
            ${t("popupCouponHeader")}
          </div>
          <div style="font-size:4rem; margin:10px 0;">${item.icon}</div>
          <h2 style="margin:0 0 6px; font-size:1.5rem; font-weight:900; color:#78350f;">${itemTxt.title}</h2>
          <p style="margin:0; font-weight:800; color:#92400e;">${t("popupCouponEarnedBy", { name: state.settings.playerName, date: nowStr })}</p>
        </div>
        <p style="font-weight:800; color:var(--text-muted); margin-bottom:16px;">
          ${t("popupCouponSub")}
        </p>
        <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">${t("popupKeepCouponBtn")}</button>
      `;
    }

    saveState();
    renderHUD();
    renderShop();
    renderLobbyScene();
    popupModal.classList.add("active");

    document.getElementById("btn-close-reward-popup").addEventListener("click", () => {
      window.soundFX.tap();
      popupModal.classList.remove("active");
    });
  }

  // =========================================================
  // TAB 5: PROGRESS & MASTERY METRICS DASHBOARD
  // =========================================================
  function renderStatsDashboard() {
    // 1. Compute global KPIs
    let totalAttempts = 0;
    let totalCorrect = 0;
    let totalTimeMs = 0;
    let masteredFactsCount = 0;

    for (let a = 1; a <= 12; a++) {
      for (let b = 1; b <= 12; b++) {
        const key = getFactKey(a, b);
        const st = state.factStats[key];
        if (st && st.attempts > 0) {
          totalAttempts += st.attempts;
          totalCorrect += st.correct;
          totalTimeMs += st.totalTimeMs;
        }
        const m = evaluateFactMastery(a, b);
        if (m.status === "gold" || m.status === "green") {
          masteredFactsCount++;
        }
      }
    }

    const overallAcc = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const overallAvgSec = totalAttempts > 0 ? (totalTimeMs / totalAttempts / 1000).toFixed(2) + "s" : "—";
    const totalRunsCompleted = state.recentRuns.length;

    const kpiGrid = document.getElementById("stats-kpi-grid");
    kpiGrid.innerHTML = `
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-blue-dark);">${totalAttempts}</div>
        <div class="kpi-label">${t("kpiQuestionsAnswered")}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-green-dark);">${overallAcc}%</div>
        <div class="kpi-label">${t("kpiOverallAccuracy")}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-orange-dark);">${overallAvgSec}</div>
        <div class="kpi-label">${t("kpiAvgSpeed")}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-purple-dark);">${masteredFactsCount} / 144</div>
        <div class="kpi-label">${t("kpiFactsMastered")}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:#e11d48;">🏆 ${totalRunsCompleted}</div>
        <div class="kpi-label">${t("kpiStreaksConquered")}</div>
      </div>
    `;

    // 2. Render Top Tricky Facts Pills
    const trickyList = getTrickyFactsList(6);
    const trickyContainer = document.getElementById("tricky-facts-pills");
    trickyContainer.innerHTML = "";
    if (trickyList.length === 0) {
      trickyContainer.innerHTML = `<span style="color:var(--text-muted); font-weight:700;">${t("noTrickyYet")}</span>`;
    } else {
      trickyList.forEach((item) => {
        const pill = document.createElement("div");
        pill.className = "stat-pill";
        pill.style.background = "#fff1f2";
        pill.style.borderColor = "#fda4af";
        pill.style.color = "#9f1239";
        pill.innerHTML = `
          <span><strong>${item.a} × ${item.b} = ${item.a * item.b}</strong></span>
          <span style="font-size:0.8rem; opacity:0.85;">${t("trickyPillStats", { acc: item.accuracy, sec: (item.avgMs / 1000).toFixed(1), misses: item.misses })}</span>
        `;
        trickyContainer.appendChild(pill);
      });
    }

    const detailBanner = document.getElementById("heatmap-fact-detail");
    if (detailBanner && !detailBanner.querySelector("button")) {
      detailBanner.textContent = t("heatmapTapHint");
    }

    // 3. Render 12x12 Interactive Mastery Heatmap
    const tableEl = document.getElementById("mastery-heatmap-table");
    tableEl.innerHTML = "";

    const theadRow = document.createElement("tr");
    theadRow.innerHTML = `<th>×</th>` + Array.from({ length: 12 }, (_, i) => `<th>${i + 1}</th>`).join("");
    tableEl.appendChild(theadRow);

    for (let a = 1; a <= 12; a++) {
      const tr = document.createElement("tr");
      const rowHeader = document.createElement("th");
      rowHeader.textContent = a;
      tr.appendChild(rowHeader);

      for (let b = 1; b <= 12; b++) {
        const m = evaluateFactMastery(a, b);
        const td = document.createElement("td");
        td.className = `heatmap-cell ${m.className}`;
        const speedLabel = m.avgMs !== null ? `${(m.avgMs / 1000).toFixed(1)}s` : "—";
        td.innerHTML = `
          <div>${a * b}</div>
          <span class="cell-speed">${speedLabel}</span>
        `;
        td.addEventListener("click", () => {
          window.soundFX.tap();
          document.querySelectorAll(".heatmap-cell").forEach((c) => c.classList.remove("selected-fact"));
          td.classList.add("selected-fact");
          showFactDetail(a, b);
        });
        tr.appendChild(td);
      }
      tableEl.appendChild(tr);
    }

    // 4. Render Per-Table Progress (×1 to ×12)
    const perTableContainer = document.getElementById("per-table-progress-list");
    perTableContainer.innerHTML = "";
    for (let tbl = 1; tbl <= 12; tbl++) {
      let strongOrGold = 0;
      let tableAttempts = 0;
      let tableTimeMs = 0;
      let tableCorrect = 0;

      for (let b = 1; b <= 12; b++) {
        const stStatus = evaluateTablePairMastery(tbl, b);
        if (stStatus === "gold" || stStatus === "green") strongOrGold++;
        const comb = getCombinedPairStats(tbl, b);
        if (comb.attempts > 0) {
          tableAttempts += comb.attempts;
          tableTimeMs += comb.totalTimeMs;
          tableCorrect += comb.correct;
        }
      }

      const pct = Math.round((strongOrGold / 12) * 100);
      const avgSec = tableAttempts > 0 ? `${(tableTimeMs / tableAttempts / 1000).toFixed(1)}s` : "—";
      const accPct = tableAttempts > 0 ? `${Math.round((tableCorrect / tableAttempts) * 100)}%` : "—";

      const row = document.createElement("div");
      row.className = "table-stat-row";
      row.innerHTML = `
        <div class="table-stat-header">
          <span>${t("perTableRowTitle", { t: tbl })}</span>
          <span style="color:var(--text-muted);">${t("perTableRowStats", { strong: strongOrGold, acc: accPct, avg: avgSec })}</span>
        </div>
        <div class="mini-bar-bg">
          <div class="mini-bar-fill" style="width:${pct}%;"></div>
        </div>
      `;
      perTableContainer.appendChild(row);
    }

    // 5. Render Recent Streak Runs History
    const runsContainer = document.getElementById("recent-runs-list");
    if (state.recentRuns.length === 0) {
      runsContainer.innerHTML = `<p style="color:var(--text-muted); font-weight:700; margin:0;">${t("noRunsYet")}</p>`;
    } else {
      runsContainer.innerHTML = state.recentRuns
        .slice(0, 12)
        .map(
          (r) => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid var(--border-light); font-weight:800; font-size:0.9rem; flex-wrap:wrap; gap:8px;">
            <div>
              <span>🏆 ${r.title}</span>
              <span style="color:var(--text-muted); font-size:0.8rem; margin-left:6px;">${t("runRowMeta", { streak: r.streakLength, timer: r.timerSeconds })}</span>
            </div>
            <div style="display:flex; gap:12px; color:var(--text-muted); font-size:0.84rem;">
              <span>${t("runRowAvg", { sec: (r.avgMs / 1000).toFixed(2) })}</span>
              <span>${t("runRowResets", { resets: r.resets })}</span>
              <span>${r.dateStr}</span>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  function showFactDetail(a, b) {
    const banner = document.getElementById("heatmap-fact-detail");
    const st = state.factStats[getFactKey(a, b)];
    const btnLabel = a === b ? t("btnPracticeSingleTable", { a }) : t("btnPracticeTwoTables", { a, b });
    if (!st || st.attempts === 0) {
      banner.innerHTML = `
        <div>
          <strong>${a} × ${b} = ${a * b}</strong> ${t("factNotPracticedYet")}
        </div>
        <button class="btn-3d btn-blue" style="padding:7px 14px; font-size:0.85rem;" id="btn-drill-this-fact">
          ${btnLabel}
        </button>
      `;
    } else {
      const acc = Math.round((st.correct / st.attempts) * 100);
      const avgSec = (st.totalTimeMs / st.attempts / 1000).toFixed(2);
      const bestSec = st.bestTimeMs ? (st.bestTimeMs / 1000).toFixed(2) + "s" : "—";
      banner.innerHTML = `
        <div>
          ${t("factDetailStats", {
            a,
            b,
            prod: a * b,
            attempts: st.attempts,
            acc,
            correct: st.correct,
            wrong: st.wrong,
            timeouts: st.timeouts,
            avg: avgSec,
            best: bestSec
          })}
        </div>
        <button class="btn-3d btn-blue" style="padding:7px 14px; font-size:0.85rem;" id="btn-drill-this-fact">
          ${btnLabel}
        </button>
      `;
    }

    const drillBtn = document.getElementById("btn-drill-this-fact");
    if (drillBtn) {
      drillBtn.addEventListener("click", () => {
        window.soundFX.tap();
        const tables = a === b ? [a] : [a, b];
        startGameSession({
          mode: "custom",
          nodeId: null,
          title: t("focusedDrillSessionTitle", { tables: tables.join(", ×") }),
          tables,
          timerSeconds: Number(state.settings.defaultTimerSeconds),
          streakLength: Number(state.settings.defaultStreakLength),
          baseGems: 30,
          unlockPetId: null
        });
      });
    }
  }

  // =========================================================
  // PEDAGOGICAL ENGINE: DERIVED FACTS, RHYMES & VISUAL ARRAYS
  // =========================================================
  function getPedagogicalStrategy(a, b) {
    if (window.I18N) {
      const svStrat = window.I18N.getPedagogicalStrategyLocalized(a, b);
      if (svStrat) return svStrat;
    }
    const ans = a * b;
    const minF = Math.min(a, b);
    const maxF = Math.max(a, b);
    const pairKey = `${minF}x${maxF}`;

    // 1. Famous Memory Rhymes for the classic toughest facts
    const famousRhymes = {
      "7x8": `🎵 Count in order: 5, 6, 7, 8! → 56 = 7 × 8!`,
      "6x8": `🎵 Six and eight went on a date → 48! (Plus: half of 8 is 4, then 8 → 48!)`,
      "6x7": `💡 Anchor from 5s: (5 × 7 = 35) + one more 7 = 42!`,
      "6x6": `🎵 Six times six is a magic trick → 36!`,
      "7x7": `🎵 Seven times seven is mighty fine → 49! (5×7=35 + 2×7=14)`,
      "8x8": `🎵 I ate and I ate until I was 64! (8 × 8 = 64)`
    };
    if (famousRhymes[pairKey]) {
      return famousRhymes[pairKey];
    }

    // 2. Derived Fact Strategies by factor
    if (minF === 1) {
      return `💡 1 × anything stays the same number → ${ans}!`;
    }
    if (minF === 2) {
      return `💡 Double it! ${maxF} + ${maxF} = ${ans}!`;
    }
    if (minF === 10 || maxF === 10) {
      const other = a === 10 ? b : a;
      return `💡 Place value shift: ${other} tens = ${ans} (put a 0 on the end of ${other})!`;
    }
    if (minF === 5 || maxF === 5) {
      const other = a === 5 ? b : a;
      return `💡 5s Trick: Half of (10 × ${other} = ${other * 10}) is ${ans}!`;
    }
    if (minF === 9 || maxF === 9) {
      const other = a === 9 ? b : a;
      const tensMinusOne = other * 10;
      const d1 = Math.floor(ans / 10);
      const d2 = ans % 10;
      return `💡 9s Trick: (10 × ${other} = ${tensMinusOne}) − ${other} = ${ans}! (Digits ${d1}+${d2}=${d1 + d2})`;
    }
    if (minF === 4) {
      return `💡 Double-Double! Double ${maxF} is ${maxF * 2}, double ${maxF * 2} is ${ans}!`;
    }
    if (minF === 3) {
      return `💡 Double + 1 group: (2 × ${maxF} = ${maxF * 2}) + ${maxF} = ${ans}!`;
    }
    if (minF === 6) {
      return `💡 Anchor from 5s: (5 × ${maxF} = ${maxF * 5}) + ${maxF} = ${ans}!`;
    }
    if (maxF === 11 && minF <= 9) {
      return `💡 11s Twin Digits! ${minF} × 11 repeats the digit → ${ans}!`;
    }
    if (maxF === 11 || minF === 11) {
      const other = a === 11 ? b : a;
      return `💡 11s Split: (10 × ${other} = ${other * 10}) + ${other} = ${ans}!`;
    }
    if (maxF === 12 || minF === 12) {
      const other = a === 12 ? b : a;
      return `💡 Dozen Split (10 + 2): (10 × ${other} = ${other * 10}) + (2 × ${other} = ${other * 2}) = ${ans}!`;
    }
    // General anchor split from 5
    return `💡 Split ${minF} into 5 + ${minF - 5}: (5×${maxF}=${5 * maxF}) + (${minF - 5}×${maxF}=${(minF - 5) * maxF}) = ${ans}!`;
  }

  function renderVisualDotArray(a, b, container) {
    if (!state.settings.showVisualArrayOnMiss) {
      container.style.display = "none";
      return;
    }
    // Use smaller factor as rows (up to 12) and larger as columns so it stays compact horizontally
    const rows = Math.min(a, b);
    const cols = Math.max(a, b);

    // Choose pedagogical anchor split row count (e.g., 10 for 11/12, 5 for 6..9, 2 for 3/4)
    let anchorRows = rows;
    if (rows > 10) anchorRows = 10;
    else if (rows > 5) anchorRows = 5;
    else if (rows === 4 || rows === 3) anchorRows = 2;

    const extraRows = rows - anchorRows;

    let dotsHtml = `<div class="array-dots-container">`;
    for (let r = 0; r < rows; r++) {
      const isAnchor = r < anchorRows;
      dotsHtml += `<div class="array-dot-row">`;
      for (let c = 0; c < cols; c++) {
        dotsHtml += `<span class="array-dot ${isAnchor ? "dot-anchor" : "dot-extra"}"></span>`;
      }
      dotsHtml += `</div>`;
    }
    dotsHtml += `</div>`;

    const isSv = state.settings.language === "sv";
    const rowWord = isSv ? (rows === 1 ? "rad med" : "rader med") : (rows === 1 ? "row of" : "rows of");
    const splitLegend =
      extraRows > 0
        ? `🔵 ${anchorRows}×${cols} (${anchorRows * cols}) ➕ 🟠 ${extraRows}×${cols} (${extraRows * cols}) = <strong>${a * b}</strong>`
        : `🔵 ${rows} ${rowWord} ${cols} = <strong>${a * b}</strong>`;

    container.innerHTML = `${dotsHtml}<div class="array-legend-text">${splitLegend}</div>`;
    container.style.display = "flex";
  }

  // =========================================================
  // CORE STREAK GAMEPLAY ENGINE (3-Second Timer + Reset to 0)
  // =========================================================
  let currentSession = null;
  let timerAnimId = null;
  let autoResetTimeoutId = null;
  let nextQuestionTimeoutId = null;

  function clearPendingTimeouts() {
    if (autoResetTimeoutId) {
      clearTimeout(autoResetTimeoutId);
      autoResetTimeoutId = null;
    }
    if (nextQuestionTimeoutId) {
      clearTimeout(nextQuestionTimeoutId);
      nextQuestionTimeoutId = null;
    }
  }

  function generateSmartChoices(a, b) {
    const correct = a * b;
    const candidates = new Set();

    // Adjacent multiples on same tables
    if (b > 1) candidates.add(a * (b - 1));
    if (b < 12) candidates.add(a * (b + 1));
    if (a > 1) candidates.add((a - 1) * b);
    if (a < 12) candidates.add((a + 1) * b);
    if (b > 2) candidates.add(a * (b - 2));
    if (b < 11) candidates.add(a * (b + 2));

    // Common close distractors
    [correct - 2, correct + 2, correct - 4, correct + 4, correct - 10, correct + 10, correct - 1, correct + 1].forEach(
      (val) => {
        if (val > 0 && val <= 160 && val !== correct) {
          candidates.add(val);
        }
      }
    );

    candidates.delete(correct);
    const pool = Array.from(candidates);

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const distractors = pool.slice(0, 3);
    while (distractors.length < 3) {
      const rand = Math.max(1, correct + (Math.floor(Math.random() * 11) - 5));
      if (rand !== correct && !distractors.includes(rand)) {
        distractors.push(rand);
      }
    }

    const choices = [correct, ...distractors];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  }

  // Smart choices for Mystery Factor questions (7 × ❓ = 56 -> choices like 6, 7, 8, 9)
  function generateSmartFactorChoices(correctFactor) {
    const candidates = new Set();
    [correctFactor - 2, correctFactor - 1, correctFactor + 1, correctFactor + 2, correctFactor + 3, correctFactor - 3].forEach(
      (val) => {
        if (val >= 1 && val <= 12 && val !== correctFactor) {
          candidates.add(val);
        }
      }
    );
    const pool = Array.from(candidates);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const distractors = pool.slice(0, 3);
    while (distractors.length < 3) {
      const rand = Math.floor(Math.random() * 12) + 1;
      if (rand !== correctFactor && !distractors.includes(rand)) {
        distractors.push(rand);
      }
    }
    const choices = [correctFactor, ...distractors];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  }

  function applyQuestionStyle(rawQ, session) {
    const style = session.questionStyle || state.settings.questionStyle || "mix";
    let qType = "standard";
    if (style === "mystery") {
      qType = Math.random() < 0.5 ? "mystery_b" : "mystery_a";
    } else if (style === "mix" && session.currentStreak >= 1 && Math.random() < 0.25) {
      qType = Math.random() < 0.65 ? "mystery_b" : "mystery_a";
    }
    return {
      ...rawQ,
      questionType: qType
    };
  }

  function pickNextQuestion(session) {
    const step = session.currentStreak;
    const midStep = Math.max(3, Math.floor(session.streakLength / 2));
    const finalStep = session.streakLength - 1;

    // 1. EXPANDING SPACED RETRIEVAL SCHEDULE (Step 2 -> Midpoint Twin -> Final Boss Question!)
    if (session.redemptionFact) {
      const rf = session.redemptionFact;
      if (step === 2 && !session.redemptionStage1Done) {
        session.redemptionStage1Done = true;
        return applyQuestionStyle(
          { a: rf.a, b: rf.b, badge: t("badgeSpaced1"), badgeClass: "" },
          session
        );
      }
      if (step === midStep && session.streakLength >= 6 && !session.redemptionStage2Done) {
        session.redemptionStage2Done = true;
        // Commutative Twin (b × a)
        return applyQuestionStyle(
          { a: rf.b, b: rf.a, badge: t("badgeTwin", { a: rf.a, b: rf.b }), badgeClass: "" },
          session
        );
      }
      if (step === finalStep && !session.redemptionStage3Done) {
        session.redemptionStage3Done = true;
        return applyQuestionStyle(
          { a: rf.a, b: rf.b, badge: t("badgeBoss"), badgeClass: "badge-boss" },
          session
        );
      }
    }

    // 2. Secondary retry queue if multiple facts were missed
    if (session.retryQueue.length > 0 && session.questionsSinceLastRetry >= 2) {
      const nextRetry = session.retryQueue.shift();
      session.questionsSinceLastRetry = 0;
      return applyQuestionStyle(
        { a: nextRetry.a, b: nextRetry.b, badge: t("badgeRetry"), badgeClass: "" },
        session
      );
    }

    // 3. 18% Interleaved Anchor Review when practicing single tables (prevents rote +N counting)
    if (session.tables.length === 1 && step >= 2 && Math.random() < 0.18) {
      const anchors = [2, 5, 10].filter((tbl) => !session.tables.includes(tbl));
      const anchorT = anchors[Math.floor(Math.random() * anchors.length)];
      const targetT = session.tables[0];
      return applyQuestionStyle(
        {
          a: anchorT,
          b: targetT,
          badge: t("badgeAnchor"),
          badgeClass: ""
        },
        session
      );
    }

    // 4. Build candidate pool from session customFactPairs (if Tricky Booster) or session tables
    const pool = [];
    const hasCustomPairs = session.customFactPairs && session.customFactPairs.length > 0;
    if (hasCustomPairs && (session.customFactPairs.length >= 2 || Math.random() < 0.78)) {
      session.customFactPairs.forEach((pair) => {
        pool.push({ a: pair.a, b: pair.b });
        if (pair.a !== pair.b && Math.random() < 0.35) {
          pool.push({ a: pair.b, b: pair.a });
        }
      });
    } else {
      if (hasCustomPairs) {
        session.customFactPairs.forEach((pair) => pool.push({ a: pair.a, b: pair.b }));
      }
      session.tables.forEach((t) => {
        for (let b = 1; b <= 12; b++) {
          if (Math.random() < 0.72) {
            pool.push({ a: t, b });
          } else {
            pool.push({ a: b, b: t });
          }
        }
      });
    }

    const filtered = pool.filter(
      (q) => !session.lastQuestion || !(q.a === session.lastQuestion.a && q.b === session.lastQuestion.b)
    );
    const source = filtered.length > 0 ? filtered : pool;
    const chosen = source[Math.floor(Math.random() * source.length)];
    session.questionsSinceLastRetry += 1;
    return applyQuestionStyle(chosen, session);
  }

  function startGameSession(config) {
    checkDailyStreak();
    renderHUD();
    stopTimerLoop();
    clearPendingTimeouts();

    currentSession = {
      ...config,
      questionStyle: config.questionStyle || state.settings.questionStyle || "mix",
      currentStreak: 0,
      resets: 0,
      redemptionFact: null,
      redemptionStage1Done: false,
      redemptionStage2Done: false,
      redemptionStage3Done: false,
      retryQueue: [],
      questionsSinceLastRetry: 0,
      lastQuestion: null,
      currentQuestion: null,
      questionStartTime: 0,
      streakResponseTimesMs: [],
      isLocked: false,
      waitingForMissTap: false,
      lowTimeTickPlayed: false
    };

    const overlay = document.getElementById("game-overlay");
    overlay.classList.add("active");

    const pet = getActivePet();
    const avatarEl = document.getElementById("stage-pet-avatar");
    avatarEl.textContent = pet.emoji;
    avatarEl.style.background = pet.bg;

    const bubble = document.getElementById("stage-speech-bubble");
    bubble.className = "speech-bubble";
    bubble.textContent = t("gameInitialSpeech", {
      name: state.settings.playerName,
      streak: currentSession.streakLength
    });

    document.getElementById("game-mode-footer").textContent = t("gameModeFooter", {
      title: currentSession.title,
      timer: currentSession.timerSeconds,
      streak: currentSession.streakLength
    });

    updateStreakBarUI(false);
    dealNextQuestion();
  }

  function updateStreakBarUI(isResetting = false) {
    if (!currentSession) return;
    const fill = document.getElementById("game-streak-fill");
    const pct = Math.min(100, Math.round((currentSession.currentStreak / currentSession.streakLength) * 100));
    fill.classList.toggle("resetting", isResetting);
    fill.style.width = `${pct}%`;

    document.getElementById("game-streak-text").textContent =
      `${currentSession.currentStreak} / ${currentSession.streakLength}`;
    document.getElementById("game-resets-count").textContent = currentSession.resets;

    const chestIcon = document.getElementById("game-chest-icon");
    chestIcon.classList.toggle("pulse", currentSession.currentStreak >= currentSession.streakLength - 2);
  }

  function stopTimerLoop() {
    if (timerAnimId) {
      cancelAnimationFrame(timerAnimId);
      timerAnimId = null;
    }
  }

  function formatSolvedEquation(q) {
    if (!q) return "";
    const prod = q.a * q.b;
    if (q.questionType === "mystery_b") return `${q.a} × [${q.b}] = ${prod}`;
    if (q.questionType === "mystery_a") return `[${q.a}] × ${q.b} = ${prod}`;
    return `${q.a} × ${q.b} = ${prod}`;
  }

  function dealNextQuestion() {
    if (!currentSession) return;
    stopTimerLoop();
    clearPendingTimeouts();

    const q = pickNextQuestion(currentSession);
    currentSession.currentQuestion = q;
    currentSession.lastQuestion = q;
    currentSession.isLocked = false;
    currentSession.waitingForMissTap = false;
    currentSession.lowTimeTickPlayed = false;

    const card = document.getElementById("game-problem-card");
    card.className = "problem-card";

    // Hide miss coaching elements during active question
    const strategyBox = document.getElementById("game-strategy-box");
    const visualArray = document.getElementById("game-visual-array");
    strategyBox.style.display = "none";
    visualArray.style.display = "none";

    // Render badge if Spaced Review, Commutative Twin, Boss Fact, or Mystery Factor
    const badgeEl = document.getElementById("game-question-badge");
    if (q.badge) {
      badgeEl.textContent = q.badge;
      badgeEl.className = `question-badge ${q.badgeClass || ""}`;
      badgeEl.style.display = "inline-flex";
    } else if (q.questionType === "mystery_a" || q.questionType === "mystery_b") {
      badgeEl.textContent = t("badgeMystery");
      badgeEl.className = "question-badge badge-mystery";
      badgeEl.style.display = "inline-flex";
    } else {
      badgeEl.style.display = "none";
    }

    // Format equation & generate choices based on questionType
    let choices = [];
    if (q.questionType === "mystery_b") {
      document.getElementById("game-equation").textContent = `${q.a} × ❓ = ${q.a * q.b}`;
      document.getElementById("game-sub-hint").textContent = t("gameSubHintMystery", {
        factor: q.a,
        prod: q.a * q.b
      });
      currentSession.expectedAnswer = q.b;
      choices = generateSmartFactorChoices(q.b);
    } else if (q.questionType === "mystery_a") {
      document.getElementById("game-equation").textContent = `❓ × ${q.b} = ${q.a * q.b}`;
      document.getElementById("game-sub-hint").textContent = t("gameSubHintMystery", {
        factor: q.b,
        prod: q.a * q.b
      });
      currentSession.expectedAnswer = q.a;
      choices = generateSmartFactorChoices(q.a);
    } else {
      document.getElementById("game-equation").textContent = `${q.a} × ${q.b} = ?`;
      document.getElementById("game-sub-hint").textContent =
        currentSession.currentStreak === 0
          ? t("gameSubHintStart")
          : t("gameSubHintStreak", { streak: currentSession.currentStreak });
      currentSession.expectedAnswer = q.a * q.b;
      choices = generateSmartChoices(q.a, q.b);
    }

    currentSession.currentChoices = choices;

    const buttons = document.querySelectorAll("#game-choices-grid .choice-btn");
    buttons.forEach((btn, idx) => {
      btn.className = "choice-btn";
      btn.disabled = false;
      btn.textContent = choices[idx];
      btn.blur();
    });

    // Start precision timer
    currentSession.questionStartTime = performance.now();
    const durationMs = currentSession.timerSeconds * 1000;
    const timerFill = document.getElementById("game-timer-fill");
    const timerText = document.getElementById("game-timer-text");

    function tickTimer(now) {
      if (!currentSession || currentSession.isLocked) return;
      const elapsed = now - currentSession.questionStartTime;
      const remainingMs = Math.max(0, durationMs - elapsed);
      const ratio = remainingMs / durationMs;

      timerFill.style.width = `${(ratio * 100).toFixed(1)}%`;
      timerText.textContent = `${(remainingMs / 1000).toFixed(1)}s`;

      if (ratio > 0.52) {
        timerFill.style.background = "var(--duo-green)";
      } else if (ratio > 0.25) {
        timerFill.style.background = "var(--duo-orange)";
      } else {
        timerFill.style.background = "var(--duo-red)";
      }

      if (remainingMs <= 1000 && remainingMs > 0 && !currentSession.lowTimeTickPlayed) {
        currentSession.lowTimeTickPlayed = true;
        window.soundFX.tick();
      }

      if (remainingMs <= 0) {
        handleAnswerSelection(-1, true);
      } else {
        timerAnimId = requestAnimationFrame(tickTimer);
      }
    }

    timerAnimId = requestAnimationFrame(tickTimer);
  }

  function acknowledgeMissAndRestart() {
    if (!currentSession || !currentSession.waitingForMissTap) return;
    currentSession.waitingForMissTap = false;
    window.soundFX.tap();
    const bubble = document.getElementById("stage-speech-bubble");
    bubble.className = "speech-bubble";
    bubble.textContent = t("gameFreshStartBubble", {
      name: state.settings.playerName,
      streak: currentSession.streakLength
    });
    dealNextQuestion();
  }

  function handleAnswerSelection(choiceIdx, isTimeout = false) {
    if (!currentSession) return;

    // If waiting for Active Error Encoding tap on the highlighted green button:
    if (currentSession.waitingForMissTap) {
      const tappedVal = choiceIdx >= 0 ? currentSession.currentChoices[choiceIdx] : null;
      if (tappedVal === currentSession.expectedAnswer) {
        acknowledgeMissAndRestart();
      }
      return;
    }

    if (currentSession.isLocked) return;
    currentSession.isLocked = true;
    stopTimerLoop();

    const elapsedMs = performance.now() - currentSession.questionStartTime;
    const { a, b } = currentSession.currentQuestion;
    const expectedAns = currentSession.expectedAnswer;
    const fullProduct = a * b;
    const selectedVal = choiceIdx >= 0 ? currentSession.currentChoices[choiceIdx] : null;
    const isCorrect = !isTimeout && selectedVal === expectedAns;

    // Record metrics for this fact
    recordFactOutcome(a, b, isCorrect, isTimeout, elapsedMs);

    const card = document.getElementById("game-problem-card");
    const bubble = document.getElementById("stage-speech-bubble");
    const pet = getActivePet();

    if (isCorrect) {
      const buttons = document.querySelectorAll("#game-choices-grid .choice-btn");
      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (currentSession.currentChoices[idx] === expectedAns) {
          btn.classList.add("choice-correct");
        }
      });

      currentSession.currentStreak += 1;
      currentSession.streakResponseTimesMs.push(elapsedMs);
      window.soundFX.correct(currentSession.currentStreak);

      card.classList.add("correct-flash");
      document.getElementById("game-equation").textContent = formatSolvedEquation(currentSession.currentQuestion);
      document.getElementById("game-sub-hint").textContent = t("gameCorrectSpeed", {
        sec: (elapsedMs / 1000).toFixed(2)
      });

      const quote = window.I18N
        ? window.I18N.getCheerQuote(pet, currentSession.currentStreak)
        : pet.cheerQuotes[currentSession.currentStreak % pet.cheerQuotes.length];
      bubble.className = "speech-bubble";
      bubble.textContent = quote;

      updateStreakBarUI(false);

      if (currentSession.currentStreak >= currentSession.streakLength) {
        nextQuestionTimeoutId = setTimeout(() => {
          triggerStreakVictory();
        }, 380);
      } else {
        nextQuestionTimeoutId = setTimeout(() => {
          dealNextQuestion();
        }, 340);
      }
    } else {
      // WRONG OR TIME OUT -> Active Error Encoding + Strategy Coach + Visual Dot Array + Spaced Schedule!
      window.soundFX.reset();
      currentSession.resets += 1;
      currentSession.currentStreak = 0;
      currentSession.streakResponseTimesMs = [];

      // Set Expanding Spaced Retrieval schedule (Step 2 -> Midpoint Twin -> Final Boss #10)
      if (currentSession.redemptionFact) {
        const prevRf = currentSession.redemptionFact;
        const alreadyQueued = currentSession.retryQueue.some((q) => q.a === prevRf.a && q.b === prevRf.b);
        if (!alreadyQueued) currentSession.retryQueue.push(prevRf);
      }
      currentSession.redemptionFact = { a, b };
      currentSession.redemptionStage1Done = false;
      currentSession.redemptionStage2Done = false;
      currentSession.redemptionStage3Done = false;

      const solvedEq = formatSolvedEquation(currentSession.currentQuestion);
      card.classList.add("wrong-shake");
      document.getElementById("game-equation").textContent = solvedEq;

      // Show Derived Fact Strategy / Rhyme
      const strategyBox = document.getElementById("game-strategy-box");
      strategyBox.textContent = getPedagogicalStrategy(a, b);
      strategyBox.style.display = "block";

      // Show CRA Visual Anchor Dot Array
      const visualArray = document.getElementById("game-visual-array");
      renderVisualDotArray(a, b, visualArray);

      updateStreakBarUI(true);

      const useTapToContinue = state.settings.requireTapOnMiss !== false;
      const buttons = document.querySelectorAll("#game-choices-grid .choice-btn");

      if (useTapToContinue) {
        currentSession.waitingForMissTap = true;
        buttons.forEach((btn, idx) => {
          if (currentSession.currentChoices[idx] === expectedAns) {
            btn.disabled = false;
            btn.classList.add("choice-correct", "tap-to-continue");
          } else {
            btn.disabled = true;
            if (idx === choiceIdx) btn.classList.add("choice-wrong");
          }
        });

        document.getElementById("game-sub-hint").textContent = t("gameTapGreenHint", { ans: expectedAns });

        bubble.className = "speech-bubble reset-bubble";
        bubble.textContent = isTimeout
          ? t("gameTimeoutBubbleTap", { name: state.settings.playerName, eq: solvedEq, ans: expectedAns })
          : t("gameWrongBubbleTap", { name: state.settings.playerName, eq: solvedEq, ans: expectedAns });
      } else {
        buttons.forEach((btn, idx) => {
          btn.disabled = true;
          if (currentSession.currentChoices[idx] === expectedAns) {
            btn.classList.add("choice-correct");
          } else if (idx === choiceIdx) {
            btn.classList.add("choice-wrong");
          }
        });

        document.getElementById("game-sub-hint").textContent = isTimeout
          ? t("gameTimeoutSubAuto", { eq: solvedEq })
          : t("gameWrongSubAuto", { eq: solvedEq });

        bubble.className = "speech-bubble reset-bubble";
        bubble.textContent = isTimeout
          ? t("gameTimeoutBubbleAuto", { name: state.settings.playerName, eq: solvedEq })
          : t("gameWrongBubbleAuto", { name: state.settings.playerName, eq: solvedEq });

        autoResetTimeoutId = setTimeout(() => {
          if (!currentSession) return;
          bubble.className = "speech-bubble";
          bubble.textContent = t("gameFreshStartBubble", {
            name: state.settings.playerName,
            streak: currentSession.streakLength
          });
          dealNextQuestion();
        }, Number(state.settings.teachingPauseMs) || 1700);
      }
    }
  }

  // Bind multiple choice buttons
  document.querySelectorAll("#game-choices-grid .choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      handleAnswerSelection(idx, false);
    });
  });

  // Keyboard shortcuts (1, 2, 3, 4, Enter, Space) for desktop testing
  window.addEventListener("keydown", (e) => {
    if (!currentSession) return;
    if (document.querySelector(".modal-backdrop.active")) return;
    if (currentSession.waitingForMissTap && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      acknowledgeMissAndRestart();
      return;
    }
    if (["1", "2", "3", "4"].includes(e.key)) {
      e.preventDefault();
      handleAnswerSelection(Number(e.key) - 1, false);
    }
  });

  document.getElementById("btn-quit-game").addEventListener("click", () => {
    window.soundFX.tap();
    stopTimerLoop();
    clearPendingTimeouts();
    currentSession = null;
    document.getElementById("game-overlay").classList.remove("active");
    renderHUD();
    refreshActiveTabUI();
  });

  // =========================================================
  // VICTORY & TREASURE CHEST OPENING
  // =========================================================
  function triggerStreakVictory() {
    if (!currentSession) return;
    window.soundFX.victory();
    burstConfetti(75);

    const avgMs =
      currentSession.streakResponseTimesMs.length > 0
        ? Math.round(
            currentSession.streakResponseTimesMs.reduce((a, b) => a + b, 0) /
              currentSession.streakResponseTimesMs.length
          )
        : 2000;

    // Calculate Gems & Stars
    const timerMode =
      window.GAME_DATA.timerModes.find((m) => m.seconds === currentSession.timerSeconds) ||
      window.GAME_DATA.timerModes[0];
    const zeroResetBonus = currentSession.resets === 0 ? 10 : 0;
    const totalGemsEarned = Math.round(currentSession.baseGems * timerMode.gemMultiplier) + zeroResetBonus;

    currentSession.chestOpened = false;
    currentSession.computedReward = {
      avgMs,
      totalGemsEarned,
      starsEarned: timerMode.stars
    };

    document.getElementById("victory-title").textContent =
      currentSession.resets === 0
        ? t("victoryFlawlessTitle", { name: state.settings.playerName })
        : t("victoryCompleteTitle");
    document.getElementById("victory-subtitle").textContent =
      currentSession.resets === 0
        ? t("victoryFlawlessSub", { streak: currentSession.streakLength })
        : t("victoryCompleteSub", { name: state.settings.playerName, streak: currentSession.streakLength });

    document.getElementById("chest-unopened-view").style.display = "block";
    document.getElementById("chest-opened-view").style.display = "none";
    document.getElementById("victory-modal").classList.add("active");
  }

  document.getElementById("btn-open-chest").addEventListener("click", () => {
    if (!currentSession || !currentSession.computedReward || currentSession.chestOpened) return;
    currentSession.chestOpened = true;
    window.soundFX.chestOpen();
    burstConfetti(110);

    const { avgMs, totalGemsEarned, starsEarned } = currentSession.computedReward;
    state.gems += totalGemsEarned;

    // Save Adventure Node Progress
    if (currentSession.nodeId) {
      const prev = state.levelProgress[currentSession.nodeId] || {
        stars: 0,
        completions: 0,
        bestAvgMs: null
      };
      state.levelProgress[currentSession.nodeId] = {
        stars: Math.max(prev.stars, starsEarned),
        completions: prev.completions + 1,
        bestAvgMs: prev.bestAvgMs === null ? avgMs : Math.min(prev.bestAvgMs, avgMs)
      };
    }

    // Check if this unlocks a new Magical Pet
    const petContainer = document.getElementById("victory-new-pet-container");
    petContainer.style.display = "none";
    petContainer.innerHTML = "";

    let unlockedPetObj = null;
    if (currentSession.unlockPetId && !state.unlockedPets.includes(currentSession.unlockPetId)) {
      state.unlockedPets.push(currentSession.unlockPetId);
      state.activePetId = currentSession.unlockPetId;
      unlockedPetObj = getPetById(currentSession.unlockPetId);
    }

    if (unlockedPetObj) {
      const pTxt = window.I18N
        ? window.I18N.getPetText(unlockedPetObj)
        : { species: unlockedPetObj.species, bio: unlockedPetObj.bio };
      petContainer.style.display = "block";
      petContainer.innerHTML = `
        <div class="hatched-pet-box">
          <div style="font-size:0.8rem; font-weight:900; color:#6b21a8; text-transform:uppercase;">
            ${t("victoryNewPetHeader")}
          </div>
          <div style="font-size:3.8rem; margin:6px 0;">${unlockedPetObj.emoji}</div>
          <h3 style="margin:0; font-size:1.3rem; font-weight:900;">${unlockedPetObj.name} (${pTxt.species})</h3>
          <p style="margin:4px 0 0; font-size:0.88rem; font-weight:700;">${pTxt.bio}</p>
        </div>
      `;
    }

    // Bonus Lobby Sticker Reward from Treasure Chest (100% on 0-reset flawless runs, 50% otherwise)
    const stickerContainer = document.getElementById("victory-new-sticker-container");
    if (stickerContainer) {
      stickerContainer.style.display = "none";
      stickerContainer.innerHTML = "";
      const lockedStickers = (window.GAME_DATA.stickers || []).filter(
        (s) => !(state.unlockedStickers || []).includes(s.id)
      );
      const winSticker =
        lockedStickers.length > 0 && (currentSession.resets === 0 || Math.random() < 0.55);
      if (winSticker) {
        const wonStk = lockedStickers[Math.floor(Math.random() * lockedStickers.length)];
        state.unlockedStickers.push(wonStk.id);
        addStickerToLobby(wonStk.id);
        const stkName = window.I18N ? window.I18N.getStickerName(wonStk) : wonStk.name;
        stickerContainer.style.display = "block";
        stickerContainer.innerHTML = `
          <div style="background:#f0fdf4; border:2px solid #86efac; border-radius:16px; padding:10px 14px; margin-top:10px;">
            <div style="font-size:0.76rem; font-weight:900; color:#15803d; text-transform:uppercase;">
              ${t("victoryNewStickerHeader")}
            </div>
            <div style="font-size:2.4rem; margin:4px 0;">${wonStk.emoji}</div>
            <div style="font-size:1rem; font-weight:900;">${stkName}</div>
            <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted);">${t("victoryPlacedInLobby")}</div>
          </div>
        `;
      }
    }

    // Log to recentRuns
    const nowStr = new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    state.recentRuns.unshift({
      title: currentSession.title,
      timerSeconds: currentSession.timerSeconds,
      streakLength: currentSession.streakLength,
      resets: currentSession.resets,
      avgMs,
      dateStr: nowStr
    });
    if (state.recentRuns.length > 30) state.recentRuns.pop();

    saveState();
    renderHUD();

    document.getElementById("victory-gems-earned").textContent = t("victoryGemsEarned", { gems: totalGemsEarned });
    document.getElementById("victory-avg-speed").textContent = `${(avgMs / 1000).toFixed(2)}s`;

    document.getElementById("chest-unopened-view").style.display = "none";
    document.getElementById("chest-opened-view").style.display = "block";
  });

  document.getElementById("btn-victory-replay").addEventListener("click", () => {
    window.soundFX.tap();
    document.getElementById("victory-modal").classList.remove("active");
    if (currentSession) {
      startGameSession({
        mode: currentSession.mode,
        nodeId: currentSession.nodeId,
        title: currentSession.title,
        tables: currentSession.tables,
        questionStyle: currentSession.questionStyle,
        customFactPairs: currentSession.customFactPairs,
        timerSeconds: currentSession.timerSeconds,
        streakLength: currentSession.streakLength,
        baseGems: currentSession.baseGems,
        unlockPetId: currentSession.unlockPetId
      });
    }
  });

  document.getElementById("btn-victory-continue").addEventListener("click", () => {
    window.soundFX.tap();
    document.getElementById("victory-modal").classList.remove("active");
    document.getElementById("game-overlay").classList.remove("active");
    currentSession = null;
    renderHUD();
    refreshActiveTabUI();
  });

  // =========================================================
  // PARENT SETTINGS & REWARD CUSTOMIZATION MODAL
  // =========================================================
  function openParentModal() {
    window.soundFX.tap();
    document.getElementById("parent-input-name").value = state.settings.playerName;
    const langSel = document.getElementById("parent-select-lang");
    if (langSel) langSel.value = state.settings.language || "en";
    document.getElementById("parent-select-streak").value = String(state.settings.defaultStreakLength);
    document.getElementById("parent-select-timer").value = String(state.settings.defaultTimerSeconds);
    document.getElementById("parent-select-pause").value = String(state.settings.teachingPauseMs || 1700);
    document.getElementById("parent-select-recovery").value =
      state.settings.requireTapOnMiss === false ? "timer" : "tap";
    document.getElementById("parent-select-style").value = state.settings.questionStyle || "mix";
    renderParentRewardsList();
    document.getElementById("parent-modal").classList.add("active");
  }

  function renderParentRewardsList() {
    const container = document.getElementById("parent-rewards-manage-list");
    container.innerHTML = "";
    state.shopRewards.forEach((r, idx) => {
      if (r.type === "egg" || r.type === "sticker_pack") return; // keep Mystery Egg & Sticker Pack permanent
      const itemTxt = window.I18N
        ? window.I18N.getShopItemText(r)
        : { title: r.title, description: r.description };
      const row = document.createElement("div");
      row.style.cssText =
        "display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:var(--bg-main); border-radius:10px; margin-bottom:6px; font-weight:800; font-size:0.88rem;";
      row.innerHTML = `
        <span>${r.icon} ${itemTxt.title} (💎 ${r.cost})</span>
        <button class="btn-3d btn-white" style="padding:4px 10px; font-size:0.78rem;" data-del="${idx}">${t("btnRemoveReward")}</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.shopRewards.splice(idx, 1);
        saveState();
        renderParentRewardsList();
        renderShop();
      });
      container.appendChild(row);
    });
  }

  document.getElementById("hud-parent-btn").addEventListener("click", openParentModal);
  document.getElementById("btn-open-parent-from-shop").addEventListener("click", openParentModal);

  document.getElementById("btn-close-parent").addEventListener("click", () => {
    window.soundFX.tap();
    document.getElementById("parent-modal").classList.remove("active");
  });

  document.getElementById("btn-parent-grant-gems").addEventListener("click", () => {
    window.soundFX.chestOpen();
    state.gems += 50;
    saveState();
    renderHUD();
    renderShop();
  });

  document.getElementById("btn-add-custom-reward").addEventListener("click", () => {
    const icon = document.getElementById("new-reward-icon").value.trim() || "🎁";
    const title = document.getElementById("new-reward-title").value.trim();
    const cost = Math.max(10, Number(document.getElementById("new-reward-cost").value) || 100);
    if (!title) return;

    window.soundFX.tap();
    state.shopRewards.push({
      id: "custom_" + Date.now(),
      title,
      description: `Custom Parent Coupon for ${state.settings.playerName}!`,
      cost,
      icon,
      type: "coupon"
    });
    document.getElementById("new-reward-title").value = "";
    saveState();
    renderParentRewardsList();
    renderShop();
  });

  document.getElementById("btn-save-parent").addEventListener("click", () => {
    window.soundFX.correct(3);
    state.settings.playerName = document.getElementById("parent-input-name").value.trim() || "Jemima";
    const langSel = document.getElementById("parent-select-lang");
    if (langSel) {
      state.settings.language = langSel.value || "en";
      window.CURRENT_LANG = state.settings.language;
    }
    state.settings.defaultStreakLength = Number(document.getElementById("parent-select-streak").value) || 10;
    state.settings.defaultTimerSeconds = Number(document.getElementById("parent-select-timer").value) || 3;
    state.settings.teachingPauseMs = Number(document.getElementById("parent-select-pause").value) || 1700;
    state.settings.requireTapOnMiss = document.getElementById("parent-select-recovery").value === "tap";
    state.settings.questionStyle = document.getElementById("parent-select-style").value || "mix";
    customStreakLen = state.settings.defaultStreakLength;
    customTimerSec = state.settings.defaultTimerSeconds;
    customQuestionStyle = state.settings.questionStyle;
    saveState();
    renderHUD();
    refreshActiveTabUI();
    document.getElementById("parent-modal").classList.remove("active");
  });

  document.getElementById("btn-export-data").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `jemima_times_tables_backup.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  // =========================================================
  // CLOUD SYNC & PASSWORDLESS MAGIC LINK MODAL HANDLERS
  // =========================================================
  function openCloudModal() {
    window.soundFX.tap();
    if (window.CLOUD_SYNC) {
      window.CLOUD_SYNC.updateUI();
    }
    document.getElementById("cloud-modal").classList.add("active");
  }

  document.getElementById("hud-cloud-btn").addEventListener("click", openCloudModal);

  const openCloudFromParentBtn = document.getElementById("btn-open-cloud-from-parent");
  if (openCloudFromParentBtn) {
    openCloudFromParentBtn.addEventListener("click", () => {
      document.getElementById("parent-modal").classList.remove("active");
      openCloudModal();
    });
  }

  document.getElementById("btn-close-cloud").addEventListener("click", () => {
    window.soundFX.tap();
    document.getElementById("cloud-modal").classList.remove("active");
  });

  document.getElementById("btn-toggle-firebase-setup").addEventListener("click", () => {
    const panel = document.getElementById("cloud-firebase-setup-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  });

  document.getElementById("btn-save-firebase-config").addEventListener("click", () => {
    const raw = document.getElementById("cloud-input-firebase-config").value;
    const errEl = document.getElementById("cloud-config-error");
    try {
      errEl.style.display = "none";
      window.CLOUD_SYNC.saveCustomFirebaseConfig(raw);
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }
  });

  document.getElementById("btn-send-magic-link").addEventListener("click", async () => {
    const emailInput = document.getElementById("cloud-input-email");
    const feedbackEl = document.getElementById("cloud-magic-feedback");
    const btn = document.getElementById("btn-send-magic-link");
    const email = emailInput.value.trim();
    const isSv = window.CURRENT_LANG === "sv";

    feedbackEl.style.display = "block";
    feedbackEl.textContent = isSv ? "⏳ Skickar gratis magisk inloggningslänk..." : "⏳ Sending free Magic Login Link...";
    btn.disabled = true;

    try {
      await window.CLOUD_SYNC.sendMagicLink(email);
      window.soundFX.correct(2);
      feedbackEl.innerHTML = isSv
        ? `✅ <strong>Magisk länk skickad till ${email}!</strong><br/>Öppna mejlet på den här enheten (eller vidarebefordra/AirDroppa länken till ${state.settings.playerName}s iPad) och tryck på den för att koppla enheten permanent.`
        : `✅ <strong>Magic Link sent to ${email}!</strong><br/>Open the email on this device (or forward/AirDrop the link to ${state.settings.playerName}'s iPad) and tap it to permanently link the device.`;
    } catch (err) {
      feedbackEl.textContent = `⚠️ ${err.message}`;
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById("btn-google-signin").addEventListener("click", async () => {
    const feedbackEl = document.getElementById("cloud-magic-feedback");
    try {
      feedbackEl.style.display = "none";
      await window.CLOUD_SYNC.signInWithGoogle();
      window.soundFX.chestOpen();
    } catch (err) {
      feedbackEl.style.display = "block";
      feedbackEl.textContent = `⚠️ Google Sign-In: ${err.message}`;
    }
  });

  document.getElementById("btn-cloud-force-sync").addEventListener("click", () => {
    window.soundFX.tap();
    if (window.CLOUD_SYNC) {
      window.CLOUD_SYNC.pushState(state);
    }
    const fb = document.getElementById("cloud-signedin-feedback");
    fb.style.display = "block";
    fb.textContent =
      window.CURRENT_LANG === "sv"
        ? "✅ Senaste framstegen har synkats till molnkontot!"
        : "✅ Synced latest progress to your cloud account!";
  });

  document.getElementById("btn-copy-device-setup-link").addEventListener("click", async () => {
    const user = window.CLOUD_SYNC ? window.CLOUD_SYNC.getCurrentUser() : null;
    const fb = document.getElementById("cloud-signedin-feedback");
    const isSv = window.CURRENT_LANG === "sv";
    fb.style.display = "block";
    if (user && user.email) {
      try {
        await window.CLOUD_SYNC.sendMagicLink(user.email);
        fb.innerHTML = isSv
          ? `✉️ <strong>Ny magisk länk skickad till ${user.email}!</strong><br/>Öppna mejlet på den andra enheten (eller AirDroppa länken till ${state.settings.playerName}s iPad) för att koppla den permanent!`
          : `✉️ <strong>Sent a fresh Magic Link to ${user.email}!</strong><br/>Open your email on the other device (or AirDrop the link from your email to ${state.settings.playerName}'s iPad) to link it permanently!`;
      } catch (err) {
        fb.textContent = `⚠️ ${err.message}`;
      }
    }
  });

  document.getElementById("btn-cloud-signout").addEventListener("click", async () => {
    window.soundFX.tap();
    if (window.CLOUD_SYNC) {
      await window.CLOUD_SYNC.signOut();
    }
  });

  // =========================================================
  // FIRST-TIME WELCOME & SETUP WIZARD (Login 100% Optional)
  // =========================================================
  const onboardingNameInput = document.getElementById("onboarding-input-name");
  const onboardingNamePreview = document.getElementById("onboarding-name-preview");
  const onboardingTimerSelect = document.getElementById("onboarding-select-timer");

  document.querySelectorAll(".onboarding-lang-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      window.soundFX.tap();
      state.settings.language = pill.dataset.lang || "en";
      window.CURRENT_LANG = state.settings.language;
      saveState();
      renderHUD();
      refreshActiveTabUI();
    });
  });

  if (onboardingNameInput && onboardingNamePreview) {
    onboardingNameInput.addEventListener("input", () => {
      const name = onboardingNameInput.value.trim() || "Jemima";
      onboardingNamePreview.innerHTML = t("welcomeNamePreview", { name });
    });
  }

  function applyOnboardingInputs() {
    const chosenName = (onboardingNameInput && onboardingNameInput.value.trim()) || "Jemima";
    const chosenTimer = Number(onboardingTimerSelect && onboardingTimerSelect.value) || 3;
    state.settings.playerName = chosenName;
    state.settings.defaultTimerSeconds = chosenTimer;
    customTimerSec = chosenTimer;
    state.onboardingCompleted = true;
    saveState();
    renderHUD();
    refreshActiveTabUI();
  }

  document.getElementById("btn-onboarding-start-local").addEventListener("click", () => {
    window.soundFX.correct(2);
    applyOnboardingInputs();
    document.getElementById("onboarding-modal").classList.remove("active");
  });

  document.getElementById("btn-onboarding-open-cloud").addEventListener("click", () => {
    window.soundFX.tap();
    applyOnboardingInputs();
    document.getElementById("onboarding-modal").classList.remove("active");
    openCloudModal();
  });

  function checkFirstTimeOnboarding() {
    const hasHistory =
      Object.keys(state.factStats || {}).length > 0 || (state.recentRuns && state.recentRuns.length > 0);
    const isMagicLinkCallback =
      window.location.search.includes("magic_email=") || window.location.search.includes("oobCode=");

    if (hasHistory || isMagicLinkCallback) {
      if (!state.onboardingCompleted) {
        state.onboardingCompleted = true;
        saveState(true);
      }
      return;
    }

    if (!state.onboardingCompleted) {
      if (onboardingNameInput) onboardingNameInput.value = state.settings.playerName || "Jemima";
      if (onboardingTimerSelect) onboardingTimerSelect.value = String(state.settings.defaultTimerSeconds || 3);
      document.getElementById("onboarding-modal").classList.add("active");
    }
  }

  // =========================================================
  // INITIALIZE APP ON LOAD
  // =========================================================
  checkDailyStreak();
  renderHUD();
  renderAdventureMap();
  checkFirstTimeOnboarding();

  if (window.CLOUD_SYNC) {
    window.CLOUD_SYNC.init({
      getLocalState: () => state,
      onRemoteStateMerge: (mergedState) => {
        state = mergedState;
        state.onboardingCompleted = true;
        customStreakLen = state.settings.defaultStreakLength || 10;
        customTimerSec = state.settings.defaultTimerSeconds || 3;
        customQuestionStyle = state.settings.questionStyle || "mix";
        saveState(true);
        renderHUD();
        refreshActiveTabUI();
        document.getElementById("onboarding-modal").classList.remove("active");
      }
    });
  }
})();
