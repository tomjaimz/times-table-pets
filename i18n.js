// Bilingual Localization Engine: English (en) & Swedish / Svenska (sv)
// Default: English ("en"), switchable anytime via HUD toggle, Startup Prompt, or Parent Settings.

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
      trickyBoosterEmpty: "Play a few rounds first! Every slow or missed fact will automatically appear here for targeted practice.",
      trickyBoosterFound: "Ready to drill {name}'s top tricky facts: {list}",
      btnPracticeTricky: "🎯 Practice My Tricky Facts",
      customRunTitle: "🎛️ Build Your Custom Run",
      customRunSub: "Pick which times tables (up to 12) to include in your streak challenge:",
      btnSelectAll: "Select All (1–12)",
      btnSelectHard: "Tricky Tables (6, 7, 8, 9, 12)",
      btnClear: "Clear",
      customTimeLimitLabel: "⏱️ Time Limit per Question",
      customTime3: "⚡ 3 Seconds (Blitz)",
      customTime5: "⭐ 5 Seconds (Fast)",
      customTime8: "🌱 8 Seconds (Chill)",
      customStreakLabel: "🏁 Streak Length (Questions in a Row to Win)",
      customStyleLabel: "🧩 Question Style (Fact-Family Flexibility)",
      styleStandard: "Standard (7 × 8 = ?)",
      styleMix: "✨ Smart Mix (Includes 7 × ❓ = 56)",
      styleMystery: "🧩 Mystery Factor Only (7 × ❓ = 56)",
      btnLaunchCustom: "🚀 Launch Custom Streak Run!",
      masteredPct: "{pct}% mastered",

      // Pets Tab
      petsTitle: "🐾 Magical Pet Sanctuary",
      petsSub: "Beat Adventure levels or hatch Mystery Eggs in the Shop to collect all 24 pets!",
      petsUnlockedLabel: "Unlocked:",
      petLockedBio: "Beat Adventure levels or open Mystery Eggs in the Shop to hatch this friend!",
      btnActiveCompanion: "★ Active Companion",
      btnPickCompanion: "Pick as Companion",
      btnLocked: "🔒 Locked",

      // Shop Tab
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

      // Stats / Metrics Tab
      kpiAccuracy: "Overall Accuracy",
      kpiTotalSub: "{correct} / {attempts} correct",
      kpiSpeed: "Average Speed",
      kpiSpeedSub: "Goal: Under 3.00s",
      kpiMastered: "Facts Mastered",
      kpiMasteredSub: "{practiced} / 144 practiced",
      kpiRuns: "Completed Streaks",
      kpiRunsSub: "🔥 {streak} day streak",
      statsTrickyTitle: "🎯 Top Tricky Facts to Conquer",
      statsTrickySub: "Automatically ranked by misses, timeouts, and response speed:",
      btnDrillTricky: "⚡ Drill Tricky Facts",
      noTrickyYet: "🌟 No tricky facts detected yet! Play a few streak rounds and any missed or slow facts will appear here.",
      heatmapTitle: "🗺️ 12×12 Times Table Mastery Heatmap",
      heatmapSub: "Tap any square to inspect {name}'s exact accuracy and average speed (in seconds) for that fact:",
      legendGold: "👑 Mastered (≥90% & <2.2s)",
      legendGreen: "🟢 Strong (≥80% & <3.5s)",
      legendYellow: "🟡 Learning",
      legendRed: "🔴 Needs Practice",
      legendNone: "⚪ Not Tested Yet",
      heatmapTapHint: "👆 Tap any cell in the 12×12 grid above to see detailed speed & accuracy metrics!",
      perTableTitle: "📈 Mastery by Times Table (×1 to ×12)",
      perTableSub: "Percentage of facts practiced & mastered in each table, plus average answer speed:",
      recentRunsTitle: "📜 Recent Streak Runs Log",
      recentRunsSub: "Tracks completed runs, timer speeds, average response times, and how many resets were overcome:",
      noRunsYet: "No completed streaks yet — hit the Adventure Path to win your first Treasure Chest!",

      // Gameplay Stage
      gameInitialSpeech: "Let's go, {name}! Get {streak} in a row to open the Treasure Chest!",
      gameSubHintStart: "Tap the matching answer!",
      gameSubHintStreak: "🔥 {streak} in a row! Keep going!",
      gameSubHintMystery: "Which number times {factor} makes {prod}?",
      gameCorrectSpeed: "⚡ {sec}s! Great job!",
      gameTapGreenHint: "👆 Tap the green {ans} button below to start your fresh run!",
      gameTapToContinueCss: "👆 Tap to Continue",
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
      victoryNewPetHeader: "🐾 New Magical Pet Unlocked!",
      victoryNewStickerHeader: "🎨 Bonus Lobby Sticker Won!",
      victoryPlacedInLobby: "Placed in your Pet Lobby!",
      btnPlayAgain: "🔄 Play Again",
      btnContinueAdventure: "🗺️ Continue Adventure",

      // Parent Modal
      parentModalTitle: "⚙️ Parent Settings & Fine-Tuning",
      parentNameLabel: "Child's Name (Displayed in Title & Pet Cheers)",
      parentLangLabel: "Language / Språk (English / Svenska)"
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
      trickyBoosterEmpty: "Spela några rundor först! Alla långsamma eller missade tal dyker automatiskt upp här.",
      trickyBoosterFound: "Redo att träna {name}s klurigaste tal: {list}",
      btnPracticeTricky: "🎯 Öva mina kluriga tal",
      customRunTitle: "🎛️ Skapa egen runda",
      customRunSub: "Välj vilka multiplikationstabeller (1–12) som ska ingå:",
      btnSelectAll: "Välj alla (1–12)",
      btnSelectHard: "Kluriga tabeller (6, 7, 8, 9, 12)",
      btnClear: "Rensa",
      customTimeLimitLabel: "⏱️ Tidsgräns per fråga",
      customTime3: "⚡ 3 sekunder (Blixt)",
      customTime5: "⭐ 5 sekunder (Snabb)",
      customTime8: "🌱 8 sekunder (Lugn)",
      customStreakLabel: "🏁 Svitlängd (Antal rätt i rad för vinst)",
      customStyleLabel: "🧩 Frågestil (Talfamiljer)",
      styleStandard: "Standard (7 × 8 = ?)",
      styleMix: "✨ Smart mix (Inkluderar 7 × ❓ = 56)",
      styleMystery: "🧩 Endast hemlig faktor (7 × ❓ = 56)",
      btnLaunchCustom: "🚀 Starta egen runda!",
      masteredPct: "{pct}% bemästrat",

      // Pets Tab
      petsTitle: "🐾 Magiska Djurfristaden",
      petsSub: "Klara äventyrsbanor eller kläck mystiska ägg i butiken för att samla alla 24 husdjur!",
      petsUnlockedLabel: "Upplåsta:",
      petLockedBio: "Klara äventyrsbanor eller öppna mystiska ägg i butiken för att kläcka den här vännen!",
      btnActiveCompanion: "★ Aktiv följeslagare",
      btnPickCompanion: "Välj som följeslagare",
      btnLocked: "🔒 Låst",

      // Shop Tab
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

      // Stats / Metrics Tab
      kpiAccuracy: "Träffsäkerhet",
      kpiTotalSub: "{correct} / {attempts} rätt",
      kpiSpeed: "Snitthastighet",
      kpiSpeedSub: "Mål: Under 3.00s",
      kpiMastered: "Bemästrade tal",
      kpiMasteredSub: "{practiced} / 144 övade",
      kpiRuns: "Klara sviter",
      kpiRunsSub: "🔥 {streak} dagar i rad",
      statsTrickyTitle: "🎯 Klurigaste talen att bemästra",
      statsTrickySub: "Rankade automatiskt efter missar, tidsgränser och svarstid:",
      btnDrillTricky: "⚡ Träna kluriga tal",
      noTrickyYet: "🌟 Inga kluriga tal hittade än! Spela några rundor så dyker eventuella missade tal upp här.",
      heatmapTitle: "🗺️ 12×12 Multiplikationskarta",
      heatmapSub: "Tryck på valfri ruta för att se {name}s exakta träffsäkerhet och svarstid:",
      legendGold: "👑 Bemästrad (≥90% & <2.2s)",
      legendGreen: "🟢 Stark (≥80% & <3.5s)",
      legendYellow: "🟡 Lär sig",
      legendRed: "🔴 Behöver övas",
      legendNone: "⚪ Ej testad än",
      heatmapTapHint: "👆 Tryck på en ruta i 12×12-rutnätet ovan för att se detaljerad statistik!",
      perTableTitle: "📈 Framsteg per tabell (×1 till ×12)",
      perTableSub: "Andel övade och bemästrade tal i varje tabell samt genomsnittlig svarstid:",
      recentRunsTitle: "📜 Senaste rundor",
      recentRunsSub: "Visar avklarade sviter, tider, snitthastighet och antal omstarter:",
      noRunsYet: "Inga avklarade sviter än — spela en bana på äventyrskartan för att öppna din första skattkista!",

      // Gameplay Stage
      gameInitialSpeech: "Nu kör vi, {name}! Klarar du {streak} i rad öppnas skattkistan!",
      gameSubHintStart: "Tryck på rätt svar!",
      gameSubHintStreak: "🔥 {streak} i rad! Fortsätt så!",
      gameSubHintMystery: "Vilket tal gånger {factor} blir {prod}?",
      gameCorrectSpeed: "⚡ {sec}s! Snyggt jobbat!",
      gameTapGreenHint: "👆 Tryck på den gröna knappen ({ans}) nedan för att börja om!",
      gameTapToContinueCss: "👆 Tryck för att fortsätta",
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
      victoryNewPetHeader: "🐾 Nytt magiskt husdjur upplåst!",
      victoryNewStickerHeader: "🎨 Bonus-klistermärke vunnet!",
      victoryPlacedInLobby: "Placerat i ditt djurrum!",
      btnPlayAgain: "🔄 Spela igen",
      btnContinueAdventure: "🗺️ Fortsätt äventyret",

      // Parent Modal
      parentModalTitle: "⚙️ Föräldrainställningar",
      parentNameLabel: "Barnets namn (visas i titel och hejarop)",
      parentLangLabel: "Språk / Language (Svenska / English)"
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
    try {
      const raw = localStorage.getItem("jemima_pet_academy_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.settings?.language === "sv") return "sv";
      }
    } catch (_) {}
    return window.CURRENT_LANG || "en";
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
    if (getLang() !== "sv") return null; // Caller falls back to English
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
      langBtn.title = lang === "sv" ? "Byt språk till Engelska (Switch to English)" : "Switch language to Swedish (Byt till Svenska)";
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

    // Welcome Modal
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setTxt("onboarding-title-text", t("welcomeTitle"));
    setTxt("onboarding-sub-text", t("welcomeSub"));
    setTxt("onboarding-lang-label", t("welcomeLangLabel"));
    setTxt("onboarding-name-label", t("welcomeNameLabel"));
    setTxt("onboarding-speed-label", t("welcomeSpeedLabel"));
    setTxt("btn-onboarding-start-local", t("welcomeStartBtn"));
    setTxt("onboarding-start-sub", t("welcomeStartSub"));
    setTxt("btn-onboarding-open-cloud", t("welcomeParentLoginBtn"));

    const namePreview = document.getElementById("onboarding-name-preview");
    const nameInput = document.getElementById("onboarding-input-name");
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

    // Victory Modal
    setTxt("victory-tap-chest-hint", t("victoryTapChestHint"));
    setTxt("btn-victory-replay", t("btnPlayAgain"));
    setTxt("btn-victory-continue", t("btnContinueAdventure"));
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
