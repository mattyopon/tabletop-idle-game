// characters.js — CSS Pixel Art character definitions using box-shadow
// Each character is defined as a box-shadow string for a 4px base element
// Pixel size: 4px per pixel, characters are ~10x12 pixels

const PX = 4; // pixel size

function px(x, y, color) {
  return `${x * PX}px ${y * PX}px 0 0 ${color}`;
}

// Color palette
const C = {
  // Skin
  skin: '#ffcc99',
  skinDark: '#e6b380',
  // Hero (red)
  heroHat: '#e74c3c',
  heroHatDark: '#c0392b',
  heroCape: '#c0392b',
  heroArmor: '#8b6914',
  heroArmorLight: '#d4a437',
  // Mage (blue)
  mageRobe: '#3498db',
  mageRobeDark: '#2980b9',
  mageHat: '#2c3e80',
  mageHatLight: '#4a69bd',
  mageStar: '#f1c40f',
  // Healer (green)
  healerCloth: '#27ae60',
  healerClothDark: '#1e8449',
  healerCross: '#ffffff',
  healerHair: '#f39c12',
  // Common
  eyes: '#2c3e50',
  mouth: '#e74c3c',
  sword: '#bdc3c7',
  swordHandle: '#8b6914',
  staff: '#8b4513',
  staffGem: '#9b59b6',
  boots: '#6d4c41',
  bootsDark: '#4e342e',
  hair: '#f39c12',
  hairDark: '#d68910',
  white: '#ffffff',
  black: '#1a1a2e',
};

// Hero (Swordsman) — 10x14 pixel art
const heroPixels = [
  // Row 0-1: Red hat
  px(3, 0, C.heroHat), px(4, 0, C.heroHat), px(5, 0, C.heroHat), px(6, 0, C.heroHat),
  px(2, 1, C.heroHat), px(3, 1, C.heroHatDark), px(4, 1, C.heroHat), px(5, 1, C.heroHat), px(6, 1, C.heroHatDark), px(7, 1, C.heroHat),

  // Row 2: Hair
  px(2, 2, C.hair), px(3, 2, C.hair), px(4, 2, C.hairDark), px(5, 2, C.hairDark), px(6, 2, C.hair), px(7, 2, C.hair),

  // Row 3-4: Face
  px(2, 3, C.skin), px(3, 3, C.skin), px(4, 3, C.eyes), px(5, 3, C.skin), px(6, 3, C.eyes), px(7, 3, C.skin),
  px(2, 4, C.skin), px(3, 4, C.skin), px(4, 4, C.skin), px(5, 4, C.mouth), px(6, 4, C.skin), px(7, 4, C.skin),

  // Row 5: Neck
  px(4, 5, C.skin), px(5, 5, C.skin),

  // Row 6-7: Armor / body
  px(2, 6, C.heroArmorLight), px(3, 6, C.heroArmor), px(4, 6, C.heroArmorLight), px(5, 6, C.heroArmorLight), px(6, 6, C.heroArmor), px(7, 6, C.heroArmorLight),
  px(1, 7, C.skin), px(2, 7, C.heroArmor), px(3, 7, C.heroArmorLight), px(4, 7, C.heroArmor), px(5, 7, C.heroArmor), px(6, 7, C.heroArmorLight), px(7, 7, C.heroArmor), px(8, 7, C.skin),

  // Row 8-9: Lower armor + sword
  px(1, 8, C.skin), px(2, 8, C.heroArmor), px(3, 8, C.heroCape), px(4, 8, C.heroArmor), px(5, 8, C.heroArmor), px(6, 8, C.heroCape), px(7, 8, C.heroArmor), px(8, 8, C.skin),
  px(9, 8, C.sword), // sword blade start
  px(3, 9, C.heroCape), px(4, 9, C.heroArmor), px(5, 9, C.heroArmor), px(6, 9, C.heroCape),
  px(9, 9, C.sword),

  // Row 10: Belt
  px(3, 10, C.swordHandle), px(4, 10, C.swordHandle), px(5, 10, C.swordHandle), px(6, 10, C.swordHandle),
  px(8, 10, C.swordHandle), px(9, 10, C.sword),

  // Row 11-12: Legs
  px(3, 11, C.heroHatDark), px(4, 11, C.heroHatDark), px(5, 11, C.heroHatDark), px(6, 11, C.heroHatDark),
  px(9, 11, C.sword),
  px(3, 12, C.boots), px(4, 12, C.boots), px(5, 12, C.boots), px(6, 12, C.boots),

  // Row 13: Boots
  px(2, 13, C.bootsDark), px(3, 13, C.boots), px(5, 13, C.boots), px(6, 13, C.bootsDark),
].join(',\n    ');

