// --- AUDIO CONFIGURATION ---
const SONG_MENU = "https://terraria.wiki.gg/images/Music-Eerie.mp3";
const SONG_FIGHT = "https://terraria.wiki.gg/images/Music-Ocean_Day.mp3";
const SONG_BOSS = "https://terraria.wiki.gg/images/Music-The_Towers_%28Otherworldly%29.mp3";
const SONG_CRAFTING = "https://terraria.wiki.gg/images/Music-Alternate_Underground.mp3";

// --- GAME STATE VARIABLES ---
let bossAttackCount = 0;
let dodgeTimeLeft = 40;
let dodgeSurvivalTimer = null;
let isDodging = false;
let currentUser = null, hero = "Addy", heroHP = 100, maxHeroHP = 150, enemyHP = 50, maxEnemyHP = 50;
let level = 1, age = 5, coins = 0;
let currentAnswer, soundsMuted = false, difficulty = "Normal", resetCount = 0, enemyDmg = 40, equippedWeapon = null;
let equippedPet = null, petDamageBoost = 0;
let equippedSecondPet = null;
let ownedPets = [];
let lifeSpiritActive = false;

// Quest System Variables
let currentQuest = 0;
let questProgress = 0;
let godEasyDefeats = 0;
let godHardDefeats = 0;
let ownedHeroes = ["Addy"], inventory = [], timeLeft = 20, gameTimer = null;
let attackBarActive = false, sweepPos = 0, sweepDirection = 1, sweepInterval = null;
let hpLevel = 0; let dmgLevel = 0;
let scytheHits = 0;

let BOSS_TRIGGER = 10;
const MAX_LEVEL = 500;

const weaponStats = {
    'SWORD': 30, 'HORNET_STAFF': 60, 'MASTER_SWORD': 90, 'FROST_STAFF': 120,
    'STARDUST_STAFF': 150, 'VOID_SWORD': 180, 'PIRATE_STAFF': 200, 'BONE_BREAKER': 200, 'CRYSTAL_STAFF': 220,
    'KAIDO_WHIP': 250, 'TERRAPRISMA': 700, 'POTION': 20, 'POTION_ONE': 30, 'SKELETON_STAFF': 400, 'SOUL_SCYTHE': 1500, 'LEAD_BROADSWORD': 190,
    'TERRARIAN_SABER': 6700, 'TERRARIAN_SPEAR': 10, 'BRAND_OF_INFERNO': 450, 'CRYSTAL': 0, 'STARDUST': 0,
    'VOLCANO': 67000, 'DEVOUR_PRIDE': 9000000
};

const itemIcons = {
    'POTION': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/6/67/Recall_Potion.png',
    'POTION_ONE': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/9f/Flask_of_Party.png',
    'SWORD': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/a/ab/Falcon_Blade.png',
    'HORNET_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/4/4f/Hornet_Staff.png',
    'MASTER_SWORD': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/1/13/Light%27s_Bane.png',
    'FROST_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/2/20/Staff_of_the_Frost_Hydra.png',
    'STARDUST_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/a/a9/Stardust_Dragon_Staff.png',
    'VOID_SWORD': 'https://i.pinimg.com/originals/51/78/34/517834b4965a7a984d934f68ace0774a.gif',
    'PIRATE_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/3/3e/Pirate_Staff.png',
    'CRYSTAL_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/1/13/Rainbow_Crystal_Staff.png',
    'KAIDO_WHIP': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/86/Kaleidoscope.png',
    'TERRAPRISMA': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/b/b0/Terraprisma.png',
    'SKELETON_STAFF': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/2/29/Bone_Sword.png',
    'BONE_BREAKER': 'https://terraria.wiki.gg/images/Breaker_Blade.png',
    'SOUL_SCYTHE': 'https://terraria.wiki.gg/images/Soul_Scythe.png',
    'LEAD_BROADSWORD': 'https://terraria.wiki.gg/images/Lead_Broadsword.png',
    'TERRARIAN_SABER': 'https://thoriummod.wiki.gg/images/Terrarium_Saber.png',
    'TERRARIAN_SPEAR': 'https://thoriummod.wiki.gg/images/Terrarium_Spear.png',
    'BRAND_OF_INFERNO': 'https://terraria.wiki.gg/images/Brand_of_the_Inferno.png',
    'CRYSTAL': 'https://terraria.wiki.gg/images/Crystal_Shard.png',
    'STARDUST': 'https://static.wikia.nocookie.net/terraria_gamepedia/images/a/a9/Stardust_Dragon_Staff.png',
    'VOLCANO': 'https://terraria.wiki.gg/images/Volcano.png',
    'DEVOUR_PRIDE': 'https://terraria.wiki.gg/images/Eventide.png'
};

const heroStats = {
    Addy: { dmg: 20, price: 0 },
    Subtra: { dmg: 35, price: 800 },
    Max: { dmg: 60, price: 2500 },
    Divina: { dmg: 100, price: 5000 },
    Lastly: { dmg: 400, price: 20000 }
};

const heroImages = {
    Addy: "https://terraria.wiki.gg/images/Ninja_armor.png",
    Subtra: "https://terraria.wiki.gg/images/Djinn%27s_Curse_%28equipped%29.gif",
    Max: "https://terraria.wiki.gg/images/Obsidian_armor_female.png",
    Divina: "https://terraria.wiki.gg/images/Crimson_armor.png",
    Lastly: "https://terraria.wiki.gg/images/Frost_armor.png"
};

const petData = {
    'WYVERN_PUP': { name: "Wyvern Pup", price: 350000, dmg: 13000, desc: "+13K Damage" },
    'LYRIST': { name: "Lyrist", price: 780000, dmg: 23000, desc: "+23K Damage" },
    'BEET_COOKIE': { name: "Beet Cookie", price: 250000, dmg: 8000, desc: "+8K Damage" },
    'AMNESIAC': { name: "Amnesiac", price: 150000, dmg: 4000, desc: "+4K Damage" },
    'LIL_MAID': { name: "Lil' Maid", price: 500000, dmg: 19000, desc: "+19K Damage" },
    'EXOTIC_MYNA': { name: "Exotic Myna", price: 80000, dmg: 2000, desc: "+2K Damage" },
    'TORTLE_SAGE': { name: "Tortle Sage", price: 40000, dmg: 1000, desc: "+1K Damage" },
    'TANUKI_GIRL': { name: "Tanuki Girl", price: 20000, dmg: 500, desc: "+500 Damage" },
    'MINI_PRIMORDIALS': { name: "Mini Primordials", price: 3000000, dmg: 90000, desc: "+90K Damage" },
    'CLOTH_GEIST': { name: "Cloth Geist", price: 1300000, dmg: 50000, desc: "+50K Damage" },
    'LIFE_SPIRIT': { name: "Life Spirit", price: 40000, dmg: 0, desc: "Second chance on death (half HP)", special: "secondChance" }
};

const petIcons = {
    'WYVERN_PUP': 'https://thoriummod.wiki.gg/images/Wyvern_Pup.gif',
    'LYRIST': 'https://thoriummod.wiki.gg/images/Lyrist.gif',
    'BEET_COOKIE': 'https://thoriummod.wiki.gg/images/Beet_Cookie.gif',
    'AMNESIAC': 'https://thoriummod.wiki.gg/images/Amnesiac.gif',
    'LIL_MAID': 'https://thoriummod.wiki.gg/images/Lil%27_Maid.gif',
    'EXOTIC_MYNA': 'https://thoriummod.wiki.gg/images/Exotic_Myna.gif',
    'TORTLE_SAGE': 'https://thoriummod.wiki.gg/images/Tortle_Sage.gif',
    'TANUKI_GIRL': 'https://thoriummod.wiki.gg/images/Tanuki_Girl.gif',
    'MINI_PRIMORDIALS': 'https://thoriummod.wiki.gg/images/Mini_Primordials.gif',
    'CLOTH_GEIST': 'https://thoriummod.wiki.gg/images/Cloth_Geist.gif',
    'LIFE_SPIRIT': 'https://thoriummod.wiki.gg/images/Life_Spirit.gif'
};

// --- BOSSES ---
const monsterSprites = [
    { name: "GOLEM", url: "https://terraria.wiki.gg/images/Dark_Mage.gif" },
    { name: "QUEEN BEE", url: "https://terraria.wiki.gg/images/Ogre.gif" },
    { name: "DUKE FISHRON", url: "https://terraria.wiki.gg/images/thumb/Martian_Saucer.gif/170px-Martian_Saucer.gif" },
    { name: "LUNATIC CULTIST", url: "https://terraria.wiki.gg/images/thumb/Betsy.gif/170px-Betsy.gif" },
    { name: "EMPRESS", url: "https://terraria.wiki.gg/images/Plantera.gif" }
];
const primeBoss = { name: "??GOD??", url: "https://terraria.wiki.gg/images/thumb/Moon_Lord.gif/170px-Moon_Lord.gif" };

