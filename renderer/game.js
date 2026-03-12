// game.js — Core game logic for 卓上冒険物語 v3
// v3: Prestige system, Skill tree, Party synergies, Equipment fusion, Rare monsters

(function() {
  'use strict';

  // ========== JOB DEFINITIONS ==========
  const JOBS = {
    warrior:  { name: 'ウォリアー', role: 'front', hp: 120, atk: 12, def: 15, skill: 'シールドバッシュ', skillDesc: '敵をスタンさせる', sprite: 'warrior' },
    knight:   { name: 'ナイト',     role: 'front', hp: 90,  atk: 18, def: 10, skill: 'ソードダンス',     skillDesc: '3連続攻撃',       sprite: 'knight' },
    mage:     { name: 'メイジ',     role: 'back',  hp: 60,  atk: 25, def: 5,  skill: 'ファイアボール',   skillDesc: '全体魔法攻撃',     sprite: 'mage' },
    healer:   { name: 'ヒーラー',   role: 'back',  hp: 80,  atk: 6,  def: 10, skill: 'ヒールライト',     skillDesc: '味方全体HP回復',   sprite: 'healer' },
    assassin: { name: 'アサシン',   role: 'front', hp: 55,  atk: 22, def: 5,  skill: 'クリティカルストライク', skillDesc: '3倍ダメージ', sprite: 'assassin' },
    summoner: { name: 'サモナー',   role: 'back',  hp: 75,  atk: 14, def: 6,  skill: 'サモンスピリット', skillDesc: '精霊が追加攻撃',   sprite: 'summoner' },
  };

  // ========== AREA / STAGE DEFINITIONS ==========
  const AREAS = [
    {
      id: 'grassland', name: '草原', bgClass: 'grassland-bg', stages: 5,
      enemies: [
        { name: 'スライム',   hp: 20, atk: 4, def: 2, exp: 8,  gold: 5,  sprite: 'slime' },
        { name: 'ゴブリン',   hp: 35, atk: 7, def: 3, exp: 14, gold: 10, sprite: 'goblin' },
        { name: 'ウルフ',     hp: 30, atk: 9, def: 2, exp: 12, gold: 8,  sprite: 'wolf' },
      ],
      boss: { name: 'ゴブリンキング', hp: 150, atk: 18, def: 8, exp: 80, gold: 60, sprite: 'goblinKing' },
    },
    {
      id: 'cave', name: '洞窟', bgClass: 'cave-bg', stages: 5,
      enemies: [
        { name: 'コウモリ',     hp: 25, atk: 8,  def: 2, exp: 12, gold: 8,  sprite: 'bat' },
        { name: 'スケルトン',   hp: 45, atk: 12, def: 6, exp: 20, gold: 15, sprite: 'skeleton' },
        { name: 'ゴーレム',     hp: 80, atk: 10, def: 12, exp: 25, gold: 20, sprite: 'golem' },
      ],
      boss: { name: 'リッチ', hp: 250, atk: 28, def: 12, exp: 150, gold: 100, sprite: 'lich' },
    },
    {
      id: 'forest', name: '森', bgClass: 'forest-bg', stages: 5,
      enemies: [
        { name: 'トレント',   hp: 70, atk: 14, def: 10, exp: 22, gold: 18, sprite: 'treant' },
        { name: 'フェアリー', hp: 30, atk: 18, def: 4,  exp: 18, gold: 14, sprite: 'fairy' },
        { name: '巨大蜘蛛',   hp: 55, atk: 16, def: 6,  exp: 20, gold: 16, sprite: 'spider' },
      ],
      boss: { name: 'エルフロード', hp: 350, atk: 35, def: 18, exp: 250, gold: 180, sprite: 'elfLord' },
    },
    {
      id: 'volcano', name: '火山', bgClass: 'volcano-bg', stages: 5,
      enemies: [
        { name: 'サラマンダー', hp: 60, atk: 20, def: 8,  exp: 28, gold: 22, sprite: 'salamander' },
        { name: 'デーモン',     hp: 90, atk: 25, def: 12, exp: 35, gold: 28, sprite: 'demon' },
        { name: 'フレイムドラゴン', hp: 120, atk: 30, def: 15, exp: 45, gold: 35, sprite: 'flameDragon' },
      ],
      boss: { name: 'ヘルハウンド', hp: 500, atk: 45, def: 22, exp: 400, gold: 300, sprite: 'hellHound' },
    },
    {
      id: 'castle', name: '魔王城', bgClass: 'castle-bg', stages: 5,
      enemies: [
        { name: 'ダークナイト', hp: 110, atk: 30, def: 18, exp: 40, gold: 32, sprite: 'darkKnight' },
        { name: 'ワイバーン',   hp: 100, atk: 35, def: 14, exp: 45, gold: 38, sprite: 'wyvern' },
      ],
      boss: { name: '魔王', hp: 800, atk: 60, def: 30, exp: 1000, gold: 500, sprite: 'demonLord' },
    },
  ];

  // ========== EQUIPMENT DEFINITIONS ==========
  const RARITIES = [
    { id: 'common',    name: 'Common',    color: '#ccc',    affixes: 0, weight: 50 },
    { id: 'uncommon',  name: 'Uncommon',  color: '#4ade80', affixes: 1, weight: 30 },
    { id: 'rare',      name: 'Rare',      color: '#60a5fa', affixes: 2, weight: 14 },
    { id: 'epic',      name: 'Epic',      color: '#c084fc', affixes: 3, weight: 5 },
    { id: 'legendary', name: 'Legendary', color: '#fbbf24', affixes: 4, weight: 1 },
  ];

  const AFFIX_POOL = [
    { name: 'ATK+5%', stat: 'atkPct', value: 5 },
    { name: 'ATK+3',  stat: 'atkFlat', value: 3 },
    { name: 'HP+30',  stat: 'hpFlat', value: 30 },
    { name: 'HP+50',  stat: 'hpFlat', value: 50 },
    { name: 'DEF+3',  stat: 'defFlat', value: 3 },
    { name: 'DEF+5%', stat: 'defPct', value: 5 },
    { name: 'クリティカル+3%', stat: 'critPct', value: 3 },
    { name: '経験値+10%', stat: 'expPct', value: 10 },
    { name: 'ゴールド+15%', stat: 'goldPct', value: 15 },
  ];

  const WEAPON_BASES = [
    { name: '木の剣',     atk: 3 },
    { name: '鉄の剣',     atk: 6 },
    { name: '鋼の大剣',   atk: 10 },
    { name: 'ミスリルの剣', atk: 16 },
    { name: '魔剣ダーク',  atk: 24 },
    { name: '聖剣ライト',  atk: 30 },
  ];
  const ARMOR_BASES = [
    { name: '革の鎧',     def: 2 },
    { name: '鎖帷子',     def: 5 },
    { name: 'プレートメイル', def: 9 },
    { name: 'ミスリルの鎧', def: 14 },
    { name: '竜鱗の鎧',   def: 20 },
    { name: '神鎧ヴァルハラ', def: 28 },
  ];
  const ACCESSORY_BASES = [
    { name: '銅の指輪',   hp: 10 },
    { name: '銀のネックレス', hp: 25 },
    { name: '金の腕輪',   hp: 45 },
    { name: 'ルビーの首飾り', hp: 70 },
    { name: 'ドラゴンオーブ', hp: 100 },
  ];

  // ========== PARTY SYNERGIES ==========
  const SYNERGIES = [
    { id: 'ironWall', name: '鉄壁陣', desc: 'DEF+20%', requires: ['warrior', 'knight'], effect: { defPct: 20 } },
    { id: 'magicSquad', name: '魔法連隊', desc: 'ATK+15%', requires: ['mage', 'summoner'], effect: { atkPct: 15 } },
    { id: 'shadowStrike', name: '暗殺連携', desc: 'クリティカル+8%', requires: ['assassin', 'knight'], effect: { critPct: 8 } },
    { id: 'holyGuard', name: '聖騎士団', desc: 'HP+25%', requires: ['healer', 'knight'], effect: { hpPct: 25 } },
    { id: 'dualBlade', name: '二刀流', desc: 'ATK+10%,Crit+5%', requires: ['warrior', 'assassin'], effect: { atkPct: 10, critPct: 5 } },
    { id: 'arcaneHeal', name: '魔法回復', desc: 'HP回復+2%/秒', requires: ['mage', 'healer'], effect: { regenPct: 2 } },
    { id: 'fullParty', name: '完全編成', desc: '全ステ+10%', requiresCount: 4, effect: { atkPct: 10, defPct: 10, hpPct: 10 } },
  ];

  // ========== SKILL TREE DEFINITIONS ==========
  const SKILL_TREE = {
    atk: [
      { name: 'ATK+3', desc: 'ATK+3', cost: 1, effect: { atkFlat: 3 } },
      { name: 'ATK+5%', desc: 'ATK+5%', cost: 2, effect: { atkPct: 5 } },
      { name: 'Crit+3%', desc: 'クリティカル+3%', cost: 4, effect: { critPct: 3 } },
      { name: 'ATK+10%', desc: 'ATK+10%', cost: 8, effect: { atkPct: 10 } },
      { name: 'ATK+15%,Crit+5%', desc: 'ATK+15%, クリティカル+5%', cost: 16, effect: { atkPct: 15, critPct: 5 } },
    ],
    def: [
      { name: 'DEF+2', desc: 'DEF+2', cost: 1, effect: { defFlat: 2 } },
      { name: 'HP+10%', desc: 'HP+10%', cost: 2, effect: { hpPct: 10 } },
      { name: 'DEF+8%', desc: 'DEF+8%', cost: 4, effect: { defPct: 8 } },
      { name: 'HP+20%', desc: 'HP+20%', cost: 8, effect: { hpPct: 20 } },
      { name: 'DEF+15%,HP+15%', desc: 'DEF+15%, HP+15%', cost: 16, effect: { defPct: 15, hpPct: 15 } },
    ],
    util: [
      { name: 'Gold+10%', desc: 'ゴールド+10%', cost: 1, effect: { goldPct: 10 } },
      { name: 'EXP+10%', desc: '経験値+10%', cost: 2, effect: { expPct: 10 } },
      { name: 'Drop+15%', desc: 'ドロップ率+15%', cost: 4, effect: { dropPct: 15 } },
      { name: 'Gold+25%', desc: 'ゴールド+25%', cost: 8, effect: { goldPct: 25 } },
      { name: 'Drop+30%,EXP+20%', desc: 'ドロップ+30%, EXP+20%', cost: 16, effect: { dropPct: 30, expPct: 20 } },
    ],
  };

  // ========== RARE MONSTER DEFINITIONS ==========
  const RARE_MONSTERS = [
    { name: '宝箱ミミック', hp: 80, atk: 5, def: 5, gold: 500, sprite: 'goblinKing', minRarity: 'rare' },
    { name: 'ゴールデンスライム', hp: 40, atk: 3, def: 1, gold: 1000, sprite: 'slime', minRarity: 'epic', nameColor: '#ffd700' },
    { name: '虹のドラゴン', hp: 150, atk: 15, def: 10, gold: 2000, sprite: 'flameDragon', minRarity: 'legendary' },
  ];

  // ========== EXP TABLE ==========
  const EXP_TABLE = [];
  for (let i = 0; i <= 50; i++) EXP_TABLE[i] = Math.floor(40 * Math.pow(1.4, i));

  // ========== DEFAULT STATE ==========
  const DEFAULT_STATE = {
    partyMembers: [
      { job: 'warrior', level: 1, exp: 0, hp: 120, maxHp: 120, baseAtk: 12, baseDef: 15, equipment: { weapon: null, armor: null, accessory: null } },
    ],
    unlockedJobs: ['warrior'],
    recruitAvailable: null,
    gold: 0,
    inventory: [],
    area: 0,
    stage: 1,
    mode: 'adventure',
    currentTab: 'adventure',
    stats: { monstersDefeated: 0, bossesDefeated: 0, stagesCleared: 0, totalDamage: 0, totalHealing: 0, legendaryDrops: 0, playTime: 0 },
    lastSave: new Date().toISOString(),
    // v3 additions
    prestige: {
      count: 0,
      souls: 0,
      totalSoulsEarned: 0,
      skills: { atk: 0, def: 0, util: 0 }, // level purchased (0-5)
      demonLordDefeated: false,
    },
    rareMonster: null,
    rareMonsterTimer: 0,
    rareMonsterDespawnTimer: 0,
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let intervals = [];
  let battleInProgress = false;
  let nextItemId = 1;
  let tickCount = 0;

  // ========== HELPERS ==========
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function rollRarity(minRarity) {
    if (minRarity) {
      // For rare monster guaranteed drops: filter to only >= minRarity
      const minIdx = RARITIES.findIndex(r => r.id === minRarity);
      const pool = RARITIES.filter((r, i) => i >= minIdx);
      const total = pool.reduce((s, r) => s + r.weight, 0);
      let roll = Math.random() * total;
      for (const r of pool) { roll -= r.weight; if (roll <= 0) return r; }
      return pool[0];
    }
    const total = RARITIES.reduce((s, r) => s + r.weight, 0);
    let roll = Math.random() * total;
    for (const r of RARITIES) { roll -= r.weight; if (roll <= 0) return r; }
    return RARITIES[0];
  }

  function generateEquipment(type, areaIndex, minRarity) {
    const rarity = rollRarity(minRarity || null);
    let base, statName, statValue;
    const tier = Math.min(areaIndex + (rarity.id === 'legendary' ? 2 : rarity.id === 'epic' ? 1 : 0), 5);

    if (type === 'weapon') {
      base = WEAPON_BASES[Math.min(tier, WEAPON_BASES.length - 1)];
      statName = 'atk'; statValue = base.atk;
    } else if (type === 'armor') {
      base = ARMOR_BASES[Math.min(tier, ARMOR_BASES.length - 1)];
      statName = 'def'; statValue = base.def;
    } else {
      base = ACCESSORY_BASES[Math.min(tier, ACCESSORY_BASES.length - 1)];
      statName = 'hp'; statValue = base.hp;
    }

    const affixes = [];
    const pool = [...AFFIX_POOL];
    for (let i = 0; i < rarity.affixes; i++) {
      if (pool.length === 0) break;
      const idx = Math.floor(Math.random() * pool.length);
      affixes.push({ ...pool[idx] });
      pool.splice(idx, 1);
    }

    return {
      id: nextItemId++,
      type,
      baseName: base.name,
      rarity: rarity.id,
      baseStatName: statName,
      baseStatValue: statValue,
      affixes,
    };
  }

  function getEquipName(item) {
    const rarityNames = { common: '', uncommon: '上質な', rare: '精巧な', epic: '壮麗な', legendary: '伝説の' };
    const prefix = rarityNames[item.rarity] || '';
    return prefix + item.baseName;
  }

  function getRarityColor(rarity) {
    const r = RARITIES.find(x => x.id === rarity);
    return r ? r.color : '#ccc';
  }

  // ========== SYNERGY HELPERS ==========
  function getActiveSynergies() {
    const partyJobs = state.partyMembers.map(m => m.job);
    const active = [];
    for (const syn of SYNERGIES) {
      if (syn.requiresCount) {
        if (state.partyMembers.length >= syn.requiresCount) active.push(syn);
      } else if (syn.requires) {
        if (syn.requires.every(j => partyJobs.includes(j))) active.push(syn);
      }
    }
    return active;
  }

  // ========== SKILL TREE HELPERS ==========
  function getSkillTreeEffects() {
    const effects = { atkFlat: 0, atkPct: 0, defFlat: 0, defPct: 0, hpPct: 0, critPct: 0, expPct: 0, goldPct: 0, dropPct: 0 };
    for (const branch of ['atk', 'def', 'util']) {
      const lvl = state.prestige.skills[branch] || 0;
      for (let i = 0; i < lvl; i++) {
        const skill = SKILL_TREE[branch][i];
        if (skill && skill.effect) {
          for (const [key, val] of Object.entries(skill.effect)) {
            effects[key] = (effects[key] || 0) + val;
          }
        }
      }
    }
    return effects;
  }

  // ========== MEMBER STATS ==========
  function getMemberStats(member) {
    const job = JOBS[member.job];
    const lvlBonus = (member.level - 1);
    let hp = job.hp + lvlBonus * 8;
    let atk = job.atk + lvlBonus * 2;
    let def = job.def + lvlBonus * 1;
    let critPct = 5;
    let expPct = 0;
    let goldPct = 0;
    let dropPct = 0;
    let regenPct = 0;

    // Equipment bonuses
    ['weapon', 'armor', 'accessory'].forEach(slot => {
      const eqId = member.equipment[slot];
      if (eqId == null) return;
      const item = state.inventory.find(i => i.id === eqId);
      if (!item) { member.equipment[slot] = null; return; }
      if (item.baseStatName === 'atk') atk += item.baseStatValue;
      if (item.baseStatName === 'def') def += item.baseStatValue;
      if (item.baseStatName === 'hp') hp += item.baseStatValue;
      item.affixes.forEach(af => {
        if (af.stat === 'atkFlat') atk += af.value;
        if (af.stat === 'defFlat') def += af.value;
        if (af.stat === 'hpFlat') hp += af.value;
        if (af.stat === 'atkPct') atk = Math.floor(atk * (1 + af.value / 100));
        if (af.stat === 'defPct') def = Math.floor(def * (1 + af.value / 100));
        if (af.stat === 'critPct') critPct += af.value;
        if (af.stat === 'expPct') expPct += af.value;
        if (af.stat === 'goldPct') goldPct += af.value;
      });
    });

    // Synergy effects (after equipment, before prestige)
    const activeSynergies = getActiveSynergies();
    for (const syn of activeSynergies) {
      const e = syn.effect;
      if (e.atkPct) atk = Math.floor(atk * (1 + e.atkPct / 100));
      if (e.defPct) def = Math.floor(def * (1 + e.defPct / 100));
      if (e.hpPct) hp = Math.floor(hp * (1 + e.hpPct / 100));
      if (e.critPct) critPct += e.critPct;
      if (e.regenPct) regenPct += e.regenPct;
    }

    // Skill tree effects (prestige buffs)
    const skillFx = getSkillTreeEffects();
    atk += skillFx.atkFlat || 0;
    def += skillFx.defFlat || 0;
    atk = Math.floor(atk * (1 + (skillFx.atkPct || 0) / 100));
    def = Math.floor(def * (1 + (skillFx.defPct || 0) / 100));
    hp = Math.floor(hp * (1 + (skillFx.hpPct || 0) / 100));
    critPct += skillFx.critPct || 0;
    expPct += skillFx.expPct || 0;
    goldPct += skillFx.goldPct || 0;
    dropPct += skillFx.dropPct || 0;

    return { hp, atk, def, critPct, expPct, goldPct, dropPct, regenPct };
  }

  function getPartyMaxHp() {
    return state.partyMembers.reduce((s, m) => s + getMemberStats(m).hp, 0);
  }

  function getPartyCurrentHp() {
    return state.partyMembers.reduce((s, m) => s + m.hp, 0);
  }

  // ========== INITIALIZATION ==========
  function init() {
    loadState();
    setupUI();
    startGameLoop();
    calculateOfflineProgress();
    addLog('卓上冒険物語、はじまり！');
    renderScene();
    updateDisplay();
    renderTab();
  }

  function loadState() {
    try {
      // Try v3 save first
      let saved = localStorage.getItem('tabletop_idle_save_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        state = parsed;
        ensureStateFields();
        nextItemId = state.inventory.reduce((max, i) => Math.max(max, i.id + 1), 1);
        return;
      }

      // Migrate from v2
      saved = localStorage.getItem('tabletop_idle_save_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        state = parsed;
        // Add v3 fields
        if (!state.prestige) {
          state.prestige = {
            count: 0,
            souls: 0,
            totalSoulsEarned: 0,
            skills: { atk: 0, def: 0, util: 0 },
            demonLordDefeated: false,
          };
        }
        if (state.rareMonster === undefined) state.rareMonster = null;
        if (state.rareMonsterTimer === undefined) state.rareMonsterTimer = 0;
        if (state.rareMonsterDespawnTimer === undefined) state.rareMonsterDespawnTimer = 0;
        ensureStateFields();
        nextItemId = state.inventory.reduce((max, i) => Math.max(max, i.id + 1), 1);
        // Save as v3
        saveState();
        addLog('セーブデータをv3に移行しました！');
        return;
      }
    } catch (e) { console.warn('Load failed:', e); }
  }

  function ensureStateFields() {
    if (!state.stats.playTime) state.stats.playTime = 0;
    if (!state.stats.legendaryDrops) state.stats.legendaryDrops = 0;
    if (!state.recruitAvailable) state.recruitAvailable = null;
    if (!state.prestige) {
      state.prestige = { count: 0, souls: 0, totalSoulsEarned: 0, skills: { atk: 0, def: 0, util: 0 }, demonLordDefeated: false };
    }
    if (!state.prestige.skills) state.prestige.skills = { atk: 0, def: 0, util: 0 };
    if (state.prestige.totalSoulsEarned === undefined) state.prestige.totalSoulsEarned = state.prestige.souls || 0;
    if (state.prestige.demonLordDefeated === undefined) state.prestige.demonLordDefeated = false;
    if (state.rareMonster === undefined) state.rareMonster = null;
    if (state.rareMonsterTimer === undefined) state.rareMonsterTimer = 0;
    if (state.rareMonsterDespawnTimer === undefined) state.rareMonsterDespawnTimer = 0;
  }

  function saveState() {
    state.lastSave = new Date().toISOString();
    try {
      localStorage.setItem('tabletop_idle_save_v3', JSON.stringify(state));
    } catch (e) { console.warn('Save failed:', e); }
  }

  function calculateOfflineProgress() {
    if (!state.lastSave) return;
    const elapsed = Math.floor((Date.now() - new Date(state.lastSave).getTime()) / 1000);
    if (elapsed > 60) {
      const offGold = Math.min(elapsed, 86400);
      state.gold += offGold;
      addLog(`💰 留守中に ${offGold.toLocaleString()}G 貯まりました！`);
    }
  }

  // ========== UI SETUP ==========
  function setupUI() {
    $('#btn-close')?.addEventListener('click', () => { saveState(); window.close(); });
    $('#btn-minimize')?.addEventListener('click', () => { saveState(); window.close(); });
    $('#btn-menu')?.addEventListener('click', () => {
      $('#menu-dropdown')?.classList.toggle('show');
    });
    $('#menu-reset')?.addEventListener('click', () => {
      if (confirm('セーブデータをリセットしますか？')) {
        localStorage.removeItem('tabletop_idle_save_v3');
        localStorage.removeItem('tabletop_idle_save_v2');
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        nextItemId = 1;
        battleInProgress = false;
        renderScene();
        updateDisplay();
        renderTab();
        addLog('🔄 セーブデータをリセットしました');
      }
      $('#menu-dropdown')?.classList.remove('show');
    });

    document.addEventListener('click', e => {
      const menu = $('#menu-dropdown');
      const menuBtn = $('#btn-menu');
      if (menu && !menu.contains(e.target) && !menuBtn.contains(e.target)) menu.classList.remove('show');
    });

    // Tab buttons
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentTab = btn.dataset.tab;
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTab();
      });
    });
  }

  // ========== GAME LOOP ==========
  function startGameLoop() {
    intervals.forEach(id => clearInterval(id));
    intervals = [];
    intervals.push(setInterval(gameTick, 1000));
    intervals.push(setInterval(saveState, 30000));
    animateClouds();
  }

  function gameTick() {
    tickCount++;
    state.stats.playTime++;

    if (state.mode === 'adventure' && !battleInProgress) {
      // Trigger battle every 3 seconds
      if (tickCount % 3 === 0) {
        startBattle();
      }
    } else if (state.mode === 'rest') {
      // Heal 5% maxHP per second + synergy regenPct
      state.partyMembers.forEach(m => {
        const stats = getMemberStats(m);
        const regenRate = 0.05 + (stats.regenPct || 0) / 100;
        m.hp = Math.min(m.hp + Math.ceil(stats.hp * regenRate), stats.hp);
      });
      updateDisplay();
    }

    // Passive gold
    state.gold += 1;

    // Check recruit opportunity
    if (!state.recruitAvailable && state.partyMembers.length < 4) {
      checkRecruitOpportunity();
    }

    // Rare monster timer
    state.rareMonsterTimer++;
    if (state.rareMonster) {
      state.rareMonsterDespawnTimer++;
      if (state.rareMonsterDespawnTimer >= 120) {
        addLog('レアモンスターが逃げてしまった...');
        state.rareMonster = null;
        state.rareMonsterDespawnTimer = 0;
        if (state.currentTab === 'adventure') renderTab();
      }
    } else if (state.rareMonsterTimer >= 1800) {
      state.rareMonsterTimer = 0;
      if (Math.random() < 0.5) {
        triggerRareMonster();
      }
    }

    updateTimerDisplay();
  }

  // ========== RARE MONSTER SYSTEM ==========
  function triggerRareMonster() {
    const rareDef = pick(RARE_MONSTERS);
    state.rareMonster = { ...rareDef };
    state.rareMonsterDespawnTimer = 0;
    addLog(`✨ レアモンスター「${rareDef.name}」出現！`);
    showRareToast(rareDef.name);
    if (state.mode === 'rest' && state.currentTab === 'adventure') {
      renderTab();
    }
  }

  function showRareToast(name) {
    const scene = $('#scene');
    if (!scene) return;
    const toast = document.createElement('div');
    toast.className = 'rare-toast';
    toast.textContent = `✨ レアモンスター出現！ ${name}`;
    scene.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ========== RECRUIT SYSTEM ==========
  function checkRecruitOpportunity() {
    if (state.recruitAvailable) return;
    if (Math.random() > 0.05) return;

    const availableJobs = Object.keys(JOBS).filter(j => !state.unlockedJobs.includes(j));
    if (availableJobs.length === 0) return;

    const job = pick(availableJobs);
    const cost = 50 + state.partyMembers.length * 100;
    state.recruitAvailable = { job, cost };
    addLog(`👤 ${JOBS[job].name}が仲間になりたがっている！（${cost}G）`);
    if (state.currentTab === 'adventure') renderTab();
  }

  function recruitMember(jobKey) {
    if (!state.recruitAvailable || state.recruitAvailable.job !== jobKey) return;
    if (state.gold < state.recruitAvailable.cost) { addLog('💰 ゴールドが足りません！'); return; }
    if (state.partyMembers.length >= 4) { addLog('パーティがいっぱいです'); return; }

    state.gold -= state.recruitAvailable.cost;
    const job = JOBS[jobKey];
    state.partyMembers.push({
      job: jobKey, level: 1, exp: 0, hp: job.hp, maxHp: job.hp,
      baseAtk: job.atk, baseDef: job.def,
      equipment: { weapon: null, armor: null, accessory: null }
    });
    state.unlockedJobs.push(jobKey);
    state.recruitAvailable = null;
    addLog(`🎉 ${job.name}が仲間になった！`);
    renderScene();
    updateDisplay();
    renderTab();
  }

  // ========== BATTLE SYSTEM ==========
  function startBattle() {
    if (battleInProgress) return;
    battleInProgress = true;

    const area = AREAS[state.area];
    const isBoss = state.stage > area.stages;
    const prestigeScale = 1 + state.prestige.count * 0.15;

    // Check if rare monster is active
    if (state.rareMonster) {
      const rare = state.rareMonster;
      const enemy = {
        name: rare.name,
        hp: Math.floor(rare.hp * prestigeScale),
        atk: Math.floor(rare.atk * prestigeScale),
        def: Math.floor(rare.def * prestigeScale),
        exp: 50,
        gold: rare.gold,
        sprite: rare.sprite,
        isRare: true,
        minRarity: rare.minRarity,
        nameColor: rare.nameColor || null,
      };
      enemy.maxHp = enemy.hp;
      state.rareMonster = null;
      state.rareMonsterDespawnTimer = 0;
      addLog(`✨ ${enemy.name}が現れた！`);
      renderEnemies([enemy]);
      runBattleSequence([enemy]);
      return;
    }

    // Spawn enemies
    let enemies;
    if (isBoss) {
      const boss = { ...area.boss };
      const scale = (1 + state.area * 0.3) * prestigeScale;
      boss.hp = Math.floor(boss.hp * scale);
      boss.atk = Math.floor(boss.atk * scale);
      boss.def = Math.floor(boss.def * scale);
      boss.isBoss = true;
      enemies = [boss];
      addLog(`⚠️ ボス ${boss.name} が現れた！`);
      showBossFlash();
    } else {
      const count = rand(1, 3);
      enemies = [];
      for (let i = 0; i < count; i++) {
        const e = { ...pick(area.enemies) };
        const scale = (1 + (state.area * 0.2) + (state.stage - 1) * 0.1) * prestigeScale;
        e.hp = Math.floor(e.hp * scale);
        e.maxHp = e.hp;
        e.atk = Math.floor(e.atk * scale);
        e.def = Math.floor(e.def * scale);
        enemies.push(e);
      }
      addLog(`${enemies.map(e => e.name).join('、')} が現れた！`);
    }

    // Set maxHp for tracking
    enemies.forEach(e => { if (!e.maxHp) e.maxHp = e.hp; });

    renderEnemies(enemies);

    // Battle sequence (auto, turn-based visual)
    runBattleSequence(enemies);
  }

  async function runBattleSequence(enemies) {
    const delay = ms => new Promise(r => setTimeout(r, ms));

    let round = 0;
    while (enemies.some(e => e.hp > 0) && state.partyMembers.some(m => m.hp > 0)) {
      round++;
      if (round > 30) break;

      // Party turn
      for (const member of state.partyMembers) {
        if (member.hp <= 0) continue;
        const aliveEnemies = enemies.filter(e => e.hp > 0);
        if (aliveEnemies.length === 0) break;

        const job = JOBS[member.job];
        const stats = getMemberStats(member);
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];

        // Skill use (20% chance)
        const useSkill = Math.random() < 0.2;
        let dmg = 0;
        let skillName = null;

        if (useSkill) {
          skillName = job.skill;
          switch (member.job) {
            case 'warrior':
              dmg = Math.max(1, Math.floor(stats.atk * 0.8) - target.def);
              target.stunned = true;
              break;
            case 'knight':
              for (let i = 0; i < 3; i++) {
                const hitDmg = Math.max(1, Math.floor(stats.atk * 0.6) - target.def);
                dmg += hitDmg;
              }
              break;
            case 'mage':
              aliveEnemies.forEach(e => {
                const aoeDmg = Math.max(1, Math.floor(stats.atk * 1.2) - e.def);
                e.hp -= aoeDmg;
                dmg += aoeDmg;
              });
              showSkillEffect('fire', 200, 80);
              break;
            case 'healer': {
              const healAmt = Math.floor(stats.atk * 3);
              state.partyMembers.forEach(m => {
                if (m.hp > 0) {
                  const mStats = getMemberStats(m);
                  const healed = Math.min(healAmt, mStats.hp - m.hp);
                  m.hp = Math.min(m.hp + healAmt, mStats.hp);
                  if (healed > 0) state.stats.totalHealing += healed;
                }
              });
              showSkillEffect('heal', 80, 100);
              showDamageNumber(healAmt, 'heal', 80, 100);
              break;
            }
            case 'assassin':
              dmg = Math.max(1, stats.atk * 3 - target.def);
              showCriticalFlash();
              break;
            case 'summoner':
              dmg = Math.max(1, stats.atk - target.def);
              const spiritDmg = Math.max(1, Math.floor(stats.atk * 0.8) - target.def);
              dmg += spiritDmg;
              break;
          }
        } else {
          // Normal attack
          const isCrit = Math.random() * 100 < stats.critPct;
          const baseDmg = Math.max(1, stats.atk - target.def);
          dmg = isCrit ? baseDmg * 2 : baseDmg;
          if (isCrit) {
            showCriticalFlash();
            showDamageNumber(dmg, 'critical', 250 + Math.random() * 60, 60 + Math.random() * 40);
          }
        }

        if (member.job !== 'mage' || !useSkill) {
          if (member.job !== 'healer' || !useSkill) {
            target.hp -= dmg;
          }
        }

        if (dmg > 0 && (member.job !== 'healer' || !useSkill)) {
          state.stats.totalDamage += dmg;
          if (skillName) {
            setBattleLog(`${job.name}の${skillName}！ ${dmg}ダメージ！`);
          } else {
            setBattleLog(`${job.name}の攻撃！ ${target.name}に${dmg}ダメージ！`);
          }
          showDamageNumber(dmg, dmg > stats.atk * 1.5 ? 'critical' : 'damage', 250 + Math.random() * 80, 50 + Math.random() * 50);
          animateAttack(member);
        } else if (skillName && member.job === 'healer') {
          setBattleLog(`${job.name}の${skillName}！ HP回復！`);
        }

        updateEnemyHpBars(enemies);
        updateAllyHpBars();
        await delay(400);
      }

      // Check if all enemies dead
      if (!enemies.some(e => e.hp > 0)) break;

      // Enemy turn
      for (const enemy of enemies) {
        if (enemy.hp <= 0) continue;
        if (enemy.stunned) { enemy.stunned = false; setBattleLog(`${enemy.name}はスタンしている！`); await delay(300); continue; }

        const aliveMembers = state.partyMembers.filter(m => m.hp > 0);
        if (aliveMembers.length === 0) break;

        const frontMembers = aliveMembers.filter(m => JOBS[m.job].role === 'front');
        const target = frontMembers.length > 0 ? pick(frontMembers) : pick(aliveMembers);
        const targetStats = getMemberStats(target);
        const dmg = Math.max(1, enemy.atk - targetStats.def);
        target.hp -= dmg;

        setBattleLog(`${enemy.name}の攻撃！ ${JOBS[target.job].name}に${dmg}ダメージ！`);
        showDamageNumber(dmg, 'damage', 60 + Math.random() * 60, 60 + Math.random() * 40);
        updateAllyHpBars();
        await delay(300);
      }

      // Check if party wiped
      if (!state.partyMembers.some(m => m.hp > 0)) break;
    }

    // Battle resolution
    await delay(300);
    if (enemies.every(e => e.hp <= 0)) {
      // Victory
      const totalExp = enemies.reduce((s, e) => s + (e.exp || 0), 0);
      const expBonus = state.partyMembers.reduce((s, m) => s + getMemberStats(m).expPct, 0) / state.partyMembers.length;
      const finalExp = Math.floor(totalExp * (1 + expBonus / 100));

      const totalGold = enemies.reduce((s, e) => s + e.gold, 0);
      const goldBonus = state.partyMembers.reduce((s, m) => s + getMemberStats(m).goldPct, 0) / state.partyMembers.length;
      const finalGold = Math.floor(totalGold * (1 + goldBonus / 100));

      state.gold += finalGold;
      state.stats.monstersDefeated += enemies.length;

      // Distribute EXP
      state.partyMembers.forEach(m => {
        if (m.hp > 0) {
          m.exp += finalExp;
          checkLevelUp(m);
        }
      });

      addLog(`🎉 勝利！ +${finalExp}EXP +${finalGold}G`);
      showDamageNumber(finalGold, 'gold', 180, 40);
      showGoldCoins(enemies);

      // Rare monster guaranteed drop
      const isRareBattle = enemies.some(e => e.isRare);
      if (isRareBattle) {
        const rareEnemy = enemies.find(e => e.isRare);
        const types = ['weapon', 'armor', 'accessory'];
        const item = generateEquipment(pick(types), state.area, rareEnemy.minRarity);
        state.inventory.push(item);
        const nameStr = getEquipName(item);
        addLog(`📦 ${nameStr}を手に入れた！`);
        if (item.rarity === 'legendary') {
          state.stats.legendaryDrops++;
          showRainbowEffect();
          addLog(`🌟 レジェンダリー装備ドロップ！`);
        } else if (item.rarity === 'epic') {
          showLevelUpEffect();
        }
      } else {
        // Equipment drop (30% chance per battle, higher for bosses)
        const avgDropPct = state.partyMembers.reduce((s, m) => s + getMemberStats(m).dropPct, 0) / state.partyMembers.length;
        const baseDropChance = enemies.some(e => e.isBoss) ? 1.0 : 0.3;
        const dropChance = baseDropChance * (1 + avgDropPct / 100);
        if (Math.random() < dropChance) {
          const types = ['weapon', 'armor', 'accessory'];
          const item = generateEquipment(pick(types), state.area);
          state.inventory.push(item);
          const nameStr = getEquipName(item);
          addLog(`📦 ${nameStr}を手に入れた！`);
          if (item.rarity === 'legendary') {
            state.stats.legendaryDrops++;
            showRainbowEffect();
            addLog(`🌟 レジェンダリー装備ドロップ！`);
          } else if (item.rarity === 'epic') {
            showLevelUpEffect();
          }
        }
      }

      // Stage progression
      if (enemies.some(e => e.isBoss)) {
        state.stats.bossesDefeated++;
        state.stats.stagesCleared++;
        if (state.area < AREAS.length - 1) {
          state.area++;
          state.stage = 1;
          addLog(`🏰 新しいエリア「${AREAS[state.area].name}」に到達！`);
        } else {
          // Final boss beaten
          state.stage = 1;
          state.prestige.demonLordDefeated = true;
          addLog(`👑 魔王を倒した！ 転生が可能になった！`);
        }
        renderScene();
      } else if (!isRareBattle) {
        state.stage++;
        const area = AREAS[state.area];
        if (state.stage > area.stages) {
          addLog(`⚔️ ボスステージに到達！`);
        }
      }

      clearEnemies();
    } else {
      // Defeat
      addLog(`💀 パーティが倒れた... 気力で立ち上がった！`);
      state.partyMembers.forEach(m => {
        const stats = getMemberStats(m);
        m.hp = Math.floor(stats.hp * 0.3);
      });
      state.mode = 'rest';
      renderScene();
      if (state.currentTab === 'adventure') renderTab();
    }

    updateDisplay();
    updateStageDisplay();
    battleInProgress = false;
  }

  function checkLevelUp(member) {
    if (member.level >= 50) return;
    const needed = EXP_TABLE[member.level] || 9999;
    if (member.exp >= needed) {
      member.exp -= needed;
      member.level++;
      const stats = getMemberStats(member);
      member.hp = stats.hp;
      addLog(`🎊 ${JOBS[member.job].name}がLv.${member.level}になった！`);
      showLevelUpEffect();
      checkLevelUp(member);
    }
  }

  // ========== PRESTIGE SYSTEM ==========
  function calculateSouls() {
    const areasCleared = state.area;
    const bossesDefeated = state.stats.bossesDefeated;
    const prestigeCount = state.prestige.count;
    return Math.floor(10 + areasCleared * 3 + bossesDefeated * 2 + prestigeCount * 5);
  }

  function doPrestige() {
    if (!state.prestige.demonLordDefeated) return;
    if (!confirm('転生しますか？進行状況がリセットされますが、魂とスキルは残ります。')) return;

    const soulsEarned = calculateSouls();
    state.prestige.count++;
    state.prestige.souls += soulsEarned;
    state.prestige.totalSoulsEarned += soulsEarned;
    state.prestige.demonLordDefeated = false;

    // Reset party
    state.partyMembers = [
      { job: 'warrior', level: 1, exp: 0, hp: JOBS.warrior.hp, maxHp: JOBS.warrior.hp, baseAtk: JOBS.warrior.atk, baseDef: JOBS.warrior.def, equipment: { weapon: null, armor: null, accessory: null } },
    ];
    state.unlockedJobs = ['warrior'];
    state.recruitAvailable = null;

    // Reset equipment, inventory, progress, gold
    state.gold = 0;
    state.inventory = [];
    state.area = 0;
    state.stage = 1;
    state.mode = 'adventure';
    state.rareMonster = null;
    state.rareMonsterTimer = 0;
    state.rareMonsterDespawnTimer = 0;

    nextItemId = 1;
    battleInProgress = false;

    // Show flash
    showPrestigeFlash();
    addLog(`🔮 転生！ +${soulsEarned} 冒険者の魂を獲得！（累計: ${state.prestige.count}回目）`);

    saveState();
    renderScene();
    updateDisplay();
    renderTab();
  }

  function showPrestigeFlash() {
    const flash = document.createElement('div');
    flash.className = 'prestige-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1500);
  }

  function buySkill(branch) {
    const currentLvl = state.prestige.skills[branch] || 0;
    if (currentLvl >= 5) return;
    const skill = SKILL_TREE[branch][currentLvl];
    if (!skill) return;
    if (state.prestige.souls < skill.cost) {
      addLog('魂が足りません！');
      return;
    }
    state.prestige.souls -= skill.cost;
    state.prestige.skills[branch] = currentLvl + 1;
    addLog(`🔮 スキル習得: ${skill.desc}`);
    // Recalculate HP for all party members after skill purchase
    state.partyMembers.forEach(m => {
      const stats = getMemberStats(m);
      m.hp = Math.min(m.hp, stats.hp);
    });
    renderTab();
    updateDisplay();
  }

  // ========== FUSION SYSTEM ==========
  function getFusionOptions() {
    const equippedIds = new Set();
    state.partyMembers.forEach(m => {
      Object.values(m.equipment).forEach(id => { if (id != null) equippedIds.add(id); });
    });

    const unequipped = state.inventory.filter(i => !equippedIds.has(i.id));

    // Group by rarity (exclude legendary)
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic'];
    const nextRarity = { common: 'uncommon', uncommon: 'rare', rare: 'epic', epic: 'legendary' };
    const fusionCosts = { common: 50, uncommon: 100, rare: 150, epic: 200 };

    const options = [];
    for (const rarity of rarityOrder) {
      const items = unequipped.filter(i => i.rarity === rarity);
      if (items.length >= 3) {
        options.push({
          rarity,
          targetRarity: nextRarity[rarity],
          count: items.length,
          cost: fusionCosts[rarity],
          items: items.slice(0, 3),
        });
      }
    }
    return options;
  }

  function doFusion(rarity) {
    const equippedIds = new Set();
    state.partyMembers.forEach(m => {
      Object.values(m.equipment).forEach(id => { if (id != null) equippedIds.add(id); });
    });

    const unequipped = state.inventory.filter(i => !equippedIds.has(i.id) && i.rarity === rarity);
    if (unequipped.length < 3) return;

    const fusionCosts = { common: 50, uncommon: 100, rare: 150, epic: 200 };
    const cost = fusionCosts[rarity];
    if (state.gold < cost) {
      addLog('💰 ゴールドが足りません！');
      return;
    }

    // Remove 3 items
    const toRemove = unequipped.slice(0, 3);
    toRemove.forEach(item => {
      const idx = state.inventory.findIndex(i => i.id === item.id);
      if (idx !== -1) state.inventory.splice(idx, 1);
    });

    state.gold -= cost;

    // Generate new item of next rarity
    const nextRarity = { common: 'uncommon', uncommon: 'rare', rare: 'epic', epic: 'legendary' };
    const targetRarity = nextRarity[rarity];
    const types = ['weapon', 'armor', 'accessory'];
    const newItem = generateEquipment(pick(types), state.area, targetRarity);
    // Force the rarity to be exact
    newItem.rarity = targetRarity;
    // Recalculate affixes for new rarity
    const rarityDef = RARITIES.find(r => r.id === targetRarity);
    if (rarityDef) {
      const affixes = [];
      const pool = [...AFFIX_POOL];
      for (let i = 0; i < rarityDef.affixes; i++) {
        if (pool.length === 0) break;
        const idx = Math.floor(Math.random() * pool.length);
        affixes.push({ ...pool[idx] });
        pool.splice(idx, 1);
      }
      newItem.affixes = affixes;
    }

    state.inventory.push(newItem);
    const nameStr = getEquipName(newItem);
    addLog(`⚗️ 合成成功！ ${nameStr}を手に入れた！`);

    if (newItem.rarity === 'legendary') {
      state.stats.legendaryDrops++;
      showRainbowEffect();
    } else if (newItem.rarity === 'epic') {
      showLevelUpEffect();
    }

    renderTab();
    updateDisplay();
  }

  // ========== SCENE RENDERING ==========
  function renderScene() {
    const scene = $('#scene');
    const area = AREAS[state.area];

    // Update background
    scene.className = `scene ${state.mode === 'rest' ? 'rest-bg' : area.bgClass}`;

    // Clear existing content except ground-line, effect-layer, battle-log-overlay
    const allyArea = $('#ally-area');
    const allyFront = $('#ally-front');
    const allyBack = $('#ally-back');

    allyFront.innerHTML = '';
    allyBack.innerHTML = '';
    clearEnemies();

    if (state.mode === 'rest') {
      allyArea.style.display = 'none';
      // Show campfire
      let campfire = scene.querySelector('.campfire-container');
      if (!campfire) {
        campfire = document.createElement('div');
        campfire.className = 'campfire-container';
        campfire.innerHTML = `
          <div class="pixel-sprite campfire-sprite" style="box-shadow:${window.CharacterData.campfire}"></div>
          <div class="fire-glow"></div>
        `;
        scene.appendChild(campfire);
      }
      campfire.style.display = 'flex';

      // Show party around campfire
      state.partyMembers.forEach((m, i) => {
        const unit = createCharUnit(m, i);
        unit.style.position = 'absolute';
        unit.style.bottom = '48px';
        unit.style.left = `${40 + i * 70}px`;
        scene.appendChild(unit);
        unit.classList.add('rest-char');
      });
      return;
    }

    // Remove rest elements
    const campfire = scene.querySelector('.campfire-container');
    if (campfire) campfire.style.display = 'none';
    scene.querySelectorAll('.rest-char').forEach(el => el.remove());

    allyArea.style.display = 'flex';

    // Render party
    state.partyMembers.forEach((m, i) => {
      const unit = createCharUnit(m, i);
      const job = JOBS[m.job];
      if (job.role === 'front') {
        allyFront.appendChild(unit);
      } else {
        allyBack.appendChild(unit);
      }
    });
  }

  function createCharUnit(member, index) {
    const job = JOBS[member.job];
    const stats = getMemberStats(member);
    const unit = document.createElement('div');
    unit.className = 'char-unit';
    unit.dataset.index = index;

    const hpPct = Math.max(0, (member.hp / stats.hp) * 100);
    const hpColor = hpPct < 30 ? '#e74c3c' : hpPct < 60 ? '#f39c12' : '#e74c3c';
    unit.innerHTML = `
      <div class="char-label">${job.name}</div>
      <div class="char-hp-bar"><div class="char-hp-fill" style="width:${hpPct}%;background:${hpColor}"></div></div>
      <div class="pixel-sprite" style="box-shadow:${window.CharacterData[job.sprite] || ''}"></div>
    `;
    return unit;
  }

  function renderEnemies(enemies) {
    const area = $('#enemy-area');
    area.innerHTML = '';
    enemies.forEach((e, i) => {
      const unit = document.createElement('div');
      const classes = ['enemy-unit', 'appear'];
      if (e.isBoss) classes.push('boss-unit');
      if (e.isRare) classes.push('rare-unit');
      unit.className = classes.join(' ');
      unit.dataset.index = i;
      const spriteData = window.CharacterData[e.sprite] || window.CharacterData.slime;
      const nameStyle = e.nameColor ? `style="color:${e.nameColor}"` : '';
      unit.innerHTML = `
        <div class="enemy-name" ${nameStyle}>${e.name}</div>
        <div class="enemy-hp-bar"><div class="enemy-hp-fill" style="width:100%"></div></div>
        <div class="pixel-sprite" style="box-shadow:${spriteData}"></div>
      `;
      area.appendChild(unit);
    });
  }

  function clearEnemies() {
    const area = $('#enemy-area');
    if (area) area.innerHTML = '';
  }

  function updateEnemyHpBars(enemies) {
    const units = $$('.enemy-unit');
    enemies.forEach((e, i) => {
      const unit = units[i];
      if (!unit) return;
      if (e.hp <= 0) {
        if (!unit.classList.contains('defeated')) {
          unit.classList.remove('appear');
          unit.classList.add('defeated');
          setTimeout(() => unit.remove(), 500);
        }
      } else {
        const fill = unit.querySelector('.enemy-hp-fill');
        if (fill) fill.style.width = `${Math.max(0, (e.hp / e.maxHp) * 100)}%`;
      }
    });
  }

  function updateAllyHpBars() {
    $$('.char-unit').forEach(unit => {
      const idx = parseInt(unit.dataset.index);
      const m = state.partyMembers[idx];
      if (!m) return;
      const stats = getMemberStats(m);
      const fill = unit.querySelector('.char-hp-fill');
      if (fill) {
        const pct = Math.max(0, (m.hp / stats.hp) * 100);
        fill.style.width = `${pct}%`;
        fill.style.background = pct < 30 ? '#e74c3c' : pct < 60 ? '#f39c12' : '#2ecc71';
      }
    });
  }

  function animateAttack(member) {
    const idx = state.partyMembers.indexOf(member);
    const units = $$('.char-unit');
    units.forEach(u => {
      if (parseInt(u.dataset.index) === idx) {
        u.classList.add('attacking');
        setTimeout(() => u.classList.remove('attacking'), 400);
      }
    });
  }

  // ========== VISUAL EFFECTS ==========
  function showDamageNumber(value, type, x, y) {
    const layer = $('#effect-layer');
    if (!layer) return;
    const el = document.createElement('div');
    el.className = `damage-number ${type}`;
    el.textContent = type === 'gold' ? `+${value}G` : type === 'heal' ? `+${value}` : `-${value}`;
    el.style.left = `${(x || 180) + (Math.random() - 0.5) * 30}px`;
    el.style.top = `${(y || 80) + (Math.random() - 0.5) * 20}px`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function showSkillEffect(type, x, y) {
    const layer = $('#effect-layer');
    if (!layer) return;
    const el = document.createElement('div');
    el.className = `skill-effect ${type}-effect`;
    el.style.left = `${(x || 200) - 30}px`;
    el.style.top = `${(y || 80) - 30}px`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 600);
  }

  function showCriticalFlash() {
    const scene = $('#scene');
    if (!scene) return;
    const flash = document.createElement('div');
    flash.className = 'critical-flash';
    scene.appendChild(flash);
    setTimeout(() => flash.remove(), 150);
  }

  function showBossFlash() {
    const scene = $('#scene');
    if (!scene) return;
    const flash = document.createElement('div');
    flash.className = 'boss-flash';
    scene.appendChild(flash);
    setTimeout(() => flash.remove(), 800);
  }

  function showRainbowEffect() {
    const scene = $('#scene');
    if (!scene) return;
    const el = document.createElement('div');
    el.className = 'rainbow-effect';
    scene.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }

  function showGoldCoins(enemies) {
    const layer = $('#effect-layer');
    if (!layer) return;
    const coinCount = Math.min(enemies.length * 3, 8);
    for (let i = 0; i < coinCount; i++) {
      const coin = document.createElement('div');
      coin.className = 'gold-coin';
      coin.style.left = `${220 + (Math.random() - 0.5) * 80}px`;
      coin.style.top = `${80 + (Math.random() - 0.5) * 30}px`;
      coin.style.animationDelay = `${Math.random() * 0.3}s`;
      layer.appendChild(coin);
      setTimeout(() => coin.remove(), 1200);
    }
  }

  function showLevelUpEffect() {
    const scene = $('#scene');
    if (!scene) return;
    const txt = document.createElement('div');
    txt.className = 'level-up-text';
    txt.textContent = 'Level UP!';
    scene.appendChild(txt);
    setTimeout(() => txt.remove(), 2000);

    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = `${160 + Math.random() * 60}px`;
      p.style.top = `${80 + Math.random() * 40}px`;
      p.style.setProperty('--dx', `${(Math.random() - 0.5) * 100}px`);
      p.style.setProperty('--dy', `${-40 - Math.random() * 70}px`);
      p.style.animationDelay = `${Math.random() * 0.3}s`;
      p.style.background = ['#ffd700','#ff6b6b','#74b9ff','#55efc4','#fdcb6e'][Math.floor(Math.random() * 5)];
      scene.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  function setBattleLog(msg) {
    const el = $('#battle-log-overlay');
    if (el) el.textContent = msg;
  }

  function animateClouds() {
    const scene = $('#scene');
    if (!scene) return;
    function createCloud() {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.style.top = `${8 + Math.random() * 35}px`;
      cloud.style.opacity = `${0.25 + Math.random() * 0.35}`;
      const size = 18 + Math.random() * 28;
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size * 0.45}px`;
      scene.appendChild(cloud);
      setTimeout(() => cloud.remove(), 22000);
    }
    setInterval(createCloud, 6000);
    createCloud();
  }

  // ========== EQUIPMENT MANAGEMENT ==========
  function equipItem(membIdx, itemId) {
    const member = state.partyMembers[membIdx];
    if (!member) return;
    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;

    // Unequip current
    const slot = item.type;
    // Remove from other member if equipped
    state.partyMembers.forEach(m => {
      if (m.equipment[slot] === itemId) m.equipment[slot] = null;
    });

    member.equipment[slot] = itemId;

    const stats = getMemberStats(member);
    member.hp = Math.min(member.hp, stats.hp);

    addLog(`⚔️ ${JOBS[member.job].name}が${getEquipName(item)}を装備！`);
    renderTab();
    renderScene();
    updateDisplay();
  }

  function unequipItem(membIdx, slot) {
    const member = state.partyMembers[membIdx];
    if (!member) return;
    member.equipment[slot] = null;
    const stats = getMemberStats(member);
    member.hp = Math.min(member.hp, stats.hp);
    renderTab();
    updateDisplay();
  }

  function sellItem(itemId) {
    const idx = state.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return;
    state.partyMembers.forEach(m => {
      Object.keys(m.equipment).forEach(slot => {
        if (m.equipment[slot] === itemId) m.equipment[slot] = null;
      });
    });
    const item = state.inventory[idx];
    const price = Math.floor(item.baseStatValue * (RARITIES.findIndex(r => r.id === item.rarity) + 1) * 3);
    state.gold += price;
    state.inventory.splice(idx, 1);
    addLog(`💰 ${getEquipName(item)}を${price}Gで売却`);
    renderTab();
    updateDisplay();
  }

  // ========== DISPLAY UPDATE ==========
  function updateDisplay() {
    const goldEl = $('#stat-gold');
    if (goldEl) goldEl.textContent = state.gold.toLocaleString();

    // Avg level
    const avgLvl = state.partyMembers.length > 0
      ? Math.floor(state.partyMembers.reduce((s, m) => s + m.level, 0) / state.partyMembers.length) : 1;
    const lvlEl = $('#stat-level');
    if (lvlEl) lvlEl.textContent = avgLvl;

    // HP bar (aggregate)
    const totalMaxHp = getPartyMaxHp();
    const totalHp = getPartyCurrentHp();
    const hpBar = $('#hp-bar');
    if (hpBar && totalMaxHp > 0) {
      const pct = (totalHp / totalMaxHp) * 100;
      hpBar.style.width = `${pct}%`;
      hpBar.className = `bar-fill hp ${pct < 30 ? 'low' : pct < 60 ? 'mid' : ''}`;
    }

    // EXP bar (first member for simplicity)
    const expBar = $('#exp-bar');
    if (expBar && state.partyMembers.length > 0) {
      const m = state.partyMembers[0];
      const needed = EXP_TABLE[m.level] || 999;
      expBar.style.width = `${Math.min(100, (m.exp / needed) * 100)}%`;
    }

    updateStageDisplay();
  }

  function updateStageDisplay() {
    const area = AREAS[state.area];
    const isBoss = state.stage > area.stages;
    const nameEl = $('#stage-name');
    if (nameEl) nameEl.textContent = `${area.name} ${isBoss ? 'BOSS' : state.area * 5 + state.stage}`;
  }

  function updateTimerDisplay() {
    const el = $('#stage-timer');
    if (!el) return;
    if (state.mode === 'rest') {
      el.textContent = '🏕️ 休憩中';
    } else {
      const m = Math.floor(state.stats.playTime / 60);
      const s = state.stats.playTime % 60;
      el.textContent = `⏱️ ${m}:${s.toString().padStart(2, '0')}`;
    }
  }

  // ========== LOG ==========
  const MAX_LOG = 40;
  function addLog(msg) {
    const el = $('#log-content');
    if (!el) return;
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = msg;
    el.appendChild(line);
    while (el.children.length > MAX_LOG) el.removeChild(el.firstChild);
    el.scrollTop = el.scrollHeight;
  }

  // ========== TAB RENDERING ==========
  function renderTab() {
    const content = $('#tab-content');
    if (!content) return;

    switch (state.currentTab) {
      case 'adventure': renderAdventureTab(content); break;
      case 'party': renderPartyTab(content); break;
      case 'equip': renderEquipTab(content); break;
      case 'prestige': renderPrestigeTab(content); break;
    }
  }

  function renderAdventureTab(el) {
    const area = AREAS[state.area];
    const isBoss = state.stage > area.stages;
    let html = '<div class="adventure-info">';
    html += `<div class="area-name">${area.name}</div>`;
    html += `<div>ステージ: ${isBoss ? 'BOSS' : `${state.stage} / ${area.stages}`}</div>`;
    html += `<div>エリア ${state.area + 1} / ${AREAS.length}</div>`;
    if (state.prestige.count > 0) {
      html += `<div style="color:#c084fc;font-size:9px">転生: ${state.prestige.count}回</div>`;
    }
    html += '</div>';

    // Rest button
    if (state.mode === 'adventure') {
      html += `<div style="text-align:center;margin-top:6px"><button class="rest-btn" onclick="GameEngine.setMode('rest')">🏕️ 休憩する</button></div>`;
    } else {
      html += `<div style="text-align:center;margin-top:6px"><button class="rest-btn resting" onclick="GameEngine.setMode('adventure')">⚔️ 冒険再開</button></div>`;
    }

    // Rare monster alert when resting
    if (state.rareMonster && state.mode === 'rest') {
      const remaining = 120 - state.rareMonsterDespawnTimer;
      html += `<div class="rare-alert">✨ レアモンスター「${state.rareMonster.name}」出現中！<br>残り約${remaining}秒 — 冒険再開で戦えます！</div>`;
    }

    // Prestige button in adventure tab
    if (state.prestige.demonLordDefeated) {
      const souls = calculateSouls();
      html += `<div style="text-align:center;margin-top:8px">`;
      html += `<button class="prestige-btn" onclick="GameEngine.prestige()">🔮 転生する (+${souls}魂)</button>`;
      html += `</div>`;
    }

    // Recruit
    if (state.recruitAvailable && state.partyMembers.length < 4) {
      const job = JOBS[state.recruitAvailable.job];
      html += '<div class="recruit-notice">';
      html += `<div>👤 ${job.name}が仲間になりたがっている！</div>`;
      html += `<div style="font-size:9px;color:rgba(240,230,211,0.6)">${job.skillDesc}</div>`;
      const canAfford = state.gold >= state.recruitAvailable.cost;
      html += `<button class="recruit-btn" ${canAfford ? '' : 'disabled'} onclick="GameEngine.recruit('${state.recruitAvailable.job}')">${state.recruitAvailable.cost}G で仲間にする</button>`;
      html += '</div>';
    }

    el.innerHTML = html;
  }

  function renderPartyTab(el) {
    let html = '';

    // Active synergies display
    const activeSynergies = getActiveSynergies();
    html += '<div class="synergy-list">';
    html += '<div class="synergy-list-title">シナジー効果</div>';
    for (const syn of SYNERGIES) {
      const isActive = activeSynergies.includes(syn);
      const reqText = syn.requiresCount ? `${syn.requiresCount}人編成` : syn.requires.map(j => JOBS[j].name).join('+');
      html += `<div class="synergy-item ${isActive ? 'active' : ''}">
        <span class="synergy-name">${syn.name}</span>
        <span class="synergy-desc">${syn.desc}</span>
        <span class="synergy-requires">${reqText}</span>
      </div>`;
    }
    html += '</div>';

    html += '<div class="party-section-title">前衛</div>';
    const frontMembers = state.partyMembers.filter(m => JOBS[m.job].role === 'front');
    const backMembers = state.partyMembers.filter(m => JOBS[m.job].role === 'back');

    frontMembers.forEach((m, i) => {
      const job = JOBS[m.job];
      const stats = getMemberStats(m);
      html += `<div class="party-slot front">
        <div class="slot-info">
          <div class="slot-name">${job.name} Lv.${m.level}</div>
          <div class="slot-stats">HP:${m.hp}/${stats.hp} ATK:${stats.atk} DEF:${stats.def}</div>
          <div class="slot-skill">🔥 ${job.skill}（${job.skillDesc}）</div>
        </div>
      </div>`;
    });
    if (frontMembers.length < 2) {
      html += `<div class="party-slot front empty"><div class="slot-info"><div class="slot-name">（空き）</div></div></div>`;
    }

    html += '<div class="party-section-title">後衛</div>';
    backMembers.forEach((m, i) => {
      const job = JOBS[m.job];
      const stats = getMemberStats(m);
      html += `<div class="party-slot back">
        <div class="slot-info">
          <div class="slot-name">${job.name} Lv.${m.level}</div>
          <div class="slot-stats">HP:${m.hp}/${stats.hp} ATK:${stats.atk} DEF:${stats.def}</div>
          <div class="slot-skill">🔥 ${job.skill}（${job.skillDesc}）</div>
        </div>
      </div>`;
    });
    if (backMembers.length < 2) {
      html += `<div class="party-slot back empty"><div class="slot-info"><div class="slot-name">（空き）</div></div></div>`;
    }

    // Available jobs
    const unrecruited = Object.keys(JOBS).filter(j => !state.unlockedJobs.includes(j));
    if (unrecruited.length > 0) {
      html += '<div class="party-section-title">未加入の職業</div>';
      unrecruited.forEach(j => {
        const job = JOBS[j];
        html += `<div class="party-slot empty">
          <div class="slot-info">
            <div class="slot-name">${job.name}</div>
            <div class="slot-stats">${job.role === 'front' ? '前衛' : '後衛'} | ${job.skillDesc}</div>
            <div class="slot-skill" style="color:rgba(240,230,211,0.4)">冒険中に出会うかも...</div>
          </div>
        </div>`;
      });
    }

    el.innerHTML = html;
  }

  function renderEquipTab(el) {
    let html = '';

    // Per-member equipment
    state.partyMembers.forEach((m, mIdx) => {
      const job = JOBS[m.job];
      html += `<div class="equip-section-title">${job.name} Lv.${m.level}</div>`;

      ['weapon', 'armor', 'accessory'].forEach(slot => {
        const slotName = slot === 'weapon' ? '武器' : slot === 'armor' ? '防具' : 'アクセ';
        const eqId = m.equipment[slot];
        const item = eqId != null ? state.inventory.find(i => i.id === eqId) : null;
        if (item) {
          html += `<div class="equip-slot-row">
            <span class="equip-slot-label">${slotName}</span>
            <span class="equip-slot-value" style="color:${getRarityColor(item.rarity)}">${getEquipName(item)}</span>
            <button class="equip-btn" onclick="GameEngine.unequip(${mIdx},'${slot}')">外す</button>
          </div>`;
        } else {
          html += `<div class="equip-slot-row">
            <span class="equip-slot-label">${slotName}</span>
            <span class="equip-slot-value" style="color:rgba(240,230,211,0.3)">なし</span>
          </div>`;
        }
      });
    });

    // Inventory
    html += `<div class="equip-section-title">🎒 所持品 (${state.inventory.length})</div>`;

    // Get equipped item IDs
    const equippedIds = new Set();
    state.partyMembers.forEach(m => {
      Object.values(m.equipment).forEach(id => { if (id != null) equippedIds.add(id); });
    });

    const unequipped = state.inventory.filter(i => !equippedIds.has(i.id));
    if (unequipped.length === 0) {
      html += '<div style="color:rgba(240,230,211,0.4);padding:4px 6px;font-size:10px">アイテムなし</div>';
    }

    // Sort by rarity
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, uncommon: 3, common: 4 };
    const sorted = [...unequipped].sort((a, b) => (rarityOrder[a.rarity] || 4) - (rarityOrder[b.rarity] || 4));

    sorted.forEach(item => {
      const affixStr = item.affixes.map(a => a.name).join(', ');
      html += `<div class="equip-item ${item.rarity}">
        <div>
          <span class="equip-item-name" style="color:${getRarityColor(item.rarity)}">${getEquipName(item)}</span>
          <span class="equip-item-stats">${item.baseStatName.toUpperCase()}+${item.baseStatValue}</span>
          ${affixStr ? `<span class="equip-affix">${affixStr}</span>` : ''}
        </div>
        <div style="display:flex;gap:3px;flex-shrink:0">`;

      // Equip buttons per member
      state.partyMembers.forEach((m, mIdx) => {
        html += `<button class="equip-btn" onclick="GameEngine.equip(${mIdx},${item.id})" title="${JOBS[m.job].name}">${JOBS[m.job].name.charAt(0)}</button>`;
      });
      html += `<button class="equip-btn" onclick="GameEngine.sell(${item.id})" style="color:#e74c3c;border-color:rgba(231,76,60,0.3)">売</button>`;
      html += '</div></div>';
    });

    // Fusion section
    const fusionOptions = getFusionOptions();
    html += '<div class="fusion-section">';
    html += '<div class="fusion-section-title">⚗️ 装備合成</div>';
    if (fusionOptions.length === 0) {
      html += '<div style="color:rgba(240,230,211,0.4);font-size:9px;padding:2px 4px">同レアリティの未装備アイテムが3つ以上で合成可能</div>';
    } else {
      const rarityNameJp = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic' };
      const targetNameJp = { uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' };
      fusionOptions.forEach(opt => {
        const canAfford = state.gold >= opt.cost;
        html += `<div class="fusion-item">
          <div class="fusion-info">3x <span style="color:${getRarityColor(opt.rarity)}">${rarityNameJp[opt.rarity]}</span> → 1x <span style="color:${getRarityColor(opt.targetRarity)}">${targetNameJp[opt.targetRarity]}</span> (${opt.cost}G)</div>
          <button class="fusion-btn" ${canAfford ? '' : 'disabled'} onclick="GameEngine.fuse('${opt.rarity}')">合成</button>
        </div>`;
      });
    }
    html += '</div>';

    el.innerHTML = html;
  }

  function renderPrestigeTab(el) {
    let html = '';

    // Prestige header
    html += '<div class="prestige-header">';
    html += '<div class="prestige-title">🔮 転生</div>';
    html += `<div class="prestige-info">転生回数: <span style="color:#ffd700;font-weight:700">${state.prestige.count}</span></div>`;
    html += `<div class="prestige-info">冒険者の魂: <span class="soul-count">${state.prestige.souls}</span></div>`;
    if (state.prestige.demonLordDefeated) {
      const souls = calculateSouls();
      html += `<button class="prestige-btn" style="margin:6px auto;font-size:11px;padding:5px 16px" onclick="GameEngine.prestige()">🔮 転生する (+${souls}魂)</button>`;
    } else {
      html += `<div style="font-size:9px;color:rgba(240,230,211,0.4);margin-top:2px">魔王を倒すと転生可能</div>`;
    }
    html += '</div>';

    // Skill tree
    html += '<div class="party-section-title">スキルツリー</div>';
    html += '<div class="skill-tree">';

    const branchNames = { atk: '⚔️ 攻撃', def: '🛡️ 防御', util: '💎 補助' };
    for (const branch of ['atk', 'def', 'util']) {
      html += '<div>';
      html += `<div class="skill-branch-title">${branchNames[branch]}</div>`;
      const currentLvl = state.prestige.skills[branch] || 0;
      for (let i = 0; i < 5; i++) {
        const skill = SKILL_TREE[branch][i];
        let nodeClass = 'skill-node';
        if (i < currentLvl) {
          nodeClass += ' purchased';
        } else if (i === currentLvl) {
          nodeClass += ' available';
        } else {
          nodeClass += ' locked';
        }
        const canBuy = i === currentLvl && state.prestige.souls >= skill.cost;
        html += `<div class="${nodeClass}" ${canBuy ? `onclick="GameEngine.buySkill('${branch}')"` : ''}>
          <span class="skill-name">Lv${i + 1}</span>
          <span>${skill.desc}</span>
          <span class="skill-cost">${i < currentLvl ? '✓' : `${skill.cost}魂`}</span>
        </div>`;
      }
      html += '</div>';
    }
    html += '</div>';

    // Stats grid at bottom
    html += '<div class="party-section-title">統計</div>';
    const playMins = Math.floor(state.stats.playTime / 60);
    const playHrs = Math.floor(playMins / 60);
    const timeStr = playHrs > 0 ? `${playHrs}時間${playMins % 60}分` : `${playMins}分`;

    html += `<div class="stats-grid">
      <div class="stats-item"><div class="stats-label">プレイ時間</div><div class="stats-value">${timeStr}</div></div>
      <div class="stats-item"><div class="stats-label">パーティ人数</div><div class="stats-value">${state.partyMembers.length}/4</div></div>
      <div class="stats-item"><div class="stats-label">現エリア</div><div class="stats-value">${AREAS[state.area].name}</div></div>
      <div class="stats-item"><div class="stats-label">ステージ</div><div class="stats-value">${state.stage}</div></div>
      <div class="stats-item"><div class="stats-label">倒したモンスター</div><div class="stats-value">${state.stats.monstersDefeated.toLocaleString()}</div></div>
      <div class="stats-item"><div class="stats-label">倒したボス</div><div class="stats-value">${state.stats.bossesDefeated}</div></div>
      <div class="stats-item"><div class="stats-label">総ダメージ</div><div class="stats-value">${state.stats.totalDamage.toLocaleString()}</div></div>
      <div class="stats-item"><div class="stats-label">総回復量</div><div class="stats-value">${state.stats.totalHealing.toLocaleString()}</div></div>
      <div class="stats-item"><div class="stats-label">所持アイテム</div><div class="stats-value">${state.inventory.length}</div></div>
      <div class="stats-item"><div class="stats-label">レジェンドリ</div><div class="stats-value">${state.stats.legendaryDrops}</div></div>
      <div class="stats-item"><div class="stats-label">総ゴールド</div><div class="stats-value">${state.gold.toLocaleString()}G</div></div>
      <div class="stats-item"><div class="stats-label">クリアステージ</div><div class="stats-value">${state.stats.stagesCleared}</div></div>
      <div class="stats-item"><div class="stats-label">転生回数</div><div class="stats-value">${state.prestige.count}</div></div>
      <div class="stats-item"><div class="stats-label">獲得総魂</div><div class="stats-value">${state.prestige.totalSoulsEarned}</div></div>
    </div>`;

    el.innerHTML = html;
  }

  // ========== MODE SWITCHING ==========
  function setMode(mode) {
    if (battleInProgress && mode === 'adventure') return;
    state.mode = mode;
    renderScene();
    updateDisplay();
    if (state.currentTab === 'adventure') renderTab();
    if (mode === 'adventure') {
      addLog('⚔️ 冒険に出発！');
    } else {
      addLog('🏕️ 休憩中...HPが回復していきます');
    }
  }

  // ========== PUBLIC API ==========
  window.GameEngine = {
    init,
    equip: (membIdx, itemId) => equipItem(membIdx, itemId),
    unequip: (membIdx, slot) => unequipItem(membIdx, slot),
    sell: (itemId) => sellItem(itemId),
    recruit: (jobKey) => recruitMember(jobKey),
    setMode,
    prestige: () => doPrestige(),
    buySkill: (branch) => buySkill(branch),
    fuse: (rarity) => doFusion(rarity),
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