// Mage — 10x14 pixel art
const magePixels = [
  // Row 0: Hat tip
  px(4, 0, C.mageHat), px(5, 0, C.mageHat),

  // Row 1: Hat
  px(3, 1, C.mageHat), px(4, 1, C.mageHatLight), px(5, 1, C.mageStar), px(6, 1, C.mageHat),

  // Row 2: Hat brim
  px(1, 2, C.mageHat), px(2, 2, C.mageHat), px(3, 2, C.mageHatLight), px(4, 2, C.mageHat), px(5, 2, C.mageHat), px(6, 2, C.mageHatLight), px(7, 2, C.mageHat), px(8, 2, C.mageHat),

  // Row 3: Hair
  px(2, 3, C.white), px(3, 3, C.white), px(4, 3, C.white), px(5, 3, C.white), px(6, 3, C.white), px(7, 3, C.white),

  // Row 4-5: Face
  px(2, 4, C.skin), px(3, 4, C.skin), px(4, 4, C.eyes), px(5, 4, C.skin), px(6, 4, C.eyes), px(7, 4, C.skin),
  px(2, 5, C.skin), px(3, 5, C.skin), px(4, 5, C.skin), px(5, 5, C.skin), px(6, 5, C.skin), px(7, 5, C.skin),

  // Row 6: Neck
  px(4, 6, C.skin), px(5, 6, C.skin),

  // Row 7-8: Robe upper
  px(2, 7, C.mageRobe), px(3, 7, C.mageRobe), px(4, 7, C.mageRobeDark), px(5, 7, C.mageRobeDark), px(6, 7, C.mageRobe), px(7, 7, C.mageRobe),
  px(0, 8, C.staffGem), px(1, 8, C.staff),
  px(2, 8, C.mageRobe), px(3, 8, C.mageRobeDark), px(4, 8, C.mageStar), px(5, 8, C.mageStar), px(6, 8, C.mageRobeDark), px(7, 8, C.mageRobe),

  // Row 9-10: Robe middle
  px(1, 9, C.staff),
  px(2, 9, C.mageRobeDark), px(3, 9, C.mageRobe), px(4, 9, C.mageRobeDark), px(5, 9, C.mageRobeDark), px(6, 9, C.mageRobe), px(7, 9, C.mageRobeDark),
  px(1, 10, C.staff),
  px(3, 10, C.mageRobe), px(4, 10, C.mageRobe), px(5, 10, C.mageRobe), px(6, 10, C.mageRobe),

  // Row 11-12: Robe lower
  px(1, 11, C.staff),
  px(2, 11, C.mageRobeDark), px(3, 11, C.mageRobe), px(4, 11, C.mageRobe), px(5, 11, C.mageRobe), px(6, 11, C.mageRobe), px(7, 11, C.mageRobeDark),
  px(1, 12, C.staff),
  px(2, 12, C.mageRobe), px(3, 12, C.mageRobeDark), px(4, 12, C.mageRobe), px(5, 12, C.mageRobe), px(6, 12, C.mageRobeDark), px(7, 12, C.mageRobe),

  // Row 13: Boots
  px(3, 13, C.bootsDark), px(4, 13, C.boots), px(5, 13, C.boots), px(6, 13, C.bootsDark),
].join(',\n    ');