// --- CORE UI & SAVE SYSTEM ---
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (typeof playSfx === "function") playSfx('clickSound');

    // --- DYNAMIC BACKGROUND & MUSIC CHANGER ---
    if (id === 'crafting') {
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/66/72/23/667223904c02ee99c377bb9ef9d68338.gif')";
        if (typeof updateMusic === "function") updateMusic('crafting');
    } else if (id === 'weaponTest') {
        document.body.style.backgroundImage = "url('https://static.wikia.nocookie.net/terraria_gamepedia/images/3/38/Glowing_Mushroom_background_3.png')";
        initWeaponTest();
    } else {
        if (id === 'shop') {
            document.body.style.backgroundImage = "url('https://images.steamusercontent.com/ugc/903402567946203333/E62DD8A54D2939BB1A0E875BEC9704B9641DC207/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')";
        } else if (id === 'petshop') {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/736x/4a/99/8b/4a998bfefa74b231100cda3e3d531c47.jpg')";
            renderPetShop();
        } else if (id === 'backpack') {
            document.body.style.backgroundImage = "url('https://img.freepik.com/premium-vector/brown-wood-table-with-brown-background-that-says-wood_1214026-519.jpg')";
        } else {
            document.body.style.backgroundImage = "url('https://terraria.wiki.gg/images/Forest_background_9.png')";
        }
        if (id === 'menu' || id === 'shop' || id === 'backpack' || id === 'credits' || id === 'petshop') {
            if (typeof updateMusic === "function") updateMusic('menu');
        }
    }

    if (typeof updateUI === "function") updateUI();
}

function rpgClick(msg, section) {
    playSfx("clickSound");
    showSection(section);
}

// --- QUEST SYSTEM ---
function showQuest() {
    showSection('quest');
    updateQuestDisplay();
}

function updateQuestDisplay() {
    const titleEl = document.getElementById('questTitle');
    const descEl = document.getElementById('questDesc');
    const progressEl = document.getElementById('questProgress');

    if (currentQuest === 0) {
        titleEl.innerText = "NO ACTIVE QUEST";
        titleEl.style.color = "gray";
        descEl.innerText = "Click START QUEST to begin your journey!";
        progressEl.innerText = "Progress: 0/0";
    } else if (currentQuest === 1) {
        titleEl.innerText = "QUEST 1: REBIRTH";
        titleEl.style.color = "lime";
        descEl.innerText = "Reach Rebirth 1 to complete this quest!";
        progressEl.innerText = "Progress: " + resetCount + "/1";
    } else if (currentQuest === 2) {
        titleEl.innerText = "QUEST 2: GOD SLAYER";
        titleEl.style.color = "lime";
        descEl.innerText = "Defeat God 3 times in EASY mode!";
        progressEl.innerText = "Progress: " + godEasyDefeats + "/3";
    } else if (currentQuest === 3) {
        titleEl.innerText = "QUEST 3: TRUE GOD SLAYER";
        titleEl.style.color = "lime";
        descEl.innerText = "Defeat God 1 time in HARD mode!";
        progressEl.innerText = "Progress: " + godHardDefeats + "/1";
    } else {
        titleEl.innerText = "ALL QUESTS COMPLETED!";
        titleEl.style.color = "gold";
        descEl.innerText = "Congratulations! You have completed all quests!";
        progressEl.innerText = "Progress: COMPLETED";
    }
}

function startQuest() {
    playSfx('clickSound');
    if (currentQuest === 0) {
        currentQuest = 1;
        questProgress = 0;
        typeText("QUEST STARTED: Reach Rebirth 1!");
    } else if (currentQuest > 0 && currentQuest < 3) {
        typeText("Quest already in progress!");
    } else {
        typeText("All quests completed!");
    }
    updateQuestDisplay();
}

function checkQuestProgress() {
    if (currentQuest === 1 && resetCount >= 1) {
        currentQuest = 2;
        godEasyDefeats = 0;
        typeText("QUEST COMPLETE! New Quest: Defeat God 3 times in Easy mode!");
        updateQuestDisplay();
    } else if (currentQuest === 2 && godEasyDefeats >= 3) {
        currentQuest = 3;
        godHardDefeats = 0;
        typeText("QUEST COMPLETE! New Quest: Defeat God 1 time in Hard mode!");
        updateQuestDisplay();
    } else if (currentQuest === 3 && godHardDefeats >= 1) {
        currentQuest = 4;
        typeText("CONGRATULATIONS! ALL QUESTS COMPLETED!");
        if (!inventory.includes('TERRARIAN_SABER')) {
            inventory.push('TERRARIAN_SABER');
            equippedWeapon = 'TERRARIAN_SABER';
            typeText("REWARD: You received the legendary TERRARIAN SABER! (6700 DMG + Spear on hit)");
            saveGame();
        }
        updateQuestDisplay();
    }
}

function updateUI() {
    document.getElementById('goldDisplay').innerText = coins;
    document.getElementById('goldShop').innerText = coins;
    document.getElementById('goldPetShop').innerText = coins;
    document.getElementById('lvlDisplayMenu').innerText = level;
    document.getElementById('resetDisplay').innerText = resetCount;
    document.getElementById('statMaxHp').innerText = 100 + (hpLevel * 20);
    document.getElementById('statBaseDmg').innerText = heroStats[hero] ? heroStats[hero].dmg + (dmgLevel * 5) : 0;
    document.getElementById('costHp').innerText = (200 + (hpLevel * 50)) + "G";
    document.getElementById('costDmg').innerText = (200 + (dmgLevel * 50)) + "G";
    updatePetDisplay();
}

function updatePetDisplay() {
    const petDisplay = document.getElementById('currentPetDisplay');
    const petStats = document.getElementById('petStatsDisplay');

    let petNames = [];
    let totalDmg = 0;

    if (equippedPet) {
        const pet = petData[equippedPet];
        petNames.push(pet.name);
        if (pet.dmg) totalDmg += pet.dmg;
    }

    if (equippedSecondPet && equippedSecondPet !== equippedPet) {
        const pet = petData[equippedSecondPet];
        petNames.push(pet.name);
    }

    if (petNames.length > 0) {
        petDisplay.innerText = petNames.join(" + ");
        petStats.innerText = "Damage Boost: " + totalDmg.toLocaleString();
    } else {
        petDisplay.innerText = "No pet equipped";
        petStats.innerText = "Damage Boost: 0";
    }
}

function renderPetShop() {
    const grid = document.getElementById('petShopGrid');
    grid.innerHTML = '';

    for (const [petId, pet] of Object.entries(petData)) {
        const div = document.createElement('div');
        const owned = ownedPets.includes(petId);
        const equippedMain = equippedPet === petId;
        const equippedSecond = equippedSecondPet === petId;
        let statusText = '';
        if (equippedMain) statusText = 'EQUIPPED';
        else if (equippedSecond) statusText = 'AUX EQUIPPED';
        else if (owned) statusText = 'OWNED';

        div.className = 'menu-btn';
        if (equippedMain || equippedSecond) div.classList.add('equipped');
        if (owned && !equippedMain && !equippedSecond) div.style.borderColor = '#00ff00';

        div.innerHTML = `
            <img src="${petIcons[petId]}" class="shop-icon" style="width:50px;height:50px;">
            <div style="color: ${pet.dmg > 0 ? '#ff6666' : '#ff69b4'}">${pet.name}</div>
            <div style="font-size:8px; color:lime;">${pet.desc}</div>
            <div style="font-size:10px; color:yellow;">${owned ? statusText : pet.price.toLocaleString() + 'G'}</div>
        `;

        div.onclick = () => {
            if (owned) {
                equipPet(petId);
            } else {
                buyPet(petId);
            }
        };

        grid.appendChild(div);
    }
}

function buyPet(petId) {
    const pet = petData[petId];
    if (coins >= pet.price) {
        coins -= pet.price;
        ownedPets.push(petId);
        playSfx('buySound');
        saveGame();
        updateUI();
        renderPetShop();
    } else {
        playSfx('wrongSound');
        alert("Not enough gold!");
    }
}

function equipPet(petId) {
    const pet = petData[petId];

    if (pet.special === 'secondChance') {
        if (equippedSecondPet === petId) {
            equippedSecondPet = null;
            lifeSpiritActive = false;
        } else {
            equippedSecondPet = petId;
            lifeSpiritActive = true;
        }
    } else {
        equippedPet = petId;
        petDamageBoost = pet.dmg || 0;
    }

    playSfx('clickSound');
    saveGame();
    updateUI();
    renderPetShop();
}

function saveGame() {
    if (!currentUser) return;
    const gameData = {
        hero: hero, level: level, coins: coins,
        ownedHeroes: ownedHeroes, inventory: inventory,
        hpLevel: hpLevel, dmgLevel: dmgLevel,
        resetCount: resetCount, difficulty: difficulty,
        age: age, equippedWeapon: equippedWeapon,
        currentQuest: currentQuest, godEasyDefeats: godEasyDefeats, godHardDefeats: godHardDefeats,
        equippedPet: equippedPet, ownedPets: ownedPets, equippedSecondPet: equippedSecondPet
    };
    localStorage.setItem('save_rpg_' + currentUser, JSON.stringify(gameData));
}

function loadGame(username) {
    const savedData = localStorage.getItem('save_rpg_' + username);
    if (savedData) {
        const data = JSON.parse(savedData);
        hero = data.hero || "Addy"; level = data.level || 1;
        coins = data.coins || 0; ownedHeroes = data.ownedHeroes || ["Addy"];
        inventory = data.inventory || []; hpLevel = data.hpLevel || 0;
        dmgLevel = data.dmgLevel || 0; resetCount = data.resetCount || 0;
        difficulty = data.difficulty || "Normal"; age = data.age || 5;
        equippedWeapon = data.equippedWeapon || null;
        currentQuest = data.currentQuest || 0;
        godEasyDefeats = data.godEasyDefeats || 0;
        godHardDefeats = data.godHardDefeats || 0;
        equippedPet = data.equippedPet || null;
        ownedPets = data.ownedPets || [];
        equippedSecondPet = data.equippedSecondPet || null;

        if (equippedSecondPet === 'LIFE_SPIRIT') {
            lifeSpiritActive = true;
        }

        if (equippedPet) {
            const pet = petData[equippedPet];
            if (pet) petDamageBoost = pet.dmg;
        }

        if (difficulty === 'Easy') BOSS_TRIGGER = 5;
        else if (difficulty === 'Normal') BOSS_TRIGGER = 10;
        else if (difficulty === 'Hard') BOSS_TRIGGER = 20;

        typeText("WELCOME BACK, " + username + "!");
        updateUI();
        ownedHeroes.forEach(h => {
            let el = document.getElementById('hero-' + h);
            if (el) el.classList.remove('locked');
        });
    } else {
        hero = "Addy"; level = 1; coins = 0; ownedHeroes = ["Addy"];
        inventory = []; hpLevel = 0; dmgLevel = 0; resetCount = 0;
        equippedWeapon = null;
        typeText("NEW HERO REGISTERED!");
        updateUI();
    }
}

