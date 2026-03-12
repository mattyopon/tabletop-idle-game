// game.js — Core game logic for Tabletop Adventure Story

(function() {
  'use strict';

  // ========== GAME STATE ==========
  const DEFAULT_STATE = {
    party: { level: 1, exp: 0, hp: 30, maxHp: 30, atk: 5, def: 3 },
    gold: 0,
    inventory: [],
    equipment: { weapon: null, armor: null },
    stats: { monstersDefeated: 0, adventureCount: 0 },
    lastSave: new Date().toISOString(),
    mode: 'adventure', // 'adventure', 'rest', 'equipment'
    adventureTimer: 0,
    currentScene: 'grassland'
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let cheerCooldown = false;
  let intervals = [];

  // ========== GAME DATA ==========

  const EXP_TABLE = [];
  for (let i = 0; i <= 20; i++) {
    EXP_TABLE[i] = Math.floor(50 * Math.pow(1.5, i));
  }

  const MONSTERS = [
    { name: 'スライム', hp: 10, atk: 2, def: 1, exp: 10, gold: 5, emoji: '🟢' },
    { name: 'ゴブリン', hp: 20, atk: 5, def: 2, exp: 20, gold: 12, emoji: '👺' },
    { name: 'コウモリ', hp: 15, atk: 4, def: 1, exp: 15, gold: 8, emoji: '🦇' },
    { name: 'オーク', hp: 35, atk: 8, def: 5, exp: 35, gold: 25, emoji: '👹' },
    { name: 'ゴースト', hp: 25, atk: 7, def: 3, exp: 25, gold: 18, emoji: '👻' },
  ];

  const RARE_MONSTERS = [
    { name: 'ドラゴン', hp: 100, atk: 20, def: 10, exp: 200, gold: 150, emoji: '🐉' },
    { name: 'ミミック', hp: 50, atk: 12, def: 8, exp: 80, gold: 100, emoji: '📦' },
  ];

  const ITEMS = [
    { id: 'herb', name: '薬草', desc: 'HP+10回復', type: 'consumable', effect: { hp: 10 }, rarity: 'common' },
    { id: 'gem', name: '宝石', desc: '50Gで売れる', type: 'treasure', sellPrice: 50, rarity: 'common' },
    { id: 'old_key', name: '古びた鍵', desc: '何かの扉を開けそう', type: 'key', rarity: 'uncommon' },
    { id: 'iron_sword', name: '鉄の剣', desc: '攻撃力+3', type: 'weapon', stat: { atk: 3 }, rarity: 'common' },
    { id: 'steel_sword', name: '鋼の剣', desc: '攻撃力+6', type: 'weapon', stat: { atk: 6 }, rarity: 'uncommon' },
    { id: 'legend_sword', name: '伝説の剣', desc: '攻撃力+15', type: 'weapon', stat: { atk: 15 }, rarity: 'legendary' },
    { id: 'leather', name: '革の鎧', desc: '防御力+2', type: 'armor', stat: { def: 2 }, rarity: 'common' },
    { id: 'chain_mail', name: '鎖帷子', desc: '防御力+5', type: 'armor', stat: { def: 5 }, rarity: 'uncommon' },
    { id: 'mithril_armor', name: 'ミスリルの鎧', desc: '防御力+12', type: 'armor', stat: { def: 12 }, rarity: 'legendary' },
    { id: 'potion', name: 'ハイポーション', desc: 'HP+30回復', type: 'consumable', effect: { hp: 30 }, rarity: 'uncommon' },
  ];

  const SCENES = ['grassland', 'cave', 'forest'];

  const EVENT_MESSAGES = {
    nothing: [
      '穏やかな道を歩いている...',
      '鳥のさえずりが聞こえる',
      '美しい景色に心が和む',
      '小川のせせらぎが心地よい',
      '花畑を見つけた！'
    ],
    discovery: [
      '宝箱を発見した！',
      '光る何かが落ちている...',
      '古い祠を見つけた',
      '隠し通路を発見！'
    ]
  };

  // ========== DOM ELEMENTS ==========
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ========== INITIALIZATION ==========
  function init() {
    loadState();
    setupCharacters();
    setupUI();
    startGameLoop();
    calculateOfflineProgress();
    addLog('🏰 卓上冒険物語、はじまり！');
    updateDisplay();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem('tabletop_idle_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...JSON.parse(JSON.stringify(DEFAULT_STATE)), ...parsed };
        // Ensure nested objects are merged properly
        state.party = { ...DEFAULT_STATE.party, ...parsed.party };
        state.equipment = { ...DEFAULT_STATE.equipment, ...parsed.equipment };
        state.stats = { ...DEFAULT_STATE.stats, ...parsed.stats };
      }
    } catch (e) {
      console.warn('Failed to load save:', e);
    }
  }

  function saveState() {
    state.lastSave = new Date().toISOString();
    try {
      localStorage.setItem('tabletop_idle_save', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save:', e);
    }
  }

  function calculateOfflineProgress() {
    if (!state.lastSave) return;
    const now = Date.now();
    const last = new Date(state.lastSave).getTime();
    const elapsed = Math.floor((now - last) / 1000); // seconds

    if (elapsed > 60) {
      const offlineGold = Math.min(elapsed, 86400); // max 24h worth
      state.gold += offlineGold;
      addLog(`💰 留守中に ${offlineGold.toLocaleString()} ゴールド貯まりました！`);
    }
  }

  // ========== CHARACTER SETUP ==========
  function setupCharacters() {
    const chars = window.CharacterData;
    if (!chars) return;

    const heroEl = document.getElementById('hero-sprite');
    const mageEl = document.getElementById('mage-sprite');
    const healerEl = document.getElementById('healer-sprite');

    if (heroEl) heroEl.style.boxShadow = chars.hero;
    if (mageEl) mageEl.style.boxShadow = chars.mage;
    if (healerEl) healerEl.style.boxShadow = chars.healer;
  }

  // ========== UI SETUP ==========
  function setupUI() {
    // Close button
    const closeBtn = document.getElementById('btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        saveState();
        window.close();
      });
    }

    // Minimize button
    const minBtn = document.getElementById('btn-minimize');
    if (minBtn) {
      minBtn.addEventListener('click', () => {
        saveState();
        window.close();
      });
    }

    // Menu button
    const menuBtn = document.getElementById('btn-menu');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const menu = document.getElementById('menu-dropdown');
        if (menu) menu.classList.toggle('show');
      });
    }

    // Reset save option
    const resetBtn = document.getElementById('menu-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('セーブデータをリセットしますか？')) {
          localStorage.removeItem('tabletop_idle_save');
          state = JSON.parse(JSON.stringify(DEFAULT_STATE));
          updateDisplay();
          addLog('🔄 セーブデータをリセットしました');
        }
        const menu = document.getElementById('menu-dropdown');
        if (menu) menu.classList.remove('show');
      });
    }

    // Action buttons
    const restBtn = document.getElementById('btn-rest');
    const adventureBtn = document.getElementById('btn-adventure');
    const equipBtn = document.getElementById('btn-equip');

    if (restBtn) restBtn.addEventListener('click', () => setMode('rest'));
    if (adventureBtn) adventureBtn.addEventListener('click', () => setMode('adventure'));
    if (equipBtn) equipBtn.addEventListener('click', toggleEquipment);

    // Cheer click on scene
    const scene = document.getElementById('scene');
    if (scene) {
      scene.addEventListener('click', (e) => {
        if (e.target.closest('.no-drag')) return;
        cheerAction(e);
      });
    }

    // Close click outside menu
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('menu-dropdown');
      const menuBtn = document.getElementById('btn-menu');
      if (menu && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  }

  // ========== GAME MODES ==========
  function setMode(mode) {
    state.mode = mode;
    const scene = document.getElementById('scene');
    const restBtn = document.getElementById('btn-rest');
    const adventureBtn = document.getElementById('btn-adventure');

    // Update button states
    $$('.action-btn').forEach(b => b.classList.remove('active'));

    if (mode === 'rest') {
      scene.className = 'scene rest-scene';
      if (restBtn) restBtn.classList.add('active');
      showRestScene();
      addLog('🏕️ 焚き火で休憩中...HPが回復していきます');
    } else if (mode === 'adventure') {
      state.currentScene = SCENES[Math.floor(Math.random() * SCENES.length)];
      scene.className = `scene ${state.currentScene}-scene`;
      if (adventureBtn) adventureBtn.classList.add('active');
      showAdventureScene();
      addLog('⚔️ 冒険に出発！');
    }

    updateDisplay();
  }

  function showAdventureScene() {
    const chars = document.getElementById('characters');
    if (!chars) return;
    chars.style.display = 'flex';

    const campfire = document.getElementById('campfire');
    if (campfire) campfire.style.display = 'none';

    const monsterArea = document.getElementById('monster-area');
    if (monsterArea) monsterArea.style.display = 'none';
  }

  function showRestScene() {
    const scene = document.getElementById('scene');
    if (!scene) return;

    const campfire = document.getElementById('campfire');
    if (campfire) {
      campfire.style.display = 'block';
      const fireSprite = document.getElementById('campfire-sprite');
      if (fireSprite && window.CharacterData) {
        fireSprite.style.boxShadow = window.CharacterData.campfire;
      }
    }

    const monsterArea = document.getElementById('monster-area');
    if (monsterArea) monsterArea.style.display = 'none';
  }

  // ========== EQUIPMENT ==========
  function toggleEquipment() {
    const panel = document.getElementById('equipment-panel');
    if (!panel) return;

    if (panel.classList.contains('show')) {
      panel.classList.remove('show');
      return;
    }

    renderEquipmentPanel();
    panel.classList.add('show');
  }

  function renderEquipmentPanel() {
    const panel = document.getElementById('equipment-panel');
    if (!panel) return;

    const weapons = state.inventory.filter(id => {
      const item = ITEMS.find(i => i.id === id);
      return item && item.type === 'weapon';
    });
    const armors = state.inventory.filter(id => {
      const item = ITEMS.find(i => i.id === id);
      return item && item.type === 'armor';
    });
    const consumables = state.inventory.filter(id => {
      const item = ITEMS.find(i => i.id === id);
      return item && (item.type === 'consumable' || item.type === 'treasure' || item.type === 'key');
    });

    let html = '<div class="equip-section">';
    html += '<div class="equip-title">⚔️ 装備中</div>';

    const curWeapon = state.equipment.weapon ? ITEMS.find(i => i.id === state.equipment.weapon) : null;
    const curArmor = state.equipment.armor ? ITEMS.find(i => i.id === state.equipment.armor) : null;
    html += `<div class="equip-slot">武器: ${curWeapon ? curWeapon.name : 'なし'}</div>`;
    html += `<div class="equip-slot">防具: ${curArmor ? curArmor.name : 'なし'}</div>`;

    // Available items
    html += '<div class="equip-title" style="margin-top:6px">🎒 アイテム</div>';

    if (state.inventory.length === 0) {
      html += '<div class="equip-slot">アイテムなし</div>';
    }

    // deduplicate and count
    const counts = {};
    state.inventory.forEach(id => { counts[id] = (counts[id] || 0) + 1; });

    Object.entries(counts).forEach(([id, count]) => {
      const item = ITEMS.find(i => i.id === id);
      if (!item) return;
      const countStr = count > 1 ? ` x${count}` : '';
      const isEquipped = state.equipment.weapon === id || state.equipment.armor === id;

      html += `<div class="equip-item ${item.rarity}" data-item="${id}">`;
      html += `<span>${item.name}${countStr}</span>`;

      if (item.type === 'weapon' || item.type === 'armor') {
        if (isEquipped) {
          html += `<button class="equip-btn" onclick="GameEngine.unequip('${id}')">外す</button>`;
        } else {
          html += `<button class="equip-btn" onclick="GameEngine.equip('${id}')">装備</button>`;
        }
      } else if (item.type === 'consumable') {
        html += `<button class="equip-btn" onclick="GameEngine.useItem('${id}')">使う</button>`;
      } else if (item.type === 'treasure') {
        html += `<button class="equip-btn" onclick="GameEngine.sellItem('${id}')">売る</button>`;
      }

      html += '</div>';
    });

    html += '</div>';
    panel.innerHTML = html;
  }

  function equip(itemId) {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'weapon') {
      state.equipment.weapon = itemId;
      addLog(`⚔️ ${item.name}を装備した！`);
    } else if (item.type === 'armor') {
      state.equipment.armor = itemId;
      addLog(`🛡️ ${item.name}を装備した！`);
    }

    updateDisplay();
    renderEquipmentPanel();
  }

  function unequip(itemId) {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'weapon' && state.equipment.weapon === itemId) {
      state.equipment.weapon = null;
      addLog(`${item.name}を外した`);
    } else if (item.type === 'armor' && state.equipment.armor === itemId) {
      state.equipment.armor = null;
      addLog(`${item.name}を外した`);
    }

    updateDisplay();
    renderEquipmentPanel();
  }

  function useItem(itemId) {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item || item.type !== 'consumable') return;

    const idx = state.inventory.indexOf(itemId);
    if (idx === -1) return;

    state.inventory.splice(idx, 1);

    if (item.effect && item.effect.hp) {
      state.party.hp = Math.min(state.party.hp + item.effect.hp, state.party.maxHp);
      addLog(`💚 ${item.name}を使った！HP+${item.effect.hp}回復`);
    }

    updateDisplay();
    renderEquipmentPanel();
  }

  function sellItem(itemId) {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item || !item.sellPrice) return;

    const idx = state.inventory.indexOf(itemId);
    if (idx === -1) return;

    state.inventory.splice(idx, 1);
    state.gold += item.sellPrice;
    addLog(`💰 ${item.name}を${item.sellPrice}Gで売った！`);

    updateDisplay();
    renderEquipmentPanel();
  }

  // ========== GAME LOOP ==========
  function startGameLoop() {
    // Clear any existing intervals
    intervals.forEach(id => clearInterval(id));
    intervals = [];

    // Main game tick (every 1 second)
    intervals.push(setInterval(gameTick, 1000));

    // Auto save (every 60 seconds)
    intervals.push(setInterval(saveState, 60000));

    // Passive gold (every second)
    intervals.push(setInterval(() => {
      state.gold += 1;
      updateGoldDisplay();
    }, 1000));

    // Cloud animation
    animateClouds();
  }

  let adventureTickCount = 0;
  const ADVENTURE_DURATION = 30; // 30 seconds for testing (would be 180 for 3 min)

  function gameTick() {
    if (state.mode === 'adventure') {
      adventureTickCount++;
      state.adventureTimer = ADVENTURE_DURATION - (adventureTickCount % ADVENTURE_DURATION);

      // Random event every cycle
      if (adventureTickCount % ADVENTURE_DURATION === 0) {
        triggerAdventureEvent();
        state.stats.adventureCount++;
        state.currentScene = SCENES[Math.floor(Math.random() * SCENES.length)];
        const scene = document.getElementById('scene');
        if (scene) scene.className = `scene ${state.currentScene}-scene`;
      }

      // Minor events during adventure
      if (adventureTickCount % 10 === 0 && adventureTickCount % ADVENTURE_DURATION !== 0) {
        triggerMinorEvent();
      }

      updateTimerDisplay();
    } else if (state.mode === 'rest') {
      // Recover HP
      if (state.party.hp < state.party.maxHp) {
        state.party.hp = Math.min(state.party.hp + 1, state.party.maxHp);
        updateDisplay();
      }
    }
  }

  // ========== ADVENTURE EVENTS ==========
  function triggerAdventureEvent() {
    const roll = Math.random();

    if (roll < 0.40) {
      // Monster encounter
      encounterMonster(false);
    } else if (roll < 0.70) {
      // Item discovery
      discoverItem();
    } else if (roll < 0.90) {
      // Nothing happens
      const msg = EVENT_MESSAGES.nothing[Math.floor(Math.random() * EVENT_MESSAGES.nothing.length)];
      addLog(`🌿 ${msg}`);
    } else {
      // Rare event
      if (Math.random() < 0.3) {
        encounterMonster(true); // rare monster
      } else {
        discoverRareItem();
      }
    }
  }

  function triggerMinorEvent() {
    const roll = Math.random();
    if (roll < 0.3) {
      const msgs = EVENT_MESSAGES.nothing;
      addLog(`🌿 ${msgs[Math.floor(Math.random() * msgs.length)]}`);
    } else if (roll < 0.4) {
      const goldFound = Math.floor(Math.random() * 5) + 1;
      state.gold += goldFound;
      addLog(`✨ 道端に${goldFound}Gが落ちていた！`);
    }
  }

  function encounterMonster(isRare) {
    const monsterPool = isRare ? RARE_MONSTERS : MONSTERS;
    const monster = { ...monsterPool[Math.floor(Math.random() * monsterPool.length)] };

    // Scale monster to party level
    const lvlScale = 1 + (state.party.level - 1) * 0.2;
    monster.hp = Math.floor(monster.hp * lvlScale);
    monster.atk = Math.floor(monster.atk * lvlScale);

    addLog(`${monster.emoji} ${monster.name}が現れた！`);
    showMonsterSprite(monster);

    // Simple battle calculation
    const partyAtk = getEffectiveAtk();
    const partyDef = getEffectiveDef();

    const damageToMonster = Math.max(1, partyAtk - monster.def);
    const damageToParty = Math.max(1, monster.atk - partyDef);

    const turnsToKill = Math.ceil(monster.hp / damageToMonster);
    const totalDamageTaken = damageToParty * turnsToKill;

    // Battle animation
    setTimeout(() => {
      triggerBattleAnimation();
    }, 300);

    setTimeout(() => {
      state.party.hp = Math.max(0, state.party.hp - totalDamageTaken);
      showDamageNumber(totalDamageTaken, 'damage');

      if (state.party.hp <= 0) {
        // Party defeated — recover some HP
        state.party.hp = Math.floor(state.party.maxHp * 0.3);
        addLog(`💀 パーティが倒れた... 気力で立ち上がった！`);
        setMode('rest');
        return;
      }

      state.gold += monster.gold;
      state.party.exp += monster.exp;
      state.stats.monstersDefeated++;

      addLog(`🎉 ${monster.name}を倒した！ +${monster.exp}EXP +${monster.gold}G`);
      showDamageNumber(monster.gold, 'gold');

      checkLevelUp();
      hideMonsterSprite();
      updateDisplay();
    }, 1200);
  }

  function discoverItem() {
    // Filter to common/uncommon items
    const pool = ITEMS.filter(i => i.rarity === 'common' || i.rarity === 'uncommon');
    const item = pool[Math.floor(Math.random() * pool.length)];

    state.inventory.push(item.id);
    addLog(`📦 ${item.name}を見つけた！ — ${item.desc}`);

    // Auto-use herb if HP is low
    if (item.type === 'consumable' && state.party.hp < state.party.maxHp * 0.5) {
      setTimeout(() => {
        useItem(item.id);
      }, 1000);
    }

    updateDisplay();
  }

  function discoverRareItem() {
    const pool = ITEMS.filter(i => i.rarity === 'legendary' || i.rarity === 'uncommon');
    const item = pool[Math.floor(Math.random() * pool.length)];

    state.inventory.push(item.id);
    addLog(`🌟 レア発見！ ${item.name}を手に入れた！`);
    showLevelUpEffect(); // reuse the particle effect
    updateDisplay();
  }

  // ========== COMBAT HELPERS ==========
  function getEffectiveAtk() {
    let atk = state.party.atk;
    if (state.equipment.weapon) {
      const weapon = ITEMS.find(i => i.id === state.equipment.weapon);
      if (weapon && weapon.stat) atk += weapon.stat.atk;
    }
    return atk;
  }

  function getEffectiveDef() {
    let def = state.party.def;
    if (state.equipment.armor) {
      const armor = ITEMS.find(i => i.id === state.equipment.armor);
      if (armor && armor.stat) def += armor.stat.def;
    }
    return def;
  }

  function checkLevelUp() {
    if (state.party.level >= 20) return;

    const needed = EXP_TABLE[state.party.level];
    if (state.party.exp >= needed) {
      state.party.exp -= needed;
      state.party.level++;

      // Stat increases
      state.party.maxHp += 5;
      state.party.hp = state.party.maxHp;
      state.party.atk += 2;
      state.party.def += 1;

      addLog(`🎊 レベルアップ！ Lv.${state.party.level} になった！`);
      showLevelUpEffect();

      // Recursive check for multiple level ups
      checkLevelUp();
    }
  }

  // ========== CHEER ACTION ==========
  function cheerAction(e) {
    if (cheerCooldown) return;
    if (state.mode !== 'adventure') return;

    cheerCooldown = true;
    setTimeout(() => { cheerCooldown = false; }, 5000);

    // Temporary stat boost
    state.party.atk += 2;
    setTimeout(() => { state.party.atk -= 2; updateDisplay(); }, 10000);

    addLog('📣 応援した！ 攻撃力が一時的にUP！');
    showCheerEffect(e);
    updateDisplay();
  }

  // ========== ANIMATIONS ==========
  function triggerBattleAnimation() {
    const chars = document.getElementById('characters');
    if (!chars) return;
    chars.classList.add('battle-rush');
    setTimeout(() => chars.classList.remove('battle-rush'), 600);
  }

  function showMonsterSprite(monster) {
    const area = document.getElementById('monster-area');
    if (!area) return;

    area.style.display = 'flex';
    const sprite = document.getElementById('monster-sprite');
    if (sprite && window.CharacterData) {
      const monsterKey = monster.name === 'スライム' ? 'slime'
        : monster.name === 'ゴブリン' ? 'goblin'
        : monster.name === 'コウモリ' ? 'bat'
        : monster.name === 'ドラゴン' ? 'dragon'
        : 'slime';
      sprite.style.boxShadow = window.CharacterData[monsterKey] || window.CharacterData.slime;
    }

    const nameEl = document.getElementById('monster-name');
    if (nameEl) nameEl.textContent = `${monster.emoji} ${monster.name}`;
  }

  function hideMonsterSprite() {
    const area = document.getElementById('monster-area');
    if (area) {
      area.classList.add('monster-defeat');
      setTimeout(() => {
        area.style.display = 'none';
        area.classList.remove('monster-defeat');
      }, 500);
    }
  }

  function showDamageNumber(value, type) {
    const scene = document.getElementById('scene');
    if (!scene) return;

    const dmg = document.createElement('div');
    dmg.className = `damage-number ${type}`;
    dmg.textContent = type === 'gold' ? `+${value}G` : `-${value}`;
    dmg.style.left = `${100 + Math.random() * 100}px`;
    dmg.style.top = `${60 + Math.random() * 40}px`;
    scene.appendChild(dmg);

    setTimeout(() => dmg.remove(), 1500);
  }

  function showLevelUpEffect() {
    const scene = document.getElementById('scene');
    if (!scene) return;

    // Level up text
    const lvlText = document.createElement('div');
    lvlText.className = 'level-up-text';
    lvlText.textContent = 'Level UP!';
    scene.appendChild(lvlText);
    setTimeout(() => lvlText.remove(), 2000);

    // Particles
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = `${140 + Math.random() * 60}px`;
      p.style.top = `${80 + Math.random() * 40}px`;
      p.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
      p.style.setProperty('--dy', `${-40 - Math.random() * 60}px`);
      p.style.animationDelay = `${Math.random() * 0.3}s`;
      p.style.background = ['#ffd700', '#ff6b6b', '#74b9ff', '#55efc4', '#fdcb6e'][Math.floor(Math.random() * 5)];
      scene.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  function showCheerEffect(e) {
    const scene = document.getElementById('scene');
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Heart/star particles
    const symbols = ['❤️', '⭐', '✨', '💪', '🌟'];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'cheer-particle';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', `${(Math.random() - 0.5) * 100}px`);
      p.style.setProperty('--dy', `${-30 - Math.random() * 80}px`);
      p.style.animationDelay = `${Math.random() * 0.2}s`;
      scene.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  function animateClouds() {
    const scene = document.getElementById('scene');
    if (!scene) return;

    function createCloud() {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.style.top = `${10 + Math.random() * 40}px`;
      cloud.style.opacity = `${0.3 + Math.random() * 0.4}`;
      const size = 20 + Math.random() * 30;
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size * 0.5}px`;
      scene.appendChild(cloud);

      setTimeout(() => cloud.remove(), 20000);
    }

    setInterval(createCloud, 5000);
    createCloud(); // initial cloud
  }

  // ========== DISPLAY UPDATE ==========
  function updateDisplay() {
    // Level & stats
    const levelEl = document.getElementById('stat-level');
    const atkEl = document.getElementById('stat-atk');
    const defEl = document.getElementById('stat-def');
    const hpEl = document.getElementById('stat-hp');
    const goldEl = document.getElementById('stat-gold');
    const expBar = document.getElementById('exp-bar');
    const hpBar = document.getElementById('hp-bar');

    if (levelEl) levelEl.textContent = state.party.level;
    if (atkEl) atkEl.textContent = getEffectiveAtk();
    if (defEl) defEl.textContent = getEffectiveDef();
    if (hpEl) hpEl.textContent = `${state.party.hp}/${state.party.maxHp}`;
    if (goldEl) goldEl.textContent = state.gold.toLocaleString();

    // EXP bar
    if (expBar) {
      const needed = EXP_TABLE[state.party.level] || 999;
      const pct = Math.min(100, (state.party.exp / needed) * 100);
      expBar.style.width = `${pct}%`;
    }

    // HP bar
    if (hpBar) {
      const pct = (state.party.hp / state.party.maxHp) * 100;
      hpBar.style.width = `${pct}%`;
      hpBar.className = `bar-fill hp ${pct < 30 ? 'low' : pct < 60 ? 'mid' : ''}`;
    }

    updateTimerDisplay();
  }

  function updateGoldDisplay() {
    const goldEl = document.getElementById('stat-gold');
    if (goldEl) goldEl.textContent = state.gold.toLocaleString();
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('adventure-timer');
    if (!timerEl) return;

    if (state.mode === 'adventure') {
      const mins = Math.floor(state.adventureTimer / 60);
      const secs = state.adventureTimer % 60;
      timerEl.textContent = `冒険中... 次のイベントまで ${mins}:${secs.toString().padStart(2, '0')}`;
    } else if (state.mode === 'rest') {
      timerEl.textContent = '休憩中... HPが回復しています';
    } else {
      timerEl.textContent = '';
    }
  }

  // ========== LOG ==========
  const MAX_LOG_LINES = 50;

  function addLog(message) {
    const logEl = document.getElementById('log-content');
    if (!logEl) return;

    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = message;
    logEl.appendChild(line);

    // Limit log lines
    while (logEl.children.length > MAX_LOG_LINES) {
      logEl.removeChild(logEl.firstChild);
    }

    // Auto scroll
    logEl.scrollTop = logEl.scrollHeight;
  }

  // ========== PUBLIC API ==========
  window.GameEngine = {
    init,
    equip,
    unequip,
    useItem,
    sellItem
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
