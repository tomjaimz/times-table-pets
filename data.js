// Jemima's Magical Pet Academy - Game Data, Adventure Path, Pets & Default Shop

window.GAME_DATA = {
  defaultSettings: {
    playerName: "Jemima",
    defaultStreakLength: 10,
    defaultTimerSeconds: 3,
    soundEnabled: true,
    teachingPauseMs: 1700,
    requireTapOnMiss: true,
    showVisualArrayOnMiss: true,
    questionStyle: "mix", // "standard" | "mix" (20% mystery factor) | "mystery"
    parentPin: "1212"
  },

  timerModes: [
    {
      id: "blitz",
      seconds: 3,
      label: "⚡ 3s Blitz",
      sub: "Jemima's Challenge! (2× Gems)",
      stars: 3,
      gemMultiplier: 2.0,
      color: "#ff9600"
    },
    {
      id: "fast",
      seconds: 5,
      label: "⭐ 5s Fast",
      sub: "Steady Speed (1.5× Gems)",
      stars: 2,
      gemMultiplier: 1.5,
      color: "#1cb0f6"
    },
    {
      id: "chill",
      seconds: 8,
      label: "🌱 8s Warmup",
      sub: "Learn the Table (1× Gems)",
      stars: 1,
      gemMultiplier: 1.0,
      color: "#58cc02"
    }
  ],

  worlds: [
    {
      id: "woods",
      name: "World 1: Whispering Woods",
      subtitle: "Build unstoppable rhythm with 1s, 2s, 5s, and 10s!",
      themeColor: "#58cc02",
      bgGradient: "linear-gradient(135deg, #e8f9d5 0%, #d0f4de 100%)",
      nodes: [
        {
          id: "lvl_1",
          title: "1× & 2× Sprout Path",
          tables: [1, 2],
          icon: "🌱",
          baseGems: 20,
          unlockPetId: "pet_owl",
          description: "Double up! Warm up your fingers with 1s and 2s."
        },
        {
          id: "lvl_2",
          title: "5× High-Five Meadow",
          tables: [5],
          icon: "🖐️",
          baseGems: 25,
          unlockPetId: "pet_fox",
          description: "Count by fives all the way to 60!"
        },
        {
          id: "lvl_3",
          title: "10× Starry Stream",
          tables: [10],
          icon: "✨",
          baseGems: 25,
          unlockPetId: "pet_axolotl",
          description: "Super-fast tens! Add that zero with style."
        },
        {
          id: "lvl_4",
          title: "Woods Boss: 1, 2, 5, 10",
          tables: [1, 2, 5, 10],
          icon: "👑",
          isBoss: true,
          baseGems: 40,
          unlockPetId: "pet_redpanda",
          description: "Mix all four Whispering Woods tables together!"
        }
      ]
    },
    {
      id: "caves",
      name: "World 2: Crystal Caves",
      subtitle: "Light up the glowing caverns with 3s, 4s, and 6s!",
      themeColor: "#1cb0f6",
      bgGradient: "linear-gradient(135deg, #dff4ff 0%, #d8e8ff 100%)",
      nodes: [
        {
          id: "lvl_5",
          title: "3× Magic Triangles",
          tables: [3],
          icon: "💎",
          baseGems: 30,
          unlockPetId: "pet_hedgehog",
          description: "Master the rhythm of 3s up to 3 × 12!"
        },
        {
          id: "lvl_6",
          title: "4× Quartz Cavern",
          tables: [4],
          icon: "🔮",
          baseGems: 30,
          unlockPetId: "pet_penguin",
          description: "Double-double! Conquer the 4 times table."
        },
        {
          id: "lvl_7",
          title: "6× Sapphire Bridge",
          tables: [6],
          icon: "🦋",
          baseGems: 35,
          unlockPetId: "pet_seadragon",
          description: "Step across the glowing crystals with your 6s!"
        },
        {
          id: "lvl_8",
          title: "Cave Boss: 3, 4 & 6 Mix",
          tables: [3, 4, 6],
          icon: "🏆",
          isBoss: true,
          baseGems: 50,
          unlockPetId: "pet_unicorn",
          description: "Can you beat the Crystal Cave Guardian in a row?"
        }
      ]
    },
    {
      id: "clouds",
      name: "World 3: Cloud Kingdom",
      subtitle: "Soar high with the tricky 7s, 8s, and 9s!",
      themeColor: "#ce82ff",
      bgGradient: "linear-gradient(135deg, #f3e5ff 0%, #fde2ff 100%)",
      nodes: [
        {
          id: "lvl_9",
          title: "9× Finger-Trick Skyway",
          tables: [9],
          icon: "🌈",
          baseGems: 35,
          unlockPetId: "pet_koala",
          description: "The digits always add up to 9! Fly through the 9s."
        },
        {
          id: "lvl_10",
          title: "7× Rainbow Citadel",
          tables: [7],
          icon: "⚡",
          baseGems: 40,
          unlockPetId: "pet_snowleopard",
          description: "Tame the famous 7 times table!"
        },
        {
          id: "lvl_11",
          title: "8× Thunder Cloud",
          tables: [8],
          icon: "🌩️",
          baseGems: 40,
          unlockPetId: "pet_griffin",
          description: "Power through 8 × 1 all the way to 8 × 12!"
        },
        {
          id: "lvl_12",
          title: "Sky Boss: 7, 8 & 9 Mix",
          tables: [7, 8, 9],
          icon: "👑",
          isBoss: true,
          baseGems: 60,
          unlockPetId: "pet_kitsune",
          description: "Conquer the Cloud Kingdom's toughest trio!"
        }
      ]
    },
    {
      id: "summit",
      name: "World 4: Starlight Summit",
      subtitle: "Reach the top of the mountain with 11s, 12s & the Grand Crown!",
      themeColor: "#ff9600",
      bgGradient: "linear-gradient(135deg, #fff3d6 0%, #ffe4e1 100%)",
      nodes: [
        {
          id: "lvl_13",
          title: "11× Twin Star Peak",
          tables: [11],
          icon: "🌠",
          baseGems: 35,
          unlockPetId: "pet_narwhal",
          description: "Twin digits up to 99, plus 110, 121, and 132!"
        },
        {
          id: "lvl_14",
          title: "12× Dozen Dragon Ridge",
          tables: [12],
          icon: "🐉",
          baseGems: 45,
          unlockPetId: "pet_dragon",
          description: "Master the mighty 12s up to 12 × 12 = 144!"
        },
        {
          id: "lvl_15",
          title: "Tricky Upper Mix (6–12)",
          tables: [6, 7, 8, 9, 11, 12],
          icon: "🔥",
          isBoss: true,
          baseGems: 65,
          unlockPetId: "pet_phoenix",
          description: "All the big tables together in one epic climb!"
        },
        {
          id: "lvl_16",
          title: "Grand 12×12 Master Crown",
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          icon: "💎",
          isBoss: true,
          baseGems: 100,
          unlockPetId: "pet_celestial_cat",
          description: "Every table from 1 to 12! Prove you are the Grand Times Table Champion!"
        }
      ]
    }
  ],

  pets: [
    {
      id: "pet_owl",
      name: "Pippin",
      species: "Snowy Owlet",
      emoji: "🦉",
      rarity: "Common",
      bg: "#e6f8ff",
      accent: "#1cb0f6",
      bio: "Loves midnight math puzzles and cheering Jemima on from the treetops!",
      cheerQuotes: [
        "Hoot hoot! You're flying, Jemima!",
        "Sharp eyes, sharp mind!",
        "Keep that streak soaring!"
      ]
    },
    {
      id: "pet_fox",
      name: "Luna",
      species: "Starlight Fox",
      emoji: "🦊",
      rarity: "Common",
      bg: "#fff0e0",
      accent: "#ff9600",
      bio: "Quick as a flash! Luna's tail sparkles brighter with every fast answer.",
      cheerQuotes: [
        "Super speedy, Jemima!",
        "Quick paws, quick brain!",
        "Nothing gets past us!"
      ]
    },
    {
      id: "pet_axolotl",
      name: "Boba",
      species: "Bubble Axolotl",
      emoji: "🦎",
      rarity: "Rare",
      bg: "#ffe6f4",
      accent: "#ff66b3",
      bio: "Floats happily in crystal streams and blowspink magic bubbles when you score!",
      cheerQuotes: [
        "Bloop bloop! Amazing job, Jemima!",
        "You make times tables look easy!",
        "Bubble power activated!"
      ]
    },
    {
      id: "pet_redpanda",
      name: "Mochi",
      species: "Bamboo Red Panda",
      emoji: "🐼",
      rarity: "Rare",
      bg: "#ffe9e0",
      accent: "#ff6b35",
      bio: "Does a standing happy-paws dance every time a treasure chest opens!",
      cheerQuotes: [
        "Paws up! You're on a roll!",
        "Mochi believes in you, Jemima!",
        "One more for the chest!"
      ]
    },
    {
      id: "pet_hedgehog",
      name: "Bramble",
      species: "Crystal Hedgehog",
      emoji: "🦔",
      rarity: "Common",
      bg: "#f0ebff",
      accent: "#9068ff",
      bio: "His quills are made of amethyst crystals that chime like bells!",
      cheerQuotes: [
        "Ding! Right on target!",
        "Rolling straight to victory!",
        "Crystal clear thinking!"
      ]
    },
    {
      id: "pet_penguin",
      name: "Pebble",
      species: "Frosty Penguin",
      emoji: "🐧",
      rarity: "Common",
      bg: "#e3f5ff",
      accent: "#0099e6",
      bio: "Belly-slides across icy multiplication problems at 3-second blitz speed!",
      cheerQuotes: [
        "Slide right to the finish!",
        "Ice-cold focus, Jemima!",
        "Waddle we do next? Win!"
      ]
    },
    {
      id: "pet_seadragon",
      name: "Coralia",
      species: "Leafy Sea Dragon",
      emoji: "🐠",
      rarity: "Rare",
      bg: "#e0fff7",
      accent: "#00b894",
      bio: "Glides through sapphire lagoon caves collecting glowing pearls of wisdom.",
      cheerQuotes: [
        "Smooth as ocean waves!",
        "Look at that streak shimmer!",
        "Splash! Another right answer!"
      ]
    },
    {
      id: "pet_unicorn",
      name: "Astra",
      species: "Cloud Unicorn",
      emoji: "🦄",
      rarity: "Epic",
      bg: "#f9e8ff",
      accent: "#ce82ff",
      bio: "Gallops across rainbow bridges and leaves stardust trails behind fast streaks.",
      cheerQuotes: [
        "Pure magic, Jemima!",
        "Your rainbow streak is glowing!",
        "Gallop all the way to 10!"
      ]
    },
    {
      id: "pet_koala",
      name: "Kip",
      species: "Cloudberry Koala",
      emoji: "🐨",
      rarity: "Common",
      bg: "#eef2ff",
      accent: "#6c7ae0",
      bio: "Naps on fluffy cumulus clouds and wakes up instantly for 9 times tables!",
      cheerQuotes: [
        "Cozy and confident!",
        "You've got the magic touch!",
        "High in the clouds, Jemima!"
      ]
    },
    {
      id: "pet_snowleopard",
      name: "Zephyr",
      species: "Frost Snow Leopard",
      emoji: "🐆",
      rarity: "Rare",
      bg: "#eef7ff",
      accent: "#3b82f6",
      bio: "Leaps from peak to peak in under 3 seconds without ever missing a footing.",
      cheerQuotes: [
        "Lightning leap! Great answer!",
        "Fierce focus, Jemima!",
        "No mountain is too high!"
      ]
    },
    {
      id: "pet_griffin",
      name: "Skye",
      species: "Golden Feather Griffin",
      emoji: "🦅",
      rarity: "Epic",
      bg: "#fff6db",
      accent: "#f59e0b",
      bio: "Half eagle, half lion, 100% loyal guardian of the Cloud Kingdom.",
      cheerQuotes: [
        "Wings out! Soaring past the 8s!",
        "Golden streak incoming!",
        "Brave and brilliant!"
      ]
    },
    {
      id: "pet_kitsune",
      name: "Kiko",
      species: "Nine-Tail Galaxy Kitsune",
      emoji: "🦊",
      rarity: "Epic",
      bg: "#f3e5ff",
      accent: "#a855f7",
      bio: "Earned one glowing tail for every tricky times table mastered in the sky!",
      cheerQuotes: [
        "Cosmic brainpower, Jemima!",
        "Nine tails cheering for you!",
        "Dazzling speed!"
      ]
    },
    {
      id: "pet_narwhal",
      name: "Nova",
      species: "Starlight Narwhal",
      emoji: "🐳",
      rarity: "Rare",
      bg: "#e0f2fe",
      accent: "#0284c7",
      bio: "Swims through the northern lights and points her horn at the right answer.",
      cheerQuotes: [
        "Pointing straight to the top!",
        "Narwhal nod of approval!",
        "Making waves, Jemima!"
      ]
    },
    {
      id: "pet_dragon",
      name: "Ember",
      species: "Ruby Crystal Dragon",
      emoji: "🐲",
      rarity: "Epic",
      bg: "#ffe4e6",
      accent: "#e11d48",
      bio: "Guards the 12×12 hoard of gems and breathes harmless rainbow confetti!",
      cheerQuotes: [
        "ROAR! That was blazing fast!",
        "Dragon-sized streak!",
        "The treasure chest is almost ours!"
      ]
    },
    {
      id: "pet_phoenix",
      name: "Solara",
      species: "Sunbeam Phoenix",
      emoji: "🐦‍🔥",
      rarity: "Mythic",
      bg: "#ffedd5",
      accent: "#ea580c",
      bio: "Even if a streak resets to zero, Solara rises brighter and faster every single time!",
      cheerQuotes: [
        "Rising higher every try, Jemima!",
        "Unstoppable fire!",
        "Shine bright like a phoenix!"
      ]
    },
    {
      id: "pet_celestial_cat",
      name: "Cosmos",
      species: "Celestial Crown Kitten",
      emoji: "🐱",
      rarity: "Mythic",
      bg: "#fae8ff",
      accent: "#c026d3",
      bio: "Wears the 12×12 Grand Master Crown and purrs at the frequency of pure genius.",
      cheerQuotes: [
        "Purr-fect calculation, Grand Master Jemima!",
        "You rule the 12×12 galaxy!",
        "Out of this world!"
      ]
    },
    // Bonus Mystery Egg Hatchable Pets
    {
      id: "pet_bunny",
      name: "Clover",
      species: "Velvet Lop Bunny",
      emoji: "🐰",
      rarity: "Common",
      bg: "#ecfccb",
      accent: "#65a30d",
      bio: "Hatched from a Mystery Egg! Hops in happy circles whenever you beat a timer.",
      cheerQuotes: [
        "Hop, skip, and correct!",
        "Lucky Clover is with you!",
        "Bouncing to the treasure chest!"
      ]
    },
    {
      id: "pet_otter",
      name: "Skipper",
      species: "River Pearl Otter",
      emoji: "🦦",
      rarity: "Rare",
      bg: "#e0f2fe",
      accent: "#0369a1",
      bio: "Keeps his favorite lucky multiplication stone in his pocket at all times!",
      cheerQuotes: [
        "Otter-ly fantastic, Jemima!",
        "Float cool, tap fast!",
        "High paws!"
      ]
    },
    {
      id: "pet_flamingo",
      name: "Coral",
      species: "Sunset Flamingo",
      emoji: "🦩",
      rarity: "Rare",
      bg: "#ffe4e6",
      accent: "#f43f5e",
      bio: "Balances on one leg while solving 12s in under 3 seconds!",
      cheerQuotes: [
        "Fabulous balance and speed!",
        "Stand tall, tap fast!",
        "Pink feather power!"
      ]
    },
    {
      id: "pet_dolphin",
      name: "Echo",
      species: "Prism Dolphin",
      emoji: "🐬",
      rarity: "Epic",
      bg: "#cffafe",
      accent: "#0891b2",
      bio: "Backflips over the progress bar whenever Jemima hits a 5-in-a-row combo!",
      cheerQuotes: [
        "Splash! Backflip worthy!",
        "Riding the streak wave!",
        "Click-whistle hooray!"
      ]
    },
    {
      id: "pet_buttercup",
      name: "Sunny",
      species: "Honeybee Bear",
      emoji: "🧸",
      rarity: "Common",
      bg: "#fef9c3",
      accent: "#ca8a04",
      bio: "Sweet as honey and always ready with a warm hug after a tricky round.",
      cheerQuotes: [
        "Sweet as honey, Jemima!",
        "Bear-y impressive speed!",
        "Keep buzzing along!"
      ]
    },
    {
      id: "pet_peacock",
      name: "Opal",
      species: "Starlight Peacock",
      emoji: "🦚",
      rarity: "Epic",
      bg: "#d1fae5",
      accent: "#059669",
      bio: "Fanned tail feathers show 144 shimmering eyes—one for every times table fact!",
      cheerQuotes: [
        "Dazzling display of math!",
        "Show off those skills, Jemima!",
        "Brilliant as an opal!"
      ]
    },
    {
      id: "pet_pegasus",
      name: "Nimbus",
      species: "Winged Pegasus Foal",
      emoji: "🐎",
      rarity: "Mythic",
      bg: "#e0e7ff",
      accent: "#4f46e5",
      bio: "Flies faster than a 3-second timer across the Starlight Summit.",
      cheerQuotes: [
        "Thunder hooves in the sky!",
        "3 seconds is plenty for us!",
        "Fly to the finish, Jemima!"
      ]
    },
    {
      id: "pet_hamster",
      name: "Pip",
      species: "Turbo Cheek Hamster",
      emoji: "🐹",
      rarity: "Common",
      bg: "#ffedd5",
      accent: "#d97706",
      bio: "Runs on a golden wheel powered purely by rapid-fire multiplication streaks!",
      cheerQuotes: [
        "Turbo wheel spinning at max speed!",
        "Store those gems in your cheeks!",
        "Go, Jemima, go!"
      ]
    }
  ],

  defaultShopRewards: [
    {
      id: "reward_sticker_pack",
      title: "Mystery Lobby Sticker Pack",
      description: "Peel open a shiny sticker pack to win a new draggable sticker for your Pet Lobby!",
      cost: 25,
      icon: "✨",
      type: "sticker_pack"
    },
    {
      id: "reward_mystery_egg",
      title: "Mystery Magical Pet Egg",
      description: "Hatch a random new collectible pet for your Sanctuary! (Or +25 bonus sparkles if all collected)",
      cost: 60,
      icon: "🥚",
      type: "egg"
    },
    {
      id: "reward_screen_time_15",
      title: "15 Minutes Extra Screen Time",
      description: "Redeem for a Golden Coupon good for 15 bonus minutes of iPad / screen time!",
      cost: 100,
      icon: "📱",
      type: "coupon"
    },
    {
      id: "reward_ice_cream",
      title: "Special Treat or Ice Cream",
      description: "Redeem for a sweet treat or ice cream outing with Dad/Mum!",
      cost: 180,
      icon: "🍦",
      type: "coupon"
    },
    {
      id: "reward_movie_pick",
      title: "Jemima Picks Family Movie",
      description: "Golden Coupon to pick the movie for family movie night!",
      cost: 220,
      icon: "🎬",
      type: "coupon"
    },
    {
      id: "reward_bedtime_15",
      title: "Stay Up 15 Minutes Later",
      description: "Redeem on a weekend night to stay up 15 minutes past normal bedtime!",
      cost: 150,
      icon: "🌙",
      type: "coupon"
    }
  ],

  lobbyBackgrounds: [
    {
      id: "bg_meadow",
      name: "🌈 Rainbow Meadow",
      css: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 58%, #86efac 58%, #4ade80 100%)"
    },
    {
      id: "bg_castle",
      name: "🏰 Crystal Cloud",
      css: "linear-gradient(180deg, #f3e8ff 0%, #fae8ff 60%, #f9a8d4 60%, #f472b6 100%)"
    },
    {
      id: "bg_galaxy",
      name: "🌌 Starlight Galaxy",
      css: "linear-gradient(180deg, #1e1b4b 0%, #312e81 62%, #4c1d95 62%, #6d28d9 100%)"
    },
    {
      id: "bg_beach",
      name: "🏖️ Sunny Lagoon",
      css: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 56%, #fde68a 56%, #fcd34d 100%)"
    }
  ],

  stickers: [
    { id: "stk_star", name: "Golden Star", emoji: "⭐", cost: 20 },
    { id: "stk_blossom", name: "Cherry Blossom", emoji: "🌸", cost: 20 },
    { id: "stk_crown", name: "Royal Crown", emoji: "👑", cost: 30 },
    { id: "stk_rainbow", name: "Magic Rainbow", emoji: "🌈", cost: 30 },
    { id: "stk_cupcake", name: "Sprinkle Cupcake", emoji: "🧁", cost: 25 },
    { id: "stk_wand", name: "Fairy Wand", emoji: "🪄", cost: 35 },
    { id: "stk_heart", name: "Sparkle Heart", emoji: "💖", cost: 20 },
    { id: "stk_castle", name: "Fairy Castle", emoji: "🏰", cost: 45 },
    { id: "stk_butterfly", name: "Blue Butterfly", emoji: "🦋", cost: 25 },
    { id: "stk_donut", name: "Frosted Donut", emoji: "🍩", cost: 25 },
    { id: "stk_guitar", name: "Rockstar Guitar", emoji: "🎸", cost: 35 },
    { id: "stk_rocket", name: "Space Rocket", emoji: "🚀", cost: 35 },
    { id: "stk_teddy", name: "Cozy Teddy", emoji: "🧸", cost: 30 },
    { id: "stk_diamond", name: "Mega Diamond", emoji: "💎", cost: 40 },
    { id: "stk_balloon", name: "Party Balloon", emoji: "🎈", cost: 20 },
    { id: "stk_icecream", name: "Swirl Cone", emoji: "🍦", cost: 25 },
    { id: "stk_sun", name: "Happy Sun", emoji: "🌞", cost: 25 },
    { id: "stk_moon", name: "Crescent Moon", emoji: "🌙", cost: 25 },
    { id: "stk_bow", name: "Pink Ribbon", emoji: "🎀", cost: 20 },
    { id: "stk_mushroom", name: "Fairy Toadstool", emoji: "🍄", cost: 25 },
    { id: "stk_crystal", name: "Fortune Orb", emoji: "🔮", cost: 40 },
    { id: "stk_pizza", name: "Pizza Slice", emoji: "🍕", cost: 25 },
    { id: "stk_ufo", name: "Cosmic UFO", emoji: "🛸", cost: 40 },
    { id: "stk_trophy", name: "Champion Trophy", emoji: "🏆", cost: 45 }
  ]
};