function craftItem(recipeName) {
    const recipes = {
        'LEAD_BROADSWORD': {
            ingredients: ['SWORD', 'POTION'],
            goldCost: 0
        },
        'BRAND_OF_INFERNO': {
            ingredients: ['CRYSTAL_STAFF', 'STARDUST_STAFF'],
            goldCost: 0
        },
        'VOLCANO': {
            ingredients: ['HORNET_STAFF', 'BRAND_OF_INFERNO'],
            goldCost: 700000
        },
        'DEVOUR_PRIDE': {
            ingredients: ['TERRAPRISMA', 'KAIDO_WHIP'],
            goldCost: 2800000,
            rebirthRequired: 6
        }
    };

    let recipe = recipes[recipeName];
    if (!recipe) return;

    if (recipe.rebirthRequired && resetCount < recipe.rebirthRequired) {
        if (typeof playSfx === "function") playSfx('wrongSound');
        alert("❌ You need at least " + recipe.rebirthRequired + " rebirths to craft this! You have: " + resetCount);
        return;
    }

    if (coins < recipe.goldCost) {
        if (typeof playSfx === "function") playSfx('wrongSound');
        alert("❌ Not enough gold! Need " + recipe.goldCost.toLocaleString() + "G");
        return;
    }

    let tempInventory = [...inventory];
    let hasAllItems = true;

    for (let item of recipe.ingredients) {
        let index = tempInventory.indexOf(item);
        if (index > -1) {
            tempInventory.splice(index, 1);
        } else {
            hasAllItems = false;
            break;
        }
    }

    if (hasAllItems) {
        coins -= recipe.goldCost;
        recipe.ingredients.forEach(item => {
            let idx = inventory.indexOf(item);
            if (idx > -1) inventory.splice(idx, 1);
        });
        inventory.push(recipeName);
        saveGame();
        if (typeof playSfx === "function") playSfx('upgradeSound');
        alert("⚒️ FORGED SUCCESSFULLY: " + recipeName.replace('_', ' ') + "!");
    } else {
        if (typeof playSfx === "function") playSfx('wrongSound');
        alert("❌ Not enough materials! Check your Backpack.");
    }
}

function attemptLogin() {
    let u = document.getElementById('usernameInput').value;
    if (u) {
        currentUser = u;
        document.getElementById('playerNameDisplay').innerText = u;
        loadGame(u);
        showSection('menu');
        updateMusic('menu');
    }
}

function attemptRegister() { attemptLogin(); }

function logout() {
    saveGame();
    setTimeout(() => { location.reload(); }, 500);
}

// --- GAME LOGIC START ---
function startGame() {
    if (!currentUser) {
        alert("PLEASE LOGIN!");
        showSection('auth');
        return;
    }
    playSfx('clickSound');
    document.getElementById('heroImg').src = heroImages[hero];

    // Reset all weapon displays
    document.getElementById('terraprisma').style.display = 'none';
    document.getElementById('kaidoWhip').style.display = 'none';
    document.getElementById('hornetBee').style.display = 'none';
    document.getElementById('terrarianSpear').style.display = 'none';
    document.getElementById('devourPrideProjectile').style.display = 'none';
    document.getElementById('weaponOverlay').style.display = 'none';

    // Show equipped weapon
    if (equippedWeapon === 'TERRAPRISMA') {
        document.getElementById('terraprisma').style.display = 'block';
    } else if (equippedWeapon === 'KAIDO_WHIP') {
        document.getElementById('kaidoWhip').style.display = 'block';
    } else if (equippedWeapon === 'HORNET_STAFF') {
        document.getElementById('hornetBee').style.display = 'block';
        let wo = document.getElementById('weaponOverlay');
        wo.src = itemIcons['HORNET_STAFF'];
        wo.style.display = 'block';
    } else if (equippedWeapon === 'TERRARIAN_SABER') {
        document.getElementById('terrarianSpear').style.display = 'block';
        let wo = document.getElementById('weaponOverlay');
        wo.src = itemIcons['TERRARIAN_SABER'];
        wo.style.display = 'block';
    } else if (equippedWeapon === 'DEVOUR_PRIDE') {
        let wo = document.getElementById('weaponOverlay');
        wo.src = itemIcons['DEVOUR_PRIDE'];
        wo.style.display = 'block';
        let proj = document.getElementById('devourPrideProjectile');
        proj.style.display = 'block';
    } else if (equippedWeapon && itemIcons[equippedWeapon]) {
        let wo = document.getElementById('weaponOverlay');
        wo.src = itemIcons[equippedWeapon];
        wo.style.display = 'block';
    }

    // Show pet
    const petImg = document.getElementById('petImg');
    let petImg2 = document.getElementById('petImg2');
    if (!petImg2) {
        petImg2 = document.createElement('img');
        petImg2.id = 'petImg2';
        petImg2.style.position = 'absolute';
        petImg2.style.zIndex = '6';
        document.getElementById('heroWrapper').appendChild(petImg2);
    }

    petImg.style.display = 'none';
    petImg2.style.display = 'none';

    if (equippedPet && petIcons[equippedPet]) {
        petImg.src = petIcons[equippedPet];
        petImg.style.display = 'block';
        petImg.style.width = '40px';
        petImg.style.height = '40px';
        petImg.style.bottom = '-5px';
        petImg.style.right = '-30px';

        if (equippedPet === 'LYRIST' || equippedPet === 'MINI_PRIMORDIALS') {
            petImg.style.width = '80px';
            petImg.style.height = '80px';
            petImg.style.bottom = '0px';
            petImg.style.right = '-50px';
        }

        if (equippedSecondPet && equippedSecondPet !== equippedPet) {
            petImg2.src = petIcons[equippedSecondPet];
            petImg2.style.display = 'block';
            petImg2.style.width = '40px';
            petImg2.style.height = '40px';
            petImg2.style.bottom = '45px';
            petImg2.style.right = '-30px';
        }
    } else if (equippedSecondPet && petIcons[equippedSecondPet]) {
        petImg.src = petIcons[equippedSecondPet];
        petImg.style.display = 'block';
        petImg.style.width = '40px';
        petImg.style.height = '40px';
        petImg.style.bottom = '-5px';
        petImg.style.right = '-30px';
    }

    maxHeroHP = 100 + (hpLevel * 20);
    heroHP = maxHeroHP;
    updateBars();
    setupLevel();
    showSection('game');

    document.getElementById('inputZone').style.display = 'block';
    document.getElementById('attackBarContainer').style.display = 'none';
    document.getElementById('attackPrompt').style.display = 'none';
    attackBarActive = false;

    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
    cancelAnimationFrame(sweepInterval);
}

function setupLevel() {
    scytheHits = 0;
    let isBoss = (level % BOSS_TRIGGER === 0);

    document.getElementById('enemyImg').classList.remove('boss-glow');
    document.getElementById('enemyImg').style.opacity = "1";
    document.getElementById('dodgeArena').style.display = "none";
    stopDodgingGame();

    if (isBoss) {
        playBossCutscene();
        if (difficulty === "Easy") maxEnemyHP = 9000;
        else if (difficulty === "Normal") maxEnemyHP = 15000;
        else if (difficulty === "Hard") maxEnemyHP = 90000;

        enemyDmg = 35 + (level * 2);
        document.getElementById('skipBossBtn').style.display = "block";
    } else {
        document.getElementById('game').style.background = "url('https://terraria.wiki.gg/images/Forest_background_9.png') center / cover no-repeat fixed";

        if (typeof updateMusic === "function") updateMusic('fight');
        let r = Math.floor(Math.random() * monsterSprites.length);
        document.getElementById('enemyName').innerText = monsterSprites[r].name;
        document.getElementById('enemyImg').src = monsterSprites[r].url;
        if (monsterSprites[r].name === "GOLEM") {
            document.getElementById('enemyImg').style.width = "80px";
            document.getElementById('enemyImg').style.height = "80px";
        } else {
            document.getElementById('enemyImg').style.width = "220px";
            document.getElementById('enemyImg').style.height = "220px";
        }
        maxEnemyHP = level * 40;
        enemyDmg = 15 + (level * 1.5);
        document.getElementById('skipBossBtn').style.display = "none";

        enemyHP = maxEnemyHP;
        updateBars();
        startTimer();
        generateQuestion();
    }
}

