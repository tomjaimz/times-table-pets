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

      // Lobby & Stickers
      lobbyTitle: "🏡 {name}'s Pet Lobby",
      lobbyStickersBadge: "✨ {unlocked} / {total} Stickers",
      btnDecorate: "🎨 Decorate & Stickers",
      btnDoneDecorating: "✓ Done Decorating",
      lobbyDragHint: "👆 Drag any sticker to move it!",
      toolbarSelected: "Selected: {emoji} {name}",
      btnBigger: "➕ Bigger",
      btnSmaller: "➖ Smaller",
      btnFlip: "↔️ Flip",
      btnRemove: "🗑️ Remove",
      drawerBackdropLabel: "🖼️ Scene Backdrop:",
      drawerStickerLabel: "✨ Tap an Unlocked Sticker to Place (or Buy New Ones with 💎):",
      btnMysterySticker: "🎁 Mystery Sticker (💎 25)",
      btnAllStickersUnlocked: "🌟 All 24 Unlocked!",
      stkPlace: "➕ Place",

      // Adventure Map
      speedSelectorTitle: "⏱️ Timer Speed & Streak Goal ({streak} in a row):",
      speed3Main: "⚡ 3s Blitz",
      speed5Main: "⭐ 5s Fast",
      speed8Main: "🌱 8s Chill",
      unlocksPet: "🥚 Unlocks {emoji} {name}",
      unlockedPetTag: "✓ {emoji} {name}",
      bestSpeed: "⚡ Best: {sec}s",
      btnPlay: "Play ▶",

      // Practice Tab
      trickyBoosterTitle: "⚡ Tricky Facts Booster",
      trickyBoosterEmpty: "No missed facts logged yet! Complete a few runs or click to practice the classic tricky 6s, 7s, 8s, 9s, and 12s.",
      trickyBoosterFound: "{name}'s current top tricky facts: {list}",
      btnPracticeTricky: "🎯 Practice My Tricky Facts",
      customRunTitle: "🎛️ Build Your Custom Run",
      customRunSub: "Pick which times tables (up to 12) to include in your streak challenge:",
      btnSelectAll: "Select All (1–12)",
      btnSelectHard: "Tricky Tables (6, 7, 8, 9, 12)",
      btnClear: "Clear",
      tableBtnTitle: "×{t} Table",
      tableBtnSub: "{count}/12 strong",
      customTimeLimitLabel: "⏱️ Time Limit per Question",
      customTime3: "⚡ 3 Seconds (Blitz)",
      customTime5: "⭐ 5 Seconds (Fast)",
      customTime8: "🌱 8 Seconds (Chill)",
      customStreakLabel: "🏁 Streak Length (Questions in a Row to Win)",
      customStreak10Default: "10 (Default)",
      customStyleLabel: "🧩 Question Style (Fact-Family Flexibility)",
      styleStandard: "Standard (7 × 8 = ?)",
      styleMix: "✨ Smart Mix (Includes 7 × ❓ = 56)",
      styleMystery: "🧩 Mystery Factor Only (7 × ❓ = 56)",
      btnLaunchCustom: "🚀 Launch Custom Streak Run!",
      customPracticeSessionTitle: "Custom Practice (×{tables})",
      focusedDrillSessionTitle: "Focused Drill (×{tables})",

      // Pets Tab
      petsTitle: "🐾 Magical Pet Sanctuary",
      petsSub: "Beat Adventure levels or hatch Mystery Eggs in the Shop to collect all 24 pets!",
      petsUnlockedLabel: "Unlocked:",
      petLockedBio: "Beat Adventure levels or open Mystery Eggs in the Shop to hatch this friend!",
      btnActiveCompanion: "★ Active Companion",
      btnPickCompanion: "Pick as Companion",
      btnLocked: "🔒 Locked",
      rarityCommon: "Common",
      rarityRare: "Rare",
      rarityEpic: "Epic",
      rarityMythic: "Mythic",

      // Shop Tab & Reward Popups
      shopTitle: "🎁 Magical Gem Shop",
      shopSub: "Trade the Gems you earn from completing streaks for Stickers, Mystery Eggs, or Golden Coupons!",
      btnEditRewardsParent: "⚙️ Edit Rewards (Parent)",
      btnRedeemFor: "💎 Redeem for {cost} Gems",
      couponsTitle: "🎟️ {name}'s Golden Coupons",
      couponsSub: "Show an active Golden Coupon to Mum or Dad to redeem your reward!",
      noCouponsYet: "No Golden Coupons redeemed yet! Earn Gems in Streak Runs and redeem them above.",
      couponRedeemedTag: "(✓ Redeemed)",
      couponActiveTag: "(✨ Active Ticket)",
      couponClaimedBy: "Claimed by {name} on {date}",
      btnCompleted: "Completed ✓",
      btnMarkUsed: "Mark Used (Parent)",
      popupStickerOpenedTitle: "✨ Sticker Pack Opened!",
      popupStickerOpenedSub: "Added straight to {name}'s Pet Lobby! Drag it anywhere you like!",
      popupStickerAwesomeBtn: "Awesome! 🎨",
      popupAllStickersTitle: "🌟 All 24 Stickers Collected!",
      popupAllStickersSub: "{name} already owns every sticker! Here are your 25 Gems back!",
      popupEggHatchedTitle: "🥚 Mystery Egg Hatched!",
      popupEggAwesomeBtn: "Awesome! 🐾",
      popupAllPetsTitle: "🌟 All 24 Pets Collected!",
      popupAllPetsSub: "{name} has already unlocked every Magical Pet in the Sanctuary! Here are +25 Starlight Gems back!",
      popupYayBtn: "Yay!",
      popupCouponHeader: "✨ Official Golden Reward Coupon ✨",
      popupCouponEarnedBy: "Earned by {name} • {date}",
      popupCouponSub: "Show this Golden Coupon to Mum or Dad! It is saved in your Shop Coupon list.",
      popupKeepCouponBtn: "🎉 Keep Golden Coupon",

      // Stats / Metrics Tab
      kpiQuestionsAnswered: "Questions Answered",
      kpiOverallAccuracy: "Overall Accuracy",
      kpiAvgSpeed: "Avg Response Speed",
      kpiFactsMastered: "12×12 Facts Strong/Mastered",
      kpiStreaksConquered: "Streaks Conquered",
      statsTrickyTitle: "🎯 Top Tricky Facts to Conquer",
      statsTrickySub: "Automatically ranked by misses, timeouts, and response speed:",
      btnDrillTricky: "⚡ Drill Tricky Facts",
      noTrickyYet: "No tricky facts flagged yet—play a few rounds and any missed or slow facts will appear here automatically!",
      trickyPillStats: "({acc}% acc • {sec}s • {misses} miss)",
      heatmapTitle: "🗺️ 12×12 Times Table Mastery Heatmap",
      heatmapSub: "Tap any square to inspect {name}'s exact accuracy and average speed (in seconds) for that fact:",
      legendGold: "👑 Mastered (≥90% & <2.2s)",
      legendGreen: "🟢 Strong (≥80% & <3.5s)",
      legendYellow: "🟡 Learning",
      legendRed: "🔴 Needs Practice",
      legendNone: "⚪ Not Tested Yet",
      heatmapTapHint: "👆 Tap any cell in the 12×12 grid above to see detailed speed & accuracy metrics!",
      factNotPracticedYet: "Not practiced yet!",
      factDetailStats: "Seen <strong>{attempts}</strong> times • Accuracy: <strong>{acc}%</strong> ({correct}✓, {wrong}✗, {timeouts}⏱️) • Avg Speed: <strong>{avgSec}s</strong> (Fastest: {bestSec})",
      btnPracticeSingleTable: "Practice ×{a} Table",
      btnPracticeTwoTables: "Practice ×{a} & ×{b}",
      perTableTitle: "📈 Mastery by Times Table (×1 to ×12)",
      perTableSub: "Percentage of facts practiced & mastered in each table, plus average answer speed:",
      perTableRowTitle: "×{t} Times Table",
      perTableRowStats: "{strong}/12 mastered • Acc: {acc} • Avg: {avg}",
      recentRunsTitle: "📜 Recent Streak Runs Log",
      recentRunsSub: "Tracks completed runs, timer speeds, average response times, and how many resets were overcome:",
      noRunsYet: "No streak runs completed yet—start an Adventure level to see run logs here!",
      runRowMeta: "({streak} in a row • {timer}s timer)",
      runRowAvg: "⚡ Avg: {sec}s",
      runRowResets: "🔄 Resets: {resets}",

      // Gameplay Stage
      gameInitialSpeech: "Let's go, {name}! Get {streak} in a row to open the Treasure Chest!",
      gameModeFooter: "{title} • ⏱️ {timer}s Timer • Goal: {streak} in a row",
      gameSubHintStart: "Tap the matching answer!",
      gameSubHintStreak: "🔥 {streak} in a row! Keep going!",
      gameSubHintMystery: "Which number times {factor} makes {prod}?",
      gameCorrectSpeed: "⚡ {sec}s! Great job!",
      gameTapGreenHint: "👆 Tap the green {ans} button below to start your fresh run!",
      gameTimeoutBubbleTap: "Time's up, {name}! {eq} — Tap the green {ans} to go again!",
      gameWrongBubbleTap: "Almost, {name}! {eq} — Tap the green {ans} when you're ready!",
      gameTimeoutSubAuto: "⏰ Time's up! Remember: {eq}",
      gameWrongSubAuto: "💡 Remember: {eq}",
      gameTimeoutBubbleAuto: "Time ran out, {name}! {eq} — Back to 0, let's go again!",
      gameWrongBubbleAuto: "Almost, {name}! {eq} — Back to the start, you've got this!",
      gameFreshStartBubble: "Fresh start, {name}! Let's get all {streak}!",
      badgeSpaced1: "🔄 Spaced Review (1/3)",
      badgeTwin: "🪞 Commutative Twin ({b}×{a} = {a}×{b})",
      badgeBoss: "👑 Final Redemption Boss Fact!",
      badgeRetry: "🔄 Tricky Fact Review",
      badgeAnchor: "⚓ Anchor Fact Link",
      badgeMystery: "🧩 Mystery Factor (Fact Family)",

      // Victory Modal
      victoryFlawlessTitle: "Flawless Streak, {name}! 🎉",
      victoryCompleteTitle: "Streak Complete! 🎉",
      victoryFlawlessSub: "{streak} in a row with ZERO resets!",
      victoryCompleteSub: "{name} conquered all {streak} in a row!",
      victoryTapChestHint: "👆 Tap the Treasure Chest to claim your reward!",
      victoryGemsEarned: "+{gems} Gems",
      victoryAvgLabel: "⚡ Avg:",
      victoryNewPetHeader: "🐾 New Magical Pet Unlocked!",
      victoryNewStickerHeader: "🎨 Bonus Lobby Sticker Won!",
      victoryPlacedInLobby: "Placed in your Pet Lobby!",
      btnPlayAgain: "🔄 Play Again",
      btnContinueAdventure: "🗺️ Continue Adventure",

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

      // Lobby & Stickers
      lobbyTitle: "🏡 {name}s Djurrum",
      lobbyStickersBadge: "✨ {unlocked} / {total} Klistermärken",
      btnDecorate: "🎨 Dekorera & Klistermärken",
      btnDoneDecorating: "✓ Klar med dekorering",
      lobbyDragHint: "👆 Dra ett klistermärke för att flytta det!",
      toolbarSelected: "Vald: {emoji} {name}",
      btnBigger: "➕ Större",
      btnSmaller: "➖ Mindre",
      btnFlip: "↔️ Vänd",
      btnRemove: "🗑️ Ta bort",
      drawerBackdropLabel: "🖼️ Bakgrund:",
      drawerStickerLabel: "✨ Tryck på ett upplåst klistermärke för att placera (eller köp nya med 💎):",
      btnMysterySticker: "🎁 Hemligt klistermärke (💎 25)",
      btnAllStickersUnlocked: "🌟 Alla 24 upplåsta!",
      stkPlace: "➕ Placera",

      // Adventure Map
      speedSelectorTitle: "⏱️ Tid & Svitsmål ({streak} i rad):",
      speed3Main: "⚡ 3s Blixt",
      speed5Main: "⭐ 5s Snabb",
      speed8Main: "🌱 8s Lugn",
      unlocksPet: "🥚 Låser upp {emoji} {name}",
      unlockedPetTag: "✓ {emoji} {name}",
      bestSpeed: "⚡ Bäst: {sec}s",
      btnPlay: "Spela ▶",

      // Practice Tab
      trickyBoosterTitle: "⚡ Träna kluriga tal",
      trickyBoosterEmpty: "Inga missade tal registrerade än! Spela några rundor eller klicka för att öva de kluriga tabellerna 6, 7, 8, 9 och 12.",
      trickyBoosterFound: "{name}s klurigaste tal just nu: {list}",
      btnPracticeTricky: "🎯 Öva mina kluriga tal",
      customRunTitle: "🎛️ Skapa egen runda",
      customRunSub: "Välj vilka multiplikationstabeller (1–12) som ska ingå i utmaningen:",
      btnSelectAll: "Välj alla (1–12)",
      btnSelectHard: "Kluriga tabeller (6, 7, 8, 9, 12)",
      btnClear: "Rensa",
      tableBtnTitle: "{t}:ans tabell",
      tableBtnSub: "{count}/12 starka",
      customTimeLimitLabel: "⏱️ Tidsgräns per fråga",
      customTime3: "⚡ 3 sekunder (Blixt)",
      customTime5: "⭐ 5 sekunder (Snabb)",
      customTime8: "🌱 8 sekunder (Lugn)",
      customStreakLabel: "🏁 Svitlängd (Antal rätt i rad för vinst)",
      customStreak10Default: "10 (Standard)",
      customStyleLabel: "🧩 Frågestil (Talfamiljer)",
      styleStandard: "Standard (7 × 8 = ?)",
      styleMix: "✨ Smart mix (Inkluderar 7 × ❓ = 56)",
      styleMystery: "🧩 Endast hemlig faktor (7 × ❓ = 56)",
      btnLaunchCustom: "🚀 Starta egen runda!",
      customPracticeSessionTitle: "Egen övning (×{tables})",
      focusedDrillSessionTitle: "Fokuserad träning (×{tables})",

      // Pets Tab
      petsTitle: "🐾 Magiska Djurfristaden",
      petsSub: "Klara äventyrsbanor eller kläck mystiska ägg i butiken för att samla alla 24 husdjur!",
      petsUnlockedLabel: "Upplåsta:",
      petLockedBio: "Klara äventyrsbanor eller öppna mystiska ägg i butiken för att kläcka den här vännen!",
      btnActiveCompanion: "★ Aktiv följeslagare",
      btnPickCompanion: "Välj som följeslagare",
      btnLocked: "🔒 Låst",
      rarityCommon: "Vanlig",
      rarityRare: "Sällsynt",
      rarityEpic: "Episk",
      rarityMythic: "Mytisk",

      // Shop Tab & Reward Popups
      shopTitle: "🎁 Magiska Ädelstensbutiken",
      shopSub: "Byt ädelstenarna du tjänar mot klistermärken, mystiska ägg eller guldkuponger!",
      btnEditRewardsParent: "⚙️ Ändra belöningar (Förälder)",
      btnRedeemFor: "💎 Lös in för {cost} ädelstenar",
      couponsTitle: "🎟️ {name}s Guldkuponger",
      couponsSub: "Visa en aktiv guldkupong för mamma eller pappa för att få din belöning!",
      noCouponsYet: "Inga guldkuponger inlösta än! Tjäna ädelstenar och lös in dem ovan.",
      couponRedeemedTag: "(✓ Använd)",
      couponActiveTag: "(✨ Aktiv kupong)",
      couponClaimedBy: "Hämtad av {name} • {date}",
      btnCompleted: "Använd ✓",
      btnMarkUsed: "Markera använd (Förälder)",
      popupStickerOpenedTitle: "✨ Klistermärkespaket öppnat!",
      popupStickerOpenedSub: "Tillagt direkt i {name}s djurrum! Dra det precis dit du vill!",
      popupStickerAwesomeBtn: "Toppen! 🎨",
      popupAllStickersTitle: "🌟 Alla 24 klistermärken samlade!",
      popupAllStickersSub: "{name} har redan alla klistermärken! Här får du dina 25 ädelstenar tillbaka!",
      popupEggHatchedTitle: "🥚 Mystiskt ägg kläckt!",
      popupEggAwesomeBtn: "Toppen! 🐾",
      popupAllPetsTitle: "🌟 Alla 24 husdjur samlade!",
      popupAllPetsSub: "{name} har redan låst upp alla magiska husdjur! Här får du +25 ädelstenar tillbaka!",
      popupYayBtn: "Jippie!",
      popupCouponHeader: "✨ Officiell Guldkupong ✨",
      popupCouponEarnedBy: "Intjänad av {name} • {date}",
      popupCouponSub: "Visa den här guldkupongen för mamma eller pappa! Den finns sparad i din kuponglista.",
      popupKeepCouponBtn: "🎉 Spara guldkupong",

      // Stats / Metrics Tab
      kpiQuestionsAnswered: "Besvarade frågor",
      kpiOverallAccuracy: "Träffsäkerhet",
      kpiAvgSpeed: "Snitthastighet",
      kpiFactsMastered: "12×12 Starka / Bemästrade",
      kpiStreaksConquered: "Avklarade sviter",
      statsTrickyTitle: "🎯 Klurigaste talen att bemästra",
      statsTrickySub: "Rankade automatiskt efter missar, tidsgränser och svarstid:",
      btnDrillTricky: "⚡ Träna kluriga tal",
      noTrickyYet: "Inga kluriga tal registrerade än — spela några rundor så dyker eventuella missade eller långsamma tal upp här automatiskt!",
      trickyPillStats: "({acc}% rätt • {sec}s • {misses} miss)",
      heatmapTitle: "🗺️ 12×12 Multiplikationskarta",
      heatmapSub: "Tryck på valfri ruta för att se {name}s exakta träffsäkerhet och svarstid (i sekunder):",
      legendGold: "👑 Bemästrad (≥90% & <2.2s)",
      legendGreen: "🟢 Stark (≥80% & <3.5s)",
      legendYellow: "🟡 Lär sig",
      legendRed: "🔴 Behöver övas",
      legendNone: "⚪ Ej testad än",
      heatmapTapHint: "👆 Tryck på en ruta i 12×12-rutnätet ovan för att se detaljerad statistik!",
      factNotPracticedYet: "Inte övad än!",
      factDetailStats: "Visad <strong>{attempts}</strong> ggr • Träffsäkerhet: <strong>{acc}%</strong> ({correct}✓, {wrong}✗, {timeouts}⏱️) • Snittid: <strong>{avgSec}s</strong> (Snabbast: {bestSec})",
      btnPracticeSingleTable: "Öva {a}:ans tabell",
      btnPracticeTwoTables: "Öva ×{a} & ×{b}",
      perTableTitle: "📈 Framsteg per tabell (×1 till ×12)",
      perTableSub: "Andel övade och bemästrade tal i varje tabell samt genomsnittlig svarstid:",
      perTableRowTitle: "{t}:ans tabell (×{t})",
      perTableRowStats: "{strong}/12 bemästrade • Rätt: {acc} • Snitt: {avg}",
      recentRunsTitle: "📜 Senaste rundor",
      recentRunsSub: "Visar avklarade sviter, tider, snitthastighet och antal omstarter:",
      noRunsYet: "Inga avklarade sviter än — spela en bana på äventyrskartan för att se din historik här!",
      runRowMeta: "({streak} i rad • {timer}s tid)",
      runRowAvg: "⚡ Snitt: {sec}s",
      runRowResets: "🔄 Omstarter: {resets}",

      // Gameplay Stage
      gameInitialSpeech: "Nu kör vi, {name}! Klarar du {streak} i rad öppnas skattkistan!",
      gameModeFooter: "{title} • ⏱️ {timer}s tid • Mål: {streak} i rad",
      gameSubHintStart: "Tryck på rätt svar!",
      gameSubHintStreak: "🔥 {streak} i rad! Fortsätt så!",
      gameSubHintMystery: "Vilket tal gånger {factor} blir {prod}?",
      gameCorrectSpeed: "⚡ {sec}s! Snyggt jobbat!",
      gameTapGreenHint: "👆 Tryck på den gröna knappen ({ans}) nedan för att börja om!",
      gameTimeoutBubbleTap: "Tiden gick ut, {name}! {eq} — Tryck på gröna {ans} för att köra igen!",
      gameWrongBubbleTap: "Nästan, {name}! {eq} — Tryck på gröna {ans} när du är redo!",
      gameTimeoutSubAuto: "⏰ Tiden gick ut! Kom ihåg: {eq}",
      gameWrongSubAuto: "💡 Kom ihåg: {eq}",
      gameTimeoutBubbleAuto: "Tiden tog slut, {name}! {eq} — Tillbaka till 0, nu tar vi det!",
      gameWrongBubbleAuto: "Nästan, {name}! {eq} — Vi börjar om från start, du fixar det här!",
      gameFreshStartBubble: "Ny start, {name}! Nu tar vi alla {streak}!",
      badgeSpaced1: "🔄 Repetition (1/3)",
      badgeTwin: "🪞 Tvillingtal ({b}×{a} = {a}×{b})",
      badgeBoss: "👑 Sista Boss-frågan!",
      badgeRetry: "🔄 Klurigt tal i repris",
      badgeAnchor: "⚓ Ankartal",
      badgeMystery: "🧩 Hemlig faktor (Talfamilj)",

      // Victory Modal
      victoryFlawlessTitle: "Perfekt svit, {name}! 🎉",
      victoryCompleteTitle: "Sviten klar! 🎉",
      victoryFlawlessSub: "{streak} i rad med NOLL omstarter!",
      victoryCompleteSub: "{name} klarade alla {streak} i rad!",
      victoryTapChestHint: "👆 Tryck på skattkistan för att hämta din belöning!",
      victoryGemsEarned: "+{gems} Ädelstenar",
      victoryAvgLabel: "⚡ Snitt:",
      victoryNewPetHeader: "🐾 Nytt magiskt husdjur upplåst!",
      victoryNewStickerHeader: "🎨 Bonus-klistermärke vunnet!",
      victoryPlacedInLobby: "Placerat i ditt djurrum!",
      btnPlayAgain: "🔄 Spela igen",
      btnContinueAdventure: "🗺️ Fortsätt äventyret",

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

  // Swedish translations for Worlds & Nodes
  const SV_WORLDS = {
    world_1: {
      name: "🌱 Värld 1: Soliga Ängen",
      subtitle: "Grundtabellerna — 1:ans, 2:ans, 5:ans & 10:ans tabell"
    },
    world_2: {
      name: "🌊 Värld 2: Kristallagunen",
      subtitle: "Bygg fart — 3:ans, 4:ans & 11:ans tabell"
    },
    world_3: {
      name: "☁️ Värld 3: Molnriket",
      subtitle: "Kluriga höjder — 6:ans, 7:ans, 8:ans & 9:ans tabell"
    },
    world_4: {
      name: "🔮 Värld 4: Stjärncitadellet",
      subtitle: "Mästarnivå — 12:ans tabell & Stora Mästarprovet"
    }
  };

  const SV_NODES = {
    w1_n1: { title: "1× & 2× Groddstigen", desc: "Dubbla upp och värm upp tassarna!" },
    w1_n2: { title: "5× Klöverhoppet", desc: "Räkna med 5:or över blomsterängen!" },
    w1_n3: { title: "10× Solskensspurten", desc: "Superkraft med tiotal i blixtfart!" },
    w1_boss: { title: "👑 Ängens Boss (1, 2, 5, 10)", desc: "10 i rad på alla fyra grundtabellerna!" },
    w2_n1: { title: "3× Koralltrippeln", desc: "Trippelhopp genom det glittrande revet!" },
    w2_n2: { title: "4× Delfindubbeln", desc: "Dubbla dubbeln för att bemästra 4:orna!" },
    w2_n3: { title: "11× Spegelvågor", desc: "Tvillingtal längs hela vägen till 11×12!" },
    w2_boss: { title: "👑 Lagunens Boss (3, 4, 11)", desc: "Besegra lagunens alla tabeller i en svit!" },
    w3_n1: { title: "6× Regnbågstrappan", desc: "Bygg från 5:ans tabell för att klara 6:orna!" },
    w3_n2: { title: "9× Magiska Nior", desc: "Siffrorna blir alltid 9 tillsammans!" },
    w3_n3: { title: "7× & 8× Himlavalvet", desc: "5, 6, 7, 8 -> 56 = 7 × 8! Du fixar det!" },
    w3_boss: { title: "👑 Molnrikets Boss (6, 7, 8, 9)", desc: "Ultimat fokus på de klurigaste tabellerna!" },
    w4_n1: { title: "12× Stjärndussinet", desc: "10 gånger + 2 gånger = 12:ans magi!" },
    w4_n2: { title: "🔥 Kluriga Eliten (6, 7, 8, 9, 12)", desc: "De svåraste multiplikationerna i ett eldprov!" },
    w4_boss: { title: "🏆 Akademins Stormästare (1–12)", desc: "Alla tabeller 1 till 12! Den ultimata kronan!" }
  };

  // Swedish translations for Pet Species & Bios
  const SV_PETS = {
    pet_owl: { species: "Stjärnuggla", bio: "Älskar sena mattestunder och hoar glatt vid varje snabb svit!" },
    pet_bunny: { species: "Klöverkanin", bio: "Skuttar genom 2:ans och 5:ans tabell snabbare än vinden!" },
    pet_fox: { species: "Solstråleräv", bio: "Smart och kvick — kan alla genvägar i 10:ans tabell!" },
    pet_corgi: { species: "Kunglig Ängscorgi", bio: "Viftar på svansen varje gång du klarar en svit utan missar!" },
    pet_otter: { species: "Korallutter", bio: "Flyter på rygg och jonglerar glänsande snäckor i 3-grupper." },
    pet_dolphin: { species: "Spegeldelfin", bio: "Gör dubbla volter över vågorna med perfekt precision!" },
    pet_seahorse: { species: "Glittersjöhäst", bio: "Glittrar i takt med 11:ans tvillingtal i korallrevet." },
    pet_turtle: { species: "Smaragdsköldpadda", bio: "Lugn i sinnet men blixtsnabb på huvudräkning!" },
    pet_redpanda: { species: "Molnpanda", bio: "Klättrar på regnbågar och älskar knepet med 5 plus 1!" },
    pet_unicorn: { species: "Molnenhörning", bio: "Galopperar över regnbågsbroar och lämnar stjärnstoft efter sig." },
    pet_koala: { species: "Molnbärskoala", bio: "Sover på fluffiga moln och vaknar direkt för 9:ans tabell!" },
    pet_snowleopard: { species: "Frostsnöleopard", bio: "Hoppar från bergstopp till bergstopp på under 3 sekunder!" },
    pet_griffin: { species: "Guldvingad Grip", bio: "Hälften örn, hälften lejon — Molnrikets trogna väktare." },
    pet_kitsune: { species: "Niosvansad Galaxräv", bio: "Fick en lysande svans för varje klurig tabell som bemästrades!" },
    pet_narwhal: { species: "Stjärnnarval", bio: "Simmar genom norrskenet och pekar ut rätt svar med sitt horn." },
    pet_dragon: { species: "Rubindrake", bio: "Vaktar 12×12-skatten och sprutar ofarlig regnbågskonfetti!" },
    pet_phoenix: { species: "Solfenix", bio: "Reser sig ur varje omstart ännu starkare och snabbare än förut!" },
    pet_pegasus: { species: "Kometpegasus", bio: "Flyger i överljudsfart genom alla tabeller från 1 till 12!" },
    pet_kitty: { species: "Nebulosakatt", bio: "Spinner så högt att hela Stjärncitadellet vibrerar av glädje!" },
    pet_penguin: { species: "Glaciärpingvin", bio: "Glider på magen rakt in i mål när skattkistan öppnas!" },
    pet_hedgehog: { species: "Stjärnigelkott", bio: "Rullar ihop sig till en gyllene komet vid varje rätt svar!" },
    pet_axolotl: { species: "Kristallaxolotl", bio: "Ler hela dagen i den magiska lagunen och älskar tvillingtal!" },
    pet_peacock: { species: "Prisma-påfågel", bio: "Slår ut 144 skimrande fjädrar — en för varje tal i 12×12-kartan!" },
    pet_hamster: { species: "Turbokindad Hamster", bio: "Springer i ett gyllene hjul som drivs av snabba multiplikationssviter!" }
  };

  // Swedish translations for Default Shop Items
  const SV_SHOP_ITEMS = {
    reward_sticker_pack: {
      title: "Hemligt Klistermärkespaket",
      description: "Öppna ett glittrande paket och vinn ett nytt flyttbart klistermärke till ditt djurrum!"
    },
    reward_mystery_egg: {
      title: "Mystiskt Magiskt Djurägg",
      description: "Kläck ett nytt slumpmässigt husdjur till din fristad! (Eller +25 bonus-ädelstenar om alla är samlade)"
    },
    reward_screen_time_15: {
      title: "15 minuter extra skärmtid",
      description: "Lös in mot en guldkupong som ger 15 minuter extra skärmtid på iPad/TV!"
    },
    reward_ice_cream: {
      title: "Glass eller speciellt fika",
      description: "Lös in mot en god glass eller fika med mamma eller pappa!"
    },
    reward_movie_pick: {
      title: "Välj familjefilm till myskvällen",
      description: "Guldkupong för att få bestämma vilken film familjen ska titta på!"
    },
    reward_bedtime_15: {
      title: "Vara uppe 15 minuter längre",
      description: "Lös in på helgen för att få stanna uppe 15 minuter längre än vanligt!"
    }
  };

  const SV_BACKDROPS = {
    bg_meadow: "🌈 Regnbågsäng",
    bg_castle: "🏰 Kristallmoln",
    bg_galaxy: "🌌 Stjärngalax",
    bg_beach: "🏖️ Solig lagun"
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

  const SV_CHEERS = [
    "Blixtsnabbt! Fantastiskt jobbat!",
    "Vilken superhjärna! Fortsätt så!",
    "Du flyger fram genom tabellerna!",
    "Magiskt rätt svar!",
    "Skattkistan kommer allt närmare!"
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
    getPedagogicalStrategyLocalized,
    getWorldText: (world) => {
      if (getLang() === "sv" && SV_WORLDS[world.id]) {
        return SV_WORLDS[world.id];
      }
      return { name: world.name, subtitle: world.subtitle };
    },
    getNodeText: (node) => {
      if (getLang() === "sv" && SV_NODES[node.id]) {
        return { title: SV_NODES[node.id].title, description: SV_NODES[node.id].desc };
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
      return { title: item.title, description: item.description };
    },
    getBackdropName: (bg) => {
      if (getLang() === "sv" && SV_BACKDROPS[bg.id]) return SV_BACKDROPS[bg.id];
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
      return pet.cheerQuotes[streak % pet.cheerQuotes.length];
    }
  };
})();
