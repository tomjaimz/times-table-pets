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
      return {
        ...def,
        ...parsed,
        settings: { ...def.settings, ...(parsed.settings || {}) },
        dailyStreak: { ...def.dailyStreak, ...(parsed.dailyStreak || {}) }
      };
    } catch (e) {
      return createDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  function renderHUD() {
    const pet = getActivePet();
    document.getElementById("hud-pet-emoji").textContent = pet.emoji;
    document.getElementById("hud-pet-name").textContent = pet.name;
    document.getElementById("hud-academy-title").textContent =
      `${state.settings.playerName}'s Magical Pet Academy`;
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

  // =========================================================
  // TAB 1: ADVENTURE PATH RENDERER
  // =========================================================
  function renderAdventureMap() {
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

      const header = document.createElement("div");
      header.className = "world-header";
      header.innerHTML = `
        <h2>${world.name}</h2>
        <p>${world.subtitle}</p>
      `;
      section.appendChild(header);

      const pathDiv = document.createElement("div");
      pathDiv.className = "nodes-path";

      world.nodes.forEach((node) => {
        const prog = state.levelProgress[node.id] || { stars: 0, completions: 0, bestAvgMs: null };
        const isCompleted = prog.completions > 0;
        const pet = getPetById(node.unlockPetId);
        const petUnlocked = state.unlockedPets.includes(node.unlockPetId);

        const starsHtml = [1, 2, 3]
          .map((s) => (s <= prog.stars ? "⭐" : "☆"))
          .join("");

        const bestSpeedBadge = prog.bestAvgMs
          ? `<span style="font-size:0.78rem; font-weight:800; color:#475569;">⚡ Best: ${(prog.bestAvgMs / 1000).toFixed(1)}s</span>`
          : "";

        const card = document.createElement("div");
        card.className = `path-node-card ${isCompleted ? "completed" : ""} ${node.isBoss ? "boss-node" : ""}`;
        card.innerHTML = `
          <div class="node-icon-circle">${node.icon}</div>
          <div class="node-info">
            <div class="node-title-row">
              <h3 class="node-title">${node.title}</h3>
            </div>
            <p class="node-desc">${node.description}</p>
            <div class="node-meta-row">
              <span class="node-stars" title="1★=8s, 2★=5s, 3★=3s Blitz">${starsHtml}</span>
              <span class="pet-reward-tag ${petUnlocked ? "unlocked" : ""}">
                ${petUnlocked ? `✓ ${pet.emoji} ${pet.name}` : `🥚 Unlocks ${pet.emoji} ${pet.name}`}
              </span>
              ${bestSpeedBadge}
            </div>
          </div>
          <button class="btn-3d ${isCompleted ? "btn-green" : "btn-blue"}" style="padding:10px 16px; font-size:0.95rem;">
            Play ▶
          </button>
        `;

        card.addEventListener("click", () => {
          window.soundFX.tap();
          startGameSession({
            mode: "adventure",
            nodeId: node.id,
            title: node.title,
            tables: node.tables,
            timerSeconds: Number(state.settings.defaultTimerSeconds),
            streakLength: Number(state.settings.defaultStreakLength),
            baseGems: node.baseGems,
            unlockPetId: node.unlockPetId
          });
        });

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

  function renderCustomPractice() {
    const tricky = getTrickyFactsList(6);
    const summaryEl = document.getElementById("practice-tricky-summary");
    if (tricky.length === 0) {
      summaryEl.textContent = `No missed facts logged yet! Complete a few runs or click to practice the classic tricky 6s, 7s, 8s, 9s, and 12s.`;
    } else {
      const labels = tricky.map((t) => `${t.a}×${t.b}`).join(", ");
      summaryEl.textContent = `${state.settings.playerName}'s current top tricky facts: ${labels}`;
    }

    const grid = document.getElementById("custom-tables-grid");
    grid.innerHTML = "";
    for (let t = 1; t <= 12; t++) {
      // Calculate quick mastery % for table t
      let masteredCount = 0;
      for (let b = 1; b <= 12; b++) {
        const m = evaluateFactMastery(t, b);
        if (m.status === "gold" || m.status === "green") masteredCount++;
      }
      const btn = document.createElement("button");
      btn.className = `table-toggle-btn ${customSelectedTables.has(t) ? "selected" : ""}`;
      btn.innerHTML = `
        <span>×${t} Table</span>
        <span class="table-sub">${masteredCount}/12 strong</span>
      `;
      btn.addEventListener("click", () => {
        window.soundFX.tap();
        if (customSelectedTables.has(t)) {
          if (customSelectedTables.size > 1) customSelectedTables.delete(t);
        } else {
          customSelectedTables.add(t);
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
      title: `Custom Practice (×${tables.join(", ×")})`,
      tables,
      timerSeconds: customTimerSec,
      streakLength: customStreakLen,
      baseGems: Math.round(customStreakLen * 3),
      unlockPetId: null
    });
  });

  function launchTrickyFactsSession() {
    window.soundFX.tap();
    const tricky = getTrickyFactsList(10);
    const customFactPairs = tricky.map((t) => ({ a: t.a, b: t.b }));
    const fallbackTables = [6, 7, 8, 9, 12];
    startGameSession({
      mode: "tricky",
      nodeId: null,
      title: "⚡ Tricky Facts Booster",
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

      const card = document.createElement("div");
      card.className = `pet-card ${isUnlocked ? "" : "locked"} ${isActive ? "active-companion" : ""}`;

      card.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center;">
          <span class="rarity-badge rarity-${pet.rarity}">${pet.rarity}</span>
          <div class="pet-avatar-circle" style="background:${pet.bg};">
            ${isUnlocked ? pet.emoji : "❓"}
          </div>
          <h3 class="pet-name">${isUnlocked ? pet.name : "???"}</h3>
          <p class="pet-species">${pet.species}</p>
          <p class="pet-bio">${isUnlocked ? pet.bio : "Beat Adventure levels or open Mystery Eggs in the Shop to hatch this friend!"}</p>
        </div>
        <div style="width:100%;">
          ${
            isUnlocked
              ? `<button class="btn-3d ${isActive ? "btn-purple" : "btn-white"}" style="width:100%; padding:8px 12px; font-size:0.88rem;" ${isActive ? "disabled" : ""}>
                  ${isActive ? "★ Active Companion" : "Pick as Companion"}
                </button>`
              : `<button class="btn-3d btn-white" style="width:100%; padding:8px 12px; font-size:0.84rem;" disabled>🔒 Locked</button>`
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
      const card = document.createElement("div");
      card.className = "shop-item-card";
      card.innerHTML = `
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div class="shop-icon">${item.icon}</div>
          <div style="flex:1;">
            <h3 style="margin:0 0 4px; font-size:1.08rem; font-weight:900;">${item.title}</h3>
            <p style="margin:0; font-size:0.85rem; color:var(--text-muted); font-weight:700;">${item.description}</p>
          </div>
        </div>
        <button class="btn-3d ${canAfford ? "btn-blue" : "btn-white"}" style="width:100%;" ${canAfford ? "" : "disabled"}>
          💎 Redeem for ${item.cost} Gems
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
          No Golden Coupons redeemed yet! Earn Gems in Streak Runs and redeem them above.
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
                ${cp.title} ${cp.used ? '<span style="color:#64748b; font-size:0.82rem;">(✓ Redeemed)</span>' : '<span style="color:#b45309; font-size:0.82rem;">(✨ Active Ticket)</span>'}
              </div>
              <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">
                Claimed by ${state.settings.playerName} on ${cp.dateStr}
              </div>
            </div>
          </div>
          <button class="btn-3d ${cp.used ? "btn-white" : "btn-orange"}" style="padding:8px 14px; font-size:0.85rem;">
            ${cp.used ? "Completed ✓" : "Mark Used (Parent)"}
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

    if (item.type === "egg") {
      // Find locked pets
      const lockedPets = window.GAME_DATA.pets.filter((p) => !state.unlockedPets.includes(p.id));
      if (lockedPets.length > 0) {
        const hatched = lockedPets[Math.floor(Math.random() * lockedPets.length)];
        state.unlockedPets.push(hatched.id);
        state.activePetId = hatched.id;
        popupContent.innerHTML = `
          <h2 style="font-size:1.7rem; font-weight:900; margin:0 0 8px;">🥚 Mystery Egg Hatched!</h2>
          <div class="hatched-pet-box">
            <span class="rarity-badge rarity-${hatched.rarity}">${hatched.rarity}</span>
            <div style="font-size:4.2rem; margin:8px 0;">${hatched.emoji}</div>
            <h3 style="margin:0; font-size:1.4rem; font-weight:900;">${hatched.name}</h3>
            <p style="margin:2px 0 8px; font-weight:800; color:var(--text-muted);">${hatched.species}</p>
            <p style="margin:0; font-size:0.92rem; font-weight:700;">${hatched.bio}</p>
          </div>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">Awesome! 🐾</button>
        `;
      } else {
        // All 24 pets already unlocked! Refund + bonus
        state.gems += 25;
        popupContent.innerHTML = `
          <h2 style="font-size:1.6rem; font-weight:900;">🌟 All 24 Pets Collected!</h2>
          <p style="font-weight:700;">${state.settings.playerName} has already unlocked every Magical Pet in the Sanctuary! Here are +25 Starlight Gems back!</p>
          <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">Yay!</button>
        `;
      }
    } else {
      const nowStr = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      const coupon = {
        id: "cp_" + Date.now(),
        title: item.title,
        icon: item.icon,
        cost: item.cost,
        dateStr: nowStr,
        used: false
      };
      state.coupons.unshift(coupon);

      popupContent.innerHTML = `
        <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7); border:3px solid #f59e0b; border-radius:22px; padding:20px; margin-bottom:16px;">
          <div style="font-size:0.85rem; font-weight:900; color:#b45309; text-transform:uppercase; letter-spacing:1px;">
            ✨ Official Golden Reward Coupon ✨
          </div>
          <div style="font-size:4rem; margin:10px 0;">${item.icon}</div>
          <h2 style="margin:0 0 6px; font-size:1.5rem; font-weight:900; color:#78350f;">${item.title}</h2>
          <p style="margin:0; font-weight:800; color:#92400e;">Earned by ${state.settings.playerName} • ${nowStr}</p>
        </div>
        <p style="font-weight:800; color:var(--text-muted); margin-bottom:16px;">
          Show this Golden Coupon to Mum or Dad! It is saved in your Shop Coupon list.
        </p>
        <button class="btn-3d btn-green" id="btn-close-reward-popup" style="width:100%;">🎉 Keep Golden Coupon</button>
      `;
    }

    saveState();
    renderHUD();
    renderShop();
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
        <div class="kpi-label">Questions Answered</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-green-dark);">${overallAcc}%</div>
        <div class="kpi-label">Overall Accuracy</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-orange-dark);">${overallAvgSec}</div>
        <div class="kpi-label">Avg Response Speed</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:var(--duo-purple-dark);">${masteredFactsCount} / 144</div>
        <div class="kpi-label">12×12 Facts Strong/Mastered</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color:#e11d48;">🏆 ${totalRunsCompleted}</div>
        <div class="kpi-label">Streaks Conquered</div>
      </div>
    `;

    // 2. Render Top Tricky Facts Pills
    const trickyList = getTrickyFactsList(6);
    const trickyContainer = document.getElementById("tricky-facts-pills");
    trickyContainer.innerHTML = "";
    if (trickyList.length === 0) {
      trickyContainer.innerHTML = `<span style="color:var(--text-muted); font-weight:700;">No tricky facts flagged yet—play a few rounds and any missed or slow facts will appear here automatically!</span>`;
    } else {
      trickyList.forEach((item) => {
        const pill = document.createElement("div");
        pill.className = "stat-pill";
        pill.style.background = "#fff1f2";
        pill.style.borderColor = "#fda4af";
        pill.style.color = "#9f1239";
        pill.innerHTML = `
          <span><strong>${item.a} × ${item.b} = ${item.a * item.b}</strong></span>
          <span style="font-size:0.8rem; opacity:0.85;">(${item.accuracy}% acc • ${(item.avgMs / 1000).toFixed(1)}s • ${item.misses} miss)</span>
        `;
        trickyContainer.appendChild(pill);
      });
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
    for (let t = 1; t <= 12; t++) {
      let strongOrGold = 0;
      let tableAttempts = 0;
      let tableTimeMs = 0;
      let tableCorrect = 0;

      for (let b = 1; b <= 12; b++) {
        const m = evaluateFactMastery(t, b);
        if (m.status === "gold" || m.status === "green") strongOrGold++;
        const st = state.factStats[getFactKey(t, b)];
        if (st && st.attempts > 0) {
          tableAttempts += st.attempts;
          tableTimeMs += st.totalTimeMs;
          tableCorrect += st.correct;
        }
      }

      const pct = Math.round((strongOrGold / 12) * 100);
      const avgSec = tableAttempts > 0 ? `${(tableTimeMs / tableAttempts / 1000).toFixed(1)}s` : "—";
      const accPct = tableAttempts > 0 ? `${Math.round((tableCorrect / tableAttempts) * 100)}%` : "—";

      const row = document.createElement("div");
      row.className = "table-stat-row";
      row.innerHTML = `
        <div class="table-stat-header">
          <span>×${t} Times Table</span>
          <span style="color:var(--text-muted);">${strongOrGold}/12 mastered • Acc: ${accPct} • Avg: ${avgSec}</span>
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
      runsContainer.innerHTML = `<p style="color:var(--text-muted); font-weight:700; margin:0;">No streak runs completed yet—start an Adventure level to see run logs here!</p>`;
    } else {
      runsContainer.innerHTML = state.recentRuns
        .slice(0, 12)
        .map(
          (r) => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid var(--border-light); font-weight:800; font-size:0.9rem; flex-wrap:wrap; gap:8px;">
            <div>
              <span>🏆 ${r.title}</span>
              <span style="color:var(--text-muted); font-size:0.8rem; margin-left:6px;">(${r.streakLength} in a row • ${r.timerSeconds}s timer)</span>
            </div>
            <div style="display:flex; gap:12px; color:var(--text-muted); font-size:0.84rem;">
              <span>⚡ Avg: ${(r.avgMs / 1000).toFixed(2)}s</span>
              <span>🔄 Resets: ${r.resets}</span>
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
    if (!st || st.attempts === 0) {
      banner.innerHTML = `
        <div>
          <strong>${a} × ${b} = ${a * b}</strong> — Not practiced yet!
        </div>
        <button class="btn-3d btn-blue" style="padding:7px 14px; font-size:0.85rem;" id="btn-drill-this-fact">
          Practice ×${a} Table Now
        </button>
      `;
    } else {
      const acc = Math.round((st.correct / st.attempts) * 100);
      const avgSec = (st.totalTimeMs / st.attempts / 1000).toFixed(2);
      const bestSec = st.bestTimeMs ? (st.bestTimeMs / 1000).toFixed(2) + "s" : "—";
      banner.innerHTML = `
        <div>
          <strong>${a} × ${b} = ${a * b}</strong> •
          Seen <strong>${st.attempts}</strong> times •
          Accuracy: <strong>${acc}%</strong> (${st.correct}✓, ${st.wrong}✗, ${st.timeouts}⏱️) •
          Avg Speed: <strong>${avgSec}s</strong> (Fastest: ${bestSec})
        </div>
        <button class="btn-3d btn-blue" style="padding:7px 14px; font-size:0.85rem;" id="btn-drill-this-fact">
          Practice ×${a} &amp; ×${b}
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
          title: `Focused Drill (×${tables.join(", ×")})`,
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
  // CORE STREAK GAMEPLAY ENGINE (3-Second Timer + Reset to 0)
  // =========================================================
  let currentSession = null;
  let timerAnimId = null;

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

    // Shuffle pool and take 3 distractors
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

  function pickNextQuestion(session) {
    // 1. Check if any missed fact in retryQueue is ready to be tested again
    if (session.retryQueue.length > 0 && session.questionsSinceLastRetry >= 1) {
      const nextRetry = session.retryQueue.shift();
      session.questionsSinceLastRetry = 0;
      return nextRetry;
    }

    // 2. Build candidate pool from session tables or customFactPairs
    const pool = [];
    if (session.customFactPairs && session.customFactPairs.length > 0) {
      session.customFactPairs.forEach((pair) => pool.push({ a: pair.a, b: pair.b }));
    }
    session.tables.forEach((t) => {
      for (let b = 1; b <= 12; b++) {
        // Randomly present as t × b or b × t so she recognizes both orders
        if (Math.random() < 0.75) {
          pool.push({ a: t, b });
        } else {
          pool.push({ a: b, b: t });
        }
      }
    });

    // Filter out the exact last question so it doesn't repeat back-to-back
    const filtered = pool.filter(
      (q) => !session.lastQuestion || !(q.a === session.lastQuestion.a && q.b === session.lastQuestion.b)
    );
    const source = filtered.length > 0 ? filtered : pool;
    const chosen = source[Math.floor(Math.random() * source.length)];
    session.questionsSinceLastRetry += 1;
    return chosen;
  }

  function startGameSession(config) {
    checkDailyStreak();
    renderHUD();

    currentSession = {
      ...config,
      currentStreak: 0,
      resets: 0,
      retryQueue: [],
      questionsSinceLastRetry: 0,
      lastQuestion: null,
      currentQuestion: null,
      questionStartTime: 0,
      streakResponseTimesMs: [],
      isLocked: false,
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
    bubble.textContent = `Let's go, ${state.settings.playerName}! Get ${currentSession.streakLength} in a row to open the Treasure Chest!`;

    document.getElementById("game-mode-footer").textContent =
      `${currentSession.title} • ⏱️ ${currentSession.timerSeconds}s Timer • Goal: ${currentSession.streakLength} in a row`;

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

  function dealNextQuestion() {
    if (!currentSession) return;
    stopTimerLoop();

    const q = pickNextQuestion(currentSession);
    currentSession.currentQuestion = q;
    currentSession.lastQuestion = q;
    currentSession.isLocked = false;
    currentSession.lowTimeTickPlayed = false;

    const card = document.getElementById("game-problem-card");
    card.className = "problem-card";

    document.getElementById("game-equation").textContent = `${q.a} × ${q.b} = ?`;
    document.getElementById("game-sub-hint").textContent =
      currentSession.currentStreak === 0
        ? "Tap the matching answer!"
        : `🔥 ${currentSession.currentStreak} in a row! Keep going!`;

    const choices = generateSmartChoices(q.a, q.b);
    currentSession.currentChoices = choices;

    const buttons = document.querySelectorAll("#game-choices-grid .choice-btn");
    buttons.forEach((btn, idx) => {
      btn.className = "choice-btn";
      btn.disabled = false;
      btn.textContent = choices[idx];
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

  function handleAnswerSelection(choiceIdx, isTimeout = false) {
    if (!currentSession || currentSession.isLocked) return;
    currentSession.isLocked = true;
    stopTimerLoop();

    const elapsedMs = performance.now() - currentSession.questionStartTime;
    const { a, b } = currentSession.currentQuestion;
    const correctAns = a * b;
    const selectedVal = choiceIdx >= 0 ? currentSession.currentChoices[choiceIdx] : null;
    const isCorrect = !isTimeout && selectedVal === correctAns;

    // Record metrics for this fact
    recordFactOutcome(a, b, isCorrect, isTimeout, elapsedMs);

    const buttons = document.querySelectorAll("#game-choices-grid .choice-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (currentSession.currentChoices[idx] === correctAns) {
        btn.classList.add("choice-correct");
      } else if (idx === choiceIdx && !isCorrect) {
        btn.classList.add("choice-wrong");
      }
    });

    const card = document.getElementById("game-problem-card");
    const bubble = document.getElementById("stage-speech-bubble");
    const pet = getActivePet();

    if (isCorrect) {
      currentSession.currentStreak += 1;
      currentSession.streakResponseTimesMs.push(elapsedMs);
      window.soundFX.correct(currentSession.currentStreak);

      card.classList.add("correct-flash");
      document.getElementById("game-equation").textContent = `${a} × ${b} = ${correctAns}`;
      document.getElementById("game-sub-hint").textContent =
        `⚡ ${(elapsedMs / 1000).toFixed(2)}s! Great job!`;

      const quote = pet.cheerQuotes[currentSession.currentStreak % pet.cheerQuotes.length];
      bubble.className = "speech-bubble";
      bubble.textContent = quote;

      updateStreakBarUI(false);

      // Did Jemima reach the end of the streak?
      if (currentSession.currentStreak >= currentSession.streakLength) {
        setTimeout(() => {
          triggerStreakVictory();
        }, 380);
      } else {
        setTimeout(() => {
          dealNextQuestion();
        }, 340);
      }
    } else {
      // WRONG OR TIME OUT -> Show right answer & reset back to the beginning (0)!
      window.soundFX.reset();
      currentSession.resets += 1;
      currentSession.currentStreak = 0;
      currentSession.streakResponseTimesMs = [];

      // Queue this missed fact so she conquers it in the fresh run
      const alreadyQueued = currentSession.retryQueue.some((q) => q.a === a && q.b === b);
      if (!alreadyQueued) {
        currentSession.retryQueue.push({ a, b });
      }

      card.classList.add("wrong-shake");
      document.getElementById("game-equation").textContent = `${a} × ${b} = ${correctAns}`;
      document.getElementById("game-sub-hint").textContent = isTimeout
        ? `⏰ Time's up! Remember: ${a} × ${b} = ${correctAns}`
        : `💡 Remember: ${a} × ${b} = ${correctAns}`;

      bubble.className = "speech-bubble reset-bubble";
      bubble.textContent = isTimeout
        ? `Time ran out, ${state.settings.playerName}! ${a} × ${b} = ${correctAns} — Back to 0, let's go again!`
        : `Almost, ${state.settings.playerName}! ${a} × ${b} = ${correctAns} — Back to the start, you've got this!`;

      updateStreakBarUI(true);

      setTimeout(() => {
        if (!currentSession) return;
        bubble.className = "speech-bubble";
        bubble.textContent = `Fresh start, ${state.settings.playerName}! Let's get all ${currentSession.streakLength}!`;
        dealNextQuestion();
      }, Number(state.settings.teachingPauseMs) || 1700);
    }
  }

  // Bind multiple choice buttons
  document.querySelectorAll("#game-choices-grid .choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      handleAnswerSelection(idx, false);
    });
  });

  // Keyboard shortcuts (1, 2, 3, 4) for desktop testing
  window.addEventListener("keydown", (e) => {
    if (!currentSession || currentSession.isLocked) return;
    if (["1", "2", "3", "4"].includes(e.key)) {
      handleAnswerSelection(Number(e.key) - 1, false);
    }
  });

  document.getElementById("btn-quit-game").addEventListener("click", () => {
    window.soundFX.tap();
    stopTimerLoop();
    currentSession = null;
    document.getElementById("game-overlay").classList.remove("active");
    renderHUD();
    renderAdventureMap();
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

    currentSession.computedReward = {
      avgMs,
      totalGemsEarned,
      starsEarned: timerMode.stars
    };

    document.getElementById("victory-title").textContent =
      currentSession.resets === 0 ? `Flawless Streak, ${state.settings.playerName}! 🎉` : `Streak Complete! 🎉`;
    document.getElementById("victory-subtitle").textContent =
      currentSession.resets === 0
        ? `${currentSession.streakLength} in a row with ZERO resets!`
        : `${state.settings.playerName} conquered all ${currentSession.streakLength} in a row!`;

    document.getElementById("chest-unopened-view").style.display = "block";
    document.getElementById("chest-opened-view").style.display = "none";
    document.getElementById("victory-modal").classList.add("active");
  }

  document.getElementById("btn-open-chest").addEventListener("click", () => {
    if (!currentSession || !currentSession.computedReward) return;
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
      petContainer.style.display = "block";
      petContainer.innerHTML = `
        <div class="hatched-pet-box">
          <div style="font-size:0.8rem; font-weight:900; color:#6b21a8; text-transform:uppercase;">
            🐾 New Magical Pet Unlocked!
          </div>
          <div style="font-size:3.8rem; margin:6px 0;">${unlockedPetObj.emoji}</div>
          <h3 style="margin:0; font-size:1.3rem; font-weight:900;">${unlockedPetObj.name} (${unlockedPetObj.species})</h3>
          <p style="margin:4px 0 0; font-size:0.88rem; font-weight:700;">${unlockedPetObj.bio}</p>
        </div>
      `;
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

    document.getElementById("victory-gems-earned").textContent = `+${totalGemsEarned} Gems`;
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
    renderAdventureMap();
  });

  // =========================================================
  // PARENT SETTINGS & REWARD CUSTOMIZATION MODAL
  // =========================================================
  function openParentModal() {
    window.soundFX.tap();
    document.getElementById("parent-input-name").value = state.settings.playerName;
    document.getElementById("parent-select-streak").value = String(state.settings.defaultStreakLength);
    document.getElementById("parent-select-timer").value = String(state.settings.defaultTimerSeconds);
    document.getElementById("parent-select-pause").value = String(state.settings.teachingPauseMs || 1700);
    renderParentRewardsList();
    document.getElementById("parent-modal").classList.add("active");
  }

  function renderParentRewardsList() {
    const container = document.getElementById("parent-rewards-manage-list");
    container.innerHTML = "";
    state.shopRewards.forEach((r, idx) => {
      if (r.type === "egg") return; // keep Mystery Egg permanent
      const row = document.createElement("div");
      row.style.cssText =
        "display:flex; justify-content:space-between; align-items:center; padding:6px 10px; background:var(--bg-main); border-radius:10px; margin-bottom:6px; font-weight:800; font-size:0.88rem;";
      row.innerHTML = `
        <span>${r.icon} ${r.title} (💎 ${r.cost})</span>
        <button class="btn-3d btn-white" style="padding:4px 10px; font-size:0.78rem;" data-del="${idx}">Remove</button>
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
    state.settings.defaultStreakLength = Number(document.getElementById("parent-select-streak").value) || 10;
    state.settings.defaultTimerSeconds = Number(document.getElementById("parent-select-timer").value) || 3;
    state.settings.teachingPauseMs = Number(document.getElementById("parent-select-pause").value) || 1700;
    customStreakLen = state.settings.defaultStreakLength;
    customTimerSec = state.settings.defaultTimerSeconds;
    saveState();
    renderHUD();
    renderAdventureMap();
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
  // INITIALIZE APP ON LOAD
  // =========================================================
  checkDailyStreak();
  renderHUD();
  renderAdventureMap();
})();