function playBossCutscene() {
    let overlay = document.getElementById('cutsceneOverlay');
    let blackHole = document.getElementById('blackHole');
    let textContainer = document.getElementById('bossTextContainer');
    let text1 = document.getElementById('bossText1');
    let text2 = document.getElementById('bossText2');
    let text3 = document.getElementById('bossText3');
    let voice = document.getElementById('bossVoice');
    let letterboxTop = document.getElementById('letterboxTop');
    let letterboxBottom = document.getElementById('letterboxBottom');
    let screenFlash = document.getElementById('screenFlash');
    let particleContainer = document.getElementById('particleContainer');

    overlay.style.display = "flex";
    blackHole.style.width = "10px";
    blackHole.style.height = "10px";
    blackHole.style.opacity = "0";
    textContainer.style.display = "none";
    text1.style.opacity = "0";
    text1.style.transform = "scale(0.5)";
    text2.style.opacity = "0";
    text2.style.transform = "scale(0.5)";
    text3.style.opacity = "0";
    text3.style.transform = "scale(0.5)";
    letterboxTop.style.opacity = "0";
    letterboxBottom.style.opacity = "0";
    particleContainer.innerHTML = "";

    if (typeof updateMusic === "function") updateMusic('boss');

    document.getElementById('game').style.background = "url('https://media.tenor.com/Twb7touaiXUAAAAM/space-sky.gif') center / cover no-repeat fixed";

    setTimeout(() => {
        letterboxTop.style.opacity = "1";
        letterboxBottom.style.opacity = "1";
    }, 100);

    setTimeout(() => {
        overlay.style.animation = "screenShake 0.5s";
        if (typeof playSfx === "function") playSfx('bossSpawnSound');
    }, 800);

    setTimeout(() => {
        blackHole.style.opacity = "1";
        blackHole.style.animation = "vortexSpin 2s linear infinite";
    }, 1500);

    setTimeout(() => {
        blackHole.style.width = "1000px";
        blackHole.style.height = "1000px";
    }, 1600);

    setTimeout(() => {
        screenFlash.style.transition = "opacity 0.3s";
        screenFlash.style.opacity = "1";
        setTimeout(() => {
            screenFlash.style.opacity = "0";
        }, 300);
    }, 2500);

    setTimeout(() => {
        textContainer.style.display = "block";
        typewriterEffect(text1, "A DARK PRESENCE", 50);
        text1.style.opacity = "1";
        text1.style.transform = "scale(1)";
    }, 3000);

    setTimeout(() => {
        typewriterEffect(text2, "EMERGES FROM THE VOID", 50);
        text2.style.opacity = "1";
        text2.style.transform = "scale(1)";
    }, 3800);

    setTimeout(() => {
        typewriterEffect(text3, "YOUR FINALE HAS BEGUN!", 50);
        text3.style.opacity = "1";
        text3.style.transform = "scale(1)";
        text3.style.animation = "pulse 1s infinite, textGlitch 0.1s infinite";
    }, 4600);

    setTimeout(() => {
        screenFlash.style.transition = "opacity 0.5s";
        screenFlash.style.opacity = "1";
    }, 6500);

    setTimeout(() => {
        overlay.style.display = "none";
        overlay.style.animation = "";

        document.getElementById('enemyName').innerText = primeBoss.name;
        document.getElementById('enemyImg').src = primeBoss.url;
        document.getElementById('enemyImg').classList.add('boss-glow');

        enemyHP = maxEnemyHP;
        updateBars();
        startTimer();
        generateQuestion();

        startDodgingGame();
    }, 7000);
}

function typewriterEffect(element, text, speed) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('img');
        particle.src = 'https://media.tenor.com/wGaWQs8g3LMAAAAj/gmail-pixel-art.gif';
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animation = 'particleFall ' + (Math.random() * 3 + 2) + 's linear infinite';
        particle.style.width = '16px';
        particle.style.height = '16px';
        container.appendChild(particle);
    }
}

