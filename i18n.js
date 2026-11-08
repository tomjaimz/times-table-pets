// Comprehensive Bilingual Localization Engine: English (en) & Swedish / Svenska (sv)
// Default: English ("en"), switchable anytime via Startup Prompt, HUD toggle, or Parent Settings.

(function () {
  const STRINGS = {
    en: {
      // HUD & Navigation
      academyTitle: "{name}'s Magical Pet Academy",
      navAdventure: "Adventure",
      navPractice: "Practice",
      navPets: "Pets",
      navShop: "Shop",
      navStats: "Metrics",

      // Welcome / Onboarding Modal
      welcomeTitle: "Welcome to Magical Pet Academy!",
      welcomeSub: "Quick 10-second setup before the times table adventure begins:",
      welcomeLangLabel: "🌍 Choose Language / Välj språk",
      welcomeNameLabel: "1️⃣ What is the player's name?",
      welcomeNamePlaceholder: "Enter child's first name...",
      welcomeNamePreview: "🦉 Pippin the Owl will cheer for <strong>{name}</strong>!",
      welcomeSpeedLabel: "2️⃣ Default Countdown Speed",
      welcomeSpeed3: "⚡ 3 Seconds — Blitz Mode (2× Gems)",
      welcomeSpeed5: "⭐ 5 Seconds — Fast Mode (1.5× Gems)",
      welcomeSpeed8: "🌱 8 Seconds — Warmup Mode (1× Gems)",
      welcomeStartBtn: "🚀 Start Playing Now (No Login Needed)",
      welcomeStartSub: "Progress saves automatically on this device. You can always link an email later!",
      welcomeCloudTitle: "☁️ Want to Sync Across Devices?",
      welcomeOptional: "(Optional)",
      welcomeCloudSub: "Parents can sign in with a free Magic Email Link to sync progress between iPad & phone.",
      welcomeParentLoginBtn: "✉️ Parent Login",

      // Lobby & Stickers (Kid-Minimal)
      lobbyTitle: "🏡 {name}",
      lobbyStickersBadge: "✨ {unlocked} / {total}",
      btnDecorate: "🎨 Stickers",
      btnDoneDecorating: "✓ Done",
      lobbyDragHint: "👆 Drag!",
      toolbarSelected: "{emoji} {name}",
      btnBigger: "➕",
      btnSmaller: "➖",
      btnFlip: "↔️",
      btnRemove: "🗑️",
      drawerBackdropLabel: "🖼️",
      drawerStickerLabel: "✨ Stickers:",
      btnMysterySticker: "🎁 +1 (💎 25)",
      btnAllStickersUnlocked: "🌟 24 / 24!",
      stkPlace: "➕",

      // Adventure Map (Kid-Minimal)
      speedSelectorTitle: "⏱️ {streak} Qs:",
      speed3Main: "⚡ 3s",
      speed5Main: "⭐ 5s",
      speed8Main: "🌱 8s",
      unlocksPet: "🥚 {emoji} {name}",
      unlockedPetTag: "✓ {emoji} {name}",
      bestSpeed: "⚡ {sec}s",
      btnPlay: "Play ▶",

      // Practice Tab (Kid-Minimal)
      trickyBoosterTitle: "⚡ Tricky Facts",
      trickyBoosterEmpty: "6×, 7×, 8×, 9×, 12×",
      trickyBoosterFound: "🎯 {list}",
      btnPracticeTricky: "🎯 Play ▶",
      customRunTitle: "🎛️ Custom Run",
      customRunSub: "",
      btnSelectAll: "1–12",
      btnSelectHard: "🔥 6, 7, 8, 9, 12",
      btnClear: "✕",
      tableBtnTitle: "×{t}",
      tableBtnSub: "{count}/12 ⭐",
      customTimeLimitLabel: "⏱️ Speed",
      customTime3: "⚡ 3s",
      customTime5: "⭐ 5s",
      customTime8: "🌱 8s",
      customStreakLabel: "🏁 Goal",
      customStreak10Default: "10",
      customStyleLabel: "🧩 Style",
      styleStandard: "7 × 8 = ?",
      styleMix: "✨ Mix",
      styleMystery: "7 × ❓ = 56",
      btnLaunchCustom: "🚀 Play ▶",
      customPracticeSessionTitle: "×{tables}",
      focusedDrillSessionTitle: "×{tables}",

      // Pets Tab (Kid-Minimal)
      petsTitle: "🐾 Pets",
      petsSub: "",
      petsUnlockedLabel: "🐾",
      petLockedBio: "🔒",
      btnActiveCompanion: "★ Active",
      btnPickCompanion: "Pick",
      btnLocked: "🔒",
      rarityCommon: "Common",
      rarityRare: "Rare",
      rarityEpic: "Epic",
      rarityMythic: "Mythic",

      // Shop Tab & Reward Popups (Kid-Minimal)
      shopTitle: "🎁 Shop",
      shopSub: "",
      btnEditRewardsParent: "⚙️ Parent",
      btnRedeemFor: "💎 {cost}",
      couponsTitle: "🎟️ Coupons",
      couponsSub: "",
      noCouponsYet: "🎟️ —",
      couponRedeemedTag: "✓",
      couponActiveTag: "✨",
      couponClaimedBy: "{name} • {date}",
      btnCompleted: "✓",
      btnMarkUsed: "Use (Parent)",
      popupStickerOpenedTitle: "✨ New Sticker!",
      popupStickerOpenedSub: "🏡 Added to {name}'s room!",
      popupStickerAwesomeBtn: "Yay! 🎨",
      popupAllStickersTitle: "🌟 All 24!",
      popupAllStickersSub: "+25 💎",
      popupEggHatchedTitle: "🥚 New Pet!",
      popupEggAwesomeBtn: "Yay! 🐾",
      popupAllPetsTitle: "🌟 All 24!",
      popupAllPetsSub: "+25 💎",
      popupYayBtn: "Yay!",
      popupCouponHeader: "✨ Golden Coupon ✨",
      popupCouponEarnedBy: "{name} • {date}",
      popupCouponSub: "🎟️ Show to Mum or Dad!",
      popupKeepCouponBtn: "🎉 Keep",

      // Stats / Metrics Tab (Kid-Minimal)
      kpiQuestionsAnswered: "Solved",
      kpiOverallAccuracy: "Accuracy",
      kpiAvgSpeed: "Speed",
      kpiFactsMastered: "Mastered",
      kpiStreaksConquered: "Runs",
      statsTrickyTitle: "🎯 Tricky Facts",
      statsTrickySub: "",
      btnDrillTricky: "⚡ Play ▶",
      noTrickyYet: "🌟 None yet!",
      trickyPillStats: "({acc}% • {sec}s)",
      heatmapTitle: "🗺️ 12×12 Map",
      heatmapSub: "",
      legendGold: "👑 <2.2s",
      legendGreen: "🟢 <3.5s",
      legendYellow: "🟡",
      legendRed: "🔴",
      legendNone: "⚪",
      heatmapTapHint: "👆 Tap any square!",
      factNotPracticedYet: "⚪",
      factDetailStats: "<strong>{attempts}×</strong> • <strong>{acc}%</strong> ({correct}✓ {wrong}✗) • ⚡ <strong>{avgSec}s</strong>",
      btnPracticeSingleTable: "▶ ×{a}",
      btnPracticeTwoTables: "▶ ×{a} & ×{b}",
      perTableTitle: "📈 Tables (×1 – ×12)",
      perTableSub: "",
      perTableRowTitle: "×{t}",
      perTableRowStats: "{strong}/12 ⭐ • {acc} • {avg}",
      recentRunsTitle: "📜 History",
      recentRunsSub: "",
      noRunsYet: "—",
      runRowMeta: "({streak} Qs • {timer}s)",
      runRowAvg: "⚡ {sec}s",
      runRowResets: "🔄 {resets}",

      // Gameplay Stage (Kid-Minimal: 1–4 words + icons!)
      gameInitialSpeech: "🚀 Go, {name}!",
      gameModeFooter: "{title} • ⏱️ {timer}s • 🏁 {streak}",
      gameSubHintStart: "👆 Tap!",
      gameSubHintStreak: "🔥 {streak}",
      gameSubHintMystery: "🌟 Bonus (+3 💎)",
      gameCorrectSpeed: "⚡ {sec}s!",
      gameBonusCorrectSpeed: "🌟 +3 💎 ({sec}s)!",
      gameTapGreenHint: "👆 Tap green {ans}",
      gameTimeoutBubbleTap: "{eq} 🔄 Fresh start!",
      gameWrongBubbleTap: "{eq} 🔄 Fresh start!",
      gameTimeoutSubAuto: "⏰ {eq}",
      gameWrongSubAuto: "💡 {eq}",
      gameTimeoutBubbleAuto: "{eq} 🔄 Fresh start!",
      gameWrongBubbleAuto: "{eq} 🔄 Fresh start!",
      gameRetryLaterBubbleTap: "{eq} 🔄 Retry at end!",
      gameRetryLaterBubbleAuto: "{eq} 🔄 Retry at end!",
      gameRetryLaterSubHint: "🔄 Retry at end ({missCount}/3) • 👆 Tap {ans}",
      gameBonusMissBubbleTap: "{eq} 🌟 Free bonus!",
      gameBonusMissBubbleAuto: "{eq} 🌟 Free bonus!",
      gameBonusMissSubHint: "🌟 No penalty • 👆 Tap {ans}",
      gameKeepGoingBubble: "🔥 {current} / {streak}!",
      gameFreshStartBubble: "🚀 Go, {name}!",
      badgeSpaced1: "🔄 Review",
      badgeTwin: "🪞 {b} × {a}",
      badgeBoss: "👑 Boss!",
      badgeRetry: "🔄 Review",
      badgeEndRetry: "🔄 Retry ({tryNum}/3)",
      badgeAnchor: "⚓ Tip",
      badgeMystery: "🌟 Bonus (+3 💎)",

      // Expandable "For Parents" Boxes
      parentInfoAdventureSum: "ℹ️ For Parents: How Levels, Retries & Bonus Questions Work",
      parentInfoAdventureBody:
        "<p>• <strong>End-of-Run Retry (3-Strikes Rule):</strong> Missing a standard question does <em>not</em> reset the run! It moves to the end of the run so {name} can retry it. Only 3 misses on the <em>exact same fact</em> resets the run.</p><p>• <strong>🌟 Bonus Questions (<code>7 × ❓ = 56</code>):</strong> Award <strong>+3 Bonus Gems</strong> if right, and have <strong>zero penalty</strong> if missed.</p><p>• <strong>Timer Speeds:</strong> 8s = 1★ (1× Gems), 5s = 2★ (1.5× Gems), 3s = 3★ (2× Gems). Beating a level unlocks its Pet!</p>",
      parentInfoTrickySum: "ℹ️ For Parents: Tricky Facts Booster",
      parentInfoTrickyBody:
        "Automatically selects the multiplication facts {name} has missed or answered slowly so she can conquer them without having to configure anything.",
      parentInfoCustomSum: "ℹ️ For Parents: Custom Practice Options",
      parentInfoCustomBody:
        "Tap any combination of times tables (1–12), choose the countdown timer speed, and pick whether to include Bonus Mystery Factor questions (<code>7 × ❓ = 56</code>).",
      parentInfoPetsSum: "ℹ️ For Parents: Unlocking & Choosing Pets",
      parentInfoPetsBody:
        "16 pets unlock by beating each level on the Adventure Map, and 8 bonus pets hatch from Mystery Eggs in the Shop. Tap any unlocked pet to make it {name}'s active companion.",
      parentInfoShopSum: "ℹ️ For Parents: Gems, Eggs & Family Reward Coupons",
      parentInfoShopBody:
        "Gems earned from completing runs can buy Lobby Stickers, Mystery Pet Eggs, or real-life Golden Coupons (like extra screen time or choosing a movie). Use <strong>⚙️ Parent</strong> to add or edit custom family rewards.",
      parentInfoStatsSum: "ℹ️ For Parents: Reading the 12×12 Mastery Heatmap",
      parentInfoStatsBody:
        "Tap any square in the 12×12 grid to see exact accuracy and speed. 👑 <strong>Mastered</strong> requires ≥90% accuracy under 2.2s; 🟢 <strong>Strong</strong> requires ≥80% accuracy under 3.5s.",
      gameParentInfoSum: "ℹ️ For Parents: Why This Tip Appeared",
      gameParentInfoRetryNote:
        "<strong>End-of-Run Retry ({missCount}/3 misses on this fact):</strong> {name}'s streak is safe! This question was added to the end of the run to try again. Only 3 misses on the same fact resets the run.",
      gameParentInfoResetNote:
        "<strong>3rd Miss on Same Fact:</strong> Because this specific fact was missed 3 times in this run, the streak resets to 0 with spaced review.",
      gameParentInfoBonusNote:
        "<strong>Bonus Mystery Factor Question:</strong> Missing a bonus question has zero penalty and is not counted as a fail.",

      // Victory Modal (Kid-Minimal)
      victoryFlawlessTitle: "🎉 You Did It, {name}!",
      victoryCompleteTitle: "🎉 You Did It!",
      victoryFlawlessSub: "⭐ {streak} / {streak}!",
      victoryCompleteSub: "⭐ {streak} / {streak}!",
      victoryTapChestHint: "👆 Tap the chest!",
      victoryGemsEarned: "+{gems} 💎",
      victoryAvgLabel: "⚡",
      victoryNewPetHeader: "🐾 New Pet!",
      victoryNewStickerHeader: "🎨 New Sticker!",
      victoryPlacedInLobby: "🏡 In your room!",
      btnPlayAgain: "🔄 Again",
      btnContinueAdventure: "🗺️ Map",

      // Parent Modal
      parentModalTitle: "⚙️ Parent Settings & Fine-Tuning",
      parentNameLabel: "Child's Name (Displayed in Title & Pet Cheers)",
      parentLangLabel: "🌍 Language / Språk",
      parentStreakLabel: "Default Streak Length (Questions in a Row)",
      parentTimerLabel: "Default Timer Speed",
      parentRecoveryLabel: "After a Miss (Error Recovery Mode)",
      parentRecoveryTap: "👆 Tap Correct Answer to Continue (Recommended)",
      parentRecoveryTimer: "⏱️ Auto-Continue After Pause",
      parentStyleLabel: "Question Style (Adventure Mode)",
      parentPauseLabel: "Auto-Pause Speed (if Auto-Continue used)",
      parentBoostLabel: "Award Bonus Gems (Parent Boost)",
      parentGrantGemsBtn: "💎 Grant +50 Gems to {name}",
      parentAddCouponHeading: "🎟️ Add Custom Shop Reward Coupon",
      parentAddCouponPlaceholder: "e.g., 15 Mins Extra Screen Time",
      parentAddCouponBtn: "➕ Add Reward to {name}'s Shop",
      btnRemoveReward: "Remove",
      btnOpenCloudFromParent: "☁️ Multi-Device Cloud Login",
      btnExportData: "📋 Export Backup JSON",
      btnSaveParent: "💾 Save Settings",

      // Cloud Modal
      cloudModalTitle: "☁️ Parent Account & Cloud Sync",
      cloudModalSub: "Link your parent email via a free Magic Login Link so Gems, Pets, Stickers, Coupons, and 12×12 Mastery sync automatically across iPad, phone, and laptop. Once linked, this device stays signed in permanently.",
      cloudEmailLabel: "Parent Email Address (for Free Magic Login Link)",
      btnSendMagicLink: "✉️ Send Magic Link",
      cloudOrGoogle: "— or instant 1-tap sign in —",
      btnGoogleSignin: "🔑 Sign in with Google Account",
      cloudLinkedHeader: "✅ Permanently Linked Parent Account",
      cloudSecurityNote: "🔒 Protected by per-account Firebase Security Rules (auth.uid). Only devices logged into your email can read or update your data.",
      btnSyncNow: "🔄 Sync Now",
      btnSendLinkOtherDevice: "📱 Send Magic Link to Another Device",
      btnSignOut: "Sign Out"
    },

    sv: {
      // HUD & Navigation
      academyTitle: "{name}s Magiska Djurakademi",
      navAdventure: "Äventyr",
      navPractice: "Öva",
      navPets: "Husdjur",
      navShop: "Butik",
      navStats: "Statistik",

      // Welcome / Onboarding Modal
      welcomeTitle: "Välkommen till Magiska Djurakademin!",
      welcomeSub: "Snabb inställning innan multiplikationsäventyret börjar:",
      welcomeLangLabel: "🌍 Välj språk / Choose Language",
      welcomeNameLabel: "1️⃣ Vad heter spelaren?",
      welcomeNamePlaceholder: "Skriv barnets förnamn...",
      welcomeNamePreview: "🦉 Ugglan Pippin kommer att heja på <strong>{name}</strong>!",
      welcomeSpeedLabel: "2️⃣ Standardtid per fråga",
      welcomeSpeed3: "⚡ 3 sekunder — Blixtläge (2× Ädelstenar)",
      welcomeSpeed5: "⭐ 5 sekunder — Snabbt läge (1.5× Ädelstenar)",
      welcomeSpeed8: "🌱 8 sekunder — Lugnt läge (1× Ädelstenar)",
      welcomeStartBtn: "🚀 Börja spela nu (Ingen inloggning krävs)",
      welcomeStartSub: "Framsteg sparas automatiskt på den här enheten. Du kan alltid koppla e-post senare!",
      welcomeCloudTitle: "☁️ Vill du synka mellan enheter?",
      welcomeOptional: "(Valfritt)",
      welcomeCloudSub: "Föräldrar kan logga in med en gratis magisk e-postlänk för att synka mellan iPad och mobil.",
      welcomeParentLoginBtn: "✉️ Föräldrainloggning",

      // Lobby & Stickers (Kid-Minimal)
      lobbyTitle: "🏡 {name}",
      lobbyStickersBadge: "✨ {unlocked} / {total}",
      btnDecorate: "🎨 Klistermärken",
      btnDoneDecorating: "✓ Klar",
      lobbyDragHint: "👆 Dra!",
      toolbarSelected: "{emoji} {name}",
      btnBigger: "➕",
      btnSmaller: "➖",
      btnFlip: "↔️",
      btnRemove: "🗑️",
      drawerBackdropLabel: "🖼️",
      drawerStickerLabel: "✨ Klistermärken:",
      btnMysterySticker: "🎁 +1 (💎 25)",
      btnAllStickersUnlocked: "🌟 24 / 24!",
      stkPlace: "➕",

      // Adventure Map (Kid-Minimal)
      speedSelectorTitle: "⏱️ {streak} st:",
      speed3Main: "⚡ 3s",
      speed5Main: "⭐ 5s",
      speed8Main: "🌱 8s",
      unlocksPet: "🥚 {emoji} {name}",
      unlockedPetTag: "✓ {emoji} {name}",
      bestSpeed: "⚡ {sec}s",
      btnPlay: "Spela ▶",

      // Practice Tab (Kid-Minimal)
      trickyBoosterTitle: "⚡ Kluriga tal",
      trickyBoosterEmpty: "6×, 7×, 8×, 9×, 12×",
      trickyBoosterFound: "🎯 {list}",
      btnPracticeTricky: "🎯 Spela ▶",
      customRunTitle: "🎛️ Egen runda",
      customRunSub: "",
      btnSelectAll: "1–12",
      btnSelectHard: "🔥 6, 7, 8, 9, 12",
      btnClear: "✕",
      tableBtnTitle: "×{t}",
      tableBtnSub: "{count}/12 ⭐",
      customTimeLimitLabel: "⏱️ Tid",
      customTime3: "⚡ 3s",
      customTime5: "⭐ 5s",
      customTime8: "🌱 8s",
      customStreakLabel: "🏁 Mål",
      customStreak10Default: "10",
      customStyleLabel: "🧩 Stil",
      styleStandard: "7 × 8 = ?",
      styleMix: "✨ Mix",
      styleMystery: "7 × ❓ = 56",
      btnLaunchCustom: "🚀 Spela ▶",
      customPracticeSessionTitle: "×{tables}",
      focusedDrillSessionTitle: "×{tables}",

      // Pets Tab (Kid-Minimal)
      petsTitle: "🐾 Husdjur",
      petsSub: "",
      petsUnlockedLabel: "🐾",
      petLockedBio: "🔒",
      btnActiveCompanion: "★ Aktiv",
      btnPickCompanion: "Välj",
      btnLocked: "🔒",
      rarityCommon: "Vanlig",
      rarityRare: "Sällsynt",
      rarityEpic: "Episk",
      rarityMythic: "Mytisk",

      // Shop Tab & Reward Popups (Kid-Minimal)
      shopTitle: "🎁 Butik",
      shopSub: "",
      btnEditRewardsParent: "⚙️ Förälder",
      btnRedeemFor: "💎 {cost}",
      couponsTitle: "🎟️ Kuponger",
      couponsSub: "",
      noCouponsYet: "🎟️ —",
      couponRedeemedTag: "✓",
      couponActiveTag: "✨",
      couponClaimedBy: "{name} • {date}",
      btnCompleted: "✓",
      btnMarkUsed: "Använd (Förälder)",
      popupStickerOpenedTitle: "✨ Nytt klistermärke!",
      popupStickerOpenedSub: "🏡 I {name}s rum!",
      popupStickerAwesomeBtn: "Jippie! 🎨",
      popupAllStickersTitle: "🌟 Alla 24!",
      popupAllStickersSub: "+25 💎",
      popupEggHatchedTitle: "🥚 Nytt husdjur!",
      popupEggAwesomeBtn: "Jippie! 🐾",
      popupAllPetsTitle: "🌟 Alla 24!",
      popupAllPetsSub: "+25 💎",
      popupYayBtn: "Jippie!",
      popupCouponHeader: "✨ Guldkupong ✨",
      popupCouponEarnedBy: "{name} • {date}",
      popupCouponSub: "🎟️ Visa för mamma eller pappa!",
      popupKeepCouponBtn: "🎉 Spara",

      // Stats / Metrics Tab (Kid-Minimal)
      kpiQuestionsAnswered: "Svar",
      kpiOverallAccuracy: "Rätt %",
      kpiAvgSpeed: "Snittid",
      kpiFactsMastered: "Starka",
      kpiStreaksConquered: "Rundor",
      statsTrickyTitle: "🎯 Kluriga tal",
      statsTrickySub: "",
      btnDrillTricky: "⚡ Spela ▶",
      noTrickyYet: "🌟 Inga än!",
      trickyPillStats: "({acc}% • {sec}s)",
      heatmapTitle: "🗺️ 12×12 Karta",
      heatmapSub: "",
      legendGold: "👑 <2.2s",
      legendGreen: "🟢 <3.5s",
      legendYellow: "🟡",
      legendRed: "🔴",
      legendNone: "⚪",
      heatmapTapHint: "👆 Tryck på en ruta!",
      factNotPracticedYet: "⚪",
      factDetailStats: "<strong>{attempts}×</strong> • <strong>{acc}%</strong> ({correct}✓ {wrong}✗) • ⚡ <strong>{avgSec}s</strong>",
      btnPracticeSingleTable: "▶ ×{a}",
      btnPracticeTwoTables: "▶ ×{a} & ×{b}",
      perTableTitle: "📈 Tabeller (×1 – ×12)",
      perTableSub: "",
      perTableRowTitle: "×{t}",
      perTableRowStats: "{strong}/12 ⭐ • {acc} • {avg}",
      recentRunsTitle: "📜 Historik",
      recentRunsSub: "",
      noRunsYet: "—",
      runRowMeta: "({streak} st • {timer}s)",
      runRowAvg: "⚡ {sec}s",
      runRowResets: "🔄 {resets}",

      // Gameplay Stage (Kid-Minimal: 1–4 words + icons!)
      gameInitialSpeech: "🚀 Kör, {name}!",
      gameModeFooter: "{title} • ⏱️ {timer}s • 🏁 {streak}",
      gameSubHintStart: "👆 Tryck!",
      gameSubHintStreak: "🔥 {streak}",
      gameSubHintMystery: "🌟 Bonus (+3 💎)",
      gameCorrectSpeed: "⚡ {sec}s!",
      gameBonusCorrectSpeed: "🌟 +3 💎 ({sec}s)!",
      gameTapGreenHint: "👆 Tryck grön {ans}",
      gameTimeoutBubbleTap: "{eq} 🔄 Ny start!",
      gameWrongBubbleTap: "{eq} 🔄 Ny start!",
      gameTimeoutSubAuto: "⏰ {eq}",
      gameWrongSubAuto: "💡 {eq}",
      gameTimeoutBubbleAuto: "{eq} 🔄 Ny start!",
      gameWrongBubbleAuto: "{eq} 🔄 Ny start!",
      gameRetryLaterBubbleTap: "{eq} 🔄 Igen på slutet!",
      gameRetryLaterBubbleAuto: "{eq} 🔄 Igen på slutet!",
      gameRetryLaterSubHint: "🔄 Igen på slutet ({missCount}/3) • 👆 Tryck {ans}",
      gameBonusMissBubbleTap: "{eq} 🌟 Gratis bonus!",
      gameBonusMissBubbleAuto: "{eq} 🌟 Gratis bonus!",
      gameBonusMissSubHint: "🌟 Ingen förlust • 👆 Tryck {ans}",
      gameKeepGoingBubble: "🔥 {current} / {streak}!",
      gameFreshStartBubble: "🚀 Kör, {name}!",
      badgeSpaced1: "🔄 Repris",
      badgeTwin: "🪞 {b} × {a}",
      badgeBoss: "👑 Boss!",
      badgeRetry: "🔄 Repris",
      badgeEndRetry: "🔄 Försök {tryNum}/3",
      badgeAnchor: "⚓ Tips",
      badgeMystery: "🌟 Bonus (+3 💎)",

      // Expandable "For Parents" Boxes (Swedish)
      parentInfoAdventureSum: "ℹ️ För föräldrar: Så fungerar banor, försök & bonusfrågor",
      parentInfoAdventureBody:
        "<p>• <strong>Försök igen på slutet (3-missregeln):</strong> Om {name} missar en vanlig fråga nollställs <em>inte</em> sviten! Frågan läggs sist i rundan så hon får prova igen. Bara 3 missar på <em>exakt samma tal</em> startar om rundan.</p><p>• <strong>🌟 Bonusfrågor (<code>7 × ❓ = 56</code>):</strong> Ger <strong>+3 bonus-ädelstenar</strong> vid rätt svar och <strong>inget avdrag alls</strong> vid miss.</p><p>• <strong>Tidsgränser:</strong> 8s = 1★ (1× ädelstenar), 5s = 2★ (1.5× ädelstenar), 3s = 3★ (2× ädelstenar). Första vinsten på en bana låser upp dess husdjur!</p>",
      parentInfoTrickySum: "ℹ️ För föräldrar: Träna kluriga tal",
      parentInfoTrickyBody:
        "Väljer automatiskt ut de multiplikationer som {name} har missat eller svarat långsamt på i tidigare rundor.",
      parentInfoCustomSum: "ℹ️ För föräldrar: Skapa egen runda",
      parentInfoCustomBody:
        "Välj valfria tabeller (1–12), tidsgräns per fråga och om bonusfrågor med hemlig faktor (<code>7 × ❓ = 56</code>) ska ingå.",
      parentInfoPetsSum: "ℹ️ För föräldrar: Låsa upp & välja husdjur",
      parentInfoPetsBody:
        "16 husdjur låses upp genom att klara banorna på äventyrskartan och 8 kläcks ur mystiska ägg i butiken. Tryck på ett upplåst djur för att välja det som sällskap.",
      parentInfoShopSum: "ℹ️ För föräldrar: Ädelstenar, ägg & guldkuponger",
      parentInfoShopBody:
        "Ädelstenar från avklarade rundor kan bytas mot klistermärken, mystiska djurägg eller guldkuponger (t.ex. extra skärmtid eller välja familjefilm). Klicka på <strong>⚙️ Förälder</strong> för att ändra eller lägga till egna belöningar.",
      parentInfoStatsSum: "ℹ️ För föräldrar: Så läser du 12×12-kartan",
      parentInfoStatsBody:
        "Tryck på valfri ruta i 12×12-nätet för att se träffsäkerhet och snittid. 👑 <strong>Bemästrad</strong> kräver ≥90% rätt under 2.2s; 🟢 <strong>Stark</strong> kräver ≥80% rätt under 3.5s.",
      gameParentInfoSum: "ℹ️ För föräldrar: Förklaring & räknestrategi",
      gameParentInfoRetryNote:
        "<strong>Sparad till slutet ({missCount}/3 missar på detta tal):</strong> Sviten är kvar! Frågan lades sist i rundan för ett nytt försök. Bara 3 missar på samma tal startar om rundan.",
      gameParentInfoResetNote:
        "<strong>3:e missen på samma tal:</strong> Eftersom just detta tal missades 3 gånger i samma runda börjar sviten om från 0.",
      gameParentInfoBonusNote:
        "<strong>Bonusfråga (Hemlig faktor):</strong> Missar på bonusfrågor räknas inte som fel och påverkar inte sviten.",

      // Victory Modal (Kid-Minimal)
      victoryFlawlessTitle: "🎉 Du klarade det, {name}!",
      victoryCompleteTitle: "🎉 Du klarade det!",
      victoryFlawlessSub: "⭐ {streak} / {streak}!",
      victoryCompleteSub: "⭐ {streak} / {streak}!",
      victoryTapChestHint: "👆 Tryck på kistan!",
      victoryGemsEarned: "+{gems} 💎",
      victoryAvgLabel: "⚡",
      victoryNewPetHeader: "🐾 Nytt husdjur!",
      victoryNewStickerHeader: "🎨 Nytt klistermärke!",
      victoryPlacedInLobby: "🏡 I ditt rum!",
      btnPlayAgain: "🔄 Igen",
      btnContinueAdventure: "🗺️ Karta",

      // Parent Modal
      parentModalTitle: "⚙️ Föräldrainställningar",
      parentNameLabel: "Barnets namn (visas i titel och hejarop)",
      parentLangLabel: "🌍 Språk / Language",
      parentStreakLabel: "Standard svitlängd (Antal i rad)",
      parentTimerLabel: "Standardtid per fråga",
      parentRecoveryLabel: "Vid fel svar (Återhämtningsläge)",
      parentRecoveryTap: "👆 Tryck på rätt svar för att fortsätta (Rekommenderas)",
      parentRecoveryTimer: "⏱️ Fortsätt automatiskt efter paus",
      parentStyleLabel: "Frågestil (Äventyrsläge)",
      parentPauseLabel: "Paustid (om automatisk fortsättning används)",
      parentBoostLabel: "Ge bonus-ädelstenar (Föräldraboost)",
      parentGrantGemsBtn: "💎 Ge +50 ädelstenar till {name}",
      parentAddCouponHeading: "🎟️ Lägg till egen belöningskupong i butiken",
      parentAddCouponPlaceholder: "t.ex. 15 min extra skärmtid",
      parentAddCouponBtn: "➕ Lägg till belöning i {name}s butik",
      btnRemoveReward: "Ta bort",
      btnOpenCloudFromParent: "☁️ Molnsynk mellan enheter",
      btnExportData: "📋 Exportera säkerhetskopia (JSON)",
      btnSaveParent: "💾 Spara inställningar",

      // Cloud Modal
      cloudModalTitle: "☁️ Föräldrakonto & Molnsynk",
      cloudModalSub: "Koppla din e-post via en gratis magisk inloggningslänk så att ädelstenar, husdjur, klistermärken, kuponger och 12×12-statistik synkas automatiskt mellan iPad, mobil och dator. När enheten är kopplad förblir den inloggad.",
      cloudEmailLabel: "Förälders e-postadress (för gratis magisk länk)",
      btnSendMagicLink: "✉️ Skicka magisk länk",
      cloudOrGoogle: "— eller logga in direkt med 1 tryck —",
      btnGoogleSignin: "🔑 Logga in med Google-konto",
      cloudLinkedHeader: "✅ Permanent kopplat föräldrakonto",
      cloudSecurityNote: "🔒 Skyddat av Firebase säkerhetsregler (auth.uid). Endast enheter inloggade med din e-post kan läsa eller uppdatera din data.",
      btnSyncNow: "🔄 Synka nu",
      btnSendLinkOtherDevice: "📱 Skicka magisk länk till annan enhet",
      btnSignOut: "Logga ut"
    }
  };

  // Swedish translations for Worlds & Nodes (matching exact IDs in data.js)
  const SV_WORLDS = {
    woods: {
      name: "🌱 Värld 1: Skogen",
      subtitle: "×1, ×2, ×5, ×10"
    },
    caves: {
      name: "💎 Värld 2: Grottan",
      subtitle: "×3, ×4, ×6"
    },
    clouds: {
      name: "☁️ Värld 3: Molnen",
      subtitle: "×7, ×8, ×9"
    },
    summit: {
      name: "🏔️ Värld 4: Toppen",
      subtitle: "×11, ×12 & 12×12"
    }
  };

  const SV_NODES = {
    lvl_1: { title: "1× & 2×", desc: "" },
    lvl_2: { title: "5×", desc: "" },
    lvl_3: { title: "10×", desc: "" },
    lvl_4: { title: "Boss: 1, 2, 5, 10", desc: "" },
    lvl_5: { title: "3×", desc: "" },
    lvl_6: { title: "4×", desc: "" },
    lvl_7: { title: "6×", desc: "" },
    lvl_8: { title: "Boss: 3, 4 & 6", desc: "" },
    lvl_9: { title: "9×", desc: "" },
    lvl_10: { title: "7×", desc: "" },
    lvl_11: { title: "8×", desc: "" },
    lvl_12: { title: "Boss: 7, 8 & 9", desc: "" },
    lvl_13: { title: "11×", desc: "" },
    lvl_14: { title: "12×", desc: "" },
    lvl_15: { title: "Mix: 6–12", desc: "" },
    lvl_16: { title: "12×12 Kronan", desc: "" }
  };

  const EN_WORLDS_SHORT = {
    woods: { name: "🌱 World 1: Woods", subtitle: "×1, ×2, ×5, ×10" },
    caves: { name: "💎 World 2: Caves", subtitle: "×3, ×4, ×6" },
    clouds: { name: "☁️ World 3: Clouds", subtitle: "×7, ×8, ×9" },
    summit: { name: "🏔️ World 4: Summit", subtitle: "×11, ×12 & 12×12" }
  };

  const EN_NODES_SHORT = {
    lvl_1: { title: "1× & 2×", desc: "" },
    lvl_2: { title: "5×", desc: "" },
    lvl_3: { title: "10×", desc: "" },
    lvl_4: { title: "Boss: 1, 2, 5, 10", desc: "" },
    lvl_5: { title: "3×", desc: "" },
    lvl_6: { title: "4×", desc: "" },
    lvl_7: { title: "6×", desc: "" },
    lvl_8: { title: "Boss: 3, 4 & 6", desc: "" },
    lvl_9: { title: "9×", desc: "" },
    lvl_10: { title: "7×", desc: "" },
    lvl_11: { title: "8×", desc: "" },
    lvl_12: { title: "Boss: 7, 8 & 9", desc: "" },
    lvl_13: { title: "11×", desc: "" },
    lvl_14: { title: "12×", desc: "" },
    lvl_15: { title: "Mix: 6–12", desc: "" },
    lvl_16: { title: "12×12 Crown", desc: "" }
  };

  // Swedish translations for all 24 Pet Species & Bios in data.js
  const SV_PETS = {
    pet_owl: { species: "Snöuggla", bio: "Älskar sena mattestunder och hejar glatt från trädtopparna!" },
    pet_fox: { species: "Stjärnräv", bio: "Snabb som blixten! Lunas svans glittrar starkare vid varje snabbt svar." },
    pet_axolotl: { species: "Bubbel-axolotl", bio: "Flyter glatt i kristallbäckar och blåser rosa magiska bubblor när du tar poäng!" },
    pet_redpanda: { species: "Bambu-rödpanda", bio: "Dansar en glad tassdans varje gång en skattkista öppnas!" },
    pet_hedgehog: { species: "Kristalligelkott", bio: "Hans taggar är gjorda av ametistkristaller som klingar som små klockor!" },
    pet_penguin: { species: "Frostpingvin", bio: "Glider på magen över isiga multiplikationer i 3-sekunders blixtfart!" },
    pet_seadragon: { species: "Bladsjödrake", bio: "Glider genom safirlagunens grottor och samlar lysande visdomspärlor." },
    pet_unicorn: { species: "Molnenhörning", bio: "Galopperar över regnbågsbroar och lämnar stjärnstoft efter sig." },
    pet_koala: { species: "Hjortronkoala", bio: "Vilar på fluffiga moln och vaknar blixtsnabbt för 9:ans tabell!" },
    pet_snowleopard: { species: "Frostsnöleopard", bio: "Hoppar från bergstopp till bergstopp på under 3 sekunder!" },
    pet_griffin: { species: "Guldvingad Grip", bio: "Hälften örn, hälften lejon — 100% trogen väktare av Molnriket." },
    pet_kitsune: { species: "Niosvansad Galaxräv", bio: "Fick en lysande svans för varje klurig tabell som bemästrades!" },
    pet_narwhal: { species: "Stjärnnarval", bio: "Simmar genom norrskenet och pekar ut rätt svar med sitt horn." },
    pet_dragon: { species: "Rubindrake", bio: "Vaktar 12×12-skatten av ädelstenar och sprutar regnbågskonfetti!" },
    pet_phoenix: { species: "Solstrålefenix", bio: "Även om sviten börjar om på noll reser sig Solara starkare varje gång!" },
    pet_celestial_cat: { species: "Stjärnkronans Kattunge", bio: "Bär Stora 12×12-mästarkronan och spinner som ett äkta mattegeni." },
    pet_bunny: { species: "Sammetskanin", bio: "Kläckt ur ett mystiskt ägg! Hoppar i glada cirklar när du slår timern." },
    pet_otter: { species: "Pärlutter", bio: "Har alltid sin favorit-lyckosten för multiplikation i fickan!" },
    pet_flamingo: { species: "Solnedgångsflamingo", bio: "Balanserar på ett ben medan hon löser 12:ans tabell på under 3 sekunder!" },
    pet_dolphin: { species: "Prismadelfin", bio: "Gör bakåtvolter över mätaren varje gång du klarar 5 rätt i rad!" },
    pet_buttercup: { species: "Honungsbjörn", bio: "Söt som honung och alltid redo med en varm kram efter en klurig runda." },
    pet_peacock: { species: "Stjärnpåfågel", bio: "Slår ut 144 skimrande ögon på stjärten — ett för varje tal i 12×12-kartan!" },
    pet_hamster: { species: "Komet-hamster", bio: "Springer i ett gyllene hjul som drivs av snabba 3-sekunderssvar!" },
    pet_pegasus: { species: "Norrskenspegasus", bio: "Flyger genom stjärnvalvet när en hel värld har erövrats!" }
  };

  // Short Shop Item Titles (Kid-Minimal)
  const EN_SHOP_SHORT = {
    reward_sticker_pack: { title: "✨ Sticker Pack", description: "" },
    reward_mystery_egg: { title: "🥚 Mystery Egg", description: "" },
    reward_screen_time_15: { title: "📺 +15m Screen", description: "" },
    reward_ice_cream: { title: "🍦 Ice Cream", description: "" },
    reward_movie_pick: { title: "🍿 Pick a Movie", description: "" },
    reward_bedtime_15: { title: "🌙 +15m Bedtime", description: "" }
  };

  const SV_SHOP_ITEMS = {
    reward_sticker_pack: { title: "✨ Klistermärke", description: "" },
    reward_mystery_egg: { title: "🥚 Mystiskt ägg", description: "" },
    reward_screen_time_15: { title: "📺 +15m Skärmtid", description: "" },
    reward_ice_cream: { title: "🍦 Glass / Fika", description: "" },
    reward_movie_pick: { title: "🍿 Välj film", description: "" },
    reward_bedtime_15: { title: "🌙 +15m Läggdags", description: "" }
  };

  const SV_BACKDROPS = {
    bg_meadow: "🌈 Äng",
    bg_castle: "🏰 Slott",
    bg_galaxy: "🌌 Rymd",
    bg_beach: "🏖️ Strand"
  };

  const EN_BACKDROPS_SHORT = {
    bg_meadow: "🌈 Meadow",
    bg_castle: "🏰 Castle",
    bg_galaxy: "🌌 Space",
    bg_beach: "🏖️ Beach"
  };

  const SV_STICKERS = {
    stk_star: "Guldstjärna",
    stk_blossom: "Körsbärsblomma",
    stk_crown: "Kungakrona",
    stk_rainbow: "Regnbåge",
    stk_cupcake: "Muffins",
    stk_wand: "Trollstav",
    stk_heart: "Glitterhjärta",
    stk_castle: "Sagoslott",
    stk_butterfly: "Blå fjäril",
    stk_donut: "Munk",
    stk_guitar: "Elgitarr",
    stk_rocket: "Rymdraket",
    stk_teddy: "Nallebjörn",
    stk_diamond: "Diamant",
    stk_balloon: "Kalasballong",
    stk_icecream: "Glassstrut",
    stk_sun: "Glad sol",
    stk_moon: "Månskära",
    stk_bow: "Rosa rosett",
    stk_mushroom: "Flugsvamp",
    stk_crystal: "Spåkula",
    stk_pizza: "Pizzabit",
    stk_ufo: "Rymd-UFO",
    stk_trophy: "Mästarbuckla"
  };

  const EN_CHEERS = [
    "⚡ Awesome!",
    "🌟 Super!",
    "🔥 Yes!",
    "🎉 Magic!",
    "🚀 Fast!"
  ];

  const SV_CHEERS = [
    "⚡ Toppen!",
    "🌟 Super!",
    "🔥 Jaa!",
    "🎉 Magiskt!",
    "🚀 Snabbt!"
  ];

  function getLang() {
    if (window.CURRENT_LANG) return window.CURRENT_LANG;
    try {
      const raw = localStorage.getItem("jemima_pet_academy_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.settings?.language === "sv") return "sv";
      }
    } catch (_) {}
    return "en";
  }

  function t(key, vars = {}) {
    const lang = getLang();
    const dict = STRINGS[lang] || STRINGS.en;
    let template = dict[key] !== undefined ? dict[key] : (STRINGS.en[key] || key);
    Object.entries(vars).forEach(([k, v]) => {
      template = template.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    });
    return template;
  }

  // Ultra-short visual 1-liner for kids during a miss (pure numbers/symbols + 1-2 words)
  function getKidStrategy(a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const prod = a * b;
    const key = `${min}x${max}`;

    const shortRhymes = {
      "7x8": `🎵 5, 6, 7, 8 ➔ 56`,
      "6x8": `🎵 6 × 8 = 48`,
      "6x6": `🎵 6 × 6 = 36`,
      "7x7": `🎵 7 × 7 = 49`,
      "8x8": `♟️ 8 × 8 = 64`
    };
    if (shortRhymes[key]) return shortRhymes[key];

    if (min === 1) return `💡 1 × ${max} = ${prod}`;
    if (min === 2) return `💡 ${max} + ${max} = ${prod}`;
    if (min === 10 || max === 10) {
      const other = a === 10 ? b : a;
      return `💡 ${other}0 = ${prod}`;
    }
    if (min === 5 || max === 5) {
      const other = a === 5 ? b : a;
      return `💡 ½ × ${other * 10} = ${prod}`;
    }
    if (min === 9 || max === 9) {
      const other = min === 9 ? max : min;
      return `🖐️ ${other * 10} − ${other} = ${prod}`;
    }
    if (min === 4 || max === 4) {
      const other = min === 4 ? max : min;
      return `⚡ ${other} ➔ ${other * 2} ➔ ${prod}`;
    }
    if (min === 3 || max === 3) {
      const other = min === 3 ? max : min;
      return `💡 ${other * 2} + ${other} = ${prod}`;
    }
    if (min === 6 || max === 6) {
      const other = min === 6 ? max : min;
      return `💡 ${other * 5} + ${other} = ${prod}`;
    }
    if (min === 11 || max === 11) {
      const other = min === 11 ? max : min;
      if (other <= 9) return `🪞 ${other}${other} = ${prod}`;
      return `💡 ${other * 10} + ${other} = ${prod}`;
    }
    if (min === 12 || max === 12) {
      const other = min === 12 ? max : min;
      return `💡 ${other * 10} + ${other * 2} = ${prod}`;
    }
    return `💡 ${5 * max} + ${(min - 5) * max} = ${prod}`;
  }

  function getPedagogicalStrategyLocalized(a, b) {
    if (getLang() !== "sv") return null;
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const prod = a * b;
    const key = `${min}x${max}`;

    const rhymesSv = {
      "7x8": "🎵 Rim-knep: 5, 6, 7, 8 👉 56 = 7 × 8!",
      "6x8": "🎵 Rim-knep: 6 och 8 är så snälla, 6 × 8 = 48!",
      "6x6": "🎵 Rim-knep: 6 gånger 6 blir 36!",
      "7x7": "🏈 Kvadrat-knep: 7 × 7 = 49!",
      "8x8": "♟️ Schackbrädet: 8 rader med 8 rutor = 64!",
      "6x7": "🌟 Ankarknep: 5 × 7 är 35, plussa på en 7:a till 👉 42!",
      "3x8": "⚡ Dubbel-knep: 2 × 8 är 16, plus 8 till 👉 24!",
      "4x7": "⚡ Dubbel-dubbel: Dubbla 7 till 14, dubbla 14 👉 28!",
      "4x8": "⚡ Dubbel-dubbel: Dubbla 8 till 16, dubbla 16 👉 32!",
      "7x9": "🖐️ 9-knepet: 10 × 7 är 70, minus 7 👉 63! (6 + 3 = 9)",
      "8x9": "🖐️ 9-knepet: 10 × 8 är 80, minus 8 👉 72! (7 + 2 = 9)",
      "6x9": "🖐️ 9-knepet: 10 × 6 är 60, minus 6 👉 54! (5 + 4 = 9)"
    };
    if (rhymesSv[key]) return rhymesSv[key];

    if (min === 1) {
      return `💡 1 gånger vilket tal som helst blir samma tal → ${prod}!`;
    }
    if (min === 2) {
      return `💡 Dubbla talet! ${max} + ${max} = ${prod}!`;
    }
    if (min === 10 || max === 10) {
      const other = a === 10 ? b : a;
      return `💡 Tiotal: ${other} tiotal = ${prod} (sätt en 0:a efter ${other})!`;
    }
    if (min === 5 || max === 5) {
      const other = a === 5 ? b : a;
      return `💡 5-knepet: Hälften av (10 × ${other} = ${other * 10}) är ${prod}!`;
    }
    if (min === 9 || max === 9) {
      const other = min === 9 ? max : min;
      const tenVal = other * 10;
      const d1 = Math.floor(prod / 10);
      const d2 = prod % 10;
      return `🖐️ 9-knepet: 10 × ${other} = ${tenVal}, minus ${other} = ${prod} (Siffrorna ${d1}+${d2} = 9!)`;
    }
    if (min === 4 || max === 4) {
      const other = min === 4 ? max : min;
      return `⚡ Dubbel-dubbel (×4): Dubbla ${other} → ${other * 2}, dubbla igen → ${prod}!`;
    }
    if (min === 6 || max === 6) {
      const other = min === 6 ? max : min;
      return `⚓ 5-ankaret + 1 grupp: (5 × ${other} = ${other * 5}) + ${other} = ${prod}!`;
    }
    if (min === 12 || max === 12) {
      const other = min === 12 ? max : min;
      return `🔟 10 + 2 uppdelning: (10 × ${other} = ${other * 10}) + (2 × ${other} = ${other * 2}) = ${prod}!`;
    }
    if (min === 11 || max === 11) {
      const other = min === 11 ? max : min;
      if (other <= 9) return `🪞 Spegeltalet: Upprepa siffran ${other} två gånger 👉 ${prod}!`;
      return `🔟 10 + 1 knepet: (10 × ${other} = ${other * 10}) + ${other} = ${prod}!`;
    }
    if (min === 3 || max === 3) {
      const other = min === 3 ? max : min;
      return `⚓ Dubbelt + 1 grupp: (2 × ${other} = ${other * 2}) + ${other} = ${prod}!`;
    }
    if (min === 8 || max === 8) {
      const other = min === 8 ? max : min;
      return `⚓ 10 minus dubbelt: (10 × ${other} = ${other * 10}) − (2 × ${other} = ${other * 2}) = ${prod}!`;
    }
    return `💡 Tänk i grupper: ${min} grupper av ${max} blir ${prod}!`;
  }

  function applyStaticTranslations(playerName = "Jemima", defaultStreak = 10) {
    const lang = getLang();
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-sv", lang === "sv");

    // HUD Lang Button
    const langBtn = document.getElementById("hud-lang-btn");
    if (langBtn) {
      langBtn.textContent = lang === "sv" ? "🇸🇪 SV" : "🇬🇧 EN";
      langBtn.title =
        lang === "sv"
          ? "Byt språk till Engelska (Switch to English)"
          : "Switch language to Swedish (Byt till Svenska)";
    }

    // Onboarding Language Pills
    document.querySelectorAll(".onboarding-lang-pill").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Bottom Nav labels
    const navMap = {
      adventure: t("navAdventure"),
      practice: t("navPractice"),
      pets: t("navPets"),
      shop: t("navShop"),
      stats: t("navStats")
    };
    document.querySelectorAll(".bottom-nav .nav-tab").forEach((btn) => {
      const key = btn.dataset.tab;
      const spans = btn.querySelectorAll("span");
      if (spans.length >= 2 && navMap[key]) {
        spans[1].textContent = navMap[key];
      }
    });

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    const setHtml = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = val;
    };

    // Expandable "For Parents" Boxes
    setTxt("parent-info-adventure-sum", t("parentInfoAdventureSum"));
    setHtml("parent-info-adventure-body", t("parentInfoAdventureBody", { name: playerName }));
    setTxt("parent-info-tricky-sum", t("parentInfoTrickySum"));
    setHtml("parent-info-tricky-body", t("parentInfoTrickyBody", { name: playerName }));
    setTxt("parent-info-custom-sum", t("parentInfoCustomSum"));
    setHtml("parent-info-custom-body", t("parentInfoCustomBody", { name: playerName }));
    setTxt("parent-info-pets-sum", t("parentInfoPetsSum"));
    setHtml("parent-info-pets-body", t("parentInfoPetsBody", { name: playerName }));
    setTxt("parent-info-shop-sum", t("parentInfoShopSum"));
    setHtml("parent-info-shop-body", t("parentInfoShopBody", { name: playerName }));
    setTxt("parent-info-stats-sum", t("parentInfoStatsSum"));
    setHtml("parent-info-stats-body", t("parentInfoStatsBody", { name: playerName }));
    setTxt("game-parent-info-sum", t("gameParentInfoSum"));

    // Welcome Modal
    setTxt("onboarding-title-text", t("welcomeTitle"));
    setTxt("onboarding-sub-text", t("welcomeSub"));
    setTxt("onboarding-lang-label", t("welcomeLangLabel"));
    setTxt("onboarding-name-label", t("welcomeNameLabel"));
    setTxt("onboarding-speed-label", t("welcomeSpeedLabel"));
    setTxt("btn-onboarding-start-local", t("welcomeStartBtn"));
    setTxt("onboarding-start-sub", t("welcomeStartSub"));
    setTxt("btn-onboarding-open-cloud", t("welcomeParentLoginBtn"));
    const onbCloudBox = document.querySelector(".onboarding-cloud-box");
    if (onbCloudBox) {
      const titleDiv = onbCloudBox.querySelector("div > div > div:first-child");
      const subDiv = onbCloudBox.querySelector("div > div > div:nth-child(2)");
      if (titleDiv) {
        titleDiv.innerHTML = `${t("welcomeCloudTitle")} <span style="color:var(--text-muted); font-weight:800;">${t("welcomeOptional")}</span>`;
      }
      if (subDiv) {
        subDiv.textContent = t("welcomeCloudSub");
      }
    }

    const namePreview = document.getElementById("onboarding-name-preview");
    const nameInput = document.getElementById("onboarding-input-name");
    if (nameInput) nameInput.placeholder = t("welcomeNamePlaceholder");
    if (namePreview) {
      const n = (nameInput && nameInput.value.trim()) || playerName;
      namePreview.innerHTML = t("welcomeNamePreview", { name: n });
    }
    const timerSel = document.getElementById("onboarding-select-timer");
    if (timerSel && timerSel.options.length >= 3) {
      timerSel.options[0].textContent = t("welcomeSpeed3");
      timerSel.options[1].textContent = t("welcomeSpeed5");
      timerSel.options[2].textContent = t("welcomeSpeed8");
    }

    // Lobby labels
    setTxt("lobby-drag-hint", t("lobbyDragHint"));
    setTxt("btn-stk-bigger", t("btnBigger"));
    setTxt("btn-stk-smaller", t("btnSmaller"));
    setTxt("btn-stk-flip", t("btnFlip"));
    setTxt("btn-stk-remove", t("btnRemove"));
    setTxt("drawer-backdrop-label", t("drawerBackdropLabel"));
    setTxt("drawer-sticker-label", t("drawerStickerLabel"));

    // Speed pills on Adventure Map
    const speedTitleEl = document.querySelector(".speed-selector-title span");
    if (speedTitleEl) {
      speedTitleEl.innerHTML = t("speedSelectorTitle", {
        streak: `<span id="map-streak-label">${defaultStreak}</span>`
      });
    }
    const sp3 = document.querySelector('#map-speed-pills .speed-pill[data-seconds="3"] .sp-main');
    const sp5 = document.querySelector('#map-speed-pills .speed-pill[data-seconds="5"] .sp-main');
    const sp8 = document.querySelector('#map-speed-pills .speed-pill[data-seconds="8"] .sp-main');
    if (sp3) sp3.textContent = t("speed3Main");
    if (sp5) sp5.textContent = t("speed5Main");
    if (sp8) sp8.textContent = t("speed8Main");

    // Practice Tab
    setTxt("practice-booster-heading", t("trickyBoosterTitle"));
    setTxt("btn-start-tricky", t("btnPracticeTricky"));
    setTxt("practice-custom-heading", t("customRunTitle"));
    setTxt("practice-custom-sub", t("customRunSub"));
    setTxt("btn-select-all-tables", t("btnSelectAll"));
    setTxt("btn-select-hard-tables", t("btnSelectHard"));
    setTxt("btn-clear-tables", t("btnClear"));
    setTxt("btn-start-custom", t("btnLaunchCustom"));

    const configBoxes = document.querySelectorAll("#view-practice .config-box > label");
    if (configBoxes.length >= 3) {
      configBoxes[0].textContent = t("customTimeLimitLabel");
      configBoxes[1].textContent = t("customStreakLabel");
      configBoxes[2].textContent = t("customStyleLabel");
    }
    const ct3 = document.querySelector('#custom-timer-pills .opt-pill[data-val="3"]');
    const ct5 = document.querySelector('#custom-timer-pills .opt-pill[data-val="5"]');
    const ct8 = document.querySelector('#custom-timer-pills .opt-pill[data-val="8"]');
    if (ct3) ct3.textContent = t("customTime3");
    if (ct5) ct5.textContent = t("customTime5");
    if (ct8) ct8.textContent = t("customTime8");

    const cs10 = document.querySelector('#custom-streak-pills .opt-pill[data-val="10"]');
    if (cs10) cs10.textContent = t("customStreak10Default");

    const stStd = document.querySelector('#custom-style-pills .opt-pill[data-val="standard"]');
    const stMix = document.querySelector('#custom-style-pills .opt-pill[data-val="mix"]');
    const stMys = document.querySelector('#custom-style-pills .opt-pill[data-val="mystery"]');
    if (stStd) stStd.textContent = t("styleStandard");
    if (stMix) stMix.textContent = t("styleMix");
    if (stMys) stMys.textContent = t("styleMystery");

    // Pets Tab
    setTxt("pets-heading", t("petsTitle"));
    setTxt("pets-sub", t("petsSub"));
    setTxt("pets-unlocked-label", t("petsUnlockedLabel"));

    // Shop Tab
    setTxt("shop-heading", t("shopTitle"));
    setTxt("shop-sub", t("shopSub"));
    setTxt("btn-open-parent-from-shop", t("btnEditRewardsParent"));
    setTxt("coupons-heading", t("couponsTitle", { name: playerName }));
    setTxt("coupons-sub", t("couponsSub"));

    // Stats Tab
    setTxt("stats-tricky-heading", t("statsTrickyTitle"));
    setTxt("stats-tricky-sub", t("statsTrickySub"));
    setTxt("btn-stats-practice-tricky", t("btnDrillTricky"));
    setTxt("heatmap-heading", t("heatmapTitle"));
    setTxt("heatmap-sub", t("heatmapSub", { name: playerName }));
    setTxt("per-table-heading", t("perTableTitle"));
    setTxt("per-table-sub", t("perTableSub"));
    setTxt("recent-runs-heading", t("recentRunsTitle"));
    setTxt("recent-runs-sub", t("recentRunsSub"));

    const legendItems = document.querySelectorAll(".heatmap-legend .legend-item");
    if (legendItems.length >= 5) {
      legendItems[0].innerHTML = `<span class="legend-swatch mastery-gold"></span> ${t("legendGold")}`;
      legendItems[1].innerHTML = `<span class="legend-swatch mastery-green"></span> ${t("legendGreen")}`;
      legendItems[2].innerHTML = `<span class="legend-swatch mastery-yellow"></span> ${t("legendYellow")}`;
      legendItems[3].innerHTML = `<span class="legend-swatch mastery-red"></span> ${t("legendRed")}`;
      legendItems[4].innerHTML = `<span class="legend-swatch mastery-none"></span> ${t("legendNone")}`;
    }

    // Victory Modal
    setTxt("victory-tap-chest-hint", t("victoryTapChestHint"));
    setTxt("btn-victory-replay", t("btnPlayAgain"));
    setTxt("btn-victory-continue", t("btnContinueAdventure"));

    // Parent Modal
    const parentModal = document.getElementById("parent-modal");
    if (parentModal) {
      const h2 = parentModal.querySelector("h2");
      if (h2) h2.textContent = t("parentModalTitle");
      const h3 = parentModal.querySelector("h3");
      if (h3) h3.textContent = t("parentAddCouponHeading");
      const labels = parentModal.querySelectorAll(".form-group > label");
      if (labels.length >= 8) {
        labels[0].textContent = t("parentNameLabel");
        labels[1].textContent = t("parentLangLabel");
        labels[2].textContent = t("parentStreakLabel");
        labels[3].textContent = t("parentTimerLabel");
        labels[4].textContent = t("parentRecoveryLabel");
        labels[5].textContent = t("parentStyleLabel");
        labels[6].textContent = t("parentPauseLabel");
        labels[7].textContent = t("parentBoostLabel");
      }
      const recSel = document.getElementById("parent-select-recovery");
      if (recSel && recSel.options.length >= 2) {
        recSel.options[0].textContent = t("parentRecoveryTap");
        recSel.options[1].textContent = t("parentRecoveryTimer");
      }
      setTxt("btn-parent-grant-gems", t("parentGrantGemsBtn", { name: playerName }));
      const newRewardTitle = document.getElementById("new-reward-title");
      if (newRewardTitle) newRewardTitle.placeholder = t("parentAddCouponPlaceholder");
      setTxt("btn-add-custom-reward", t("parentAddCouponBtn", { name: playerName }));
      setTxt("btn-open-cloud-from-parent", t("btnOpenCloudFromParent"));
      setTxt("btn-export-data", t("btnExportData"));
      setTxt("btn-save-parent", t("btnSaveParent"));
    }

    // Cloud Modal
    const cloudModal = document.getElementById("cloud-modal");
    if (cloudModal) {
      const ch2 = cloudModal.querySelector("h2");
      if (ch2) ch2.textContent = t("cloudModalTitle");
      const cp = cloudModal.querySelector("p");
      if (cp) cp.textContent = t("cloudModalSub");
      const cEmailLbl = cloudModal.querySelector("#cloud-signed-out-panel .form-group > label");
      if (cEmailLbl) cEmailLbl.textContent = t("cloudEmailLabel");
      setTxt("btn-send-magic-link", t("btnSendMagicLink"));
      setTxt("btn-google-signin", t("btnGoogleSignin"));
      setTxt("btn-cloud-force-sync", t("btnSyncNow"));
      setTxt("btn-copy-device-setup-link", t("btnSendLinkOtherDevice"));
      setTxt("btn-cloud-signout", t("btnSignOut"));
    }
  }

  window.I18N = {
    t,
    getLang,
    applyStaticTranslations,
    getKidStrategy,
    getPedagogicalStrategyLocalized,
    getWorldText: (world) => {
      if (getLang() === "sv" && SV_WORLDS[world.id]) {
        return SV_WORLDS[world.id];
      }
      if (EN_WORLDS_SHORT[world.id]) {
        return EN_WORLDS_SHORT[world.id];
      }
      return { name: world.name, subtitle: world.subtitle };
    },
    getNodeText: (node) => {
      if (getLang() === "sv" && SV_NODES[node.id]) {
        return { title: SV_NODES[node.id].title, description: SV_NODES[node.id].desc };
      }
      if (EN_NODES_SHORT[node.id]) {
        return { title: EN_NODES_SHORT[node.id].title, description: EN_NODES_SHORT[node.id].desc };
      }
      return { title: node.title, description: node.description };
    },
    getPetText: (pet) => {
      if (getLang() === "sv" && SV_PETS[pet.id]) {
        return { species: SV_PETS[pet.id].species, bio: SV_PETS[pet.id].bio };
      }
      return { species: pet.species, bio: pet.bio };
    },
    getRarityLabel: (rarity) => {
      const map = {
        Common: t("rarityCommon"),
        Rare: t("rarityRare"),
        Epic: t("rarityEpic"),
        Mythic: t("rarityMythic")
      };
      return map[rarity] || rarity;
    },
    getShopItemText: (item) => {
      if (getLang() === "sv" && SV_SHOP_ITEMS[item.id]) {
        return SV_SHOP_ITEMS[item.id];
      }
      if (EN_SHOP_SHORT[item.id]) {
        return EN_SHOP_SHORT[item.id];
      }
      return { title: item.title, description: "" };
    },
    getBackdropName: (bg) => {
      if (getLang() === "sv" && SV_BACKDROPS[bg.id]) return SV_BACKDROPS[bg.id];
      if (EN_BACKDROPS_SHORT[bg.id]) return EN_BACKDROPS_SHORT[bg.id];
      return bg.name;
    },
    getStickerName: (stk) => {
      if (getLang() === "sv" && SV_STICKERS[stk.id]) return SV_STICKERS[stk.id];
      return stk.name;
    },
    getCheerQuote: (pet, streak) => {
      if (getLang() === "sv") {
        return SV_CHEERS[streak % SV_CHEERS.length];
      }
      return EN_CHEERS[streak % EN_CHEERS.length];
    }
  };
})();