// Healer — 10x14 pixel art
const healerPixels = [
  // Row 0-1: Hair
  px(3, 0, C.healerHair), px(4, 0, C.healerHair), px(5, 0, C.healerHair), px(6, 0, C.healerHair),
  px(2, 1, C.healerHair), px(3, 1, C.hairDark), px(4, 1, C.healerHair), px(5, 1, C.healerHair), px(6, 1, C.hairDark), px(7, 1, C.healerHair),

  // Row 2: Hair + face top
  px(2, 2, C.healerHair), px(3, 2, C.skin), px(4, 2, C.skin), px(5, 2, C.skin), px(6, 2, C.skin), px(7, 2, C.healerHair),

  // Row 3-4: Face
  px(2, 3, C.healerHair), px(3, 3, C.skin), px(4, 3, C.eyes), px(5, 3, C.skin), px(6, 3, C.eyes), px(7, 3, C.skin),
  px(2, 4, C.healerHair), px(3, 4, C.skin), px(4, 4, C.skin), px(5, 4, '#ff9999'), px(6, 4, C.skin), px(7, 4, C.skin),

  // Row 5: Neck
  px(4, 5, C.skin), px(5, 5, C.skin),

  // Row 6-7: Upper body with cross
  px(2, 6, C.healerCloth), px(3, 6, C.healerCloth), px(4, 6, C.healerCross), px(5, 6, C.healerCross), px(6, 6, C.healerCloth), px(7, 6, C.healerCloth),
  px(1, 7, C.skin), px(2, 7, C.healerCloth), px(3, 7, C.healerCross), px(4, 7, C.healerCross), px(5, 7, C.healerCross), px(6, 7, C.healerCross), px(7, 7, C.healerCloth), px(8, 7, C.skin),

  // Row 8-9: Lower body
  px(1, 8, C.skin), px(2, 8, C.healerClothDark), px(3, 8, C.healerCloth), px(4, 8, C.healerCross), px(5, 8, C.healerCross), px(6, 8, C.healerCloth), px(7, 8, C.healerClothDark), px(8, 8, C.skin),
  px(2, 9, C.healerClothDark), px(3, 9, C.healerCloth), px(4, 9, C.healerCloth), px(5, 9, C.healerCloth), px(6, 9, C.healerCloth), px(7, 9, C.healerClothDark),

  // Row 10-11: Skirt
  px(2, 10, C.healerCloth), px(3, 10, C.healerClothDark), px(4, 10, C.healerCloth), px(5, 10, C.healerCloth), px(6, 10, C.healerClothDark), px(7, 10, C.healerCloth),
  px(2, 11, C.healerClothDark), px(3, 11, C.healerCloth), px(4, 11, C.healerCloth), px(5, 11, C.healerCloth), px(6, 11, C.healerCloth), px(7, 11, C.healerClothDark),

  // Row 12-13: Legs + boots
  px(3, 12, C.skin), px(4, 12, C.skin), px(5, 12, C.skin), px(6, 12, C.skin),
  px(2, 13, C.bootsDark), px(3, 13, C.boots), px(5, 13, C.boots), px(6, 13, C.bootsDark),
].join(',\n    ');

// Monster sprites
const slimePixels = [
  px(3, 0, '#2ecc71'), px(4, 0, '#2ecc71'), px(5, 0, '#2ecc71'),
  px(2, 1, '#2ecc71'), px(3, 1, '#27ae60'), px(4, 1, '#2ecc71'), px(5, 1, '#27ae60'), px(6, 1, '#2ecc71'),
  px(1, 2, '#2ecc71'), px(2, 2, '#27ae60'), px(3, 2, '#1a1a2e'), px(4, 2, '#27ae60'), px(5, 2, '#1a1a2e'), px(6, 2, '#27ae60'), px(7, 2, '#2ecc71'),
  px(1, 3, '#27ae60'), px(2, 3, '#2ecc71'), px(3, 3, '#27ae60'), px(4, 3, '#2ecc71'), px(5, 3, '#27ae60'), px(6, 3, '#2ecc71'), px(7, 3, '#27ae60'),
  px(1, 4, '#1e8449'), px(2, 4, '#27ae60'), px(3, 4, '#27ae60'), px(4, 4, '#27ae60'), px(5, 4, '#27ae60'), px(6, 4, '#27ae60'), px(7, 4, '#1e8449'),
  px(2, 5, '#1e8449'), px(3, 5, '#27ae60'), px(4, 5, '#27ae60'), px(5, 5, '#27ae60'), px(6, 5, '#1e8449'),
].join(',\n    ');

const goblinPixels = [
  px(3, 0, '#1e8449'), px(4, 0, '#1e8449'), px(5, 0, '#1e8449'),
  px(2, 1, '#1e8449'), px(3, 1, '#27ae60'), px(4, 1, '#27ae60'), px(5, 1, '#27ae60'), px(6, 1, '#1e8449'),
  px(1, 2, '#27ae60'), px(2, 2, '#e74c3c'), px(3, 2, '#27ae60'), px(4, 2, '#27ae60'), px(5, 2, '#e74c3c'), px(6, 2, '#27ae60'),
  px(2, 3, '#27ae60'), px(3, 3, '#1a1a2e'), px(4, 3, '#27ae60'), px(5, 3, '#1a1a2e'), px(6, 3, '#27ae60'),
  px(2, 4, '#8b4513'), px(3, 4, '#a0522d'), px(4, 4, '#8b4513'), px(5, 4, '#a0522d'), px(6, 4, '#8b4513'),
  px(1, 5, '#27ae60'), px(2, 5, '#8b4513'), px(3, 5, '#a0522d'), px(4, 5, '#8b4513'), px(5, 5, '#a0522d'), px(6, 5, '#8b4513'), px(7, 5, '#27ae60'),
  px(3, 6, '#8b4513'), px(4, 6, '#8b4513'), px(5, 6, '#8b4513'),
  px(2, 7, '#4e342e'), px(3, 7, '#4e342e'), px(5, 7, '#4e342e'), px(6, 7, '#4e342e'),
].join(',\n    ');