function startTimer() {
    clearInterval(gameTimer);
    timeLeft = (difficulty === "Hard") ? 10 : (difficulty === "Normal") ? 20 : 30;
    updateTimerDisplay();
    gameTimer = setInterval(() => {
        if (isDodging) return;
        if (!attackBarActive) {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                playSfx('wrongSound');
                heroTakeDmg();
                timeLeft = (difficulty === "Hard") ? 10 : (difficulty === "Normal") ? 20 : 30;
                generateQuestion();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerDisplay').innerText = timeLeft;
}

// --- MATH & COMBAT SYSTEM ---
function generateQuestion() {
    let n1, n2, op, ans;
    let range = 5;
    let ops = ['+', '-', 'x', '/'];

    if (difficulty === "Easy") {
        range = 5;
        ops = ['+', '-', 'x', '/'];
    } else if (difficulty === "Normal") {
        range = 15;
        ops = ['+', '-', 'x', '/', '√', 'expr', 'frac'];
    } else if (difficulty === "Hard") {
        range = 50;
        ops = ['+', '-', 'x', '/', '√', 'expr', 'frac'];
    }

    if (age < 7) range = Math.min(range, 5);

    if (Math.random() < 0.25) {
        let specialType = '';
        let availableSpecials = [];

        if (ops.includes('√')) availableSpecials.push('sqrt');
        if (ops.includes('expr')) availableSpecials.push('expr');
        if (ops.includes('frac')) availableSpecials.push('frac');

        if (availableSpecials.length > 0) {
            specialType = availableSpecials[Math.floor(Math.random() * availableSpecials.length)];

            if (specialType === 'sqrt') {
                let root = Math.floor(Math.random() * range) + 1;
                n1 = root * root;
                op = '√';
                ans = root;
                currentAnswer = ans;
                document.getElementById('question').innerText = "√" + n1 + " = ?";
                document.getElementById('answer').value = '';
                document.getElementById('answer').focus();
                return;
            } else if (specialType === 'expr') {
                if (difficulty === "Easy") {
                    let x = Math.floor(Math.random() * 10) + 1;
                    let types = ['add', 'sub'];
                    let type = types[Math.floor(Math.random() * types.length)];

                    if (type === 'add') {
                        let addNum = Math.floor(Math.random() * 10) + 1;
                        let result = x + addNum;
                        op = 'expr';
                        ans = x;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = "x + " + addNum + " = " + result + ", x = ?";
                    } else {
                        let total = Math.floor(Math.random() * 15) + 10;
                        ans = Math.floor(Math.random() * 10) + 1;
                        let result = total - ans;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = total + " - x = " + result + ", x = ?";
                    }
                } else if (difficulty === "Normal") {
                    let x = Math.floor(Math.random() * 12) + 1;
                    let types = ['mult', 'div'];
                    let type = types[Math.floor(Math.random() * types.length)];

                    if (type === 'mult') {
                        let coef = Math.floor(Math.random() * 5) + 2;
                        let result = coef * x;
                        op = 'expr';
                        ans = x;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = coef + "x = " + result + ", x = ?";
                    } else {
                        let divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                        ans = Math.floor(Math.random() * 10) + 2;
                        let result = ans * divisor;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = "x/" + divisor + " = " + ans + ", x = ?";
                    }
                } else {
                    let x = Math.floor(Math.random() * 15) + 1;
                    let coef = Math.floor(Math.random() * 5) + 2;
                    let types = ['add', 'sub'];
                    let type = types[Math.floor(Math.random() * types.length)];

                    if (type === 'add') {
                        let addNum = Math.floor(Math.random() * 20) + 1;
                        let result = (coef * x) + addNum;
                        op = 'expr';
                        ans = x;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = coef + "x + " + addNum + " = " + result + ", x = ?";
                    } else {
                        let subNum = Math.floor(Math.random() * 15) + 1;
                        let result = (coef * x) - subNum;
                        op = 'expr';
                        ans = x;
                        currentAnswer = ans;
                        document.getElementById('question').innerText = coef + "x - " + subNum + " = " + result + ", x = ?";
                    }
                }
                document.getElementById('answer').value = '';
                document.getElementById('answer').focus();
                return;
            } else if (specialType === 'frac') {
                if (difficulty === "Normal") {
                    let fractions = [
                        { ans: 1, display: "1/2 + 1/2 = ? (answer: 1)" },
                        { ans: 2, display: "1/3 + 1/3 = ? (answer: 2 for 2/3)" },
                        { ans: 3, display: "1/4 + 2/4 = ? (answer: 3 for 3/4)" },
                        { ans: 2, display: "3/4 - 1/4 = ? (answer: 2 for 2/4)" },
                        { ans: 4, display: "2/5 + 2/5 = ? (answer: 4 for 4/5)" },
                        { ans: 1, display: "3/6 + 3/6 = ? (answer: 1)" },
                    ];
                    let frac = fractions[Math.floor(Math.random() * fractions.length)];
                    op = 'frac';
                    ans = frac.ans;
                    currentAnswer = ans;
                    document.getElementById('question').innerText = frac.display;
                } else {
                    let fractions = [
                        { ans: 3, display: "1/2 + 1/4 = ? (answer: 3 for 3/4)" },
                        { ans: 5, display: "2/3 + 1/6 = ? (answer: 5 for 5/6)" },
                        { ans: 7, display: "3/4 + 1/8 = ? (answer: 7 for 7/8)" },
                        { ans: 1, display: "5/6 - 1/3 = ? (answer: 1 for 1/2)" },
                        { ans: 11, display: "2/3 + 1/4 = ? (answer: 11 for 11/12)" },
                        { ans: 7, display: "1/2 + 1/3 = ? (answer: 5 for 5/6)" },
                    ];
                    let frac = fractions[Math.floor(Math.random() * fractions.length)];
                    op = 'frac';
                    ans = frac.ans;
                    currentAnswer = ans;
                    document.getElementById('question').innerText = frac.display;
                }
                document.getElementById('answer').value = '';
                document.getElementById('answer').focus();
                return;
            }
        }
    }

    n1 = Math.floor(Math.random() * range) + 1;
    n2 = Math.floor(Math.random() * range) + 1;

    let availableOps = ops.filter(o => o !== 'expr' && o !== 'frac');
    if (age < 7) {
        availableOps = ['+', '-'];
    } else if (age < 10) {
        availableOps = availableOps.filter(o => o !== '/' && o !== '√');
    }

    if (hero === "Divina") availableOps = ['/'];

    op = availableOps[Math.floor(Math.random() * availableOps.length)];

    if (op === '-') { if (n2 > n1) { let t = n1; n1 = n2; n2 = t; } }
    if (op === 'x' && age < 11) { n1 = n1 % 5 + 1; n2 = n2 % 5 + 1; }
    if (op === '/') {
        n2 = Math.floor(Math.random() * Math.min(5, range)) + 2;
        n1 = n2 * (Math.floor(Math.random() * 5) + 1);
    }

    switch (op) {
        case '+': ans = n1 + n2; break;
        case '-': ans = n1 - n2; break;
        case 'x': ans = n1 * n2; break;
        case '/': ans = n1 / n2; break;
    }

    currentAnswer = ans;
    document.getElementById('question').innerText = n1 + " " + op + " " + n2 + " = ?";
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
}

function check() {
    if (attackBarActive) return;

    let v = document.getElementById('answer').value;
    if (v === "") return;

    if (parseInt(v) === currentAnswer) {
        playSfx('bipSound');
        startAttackPhase();
    } else {
        playSfx('wrongSound');
        document.getElementById('answer').value = '';

        showAIFeedback(currentAnswer, document.getElementById('question').innerText);

        let mythrilOre = document.getElementById('mythrilOre');
        mythrilOre.style.display = 'block';
        mythrilOre.style.right = '0px';
        mythrilOre.style.bottom = '50px';
        mythrilOre.classList.add('mythril-shooting');
        setTimeout(() => {
            mythrilOre.classList.remove('mythril-shooting');
            mythrilOre.style.display = 'none';
        }, 500);

        heroTakeDmg();
        document.getElementById('enemyImg').classList.add('shake');
        setTimeout(() => { document.getElementById('enemyImg').classList.remove('shake'); }, 500);
    }
}

function showAIFeedback(correctAnswer, question) {
    let feedback = document.getElementById('aiFeedback');
    document.getElementById('aiCorrectAnswer').innerText = correctAnswer;
    let explanation = generateExplanation(question, correctAnswer);
    document.getElementById('aiExplanation').innerText = explanation;
    feedback.style.display = 'block';
}

function closeAIFeedback() {
    document.getElementById('aiFeedback').style.display = 'none';
}

function generateExplanation(question, answer) {
    if (question.includes('√')) {
        return `The square root of a number is what you multiply by itself to get that number.`;
    } else if (question.includes('x =')) {
        return `Solve for x by isolating the variable on one side of the equation.`;
    } else if (question.includes('/')) {
        return `Division: How many times does the divisor fit into the dividend?`;
    } else if (question.includes('x') || question.includes('×')) {
        return `Multiplication: Add the first number to itself the second number of times.`;
    } else if (question.includes('-')) {
        return `Subtraction: Take away the second number from the first number.`;
    } else if (question.includes('+')) {
        return `Addition: Combine both numbers together.`;
    }
    return `Review the problem step by step and try again!`;
}

function startAttackPhase() {
    attackBarActive = true;
    sweepPos = 0;
    sweepDirection = 1;

    document.getElementById('inputZone').style.display = 'none';
    document.getElementById('attackBarContainer').style.display = 'block';
    document.getElementById('attackPrompt').style.display = 'block';

    animateAttackBar();
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && attackBarActive) {
        event.preventDefault();
        executeAttack();
    }
    if (event.code === 'Enter' && document.getElementById('game').classList.contains('active') && !attackBarActive) {
        check();
    }
});

function animateAttackBar() {
    let line = document.getElementById('sweepingLine');
    if (!line) return;

    let speed = (difficulty === "Hard") ? 3 : 2;

    sweepPos += speed * sweepDirection;

    if (sweepPos >= 100) {
        sweepPos = 100;
        sweepDirection = -1;
    } else if (sweepPos <= 0) {
        sweepPos = 0;
        sweepDirection = 1;
    }

    line.style.left = sweepPos + '%';
    sweepInterval = requestAnimationFrame(animateAttackBar);
}

function executeAttack() {
    attackBarActive = false;
    cancelAnimationFrame(sweepInterval);

    document.getElementById('inputZone').style.display = 'block';
    document.getElementById('attackBarContainer').style.display = 'none';
    document.getElementById('attackPrompt').style.display = 'none';

    let dmgMod = 0;
    let hitType = "";
    let txtColor = "white";

    if (sweepPos < 18 || sweepPos > 82) {
        dmgMod = 0.5; hitType = "MISS!"; txtColor = "red";
        scytheHits = 0;
    } else if (sweepPos >= 18 && sweepPos < 35 || sweepPos > 65 && sweepPos <= 82) {
        dmgMod = 1.0; hitType = "GOOD!"; txtColor = "yellow";
        if (equippedWeapon === 'SOUL_SCYTHE') scytheHits++;
    } else {
        dmgMod = 2.0; hitType = "PERFECT!"; txtColor = "lime";
        if (equippedWeapon === 'SOUL_SCYTHE') scytheHits++;
    }

    playAttackAnim();

    let base = (heroStats[hero] ? heroStats[hero].dmg : 10) + (dmgLevel * 5);
    let wepDmg = equippedWeapon ? (weaponStats[equippedWeapon] || 0) : 0;
    let totalDmg = Math.floor((base + wepDmg + petDamageBoost) * dmgMod);

    if (equippedWeapon === 'SOUL_SCYTHE' && scytheHits >= 5) {
        totalDmg = Math.floor(totalDmg * 1.05);
        hitType = "SOUL BOOST!";
        txtColor = "cyan";
    }

    showDamageText(totalDmg, hitType, txtColor);
    enemyTakeDmg(totalDmg);

    setTimeout(() => {
        if (enemyHP > 0 && heroHP > 0) {
            generateQuestion();
            startTimer();
        }
    }, 500);
}

function showDamageText(dmg, type, color) {
    let el = document.getElementById('damageText');
    el.innerText = type + " " + dmg;
    el.style.color = color;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "floatUp 1s ease-out forwards";
}

function playAttackAnim() {
    playSfx('swingSound');

    let heroImg = document.getElementById('heroImg');
    let heroWrapper = document.getElementById('heroWrapper');

    let isSword = equippedWeapon && (
        equippedWeapon.includes('SWORD') ||
        equippedWeapon === 'MASTER_SWORD' ||
        equippedWeapon === 'VOID_SWORD' ||
        equippedWeapon === 'FROST_STAFF' ||
        equippedWeapon === 'STARDUST_STAFF' ||
        equippedWeapon === 'PIRATE_STAFF' ||
        equippedWeapon === 'CRYSTAL_STAFF' ||
        equippedWeapon === 'SKELETON_STAFF' ||
        equippedWeapon === 'BONE_BREAKER' ||
        equippedWeapon === 'SOUL_SCYTHE' ||
        equippedWeapon === 'LEAD_BROADSWORD' ||
        equippedWeapon === 'TERRARIAN_SABER' ||
        equippedWeapon === 'BRAND_OF_INFERNO' ||
        equippedWeapon === 'VOLCANO'
    );

    let noRunWeapons = ['TERRAPRISMA', 'KAIDO_WHIP', 'HORNET_STAFF', 'POTION', 'POTION_ONE', 'DEVOUR_PRIDE'];

    if (equippedWeapon === 'HORNET_STAFF') {
        let wo = document.getElementById('weaponOverlay');
        wo.classList.add('swinging');
        setTimeout(() => {
            let bee = document.getElementById('hornetBee');
            bee.classList.add('bee-attacking');
            setTimeout(() => {
                bee.classList.remove('bee-attacking');
            }, 1000);
        }, 200);
        setTimeout(() => { wo.classList.remove('swinging'); }, 400);
    } else if (equippedWeapon === 'TERRAPRISMA') {
        let tp = document.getElementById('terraprisma');
        tp.classList.add('prisma-attack');
        setTimeout(() => { tp.classList.remove('prisma-attack'); }, 700);
    } else if (equippedWeapon === 'KAIDO_WHIP') {
        playSfx('whipSound');
        let kw = document.getElementById('kaidoWhip');
        kw.classList.add('whip-lash');
        setTimeout(() => { kw.classList.remove('whip-lash'); }, 1200);
    } else if (equippedWeapon === 'DEVOUR_PRIDE') {
        playSfx('devourPrideSound');
        let projectile = document.getElementById('devourPrideProjectile');
        projectile.classList.add('devour-pride-shooting');
        setTimeout(() => {
            projectile.classList.remove('devour-pride-shooting');
        }, 800);
    } else if (equippedWeapon === 'POTION') {
        let wo = document.getElementById('weaponOverlay');
        wo.classList.add('throwing');
        setTimeout(() => {
            let explosion = document.getElementById('potionExplosion');
            explosion.classList.add('exploding');
            setTimeout(() => { explosion.classList.remove('exploding'); }, 600);
        }, 480);
        setTimeout(() => { wo.classList.remove('throwing'); }, 600);
    } else if (equippedWeapon === 'POTION_ONE') {
        let wo = document.getElementById('weaponOverlay');
        wo.classList.add('throwing');
        setTimeout(() => {
            let explosion = document.getElementById('potionOneExplosion');
            explosion.classList.add('exploding-party');
            setTimeout(() => { explosion.classList.remove('exploding-party'); }, 600);
        }, 480);
        setTimeout(() => { wo.classList.remove('throwing'); }, 600);
    } else if (equippedWeapon && (equippedWeapon.includes('POTION'))) {
        let wo = document.getElementById('weaponOverlay');
        wo.classList.add('throwing');
        setTimeout(() => { wo.classList.remove('throwing'); }, 600);
    } else if (isSword) {
        if (equippedWeapon === 'BRAND_OF_INFERNO') {
            heroImg.classList.add('running-brand');
            heroWrapper.classList.add('running-wrapper');
        } else if (equippedWeapon === 'VOLCANO') {
            heroImg.classList.add('running-volcano');
            heroWrapper.classList.add('running-wrapper');
        } else {
            heroImg.classList.add('running');
            heroWrapper.classList.add('running-wrapper');
        }
        let wo = document.getElementById('weaponOverlay');

        setTimeout(() => {
            if (equippedWeapon === 'BRAND_OF_INFERNO') {
                let brandSlash = document.getElementById('brandSlashEffect');
                brandSlash.classList.add('brand-slashing');
                setTimeout(() => { brandSlash.classList.remove('brand-slashing'); }, 500);
            } else if (equippedWeapon === 'VOLCANO') {
                let volcanoSlash = document.getElementById('volcanoSlashEffect');
                volcanoSlash.classList.add('volcano-slashing');
                setTimeout(() => { volcanoSlash.classList.remove('volcano-slashing'); }, 500);
            } else {
                let slash = document.getElementById('slashEffect');
                slash.classList.add('slashing');
                setTimeout(() => { slash.classList.remove('slashing'); }, 400);
            }

            if (equippedWeapon === 'TERRARIAN_SABER') {
                let spear = document.getElementById('terrarianSpear');
                if (Math.random() > 0.5) {
                    spear.classList.add('spear-attack-top');
                } else {
                    spear.classList.add('spear-attack-bottom');
                }
                let spearDmg = 10 + (dmgLevel * 2);
                setTimeout(() => {
                    enemyTakeDmg(spearDmg);
                    showDamageText(spearDmg, "SPEAR", "cyan");
                }, 300);
                setTimeout(() => {
                    spear.classList.remove('spear-attack-top');
                    spear.classList.remove('spear-attack-bottom');
                }, 600);
            }
        }, 480);

        setTimeout(() => {
            if (equippedWeapon === 'BRAND_OF_INFERNO') {
                heroImg.classList.remove('running-brand');
            } else if (equippedWeapon === 'VOLCANO') {
                heroImg.classList.remove('running-volcano');
            } else {
                heroImg.classList.remove('running');
            }
            heroWrapper.classList.remove('running-wrapper');
        }, 1200);
    } else if (equippedWeapon) {
        let wo = document.getElementById('weaponOverlay');
        wo.classList.add('swinging');
        setTimeout(() => { wo.classList.remove('swinging'); }, 400);
    }

    let e = document.getElementById('enemyImg');
    e.classList.add('shake');
    setTimeout(() => { e.classList.remove('shake'); }, 500);
}

function enemyTakeDmg(dmg) {
    enemyHP -= dmg;
    playSfx('attackSound');
    if (enemyHP <= 0) {
        enemyHP = 0;
        updateBars();
        winBattle();
    } else {
        updateBars();
    }
}

function heroTakeDmg() {
    heroHP -= enemyDmg;
    document.getElementById('heroImg').classList.add('shake');
    setTimeout(() => { document.getElementById('heroImg').classList.remove('shake'); }, 500);
    if (heroHP <= 0) {
        if (lifeSpiritActive && (equippedPet === 'LIFE_SPIRIT' || equippedSecondPet === 'LIFE_SPIRIT')) {
            heroHP = Math.floor(maxHeroHP / 2);
            lifeSpiritActive = false;
            playSfx('upgradeSound');
            typeText("LIFE SPIRIT SAVED YOU! Second chance with half HP!");
            alert("LIFE SPIRIT SAVED YOU!\nYou revived with half HP!");
        } else {
            heroHP = 0;
            updateBars();
            loseBattle();
        }
    } else {
        updateBars();
    }
}

function updateBars() {
    document.getElementById('hpValHero').innerText = heroHP;
    document.getElementById('hpMaxHero').innerText = maxHeroHP;
    document.getElementById('heroBar').style.width = (heroHP / maxHeroHP * 100) + "%";

    document.getElementById('hpValEnemy').innerText = enemyHP;
    document.getElementById('hpMaxEnemy').innerText = maxEnemyHP;
    document.getElementById('enemyBar').style.width = (enemyHP / maxEnemyHP * 100) + "%";
}

function triggerLootDrop(dropItemName) {
    playSfx('lootSound');
    let drop = document.getElementById('lootDrop');
    drop.src = itemIcons[dropItemName];
    drop.classList.add('dropping');
    drop.style.display = 'block';

    setTimeout(() => {
        drop.classList.remove('dropping');
        drop.style.display = 'none';

        let friendlyName = dropItemName.replace('_', ' ');
        typeText("YOU OBTAINED " + friendlyName + "!");

        if (!inventory.includes(dropItemName)) {
            inventory.push(dropItemName);
            saveGame();
        }
        setTimeout(() => { quitGame(); }, 2000);
    }, 2000);
}

function winBattle() {
    clearInterval(gameTimer);
    cancelAnimationFrame(sweepInterval);
    playSfx('enemyDeathSound');

    let isBoss = (level % BOSS_TRIGGER === 0);
    let reward = isBoss ? 500 : 50;
    coins += reward;

    if (isBoss) {
        document.getElementById('game').style.background = "url('https://terraria.wiki.gg/images/Forest_background_9.png') center / cover no-repeat fixed";

        if (document.getElementById('enemyName').innerText === "??GOD??") {
            if (difficulty === "Easy") {
                godEasyDefeats++;
                typeText("GOD DEFEATED! (" + godEasyDefeats + "/3)");
            } else if (difficulty === "Hard") {
                godHardDefeats++;
                typeText("GOD DEFEATED IN HARD MODE! (" + godHardDefeats + "/1)");
            }
            checkQuestProgress();
        }

        let dropItem = "SKELETON_STAFF";
        if (difficulty === "Easy") dropItem = "BONE_BREAKER";
        if (difficulty === "Hard") dropItem = "SOUL_SCYTHE";

        triggerLootDrop(dropItem);
    } else {
        typeText("MONSTER SLAIN! +" + reward + "G");
        level++;
        if (level > MAX_LEVEL) {
            level = MAX_LEVEL;
            typeText("MAX LEVEL REACHED! READY FOR REBIRTH!");
        }
        saveGame();
        setTimeout(() => { setupLevel(); }, 1500);
    }
}

function loseBattle() {
    clearInterval(gameTimer);
    cancelAnimationFrame(sweepInterval);
    playSfx('gameOverSound');
    typeText("YOU FELL IN BATTLE...");
    setTimeout(() => { quitGame(); }, 2000);
}

function quitGame() {
    clearInterval(gameTimer);
    cancelAnimationFrame(sweepInterval);
    attackBarActive = false;

    // Reset weapon animations
    document.getElementById('weaponOverlay').classList.remove('swinging', 'throwing');
    document.getElementById('terraprisma').classList.remove('prisma-attack');
    document.getElementById('kaidoWhip').classList.remove('whip-lash');
    document.getElementById('terrarianSpear').classList.remove('spear-attack-top', 'spear-attack-bottom');
    document.getElementById('lootDrop').classList.remove('dropping');
    document.getElementById('lootDrop').style.display = 'none';

    document.getElementById('heroImg').classList.remove('running');
    document.getElementById('heroWrapper').classList.remove('running-wrapper');

    document.getElementById('enemyImg').classList.remove('shake');

    level = 1;

    saveGame();
    showSection('menu');
}

function skipBoss() {
    playSfx('clickSound');
    document.getElementById('game').style.background = "url('https://terraria.wiki.gg/images/Forest_background_9.png') center / cover no-repeat fixed";
    level++;
    typeText("BOSS SKIPPED!");
    saveGame();
    setupLevel();
}

function quitToMenuFromLanding() {
    playSfx('clickSound');
    clearInterval(gameTimer);
    cancelAnimationFrame(sweepInterval);
    attackBarActive = false;

    document.getElementById('weaponOverlay').classList.remove('swinging', 'throwing');
    document.getElementById('terraprisma').classList.remove('prisma-attack');
    document.getElementById('kaidoWhip').classList.remove('whip-lash');
    document.getElementById('terrarianSpear').classList.remove('spear-attack-top', 'spear-attack-bottom');
    document.getElementById('lootDrop').classList.remove('dropping');
    document.getElementById('lootDrop').style.display = 'none';

    document.getElementById('heroImg').classList.remove('running');
    document.getElementById('heroWrapper').classList.remove('running-wrapper');

    document.getElementById('enemyImg').classList.remove('shake');

    level = 1;

    saveGame();
    showSection('menu');
}

// --- WASD DODGING MECHANIC ---
let keys = { w: false, a: false, s: false, d: false };
let dodgePlayer = { x: 140, y: 50, speed: 3 };
let dodgeLoop, projectileLoop;
let projectiles = [];
let playerFacingRight = true;

window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') keys.w = true;
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.a = true;
    if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') keys.s = true;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.d = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') keys.w = false;
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.a = false;
    if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') keys.s = false;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.d = false;
});

document.addEventListener('click', (e) => {
    if (isDodging && document.getElementById('dodgeArena').style.display === 'block') {
        let playerImg = document.getElementById('dodgePlayer');
        let arena = document.getElementById('dodgeArena');
        let arenaRect = arena.getBoundingClientRect();
        let clickX = e.clientX - arenaRect.left;

        if (clickX > dodgePlayer.x + 20) {
            playerFacingRight = true;
            playerImg.style.transform = 'scaleX(1)';
        } else if (clickX < dodgePlayer.x - 20) {
            playerFacingRight = false;
            playerImg.style.transform = 'scaleX(-1)';
        }
    }
});

function updateDodgeHP() {
    let hpBar = document.getElementById('dodgeHPBar');
    let hpText = document.getElementById('dodgeHPText');
    let percentage = (heroHP / maxHeroHP) * 100;

    hpBar.style.width = percentage + '%';
    hpText.innerText = heroHP + '/' + maxHeroHP;
}

function startDodgingGame() {
    isDodging = true;

    document.getElementById('inputZone').style.display = "none";
    document.getElementById('heroWrapper').style.visibility = "hidden";

    let arena = document.getElementById('dodgeArena');
    let playerImg = document.getElementById('dodgePlayer');

    arena.style.display = "block";
    playerImg.src = heroImages[hero];

    updateDodgeHP();

    dodgePlayer.x = 190;
    dodgePlayer.y = 140;
    projectiles.forEach(p => p.el.remove());
    projectiles = [];

    dodgeTimeLeft = 40;
    document.getElementById('dodgeTimer').innerText = `SURVIVE: ${dodgeTimeLeft}s`;

    dodgeSurvivalTimer = setInterval(() => {
        dodgeTimeLeft--;
        document.getElementById('dodgeTimer').innerText = `SURVIVE: ${dodgeTimeLeft}s`;

        if (dodgeTimeLeft <= 0) {
            alert("YOU SURVIVED THE ASSAULT!");
            stopDodgingGame();
        }
    }, 1000);

    function gameLoop() {
        if (!isDodging) return;

        if (keys.w && dodgePlayer.y > 0) dodgePlayer.y -= dodgePlayer.speed;
        if (keys.s && dodgePlayer.y < 280) dodgePlayer.y += dodgePlayer.speed;
        if (keys.a && dodgePlayer.x > 0) dodgePlayer.x -= dodgePlayer.speed;
        if (keys.d && dodgePlayer.x < 380) dodgePlayer.x += dodgePlayer.speed;

        playerImg.style.top = dodgePlayer.y + 'px';
        playerImg.style.left = dodgePlayer.x + 'px';

        for (let i = projectiles.length - 1; i >= 0; i--) {
            let p = projectiles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.el.style.left = p.x + 'px';
            p.el.style.top = p.y + 'px';

            if (Math.abs(p.x - dodgePlayer.x) < 15 && Math.abs(p.y - dodgePlayer.y) < 15) {
                heroHP -= 5;
                if (typeof playSfx === "function") playSfx('attackSound');
                updateBars();
                updateDodgeHP();

                p.el.remove();
                projectiles.splice(i, 1);

                if (heroHP <= 0) {
                    alert("SKELETON PRIME OBLITERATED YOU.");
                    stopDodgingGame();
                    quitGame();
                }
                continue;
            }

            if (p.x < -20 || p.x > 420 || p.y < -20 || p.y > 320) {
                p.el.remove();
                projectiles.splice(i, 1);
            }
        }
        dodgeLoop = requestAnimationFrame(gameLoop);
    }

    projectileLoop = setInterval(() => {
        if (enemyHP <= 0 || !isDodging) return;

        let pEl = document.createElement('img');
        pEl.src = "https://terraria.wiki.gg/images/Stress_Ball.png";
        pEl.className = "stress-ball";
        document.getElementById('dodgeArena').appendChild(pEl);

        let startLeft = Math.random() > 0.5;
        let p = {
            el: pEl,
            x: startLeft ? -10 : 410,
            y: Math.random() * 280,
            vx: startLeft ? (Math.random() * 2 + 2) : -(Math.random() * 2 + 2),
            vy: (Math.random() * 3) - 1.5
        };
        projectiles.push(p);
    }, 250);

    dodgeLoop = requestAnimationFrame(gameLoop);
}