const batPixels = [
  px(0, 0, '#4a0080'), px(1, 0, '#6a0dad'), px(7, 0, '#6a0dad'), px(8, 0, '#4a0080'),
  px(0, 1, '#6a0dad'), px(1, 1, '#4a0080'), px(2, 1, '#6a0dad'), px(6, 1, '#6a0dad'), px(7, 1, '#4a0080'), px(8, 1, '#6a0dad'),
  px(1, 2, '#6a0dad'), px(2, 2, '#4a0080'), px(3, 2, '#6a0dad'), px(4, 2, '#1a1a2e'), px(5, 2, '#6a0dad'), px(6, 2, '#4a0080'), px(7, 2, '#6a0dad'),
  px(2, 3, '#6a0dad'), px(3, 3, '#e74c3c'), px(4, 3, '#6a0dad'), px(5, 3, '#e74c3c'), px(6, 3, '#6a0dad'),
  px(3, 4, '#4a0080'), px(4, 4, '#6a0dad'), px(5, 4, '#4a0080'),
].join(',\n    ');

const dragonPixels = [
  px(2, 0, '#e74c3c'), px(7, 0, '#e74c3c'),
  px(1, 1, '#e74c3c'), px(2, 1, '#c0392b'), px(7, 1, '#c0392b'), px(8, 1, '#e74c3c'),
  px(2, 1, '#c0392b'), px(3, 1, '#e74c3c'), px(4, 1, '#e74c3c'), px(5, 1, '#e74c3c'), px(6, 1, '#e74c3c'), px(7, 1, '#c0392b'),
  px(2, 2, '#e74c3c'), px(3, 2, '#c0392b'), px(4, 2, '#f1c40f'), px(5, 2, '#c0392b'), px(6, 2, '#f1c40f'), px(7, 2, '#e74c3c'),
  px(1, 3, '#c0392b'), px(2, 3, '#e74c3c'), px(3, 3, '#c0392b'), px(4, 3, '#e74c3c'), px(5, 3, '#c0392b'), px(6, 3, '#e74c3c'), px(7, 3, '#c0392b'), px(8, 3, '#e74c3c'),
  px(0, 4, '#c0392b'), px(1, 4, '#e74c3c'), px(2, 4, '#c0392b'), px(3, 4, '#f39c12'), px(4, 4, '#f1c40f'), px(5, 4, '#f39c12'), px(6, 4, '#c0392b'), px(7, 4, '#e74c3c'), px(8, 4, '#c0392b'),
  px(1, 5, '#c0392b'), px(2, 5, '#e74c3c'), px(3, 5, '#f39c12'), px(4, 5, '#f39c12'), px(5, 5, '#f39c12'), px(6, 5, '#e74c3c'), px(7, 5, '#c0392b'),
  px(2, 6, '#c0392b'), px(3, 6, '#e74c3c'), px(4, 6, '#c0392b'), px(5, 6, '#e74c3c'), px(6, 6, '#c0392b'),
  px(1, 7, '#c0392b'), px(2, 7, '#e74c3c'), px(3, 7, '#c0392b'), px(5, 7, '#c0392b'), px(6, 7, '#e74c3c'), px(7, 7, '#c0392b'),
].join(',\n    ');

// Campfire pixels for rest mode
const campfirePixels = [
  px(3, 0, '#f1c40f'), px(4, 0, '#f39c12'),
  px(2, 1, '#f39c12'), px(3, 1, '#e74c3c'), px(4, 1, '#f1c40f'), px(5, 1, '#f39c12'),
  px(2, 2, '#e74c3c'), px(3, 2, '#f39c12'), px(4, 2, '#e74c3c'), px(5, 2, '#f1c40f'),
  px(1, 3, '#f39c12'), px(2, 3, '#e67e22'), px(3, 3, '#e74c3c'), px(4, 3, '#e67e22'), px(5, 3, '#e74c3c'), px(6, 3, '#f39c12'),
  px(1, 4, '#8b4513'), px(2, 4, '#a0522d'), px(3, 4, '#8b4513'), px(4, 4, '#a0522d'), px(5, 4, '#8b4513'), px(6, 4, '#a0522d'),
  px(0, 5, '#6d4c41'), px(1, 5, '#8b4513'), px(2, 5, '#6d4c41'), px(3, 5, '#8b4513'), px(4, 5, '#6d4c41'), px(5, 5, '#8b4513'), px(6, 5, '#6d4c41'), px(7, 5, '#8b4513'),
].join(',\n    ');

// Export for use in game.js
window.CharacterData = {
  hero: heroPixels,
  mage: magePixels,
  healer: healerPixels,
  slime: slimePixels,
  goblin: goblinPixels,
  bat: batPixels,
  dragon: dragonPixels,
  campfire: campfirePixels,
  PX: PX
};