function stopDodgingGame() {
    isDodging = false;
    cancelAnimationFrame(dodgeLoop);
    clearInterval(projectileLoop);
    clearInterval(dodgeSurvivalTimer);

    document.getElementById('dodgeArena').style.display = "none";
    document.getElementById('heroWrapper').style.visibility = "visible";
    document.getElementById('inputZone').style.display = "block";

    projectiles.forEach(p => p.el.remove());
    projectiles = [];

    startTimer();
}

// --- SHOP & INVENTORY ---
function buyItem(item, cost) {
    playSfx('clickSound');
    if (inventory.includes(item)) {
        typeText("ALREADY OWNED!");
        return;
    }
    if (coins >= cost) {
        coins -= cost;
        inventory.push(item);
        playSfx('buySound');
        typeText("PURCHASED " + item + "!");
        updateUI();
        saveGame();
    } else {
        typeText("NOT ENOUGH GOLD!");
    }
}

function buyUpgrade(type) {
    playSfx('clickSound');
    let cost = (type === 'HP') ? 200 + (hpLevel * 50) : 200 + (dmgLevel * 50);
    if (coins >= cost) {
        coins -= cost;
        if (type === 'HP') hpLevel++;
        else dmgLevel++;
        playSfx('upgradeSound');
        typeText(type + " UPGRADED!");
        updateUI();
        saveGame();
    } else {
        typeText("NOT ENOUGH GOLD!");
    }
}

function openBackpack() {
    playSfx('clickSound');
    let grid = document.getElementById('backpackGrid');
    grid.innerHTML = '';
    if (inventory.length === 0) {
        grid.innerHTML = "<div style='color:gray; font-size:10px; grid-column:span 2;'>BACKPACK IS EMPTY</div>";
    } else {
        inventory.forEach(item => {
            let div = document.createElement('div');
            div.className = 'menu-btn';
            if (equippedWeapon === item) div.classList.add('equipped');
            div.innerHTML = `<img src="${itemIcons[item]}" class="shop-icon">${item}<br>+${weaponStats[item] || 0} DMG`;
            div.onclick = () => {
                equipWeapon(item, div);
            };
            grid.appendChild(div);
        });
    }

    let unequipBtn = document.createElement('div');
    unequipBtn.className = 'menu-btn';
    unequipBtn.style.borderColor = "red";
    unequipBtn.style.color = "red";
    unequipBtn.innerHTML = "❌ UNEQUIP WEAPON";
    unequipBtn.onclick = () => {
        equipWeapon(null, unequipBtn);
    };
    grid.appendChild(unequipBtn);

    showSection('backpack');
}

function equipWeapon(item, el) {
    playSfx('clickSound');
    equippedWeapon = item;
    scytheHits = 0;
    document.querySelectorAll('#backpackGrid .menu-btn').forEach(btn => btn.classList.remove('equipped'));
    if (item) el.classList.add('equipped');
    typeText(item ? "EQUIPPED " + item + "!" : "WEAPON UNEQUIPPED!");
    saveGame();
}

// --- CHARACTER SELECTION ---
function selectDifficulty(d) {
    playSfx('clickSound');
    difficulty = d;

    if (d === 'Easy') BOSS_TRIGGER = 5;
    else if (d === 'Normal') BOSS_TRIGGER = 10;
    else if (d === 'Hard') BOSS_TRIGGER = 20;

    typeText("DIFFICULTY SET: " + d);
    showSection('landing');
}

function selectAge(a, el) {
    playSfx('clickSound');
    age = a;
    document.querySelectorAll('.age').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
}

function selectHero(hName, el) {
    playSfx('clickSound');
    if (ownedHeroes.includes(hName)) {
        hero = hName;
        document.querySelectorAll('.hero').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
    } else {
        let price = heroStats[hName].price;
        if (coins >= price) {
            coins -= price;
            ownedHeroes.push(hName);
            el.classList.remove('locked');
            typeText("UNLOCKED " + hName + "!");
            selectHero(hName, el);
            updateUI();
            saveGame();
        } else {
            typeText("NEED " + price + " GOLD!");
        }
    }
}

// --- ADMIN & REBIRTH ---
function runAdminPrompt() {
    playSfx('clickSound');
    let code = prompt("ENTER ADMIN CODE:");
    if (code === "MARIZA") {
        coins += 100000;
        typeText("ADMIN CODE ACCEPTED! +100k GOLD");
    } else if (code === "LEVELUP") {
        level = 499;
        typeText("ADMIN: LEVEL SET TO 499");
    } else if (code === "BOSS") {
        level = BOSS_TRIGGER - 1;
        typeText("ADMIN: NEXT FIGHT IS BOSS");
    } else if (code === "bow") {
        inventory.push('DEVOUR_PRIDE');
        typeText("ADMIN: DEVOUR PRIDE BOW OBTAINED!");
        playSfx('upgradeSound');
    } else {
        typeText("INVALID CODE.");
    }
    updateUI();
    saveGame();
}

function triggerReset() {
    playSfx('clickSound');
    if (level >= 500) {
        resetCount++;
        level = 1;
        coins += 50000;
        typeText("REBORN! POWER GROWS... (+50k Gold)");
        checkQuestProgress();
        updateUI();
        saveGame();
    } else {
        typeText("NEED LEVEL 500 TO REBIRTH!");
    }
}

// --- DIALOGUE SYSTEM ---
let typeTimeout;
function typeText(text) {
    let box = document.getElementById('dialogueBox');
    let content = document.getElementById('dialogueContent');
    box.style.display = 'block';
    content.innerHTML = '';
    clearTimeout(typeTimeout);
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            content.innerHTML += text.charAt(i);
            i++;
            typeTimeout = setTimeout(typeWriter, 30);
        } else {
            setTimeout(() => {
                box.style.display = 'none';
            }, 3000);
        }
    }
    typeWriter();
}

function closeDialogue() {
    document.getElementById('dialogueBox').style.display = 'none';
    clearTimeout(typeTimeout);
}

// --- AUDIO SYSTEM ---
function playSfx(id) {
    if (!soundsMuted) {
        let a = document.getElementById(id);
        if (a) {
            a.currentTime = 0;
            a.play().catch(e => console.log(e));
        }
    }
}

function toggleAllSounds() {
    soundsMuted = !soundsMuted;
    document.getElementById('soundMasterBtn').innerText = soundsMuted ? "🔇 SOUND: OFF" : "🔊 SOUND: ON";
    let bgm = document.getElementById('bgMusic');
    if (soundsMuted) {
        bgm.pause();
    } else {
        bgm.play().catch(e => console.log("Auto-play prevented"));
    }
}

function updateMusic(state) {
    let bgm = document.getElementById('bgMusic');
    let targetSong = "";

    if (state === 'menu') targetSong = SONG_MENU;
    if (state === 'fight') targetSong = SONG_FIGHT;
    if (state === 'boss') targetSong = SONG_BOSS;
    if (state === 'crafting') targetSong = SONG_CRAFTING;

    if (bgm.src !== targetSong) {
        bgm.src = targetSong;
        if (!soundsMuted) bgm.play();
    }
}

// --- PRACTICE MODE ---
let practiceQuestions = [];
let practiceCurrentIndex = 0;
let practiceTimeLimit = 30;
let practiceTimer = null;
let practiceTimeRemaining = 30;

function addPracticeQuestion() {
    let container = document.getElementById('practiceQuestions');
    let newQuestion = document.createElement('div');
    newQuestion.className = 'practice-question-item';
    newQuestion.style.cssText = 'background: rgba(255,255,255,0.1); padding: 10px; margin: 10px 0; border: 2px solid gray;';
    newQuestion.innerHTML = `
        <input type="text" placeholder="Question (e.g., 5 + 3 = ?)" class="practice-q" style="width: 90%; margin: 5px 0; font-size: 10px;">
        <input type="number" placeholder="Answer" class="practice-a" style="width: 90%; margin: 5px 0; font-size: 10px;">
    `;
    container.appendChild(newQuestion);
    playSfx('clickSound');
}

function startPracticeMode() {
    playSfx('clickSound');

    practiceQuestions = [];
    let questionItems = document.querySelectorAll('.practice-question-item');

    questionItems.forEach(item => {
        let q = item.querySelector('.practice-q').value;
        let a = item.querySelector('.practice-a').value;
        if (q && a) {
            practiceQuestions.push({ question: q, answer: parseInt(a) });
        }
    });

    if (practiceQuestions.length === 0) {
        alert('Please add at least one question!');
        return;
    }

    practiceTimeLimit = parseInt(document.getElementById('practiceTime').value) || 30;

    practiceCurrentIndex = 0;
    showSection('practiceGame');
    loadPracticeQuestion();
}

function loadPracticeQuestion() {
    if (practiceCurrentIndex >= practiceQuestions.length) {
        alert('🎉 PRACTICE COMPLETE! You answered all questions!');
        quitPractice();
        return;
    }

    let current = practiceQuestions[practiceCurrentIndex];
    document.getElementById('practiceQuestion').innerText = current.question;
    document.getElementById('practiceAnswer').value = '';
    document.getElementById('practiceAnswer').focus();
    document.getElementById('practiceQuestionNum').innerText = practiceCurrentIndex + 1;
    document.getElementById('practiceTotalQuestions').innerText = practiceQuestions.length;
    document.getElementById('practiceAIFeedback').style.display = 'none';

    practiceTimeRemaining = practiceTimeLimit;
    document.getElementById('practiceTimeDisplay').innerText = practiceTimeRemaining;

    clearInterval(practiceTimer);
    practiceTimer = setInterval(() => {
        practiceTimeRemaining--;
        document.getElementById('practiceTimeDisplay').innerText = practiceTimeRemaining;

        if (practiceTimeRemaining <= 0) {
            clearInterval(practiceTimer);
            showPracticeFeedback(false);
        }
    }, 1000);
}

function checkPracticeAnswer() {
    playSfx('clickSound');
    clearInterval(practiceTimer);

    let userAnswer = parseInt(document.getElementById('practiceAnswer').value);
    let correctAnswer = practiceQuestions[practiceCurrentIndex].answer;

    if (userAnswer === correctAnswer) {
        playSfx('bipSound');
        alert('✓ CORRECT!');
        practiceCurrentIndex++;
        loadPracticeQuestion();
    } else {
        playSfx('wrongSound');
        showPracticeFeedback(true);
    }
}

function showPracticeFeedback(userAnswered) {
    let feedback = document.getElementById('practiceAIFeedback');
    let correctAnswer = practiceQuestions[practiceCurrentIndex].answer;
    let question = practiceQuestions[practiceCurrentIndex].question;

    document.getElementById('practiceCorrectAnswer').innerText = correctAnswer;
    let explanation = generatePracticeExplanation(question, correctAnswer);
    document.getElementById('practiceExplanation').innerText = explanation;

    feedback.style.display = 'block';

    setTimeout(() => {
        feedback.style.display = 'none';
        practiceCurrentIndex++;
        loadPracticeQuestion();
    }, 4000);
}

function generatePracticeExplanation(question, answer) {
    if (question.includes('+')) {
        return `Addition: Add the numbers together to get ${answer}.`;
    } else if (question.includes('-')) {
        return `Subtraction: Subtract to get ${answer}.`;
    } else if (question.includes('×') || question.includes('*') || question.includes('x')) {
        return `Multiplication: Multiply the numbers to get ${answer}.`;
    } else if (question.includes('÷') || question.includes('/')) {
        return `Division: Divide to get ${answer}.`;
    }
    return `The correct answer is ${answer}. Review the steps to solve this problem.`;
}

function quitPractice() {
    clearInterval(practiceTimer);
    document.getElementById('practiceAIFeedback').style.display = 'none';
    showSection('menu');
}

// --- WEAPON TEST FUNCTIONS ---
const heroes = {
    Addy: "https://terraria.wiki.gg/images/Ninja_armor.png",
    Subtra: "https://terraria.wiki.gg/images/Djinn%27s_Curse_%28equipped%29.gif",
    Max: "https://terraria.wiki.gg/images/Obsidian_armor_female.png",
    Divina: "https://terraria.wiki.gg/images/Crimson_armor.png",
    Lastly: "https://terraria.wiki.gg/images/Frost_armor.png"
};

const weaponTestStats = {
    'SWORD': 30, 'HORNET_STAFF': 60, 'MASTER_SWORD': 90, 'FROST_STAFF': 120,
    'STARDUST_STAFF': 180, 'VOID_SWORD': 200, 'CRYSTAL_STAFF': 250, 'KAIDO_WHIP': 300,
    'TERRAPRISMA': 500, 'TERRARIAN_SABER': 150
};

itemIcons['TERRARIAN_SABER'] = 'https://static.wikia.nocookie.net/terraria_gamepedia/images/6/6d/Terrarian.png';

function initWeaponTest() {
    const heroImg = document.getElementById('testHeroImg');
    if (heroes[hero]) {
        heroImg.src = heroes[hero];
    }

    const weaponOverlay = document.getElementById('testWeaponOverlay');
    if (equippedWeapon && itemIcons[equippedWeapon]) {
        weaponOverlay.src = itemIcons[equippedWeapon];
        weaponOverlay.style.display = 'block';
    } else {
        weaponOverlay.style.display = 'none';
    }

    const dummy = document.getElementById('testDummy');
    dummy.src = 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/94/Target_Dummy.png';
    dummy.classList.remove('hit');

    updateTestStats();
}

function updateTestStats() {
    const weaponNameEl = document.getElementById('testWeaponName');
    const baseDmgEl = document.getElementById('testBaseDmg');
    const weaponDmgEl = document.getElementById('testWeaponDmg');
    const totalDmgEl = document.getElementById('testTotalDmg');

    let baseDmg = heroStats[hero] ? heroStats[hero].dmg : 10;
    baseDmg += (dmgLevel * 5);

    let wepDmg = equippedWeapon ? (weaponTestStats[equippedWeapon] || 0) : 0;

    let totalDmg = baseDmg + wepDmg;

    weaponNameEl.textContent = equippedWeapon || 'NONE';
    baseDmgEl.textContent = baseDmg;
    weaponDmgEl.textContent = wepDmg;
    totalDmgEl.textContent = totalDmg;
}

function hitDummy() {
    playSfx('attackSound');

    const dummy = document.getElementById('testDummy');
    const weaponOverlay = document.getElementById('testWeaponOverlay');

    weaponOverlay.classList.add('swinging');
    setTimeout(() => {
        weaponOverlay.classList.remove('swinging');
    }, 400);

    dummy.src = 'https://static.wikia.nocookie.net/terraria_gamepedia/images/0/06/Target_Dummy_%28placed%29.gif';
    dummy.classList.add('hit');

    let baseDmg = heroStats[hero] ? heroStats[hero].dmg : 10;
    baseDmg += (dmgLevel * 5);
    let wepDmg = equippedWeapon ? (weaponTestStats[equippedWeapon] || 0) : 0;
    let totalDmg = baseDmg + wepDmg;

    showDamagePopup(totalDmg);

    setTimeout(() => {
        dummy.src = 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/94/Target_Dummy.png';
        dummy.classList.remove('hit');
    }, 500);
}

function showDamagePopup(damage) {
    const container = document.getElementById('damagePopups');
    const popup = document.createElement('div');
    popup.className = 'damageNumber';
    popup.textContent = '-' + damage;

    popup.style.left = (60 + Math.random() * 30) + '%';
    popup.style.top = (30 + Math.random() * 20) + '%';

    container.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}

// Initialize on Load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        updateUI();
    });
}
