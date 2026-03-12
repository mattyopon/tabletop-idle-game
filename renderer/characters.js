// characters.js — CSS Pixel Art definitions using box-shadow (16x16 scale)
// All characters and monsters for 卓上冒険物語 v2

const PX = 3; // pixel size (3px per pixel for 16x16 = 48x48 display)

function px(x, y, color) {
  return `${x * PX}px ${y * PX}px 0 0 ${color}`;
}

// ========== COLOR PALETTE ==========
const C = {
  skin: '#ffcc99', skinDark: '#e6b380', skinLight: '#ffe0b2',
  eyes: '#2c3e50', mouth: '#e74c3c', white: '#ffffff', black: '#1a1a2e',
  // Warrior (red/gold)
  warRed: '#e74c3c', warRedDk: '#c0392b', warGold: '#d4a437', warGoldDk: '#8b6914',
  // Knight (silver/blue)
  kntSilver: '#bdc3c7', kntSilverDk: '#95a5a6', kntBlue: '#2980b9', kntBlueDk: '#1a5276',
  // Mage (blue/purple)
  magBlue: '#3498db', magBlueDk: '#2980b9', magPurple: '#8e44ad', magStar: '#f1c40f',
  // Healer (green/white)
  hlrGreen: '#27ae60', hlrGreenDk: '#1e8449', hlrWhite: '#ecf0f1', hlrCross: '#e74c3c',
  // Assassin (dark purple)
  asnPurple: '#6c3483', asnPurpleDk: '#4a235a', asnBlade: '#d5d8dc',
  // Summoner (teal/gold)
  sumTeal: '#1abc9c', sumTealDk: '#16a085', sumGold: '#f39c12',
  // Common
  sword: '#bdc3c7', swordHandle: '#8b6914',
  staff: '#8b4513', staffGem: '#9b59b6',
  boots: '#6d4c41', bootsDk: '#4e342e',
  hair: '#f39c12', hairDk: '#d68910',
  hairBrown: '#8d6e63', hairBlack: '#3e2723',
  cape: '#c0392b',
};

// ========== ALLY CHARACTERS (16x16 pixel art) ==========

// Warrior — Tank with heavy armor and shield
const warriorPixels = [
  // Helmet
  px(5,0,C.warRedDk),px(6,0,C.warRed),px(7,0,C.warRed),px(8,0,C.warRed),px(9,0,C.warRedDk),
  px(4,1,C.warRed),px(5,1,C.warGold),px(6,1,C.warRed),px(7,1,C.warGold),px(8,1,C.warRed),px(9,1,C.warGold),px(10,1,C.warRed),
  px(4,2,C.warRedDk),px(5,2,C.warRed),px(6,2,C.warRed),px(7,2,C.warRed),px(8,2,C.warRed),px(9,2,C.warRed),px(10,2,C.warRedDk),
  // Face
  px(4,3,C.hair),px(5,3,C.skin),px(6,3,C.skin),px(7,3,C.skin),px(8,3,C.skin),px(9,3,C.skin),px(10,3,C.hair),
  px(4,4,C.skin),px(5,4,C.skin),px(6,4,C.eyes),px(7,4,C.skin),px(8,4,C.eyes),px(9,4,C.skin),px(10,4,C.skin),
  px(5,5,C.skin),px(6,5,C.skin),px(7,5,C.mouth),px(8,5,C.skin),px(9,5,C.skin),
  // Neck
  px(6,6,C.skin),px(7,6,C.skin),px(8,6,C.skin),
  // Armor body
  px(3,7,C.warGoldDk),px(4,7,C.warGold),px(5,7,C.warGoldDk),px(6,7,C.warGold),px(7,7,C.warGold),px(8,7,C.warGold),px(9,7,C.warGoldDk),px(10,7,C.warGold),px(11,7,C.warGoldDk),
  px(2,8,C.skin),px(3,8,C.warGold),px(4,8,C.warGoldDk),px(5,8,C.warGold),px(6,8,C.warRedDk),px(7,8,C.warRed),px(8,8,C.warRedDk),px(9,8,C.warGold),px(10,8,C.warGoldDk),px(11,8,C.warGold),px(12,8,C.skin),
  px(2,9,C.skin),px(3,9,C.warGold),px(4,9,C.warGold),px(5,9,C.warGoldDk),px(6,9,C.warGold),px(7,9,C.warGold),px(8,9,C.warGold),px(9,9,C.warGoldDk),px(10,9,C.warGold),px(11,9,C.warGold),px(12,9,C.skin),
  // Shield (left) and sword (right)
  px(1,8,C.kntSilver),px(0,9,C.kntBlue),px(1,9,C.kntSilver),px(0,10,C.kntBlue),px(1,10,C.kntSilverDk),
  px(13,7,C.sword),px(13,8,C.sword),px(13,9,C.swordHandle),px(13,10,C.swordHandle),
  // Belt & lower
  px(4,10,C.warGoldDk),px(5,10,C.swordHandle),px(6,10,C.warGold),px(7,10,C.swordHandle),px(8,10,C.warGold),px(9,10,C.swordHandle),px(10,10,C.warGoldDk),
  px(4,11,C.warRedDk),px(5,11,C.warRed),px(6,11,C.warRedDk),px(7,11,C.warRed),px(8,11,C.warRedDk),px(9,11,C.warRed),px(10,11,C.warRedDk),
  // Legs
  px(4,12,C.warRedDk),px(5,12,C.warRed),px(6,12,C.warRedDk),px(8,12,C.warRedDk),px(9,12,C.warRed),px(10,12,C.warRedDk),
  px(4,13,C.warGoldDk),px(5,13,C.warGold),px(6,13,C.warGoldDk),px(8,13,C.warGoldDk),px(9,13,C.warGold),px(10,13,C.warGoldDk),
  // Boots
  px(3,14,C.bootsDk),px(4,14,C.boots),px(5,14,C.boots),px(6,14,C.bootsDk),px(8,14,C.bootsDk),px(9,14,C.boots),px(10,14,C.boots),px(11,14,C.bootsDk),
].join(',');

// Knight — Attacker with dual swords
const knightPixels = [
  // Hair
  px(5,0,C.hairBrown),px(6,0,C.hairBrown),px(7,0,C.hairBrown),px(8,0,C.hairBrown),px(9,0,C.hairBrown),
  px(4,1,C.hairBrown),px(5,1,C.hairBlack),px(6,1,C.hairBrown),px(7,1,C.hairBrown),px(8,1,C.hairBrown),px(9,1,C.hairBlack),px(10,1,C.hairBrown),
  // Face
  px(4,2,C.hairBrown),px(5,2,C.skin),px(6,2,C.skin),px(7,2,C.skin),px(8,2,C.skin),px(9,2,C.skin),px(10,2,C.hairBrown),
  px(4,3,C.skin),px(5,3,C.skin),px(6,3,C.eyes),px(7,3,C.skin),px(8,3,C.eyes),px(9,3,C.skin),px(10,3,C.skin),
  px(5,4,C.skin),px(6,4,C.skin),px(7,4,C.mouth),px(8,4,C.skin),px(9,4,C.skin),
  // Neck
  px(6,5,C.skin),px(7,5,C.skin),px(8,5,C.skin),
  // Armor (silver + blue accents)
  px(4,6,C.kntBlueDk),px(5,6,C.kntSilver),px(6,6,C.kntSilverDk),px(7,6,C.kntBlue),px(8,6,C.kntSilverDk),px(9,6,C.kntSilver),px(10,6,C.kntBlueDk),
  px(2,7,C.kntSilver),px(3,7,C.kntSilverDk),px(4,7,C.kntSilver),px(5,7,C.kntBlue),px(6,7,C.kntSilver),px(7,7,C.kntSilverDk),px(8,7,C.kntSilver),px(9,7,C.kntBlue),px(10,7,C.kntSilver),px(11,7,C.kntSilverDk),px(12,7,C.kntSilver),
  px(2,8,C.skin),px(3,8,C.kntSilverDk),px(4,8,C.kntBlue),px(5,8,C.kntSilver),px(6,8,C.kntBlueDk),px(7,8,C.kntBlue),px(8,8,C.kntBlueDk),px(9,8,C.kntSilver),px(10,8,C.kntBlue),px(11,8,C.kntSilverDk),px(12,8,C.skin),
  // Swords both sides
  px(1,6,C.sword),px(1,7,C.sword),px(1,8,C.swordHandle),
  px(13,6,C.sword),px(13,7,C.sword),px(13,8,C.swordHandle),
  // Belt
  px(4,9,C.kntSilverDk),px(5,9,C.swordHandle),px(6,9,C.kntSilver),px(7,9,C.swordHandle),px(8,9,C.kntSilver),px(9,9,C.swordHandle),px(10,9,C.kntSilverDk),
  // Lower
  px(4,10,C.kntBlueDk),px(5,10,C.kntBlue),px(6,10,C.kntBlueDk),px(7,10,C.kntBlue),px(8,10,C.kntBlueDk),px(9,10,C.kntBlue),px(10,10,C.kntBlueDk),
  px(4,11,C.kntBlueDk),px(5,11,C.kntBlue),px(6,11,C.kntBlueDk),px(8,11,C.kntBlueDk),px(9,11,C.kntBlue),px(10,11,C.kntBlueDk),
  // Legs
  px(4,12,C.kntSilverDk),px(5,12,C.kntSilver),px(6,12,C.kntSilverDk),px(8,12,C.kntSilverDk),px(9,12,C.kntSilver),px(10,12,C.kntSilverDk),
  // Boots
  px(3,13,C.bootsDk),px(4,13,C.boots),px(5,13,C.boots),px(6,13,C.bootsDk),px(8,13,C.bootsDk),px(9,13,C.boots),px(10,13,C.boots),px(11,13,C.bootsDk),
].join(',');

// Mage — Ranged magic user with pointy hat
const magePixels = [
  // Hat tip
  px(6,0,C.magPurple),px(7,0,C.magPurple),
  px(5,1,C.magPurple),px(6,1,C.magBlue),px(7,1,C.magStar),px(8,1,C.magPurple),
  px(4,2,C.magPurple),px(5,2,C.magBlue),px(6,2,C.magPurple),px(7,2,C.magBlue),px(8,2,C.magPurple),px(9,2,C.magBlue),
  // Hat brim
  px(2,3,C.magPurple),px(3,3,C.magBlue),px(4,3,C.magPurple),px(5,3,C.magBlue),px(6,3,C.magPurple),px(7,3,C.magBlue),px(8,3,C.magPurple),px(9,3,C.magBlue),px(10,3,C.magPurple),px(11,3,C.magBlue),
  // Hair
  px(4,4,C.white),px(5,4,C.white),px(6,4,C.white),px(7,4,C.white),px(8,4,C.white),px(9,4,C.white),
  // Face
  px(4,5,C.skin),px(5,5,C.skin),px(6,5,C.eyes),px(7,5,C.skin),px(8,5,C.eyes),px(9,5,C.skin),px(10,5,C.skin),
  px(5,6,C.skin),px(6,6,C.skin),px(7,6,C.skin),px(8,6,C.skin),px(9,6,C.skin),
  // Robe upper
  px(4,7,C.magBlue),px(5,7,C.magBlueDk),px(6,7,C.magBlue),px(7,7,C.magBlueDk),px(8,7,C.magBlue),px(9,7,C.magBlueDk),px(10,7,C.magBlue),
  // Staff (left)
  px(1,5,C.magStar),px(2,5,C.staffGem),px(1,6,C.staff),px(2,6,C.staff),
  px(2,7,C.staff),px(2,8,C.staff),px(2,9,C.staff),px(2,10,C.staff),px(2,11,C.staff),px(2,12,C.staff),
  // Robe body
  px(3,8,C.magBlueDk),px(4,8,C.magBlue),px(5,8,C.magBlueDk),px(6,8,C.magStar),px(7,8,C.magStar),px(8,8,C.magBlueDk),px(9,8,C.magBlue),px(10,8,C.magBlueDk),px(11,8,C.skin),
  px(3,9,C.magBlue),px(4,9,C.magBlueDk),px(5,9,C.magBlue),px(6,9,C.magBlueDk),px(7,9,C.magBlueDk),px(8,9,C.magBlue),px(9,9,C.magBlueDk),px(10,9,C.magBlue),
  // Robe lower
  px(3,10,C.magBlueDk),px(4,10,C.magBlue),px(5,10,C.magBlueDk),px(6,10,C.magBlue),px(7,10,C.magBlue),px(8,10,C.magBlueDk),px(9,10,C.magBlue),px(10,10,C.magBlueDk),
  px(3,11,C.magBlue),px(4,11,C.magBlueDk),px(5,11,C.magBlue),px(6,11,C.magBlueDk),px(7,11,C.magBlueDk),px(8,11,C.magBlue),px(9,11,C.magBlueDk),px(10,11,C.magBlue),
  px(3,12,C.magBlueDk),px(4,12,C.magBlue),px(5,12,C.magBlue),px(6,12,C.magBlue),px(7,12,C.magBlue),px(8,12,C.magBlue),px(9,12,C.magBlue),px(10,12,C.magBlueDk),
  // Boots
  px(4,13,C.bootsDk),px(5,13,C.boots),px(6,13,C.bootsDk),px(8,13,C.bootsDk),px(9,13,C.boots),px(10,13,C.bootsDk),
].join(',');

// Healer — Support with cross emblem and staff
const healerPixels = [
  // Hair (blonde, long)
  px(5,0,C.hair),px(6,0,C.hair),px(7,0,C.hair),px(8,0,C.hair),px(9,0,C.hair),
  px(4,1,C.hair),px(5,1,C.hairDk),px(6,1,C.hair),px(7,1,C.hair),px(8,1,C.hair),px(9,1,C.hairDk),px(10,1,C.hair),
  // Face
  px(3,2,C.hair),px(4,2,C.skin),px(5,2,C.skin),px(6,2,C.skin),px(7,2,C.skin),px(8,2,C.skin),px(9,2,C.skin),px(10,2,C.hair),
  px(3,3,C.hair),px(4,3,C.skin),px(5,3,C.skin),px(6,3,C.eyes),px(7,3,C.skin),px(8,3,C.eyes),px(9,3,C.skin),px(10,3,C.hair),
  px(3,4,C.hair),px(4,4,C.skin),px(5,4,C.skin),px(6,4,C.skin),px(7,4,'#ff9999'),px(8,4,C.skin),px(9,4,C.skin),px(10,4,C.hair),
  // Neck
  px(6,5,C.skin),px(7,5,C.skin),px(8,5,C.skin),
  // Staff (right)
  px(12,3,C.hlrCross),px(11,4,C.hlrCross),px(12,4,C.hlrCross),px(13,4,C.hlrCross),
  px(12,5,C.staff),px(12,6,C.staff),px(12,7,C.staff),px(12,8,C.staff),px(12,9,C.staff),px(12,10,C.staff),px(12,11,C.staff),
  // Robe upper (white with green + red cross)
  px(4,6,C.hlrWhite),px(5,6,C.hlrGreen),px(6,6,C.hlrWhite),px(7,6,C.hlrCross),px(8,6,C.hlrWhite),px(9,6,C.hlrGreen),px(10,6,C.hlrWhite),
  px(3,7,C.skin),px(4,7,C.hlrGreen),px(5,7,C.hlrWhite),px(6,7,C.hlrCross),px(7,7,C.hlrCross),px(8,7,C.hlrCross),px(9,7,C.hlrWhite),px(10,7,C.hlrGreen),px(11,7,C.skin),
  px(3,8,C.skin),px(4,8,C.hlrGreenDk),px(5,8,C.hlrGreen),px(6,8,C.hlrWhite),px(7,8,C.hlrCross),px(8,8,C.hlrWhite),px(9,8,C.hlrGreen),px(10,8,C.hlrGreenDk),px(11,8,C.skin),
  // Robe lower
  px(4,9,C.hlrGreen),px(5,9,C.hlrGreenDk),px(6,9,C.hlrGreen),px(7,9,C.hlrGreen),px(8,9,C.hlrGreen),px(9,9,C.hlrGreenDk),px(10,9,C.hlrGreen),
  px(3,10,C.hlrGreenDk),px(4,10,C.hlrGreen),px(5,10,C.hlrGreen),px(6,10,C.hlrGreenDk),px(7,10,C.hlrGreen),px(8,10,C.hlrGreenDk),px(9,10,C.hlrGreen),px(10,10,C.hlrGreen),px(11,10,C.hlrGreenDk),
  px(3,11,C.hlrGreen),px(4,11,C.hlrGreenDk),px(5,11,C.hlrGreen),px(6,11,C.hlrGreen),px(7,11,C.hlrGreenDk),px(8,11,C.hlrGreen),px(9,11,C.hlrGreen),px(10,11,C.hlrGreenDk),px(11,11,C.hlrGreen),
  // Legs
  px(5,12,C.skin),px(6,12,C.skin),px(8,12,C.skin),px(9,12,C.skin),
  // Boots
  px(4,13,C.bootsDk),px(5,13,C.boots),px(6,13,C.bootsDk),px(8,13,C.bootsDk),px(9,13,C.boots),px(10,13,C.bootsDk),
].join(',');

// Assassin — Hooded figure with daggers
const assassinPixels = [
  // Hood
  px(5,0,C.asnPurpleDk),px(6,0,C.asnPurple),px(7,0,C.asnPurple),px(8,0,C.asnPurple),px(9,0,C.asnPurpleDk),
  px(4,1,C.asnPurple),px(5,1,C.asnPurpleDk),px(6,1,C.asnPurple),px(7,1,C.asnPurple),px(8,1,C.asnPurple),px(9,1,C.asnPurpleDk),px(10,1,C.asnPurple),
  px(3,2,C.asnPurpleDk),px(4,2,C.asnPurple),px(5,2,C.asnPurpleDk),px(6,2,C.asnPurple),px(7,2,C.asnPurple),px(8,2,C.asnPurple),px(9,2,C.asnPurpleDk),px(10,2,C.asnPurple),px(11,2,C.asnPurpleDk),
  // Face (shadowed)
  px(4,3,C.asnPurpleDk),px(5,3,C.skinDark),px(6,3,C.eyes),px(7,3,C.skinDark),px(8,3,C.eyes),px(9,3,C.skinDark),px(10,3,C.asnPurpleDk),
  px(5,4,C.skinDark),px(6,4,C.skin),px(7,4,C.skin),px(8,4,C.skin),px(9,4,C.skinDark),
  // Scarf
  px(5,5,C.asnPurple),px(6,5,C.asnPurpleDk),px(7,5,C.asnPurple),px(8,5,C.asnPurpleDk),px(9,5,C.asnPurple),
  // Body (slim)
  px(4,6,C.asnPurple),px(5,6,C.asnPurpleDk),px(6,6,C.asnPurple),px(7,6,C.asnPurpleDk),px(8,6,C.asnPurple),px(9,6,C.asnPurpleDk),px(10,6,C.asnPurple),
  px(3,7,C.skin),px(4,7,C.asnPurpleDk),px(5,7,C.asnPurple),px(6,7,C.asnPurpleDk),px(7,7,C.black),px(8,7,C.asnPurpleDk),px(9,7,C.asnPurple),px(10,7,C.asnPurpleDk),px(11,7,C.skin),
  // Daggers
  px(1,6,C.asnBlade),px(2,7,C.asnBlade),px(12,7,C.asnBlade),px(13,6,C.asnBlade),
  // Lower body
  px(4,8,C.asnPurpleDk),px(5,8,C.asnPurple),px(6,8,C.asnPurpleDk),px(7,8,C.asnPurple),px(8,8,C.asnPurpleDk),px(9,8,C.asnPurple),px(10,8,C.asnPurpleDk),
  px(4,9,C.asnPurple),px(5,9,C.asnPurpleDk),px(6,9,C.asnPurple),px(7,9,C.asnPurpleDk),px(8,9,C.asnPurple),px(9,9,C.asnPurpleDk),px(10,9,C.asnPurple),
  // Legs
  px(4,10,C.asnPurpleDk),px(5,10,C.asnPurple),px(6,10,C.asnPurpleDk),px(8,10,C.asnPurpleDk),px(9,10,C.asnPurple),px(10,10,C.asnPurpleDk),
  px(4,11,C.asnPurple),px(5,11,C.asnPurpleDk),px(6,11,C.asnPurple),px(8,11,C.asnPurple),px(9,11,C.asnPurpleDk),px(10,11,C.asnPurple),
  // Boots
  px(3,12,C.bootsDk),px(4,12,C.boots),px(5,12,C.boots),px(6,12,C.bootsDk),px(8,12,C.bootsDk),px(9,12,C.boots),px(10,12,C.boots),px(11,12,C.bootsDk),
].join(',');

// Summoner — Robed figure with orb
const summonerPixels = [
  // Hair (decorative)
  px(5,0,C.sumGold),px(6,0,C.sumTeal),px(7,0,C.sumTeal),px(8,0,C.sumTeal),px(9,0,C.sumGold),
  px(4,1,C.sumTeal),px(5,1,C.sumTealDk),px(6,1,C.sumTeal),px(7,1,C.sumGold),px(8,1,C.sumTeal),px(9,1,C.sumTealDk),px(10,1,C.sumTeal),
  // Face
  px(4,2,C.sumTeal),px(5,2,C.skin),px(6,2,C.skin),px(7,2,C.skin),px(8,2,C.skin),px(9,2,C.skin),px(10,2,C.sumTeal),
  px(4,3,C.skin),px(5,3,C.skin),px(6,3,C.eyes),px(7,3,C.skin),px(8,3,C.eyes),px(9,3,C.skin),px(10,3,C.skin),
  px(5,4,C.skin),px(6,4,C.skin),px(7,4,C.skin),px(8,4,C.skin),px(9,4,C.skin),
  // Neck
  px(6,5,C.skin),px(7,5,C.skin),px(8,5,C.skin),
  // Orb (floating left)
  px(1,4,C.sumGold),px(2,4,C.sumGold),px(0,5,C.sumGold),px(1,5,'#f1c40f'),px(2,5,C.sumGold),px(3,5,C.sumGold),px(1,6,C.sumGold),px(2,6,C.sumGold),
  // Robe
  px(4,6,C.sumTeal),px(5,6,C.sumTealDk),px(6,6,C.sumTeal),px(7,6,C.sumGold),px(8,6,C.sumTeal),px(9,6,C.sumTealDk),px(10,6,C.sumTeal),
  px(3,7,C.skin),px(4,7,C.sumTealDk),px(5,7,C.sumTeal),px(6,7,C.sumTealDk),px(7,7,C.sumGold),px(8,7,C.sumTealDk),px(9,7,C.sumTeal),px(10,7,C.sumTealDk),px(11,7,C.skin),
  px(4,8,C.sumTeal),px(5,8,C.sumTealDk),px(6,8,C.sumTeal),px(7,8,C.sumTealDk),px(8,8,C.sumTeal),px(9,8,C.sumTealDk),px(10,8,C.sumTeal),
  px(3,9,C.sumTealDk),px(4,9,C.sumTeal),px(5,9,C.sumTeal),px(6,9,C.sumTealDk),px(7,9,C.sumTeal),px(8,9,C.sumTealDk),px(9,9,C.sumTeal),px(10,9,C.sumTeal),px(11,9,C.sumTealDk),
  px(3,10,C.sumTeal),px(4,10,C.sumTealDk),px(5,10,C.sumTeal),px(6,10,C.sumTeal),px(7,10,C.sumTealDk),px(8,10,C.sumTeal),px(9,10,C.sumTeal),px(10,10,C.sumTealDk),px(11,10,C.sumTeal),
  px(3,11,C.sumTealDk),px(4,11,C.sumTeal),px(5,11,C.sumTealDk),px(6,11,C.sumTeal),px(7,11,C.sumTeal),px(8,11,C.sumTealDk),px(9,11,C.sumTeal),px(10,11,C.sumTealDk),px(11,11,C.sumTeal),
  // Boots
  px(4,12,C.bootsDk),px(5,12,C.boots),px(6,12,C.bootsDk),px(8,12,C.bootsDk),px(9,12,C.boots),px(10,12,C.bootsDk),
].join(',');

// ========== MONSTERS ==========

// --- GRASSLAND ---

// Slime (8x8 — small enemy)
const slimePixels = [
  px(3,0,'#2ecc71'),px(4,0,'#2ecc71'),px(5,0,'#2ecc71'),
  px(2,1,'#2ecc71'),px(3,1,'#27ae60'),px(4,1,'#2ecc71'),px(5,1,'#27ae60'),px(6,1,'#2ecc71'),
  px(1,2,'#2ecc71'),px(2,2,'#27ae60'),px(3,2,C.black),px(4,2,'#27ae60'),px(5,2,C.black),px(6,2,'#27ae60'),px(7,2,'#2ecc71'),
  px(1,3,'#27ae60'),px(2,3,'#2ecc71'),px(3,3,'#27ae60'),px(4,3,'#2ecc71'),px(5,3,'#27ae60'),px(6,3,'#2ecc71'),px(7,3,'#27ae60'),
  px(1,4,'#1e8449'),px(2,4,'#27ae60'),px(3,4,'#27ae60'),px(4,4,'#27ae60'),px(5,4,'#27ae60'),px(6,4,'#27ae60'),px(7,4,'#1e8449'),
  px(2,5,'#1e8449'),px(3,5,'#27ae60'),px(4,5,'#27ae60'),px(5,5,'#27ae60'),px(6,5,'#1e8449'),
].join(',');

// Goblin (10x10)
const goblinPixels = [
  px(4,0,'#1e8449'),px(5,0,'#1e8449'),px(6,0,'#1e8449'),
  px(3,1,'#1e8449'),px(4,1,'#27ae60'),px(5,1,'#27ae60'),px(6,1,'#27ae60'),px(7,1,'#1e8449'),
  px(2,2,'#27ae60'),px(3,2,'#e74c3c'),px(4,2,'#27ae60'),px(5,2,'#27ae60'),px(6,2,'#e74c3c'),px(7,2,'#27ae60'),
  px(3,3,'#27ae60'),px(4,3,C.black),px(5,3,'#27ae60'),px(6,3,C.black),px(7,3,'#27ae60'),
  px(3,4,'#8b4513'),px(4,4,'#a0522d'),px(5,4,'#8b4513'),px(6,4,'#a0522d'),px(7,4,'#8b4513'),
  px(2,5,'#27ae60'),px(3,5,'#8b4513'),px(4,5,'#a0522d'),px(5,5,'#8b4513'),px(6,5,'#a0522d'),px(7,5,'#8b4513'),px(8,5,'#27ae60'),
  px(4,6,'#8b4513'),px(5,6,'#8b4513'),px(6,6,'#8b4513'),
  px(3,7,'#4e342e'),px(4,7,'#4e342e'),px(6,7,'#4e342e'),px(7,7,'#4e342e'),
].join(',');

// Wolf (12x10)
const wolfPixels = [
  px(2,0,'#78909c'),px(3,0,'#78909c'),px(9,0,'#78909c'),
  px(1,1,'#607d8b'),px(2,1,'#78909c'),px(3,1,'#607d8b'),px(8,1,'#607d8b'),px(9,1,'#78909c'),
  px(1,2,'#607d8b'),px(2,2,'#e74c3c'),px(3,2,'#607d8b'),px(4,2,'#78909c'),px(5,2,'#78909c'),px(6,2,'#78909c'),px(7,2,'#607d8b'),px(8,2,'#e74c3c'),px(9,2,'#607d8b'),
  px(2,3,'#78909c'),px(3,3,'#607d8b'),px(4,3,'#78909c'),px(5,3,'#607d8b'),px(6,3,'#78909c'),px(7,3,'#607d8b'),px(8,3,'#78909c'),
  px(1,4,'#607d8b'),px(2,4,'#78909c'),px(3,4,'#607d8b'),px(4,4,'#78909c'),px(5,4,'#78909c'),px(6,4,'#78909c'),px(7,4,'#607d8b'),px(8,4,'#78909c'),px(9,4,'#607d8b'),
  px(0,5,'#bdc3c7'),px(1,5,'#78909c'),px(2,5,'#607d8b'),px(3,5,'#78909c'),px(4,5,'#bdc3c7'),px(5,5,'#bdc3c7'),px(6,5,'#78909c'),px(7,5,'#607d8b'),px(8,5,'#78909c'),
  px(2,6,'#607d8b'),px(3,6,'#78909c'),px(4,6,'#607d8b'),px(5,6,'#607d8b'),px(6,6,'#607d8b'),px(7,6,'#78909c'),px(8,6,'#607d8b'),
  px(2,7,'#455a64'),px(3,7,'#455a64'),px(5,7,'#455a64'),px(6,7,'#455a64'),px(7,7,'#455a64'),px(8,7,'#455a64'),
].join(',');

// Goblin King BOSS (16x16)
const goblinKingPixels = [
  // Crown
  px(4,0,'#f1c40f'),px(6,0,'#f1c40f'),px(8,0,'#f1c40f'),px(10,0,'#f1c40f'),
  px(4,1,'#f39c12'),px(5,1,'#f1c40f'),px(6,1,'#f39c12'),px(7,1,'#f1c40f'),px(8,1,'#f39c12'),px(9,1,'#f1c40f'),px(10,1,'#f39c12'),
  // Head
  px(4,2,'#27ae60'),px(5,2,'#2ecc71'),px(6,2,'#27ae60'),px(7,2,'#2ecc71'),px(8,2,'#27ae60'),px(9,2,'#2ecc71'),px(10,2,'#27ae60'),
  px(3,3,'#27ae60'),px(4,3,'#2ecc71'),px(5,3,'#e74c3c'),px(6,3,'#2ecc71'),px(7,3,'#2ecc71'),px(8,3,'#e74c3c'),px(9,3,'#2ecc71'),px(10,3,'#27ae60'),
  px(3,4,'#2ecc71'),px(4,4,'#27ae60'),px(5,4,C.black),px(6,4,'#27ae60'),px(7,4,'#2ecc71'),px(8,4,C.black),px(9,4,'#27ae60'),px(10,4,'#2ecc71'),
  px(4,5,'#2ecc71'),px(5,5,'#27ae60'),px(6,5,'#2ecc71'),px(7,5,'#e74c3c'),px(8,5,'#2ecc71'),px(9,5,'#27ae60'),
  // Body (large)
  px(3,6,'#8b4513'),px(4,6,'#a0522d'),px(5,6,'#8b4513'),px(6,6,'#f1c40f'),px(7,6,'#f1c40f'),px(8,6,'#8b4513'),px(9,6,'#a0522d'),px(10,6,'#8b4513'),
  px(2,7,'#27ae60'),px(3,7,'#8b4513'),px(4,7,'#a0522d'),px(5,7,'#8b4513'),px(6,7,'#a0522d'),px(7,7,'#a0522d'),px(8,7,'#8b4513'),px(9,7,'#a0522d'),px(10,7,'#8b4513'),px(11,7,'#27ae60'),
  px(1,8,'#27ae60'),px(2,8,'#2ecc71'),px(3,8,'#8b4513'),px(4,8,'#a0522d'),px(5,8,'#8b4513'),px(6,8,'#a0522d'),px(7,8,'#8b4513'),px(8,8,'#a0522d'),px(9,8,'#8b4513'),px(10,8,'#a0522d'),px(11,8,'#2ecc71'),px(12,8,'#27ae60'),
  px(1,9,C.sword),px(2,9,'#2ecc71'),px(3,9,'#a0522d'),px(4,9,'#8b4513'),px(5,9,'#a0522d'),px(6,9,'#8b4513'),px(7,9,'#a0522d'),px(8,9,'#8b4513'),px(9,9,'#a0522d'),px(10,9,'#8b4513'),px(11,9,'#2ecc71'),px(12,9,C.sword),
  px(0,10,C.sword),px(3,10,'#8b4513'),px(4,10,'#a0522d'),px(5,10,'#8b4513'),px(6,10,'#8b4513'),px(7,10,'#8b4513'),px(8,10,'#a0522d'),px(9,10,'#8b4513'),px(10,10,'#a0522d'),px(13,10,C.sword),
  // Legs
  px(4,11,'#8b4513'),px(5,11,'#a0522d'),px(6,11,'#8b4513'),px(7,11,'#a0522d'),px(8,11,'#8b4513'),px(9,11,'#a0522d'),
  px(3,12,'#4e342e'),px(4,12,'#6d4c41'),px(5,12,'#4e342e'),px(7,12,'#4e342e'),px(8,12,'#6d4c41'),px(9,12,'#4e342e'),px(10,12,'#4e342e'),
].join(',');

// --- CAVE ---

// Bat (10x8)
const batPixels = [
  px(0,0,'#4a0080'),px(1,0,'#6a0dad'),px(8,0,'#6a0dad'),px(9,0,'#4a0080'),
  px(0,1,'#6a0dad'),px(1,1,'#4a0080'),px(2,1,'#6a0dad'),px(7,1,'#6a0dad'),px(8,1,'#4a0080'),px(9,1,'#6a0dad'),
  px(1,2,'#6a0dad'),px(2,2,'#4a0080'),px(3,2,'#6a0dad'),px(4,2,C.black),px(5,2,'#6a0dad'),px(6,2,C.black),px(7,2,'#4a0080'),px(8,2,'#6a0dad'),
  px(2,3,'#6a0dad'),px(3,3,'#e74c3c'),px(4,3,'#6a0dad'),px(5,3,'#e74c3c'),px(6,3,'#6a0dad'),px(7,3,'#6a0dad'),
  px(3,4,'#4a0080'),px(4,4,'#6a0dad'),px(5,4,'#4a0080'),px(6,4,'#6a0dad'),
].join(',');

// Skeleton (12x14)
const skeletonPixels = [
  px(5,0,'#ecf0f1'),px(6,0,'#ecf0f1'),px(7,0,'#ecf0f1'),px(8,0,'#ecf0f1'),
  px(4,1,'#ecf0f1'),px(5,1,'#bdc3c7'),px(6,1,'#ecf0f1'),px(7,1,'#ecf0f1'),px(8,1,'#bdc3c7'),px(9,1,'#ecf0f1'),
  px(4,2,'#ecf0f1'),px(5,2,C.black),px(6,2,'#bdc3c7'),px(7,2,'#bdc3c7'),px(8,2,C.black),px(9,2,'#ecf0f1'),
  px(5,3,'#ecf0f1'),px(6,3,C.black),px(7,3,C.black),px(8,3,'#ecf0f1'),
  px(6,4,'#bdc3c7'),px(7,4,'#bdc3c7'),
  px(4,5,'#ecf0f1'),px(5,5,'#bdc3c7'),px(6,5,'#ecf0f1'),px(7,5,'#ecf0f1'),px(8,5,'#bdc3c7'),px(9,5,'#ecf0f1'),
  px(3,6,'#bdc3c7'),px(4,6,'#ecf0f1'),px(5,6,'#ecf0f1'),px(6,6,'#bdc3c7'),px(7,6,'#bdc3c7'),px(8,6,'#ecf0f1'),px(9,6,'#ecf0f1'),px(10,6,'#bdc3c7'),
  px(3,7,'#bdc3c7'),px(4,7,'#ecf0f1'),px(5,7,'#bdc3c7'),px(6,7,'#ecf0f1'),px(7,7,'#ecf0f1'),px(8,7,'#bdc3c7'),px(9,7,'#ecf0f1'),px(10,7,'#bdc3c7'),
  px(5,8,'#ecf0f1'),px(6,8,'#bdc3c7'),px(7,8,'#bdc3c7'),px(8,8,'#ecf0f1'),
  px(5,9,'#bdc3c7'),px(6,9,'#ecf0f1'),px(7,9,'#ecf0f1'),px(8,9,'#bdc3c7'),
  px(5,10,'#ecf0f1'),px(6,10,'#bdc3c7'),px(8,10,'#bdc3c7'),px(9,10,'#ecf0f1'),
  px(4,11,'#bdc3c7'),px(5,11,'#ecf0f1'),px(8,11,'#ecf0f1'),px(9,11,'#bdc3c7'),
].join(',');

// Golem (14x14)
const golemPixels = [
  px(5,0,'#7f8c8d'),px(6,0,'#95a5a6'),px(7,0,'#95a5a6'),px(8,0,'#7f8c8d'),
  px(4,1,'#95a5a6'),px(5,1,'#7f8c8d'),px(6,1,'#95a5a6'),px(7,1,'#95a5a6'),px(8,1,'#7f8c8d'),px(9,1,'#95a5a6'),
  px(4,2,'#7f8c8d'),px(5,2,'#f39c12'),px(6,2,'#7f8c8d'),px(7,2,'#7f8c8d'),px(8,2,'#f39c12'),px(9,2,'#7f8c8d'),
  px(4,3,'#95a5a6'),px(5,3,'#7f8c8d'),px(6,3,'#95a5a6'),px(7,3,'#95a5a6'),px(8,3,'#7f8c8d'),px(9,3,'#95a5a6'),
  px(3,4,'#7f8c8d'),px(4,4,'#95a5a6'),px(5,4,'#7f8c8d'),px(6,4,'#95a5a6'),px(7,4,'#7f8c8d'),px(8,4,'#95a5a6'),px(9,4,'#7f8c8d'),px(10,4,'#95a5a6'),
  px(2,5,'#95a5a6'),px(3,5,'#7f8c8d'),px(4,5,'#95a5a6'),px(5,5,'#7f8c8d'),px(6,5,'#95a5a6'),px(7,5,'#7f8c8d'),px(8,5,'#95a5a6'),px(9,5,'#7f8c8d'),px(10,5,'#95a5a6'),px(11,5,'#7f8c8d'),
  px(1,6,'#7f8c8d'),px(2,6,'#95a5a6'),px(3,6,'#7f8c8d'),px(4,6,'#95a5a6'),px(5,6,'#7f8c8d'),px(6,6,'#95a5a6'),px(7,6,'#7f8c8d'),px(8,6,'#95a5a6'),px(9,6,'#7f8c8d'),px(10,6,'#95a5a6'),px(11,6,'#7f8c8d'),px(12,6,'#95a5a6'),
  px(1,7,'#95a5a6'),px(2,7,'#7f8c8d'),px(3,7,'#95a5a6'),px(4,7,'#7f8c8d'),px(5,7,'#95a5a6'),px(6,7,'#7f8c8d'),px(7,7,'#95a5a6'),px(8,7,'#7f8c8d'),px(9,7,'#95a5a6'),px(10,7,'#7f8c8d'),px(11,7,'#95a5a6'),px(12,7,'#7f8c8d'),
  px(4,8,'#95a5a6'),px(5,8,'#7f8c8d'),px(6,8,'#95a5a6'),px(7,8,'#7f8c8d'),px(8,8,'#95a5a6'),px(9,8,'#7f8c8d'),
  px(4,9,'#7f8c8d'),px(5,9,'#95a5a6'),px(6,9,'#7f8c8d'),px(7,9,'#95a5a6'),px(8,9,'#7f8c8d'),px(9,9,'#95a5a6'),
  px(3,10,'#7f8c8d'),px(4,10,'#95a5a6'),px(5,10,'#7f8c8d'),px(8,10,'#7f8c8d'),px(9,10,'#95a5a6'),px(10,10,'#7f8c8d'),
  px(3,11,'#95a5a6'),px(4,11,'#7f8c8d'),px(5,11,'#95a5a6'),px(8,11,'#95a5a6'),px(9,11,'#7f8c8d'),px(10,11,'#95a5a6'),
].join(',');

// Lich BOSS (16x16)
const lichPixels = [
  px(5,0,'#4a0080'),px(6,0,'#6a0dad'),px(7,0,'#6a0dad'),px(8,0,'#6a0dad'),px(9,0,'#4a0080'),
  px(4,1,'#6a0dad'),px(5,1,'#4a0080'),px(6,1,'#6a0dad'),px(7,1,'#4a0080'),px(8,1,'#6a0dad'),px(9,1,'#4a0080'),px(10,1,'#6a0dad'),
  px(4,2,'#4a0080'),px(5,2,'#ecf0f1'),px(6,2,'#bdc3c7'),px(7,2,'#ecf0f1'),px(8,2,'#bdc3c7'),px(9,2,'#ecf0f1'),px(10,2,'#4a0080'),
  px(4,3,'#ecf0f1'),px(5,3,'#2ecc71'),px(6,3,'#bdc3c7'),px(7,3,'#ecf0f1'),px(8,3,'#2ecc71'),px(9,3,'#bdc3c7'),px(10,3,'#ecf0f1'),
  px(5,4,'#ecf0f1'),px(6,4,C.black),px(7,4,C.black),px(8,4,C.black),px(9,4,'#ecf0f1'),
  px(4,5,'#6a0dad'),px(5,5,'#4a0080'),px(6,5,'#6a0dad'),px(7,5,'#4a0080'),px(8,5,'#6a0dad'),px(9,5,'#4a0080'),px(10,5,'#6a0dad'),
  px(2,6,'#ecf0f1'),px(3,6,'#6a0dad'),px(4,6,'#4a0080'),px(5,6,'#6a0dad'),px(6,6,'#4a0080'),px(7,6,'#6a0dad'),px(8,6,'#4a0080'),px(9,6,'#6a0dad'),px(10,6,'#4a0080'),px(11,6,'#6a0dad'),px(12,6,'#ecf0f1'),
  px(2,7,'#bdc3c7'),px(3,7,'#4a0080'),px(4,7,'#6a0dad'),px(5,7,'#4a0080'),px(6,7,'#6a0dad'),px(7,7,'#4a0080'),px(8,7,'#6a0dad'),px(9,7,'#4a0080'),px(10,7,'#6a0dad'),px(11,7,'#4a0080'),px(12,7,'#bdc3c7'),
  px(4,8,'#6a0dad'),px(5,8,'#4a0080'),px(6,8,'#6a0dad'),px(7,8,'#2ecc71'),px(8,8,'#6a0dad'),px(9,8,'#4a0080'),px(10,8,'#6a0dad'),
  px(4,9,'#4a0080'),px(5,9,'#6a0dad'),px(6,9,'#4a0080'),px(7,9,'#6a0dad'),px(8,9,'#4a0080'),px(9,9,'#6a0dad'),px(10,9,'#4a0080'),
  px(3,10,'#6a0dad'),px(4,10,'#4a0080'),px(5,10,'#6a0dad'),px(6,10,'#4a0080'),px(7,10,'#6a0dad'),px(8,10,'#4a0080'),px(9,10,'#6a0dad'),px(10,10,'#4a0080'),px(11,10,'#6a0dad'),
  px(3,11,'#4a0080'),px(4,11,'#6a0dad'),px(5,11,'#4a0080'),px(6,11,'#6a0dad'),px(7,11,'#4a0080'),px(8,11,'#6a0dad'),px(9,11,'#4a0080'),px(10,11,'#6a0dad'),px(11,11,'#4a0080'),
].join(',');

// --- FOREST ---

// Treant (14x14)
const treantPixels = [
  px(4,0,'#27ae60'),px(5,0,'#2ecc71'),px(6,0,'#27ae60'),px(7,0,'#2ecc71'),px(8,0,'#27ae60'),px(9,0,'#2ecc71'),
  px(3,1,'#2ecc71'),px(4,1,'#27ae60'),px(5,1,'#2ecc71'),px(6,1,'#1e8449'),px(7,1,'#2ecc71'),px(8,1,'#27ae60'),px(9,1,'#2ecc71'),px(10,1,'#27ae60'),
  px(2,2,'#27ae60'),px(3,2,'#2ecc71'),px(4,2,'#27ae60'),px(5,2,'#2ecc71'),px(6,2,'#27ae60'),px(7,2,'#2ecc71'),px(8,2,'#1e8449'),px(9,2,'#2ecc71'),px(10,2,'#27ae60'),px(11,2,'#2ecc71'),
  px(3,3,'#1e8449'),px(4,3,'#2ecc71'),px(5,3,'#27ae60'),px(6,3,'#2ecc71'),px(7,3,'#27ae60'),px(8,3,'#2ecc71'),px(9,3,'#27ae60'),px(10,3,'#1e8449'),
  // Face on trunk
  px(5,4,'#8b4513'),px(6,4,'#a0522d'),px(7,4,'#8b4513'),px(8,4,'#a0522d'),
  px(4,5,'#8b4513'),px(5,5,'#f39c12'),px(6,5,'#a0522d'),px(7,5,'#a0522d'),px(8,5,'#f39c12'),px(9,5,'#8b4513'),
  px(4,6,'#a0522d'),px(5,6,'#8b4513'),px(6,6,C.black),px(7,6,C.black),px(8,6,'#8b4513'),px(9,6,'#a0522d'),
  // Trunk
  px(2,7,'#8b4513'),px(3,7,'#a0522d'),px(4,7,'#8b4513'),px(5,7,'#a0522d'),px(6,7,'#8b4513'),px(7,7,'#a0522d'),px(8,7,'#8b4513'),px(9,7,'#a0522d'),px(10,7,'#8b4513'),px(11,7,'#a0522d'),
  px(4,8,'#a0522d'),px(5,8,'#8b4513'),px(6,8,'#a0522d'),px(7,8,'#8b4513'),px(8,8,'#a0522d'),px(9,8,'#8b4513'),
  px(4,9,'#8b4513'),px(5,9,'#a0522d'),px(6,9,'#8b4513'),px(7,9,'#a0522d'),px(8,9,'#8b4513'),px(9,9,'#a0522d'),
  // Roots
  px(3,10,'#6d4c41'),px(4,10,'#8b4513'),px(5,10,'#6d4c41'),px(8,10,'#6d4c41'),px(9,10,'#8b4513'),px(10,10,'#6d4c41'),
  px(2,11,'#4e342e'),px(3,11,'#6d4c41'),px(4,11,'#4e342e'),px(9,11,'#4e342e'),px(10,11,'#6d4c41'),px(11,11,'#4e342e'),
].join(',');

// Fairy (8x8 small)
const fairyPixels = [
  px(3,0,'#f1c40f'),px(4,0,'#f1c40f'),
  px(1,1,'#74b9ff'),px(2,1,'#a29bfe'),px(3,1,'#ffcc99'),px(4,1,'#ffcc99'),px(5,1,'#a29bfe'),px(6,1,'#74b9ff'),
  px(0,2,'#74b9ff'),px(1,2,'#a29bfe'),px(2,2,'#dfe6e9'),px(3,2,C.eyes),px(4,2,C.eyes),px(5,2,'#dfe6e9'),px(6,2,'#a29bfe'),px(7,2,'#74b9ff'),
  px(1,3,'#a29bfe'),px(2,3,'#ffcc99'),px(3,3,'#ffcc99'),px(4,3,'#ffcc99'),px(5,3,'#ffcc99'),px(6,3,'#a29bfe'),
  px(2,4,'#a29bfe'),px(3,4,'#74b9ff'),px(4,4,'#74b9ff'),px(5,4,'#a29bfe'),
  px(3,5,'#a29bfe'),px(4,5,'#a29bfe'),
].join(',');

// Giant Spider (12x10)
const spiderPixels = [
  px(5,0,'#2c3e50'),px(6,0,'#2c3e50'),px(7,0,'#2c3e50'),
  px(4,1,'#2c3e50'),px(5,1,'#e74c3c'),px(6,1,'#34495e'),px(7,1,'#e74c3c'),px(8,1,'#2c3e50'),
  px(0,2,'#34495e'),px(1,2,'#2c3e50'),px(3,2,'#34495e'),px(4,2,'#2c3e50'),px(5,2,'#34495e'),px(6,2,'#2c3e50'),px(7,2,'#34495e'),px(8,2,'#2c3e50'),px(9,2,'#34495e'),px(11,2,'#2c3e50'),px(12,2,'#34495e'),
  px(1,3,'#2c3e50'),px(3,3,'#2c3e50'),px(4,3,'#34495e'),px(5,3,'#2c3e50'),px(6,3,'#34495e'),px(7,3,'#2c3e50'),px(8,3,'#34495e'),px(9,3,'#2c3e50'),px(11,3,'#34495e'),
  px(0,4,'#34495e'),px(2,4,'#2c3e50'),px(4,4,'#2c3e50'),px(5,4,'#34495e'),px(6,4,'#2c3e50'),px(7,4,'#34495e'),px(8,4,'#2c3e50'),px(10,4,'#2c3e50'),px(12,4,'#34495e'),
  px(4,5,'#34495e'),px(5,5,'#2c3e50'),px(6,5,'#34495e'),px(7,5,'#2c3e50'),px(8,5,'#34495e'),
  px(5,6,'#2c3e50'),px(6,6,'#34495e'),px(7,6,'#2c3e50'),
].join(',');

// Elf Lord BOSS (16x16)
const elfLordPixels = [
  // Crown of leaves
  px(4,0,'#27ae60'),px(5,0,'#f1c40f'),px(6,0,'#2ecc71'),px(7,0,'#27ae60'),px(8,0,'#2ecc71'),px(9,0,'#f1c40f'),px(10,0,'#27ae60'),
  px(3,1,'#2ecc71'),px(4,1,'#27ae60'),px(5,1,'#2ecc71'),px(6,1,'#27ae60'),px(7,1,'#2ecc71'),px(8,1,'#27ae60'),px(9,1,'#2ecc71'),px(10,1,'#27ae60'),px(11,1,'#2ecc71'),
  // Face (elven)
  px(4,2,'#ffe0b2'),px(5,2,'#ffcc99'),px(6,2,'#ffe0b2'),px(7,2,'#ffcc99'),px(8,2,'#ffe0b2'),px(9,2,'#ffcc99'),px(10,2,'#ffe0b2'),
  px(3,3,'#ffcc99'),px(4,3,'#ffe0b2'),px(5,3,'#27ae60'),px(6,3,'#ffe0b2'),px(7,3,'#ffcc99'),px(8,3,'#27ae60'),px(9,3,'#ffe0b2'),px(10,3,'#ffcc99'),
  px(4,4,'#ffcc99'),px(5,4,'#ffe0b2'),px(6,4,'#ffcc99'),px(7,4,'#ffcc99'),px(8,4,'#ffe0b2'),px(9,4,'#ffcc99'),
  // Body (green robes + gold)
  px(4,5,'#27ae60'),px(5,5,'#2ecc71'),px(6,5,'#27ae60'),px(7,5,'#f1c40f'),px(8,5,'#27ae60'),px(9,5,'#2ecc71'),px(10,5,'#27ae60'),
  px(2,6,'#ffe0b2'),px(3,6,'#27ae60'),px(4,6,'#2ecc71'),px(5,6,'#27ae60'),px(6,6,'#f1c40f'),px(7,6,'#2ecc71'),px(8,6,'#f1c40f'),px(9,6,'#27ae60'),px(10,6,'#2ecc71'),px(11,6,'#27ae60'),px(12,6,'#ffe0b2'),
  px(2,7,'#ffe0b2'),px(3,7,'#2ecc71'),px(4,7,'#27ae60'),px(5,7,'#2ecc71'),px(6,7,'#27ae60'),px(7,7,'#f1c40f'),px(8,7,'#27ae60'),px(9,7,'#2ecc71'),px(10,7,'#27ae60'),px(11,7,'#2ecc71'),px(12,7,'#ffe0b2'),
  // Bow (right)
  px(13,5,'#8b4513'),px(13,6,'#8b4513'),px(13,7,'#a0522d'),px(14,5,'#f1c40f'),px(14,6,'#bdc3c7'),px(14,7,'#f1c40f'),
  // Lower robe
  px(3,8,'#27ae60'),px(4,8,'#2ecc71'),px(5,8,'#27ae60'),px(6,8,'#2ecc71'),px(7,8,'#27ae60'),px(8,8,'#2ecc71'),px(9,8,'#27ae60'),px(10,8,'#2ecc71'),px(11,8,'#27ae60'),
  px(3,9,'#2ecc71'),px(4,9,'#27ae60'),px(5,9,'#2ecc71'),px(6,9,'#27ae60'),px(7,9,'#2ecc71'),px(8,9,'#27ae60'),px(9,9,'#2ecc71'),px(10,9,'#27ae60'),px(11,9,'#2ecc71'),
  px(4,10,'#27ae60'),px(5,10,'#2ecc71'),px(6,10,'#27ae60'),px(8,10,'#27ae60'),px(9,10,'#2ecc71'),px(10,10,'#27ae60'),
  // Boots
  px(3,11,'#4e342e'),px(4,11,'#6d4c41'),px(5,11,'#4e342e'),px(6,11,'#6d4c41'),px(8,11,'#6d4c41'),px(9,11,'#4e342e'),px(10,11,'#6d4c41'),px(11,11,'#4e342e'),
].join(',');

// --- VOLCANO ---

// Salamander (10x8)
const salamanderPixels = [
  px(3,0,'#e74c3c'),px(4,0,'#c0392b'),px(5,0,'#e74c3c'),
  px(2,1,'#c0392b'),px(3,1,'#f39c12'),px(4,1,'#e74c3c'),px(5,1,'#f39c12'),px(6,1,'#c0392b'),
  px(1,2,'#e74c3c'),px(2,2,'#c0392b'),px(3,2,'#f1c40f'),px(4,2,'#c0392b'),px(5,2,'#f1c40f'),px(6,2,'#c0392b'),px(7,2,'#e74c3c'),
  px(1,3,'#c0392b'),px(2,3,'#e74c3c'),px(3,3,'#c0392b'),px(4,3,'#e74c3c'),px(5,3,'#c0392b'),px(6,3,'#e74c3c'),px(7,3,'#c0392b'),px(8,3,'#e74c3c'),
  px(2,4,'#e74c3c'),px(3,4,'#f39c12'),px(4,4,'#c0392b'),px(5,4,'#f39c12'),px(6,4,'#c0392b'),px(7,4,'#e74c3c'),px(8,4,'#c0392b'),px(9,4,'#e74c3c'),
  px(2,5,'#c0392b'),px(3,5,'#e74c3c'),px(4,5,'#c0392b'),px(5,5,'#e74c3c'),px(6,5,'#c0392b'),px(9,5,'#c0392b'),
  px(1,6,'#c0392b'),px(2,6,'#e74c3c'),px(4,6,'#c0392b'),px(5,6,'#e74c3c'),
].join(',');

// Demon (12x14)
const demonPixels = [
  // Horns
  px(3,0,'#c0392b'),px(4,0,'#e74c3c'),px(9,0,'#e74c3c'),px(10,0,'#c0392b'),
  px(3,1,'#e74c3c'),px(4,1,'#c0392b'),px(9,1,'#c0392b'),px(10,1,'#e74c3c'),
  // Head
  px(4,2,'#c0392b'),px(5,2,'#e74c3c'),px(6,2,'#c0392b'),px(7,2,'#e74c3c'),px(8,2,'#c0392b'),px(9,2,'#e74c3c'),
  px(4,3,'#e74c3c'),px(5,3,'#f1c40f'),px(6,3,'#c0392b'),px(7,3,'#c0392b'),px(8,3,'#f1c40f'),px(9,3,'#e74c3c'),
  px(4,4,'#c0392b'),px(5,4,'#e74c3c'),px(6,4,C.black),px(7,4,C.black),px(8,4,'#e74c3c'),px(9,4,'#c0392b'),
  // Body
  px(3,5,'#c0392b'),px(4,5,'#e74c3c'),px(5,5,'#c0392b'),px(6,5,'#e74c3c'),px(7,5,'#c0392b'),px(8,5,'#e74c3c'),px(9,5,'#c0392b'),px(10,5,'#e74c3c'),
  px(2,6,'#e74c3c'),px(3,6,'#c0392b'),px(4,6,'#e74c3c'),px(5,6,'#c0392b'),px(6,6,'#f39c12'),px(7,6,'#f39c12'),px(8,6,'#c0392b'),px(9,6,'#e74c3c'),px(10,6,'#c0392b'),px(11,6,'#e74c3c'),
  px(2,7,'#c0392b'),px(3,7,'#e74c3c'),px(4,7,'#c0392b'),px(5,7,'#e74c3c'),px(6,7,'#c0392b'),px(7,7,'#c0392b'),px(8,7,'#e74c3c'),px(9,7,'#c0392b'),px(10,7,'#e74c3c'),px(11,7,'#c0392b'),
  px(4,8,'#e74c3c'),px(5,8,'#c0392b'),px(6,8,'#e74c3c'),px(7,8,'#c0392b'),px(8,8,'#e74c3c'),px(9,8,'#c0392b'),
  px(4,9,'#c0392b'),px(5,9,'#e74c3c'),px(6,9,'#c0392b'),px(7,9,'#e74c3c'),px(8,9,'#c0392b'),px(9,9,'#e74c3c'),
  // Legs
  px(4,10,'#c0392b'),px(5,10,'#e74c3c'),px(6,10,'#c0392b'),px(8,10,'#c0392b'),px(9,10,'#e74c3c'),
  px(3,11,'#7b241c'),px(4,11,'#c0392b'),px(5,11,'#7b241c'),px(8,11,'#7b241c'),px(9,11,'#c0392b'),px(10,11,'#7b241c'),
].join(',');

// Flame Dragon (16x14)
const flameDragonPixels = [
  px(3,0,'#e74c3c'),px(11,0,'#e74c3c'),
  px(2,1,'#e74c3c'),px(3,1,'#c0392b'),px(10,1,'#c0392b'),px(11,1,'#e74c3c'),
  px(3,2,'#e74c3c'),px(4,2,'#c0392b'),px(5,2,'#e74c3c'),px(6,2,'#e74c3c'),px(7,2,'#e74c3c'),px(8,2,'#e74c3c'),px(9,2,'#c0392b'),px(10,2,'#e74c3c'),
  px(3,3,'#c0392b'),px(4,3,'#e74c3c'),px(5,3,'#f1c40f'),px(6,3,'#c0392b'),px(7,3,'#c0392b'),px(8,3,'#f1c40f'),px(9,3,'#e74c3c'),px(10,3,'#c0392b'),
  px(2,4,'#c0392b'),px(3,4,'#e74c3c'),px(4,4,'#c0392b'),px(5,4,'#e74c3c'),px(6,4,'#c0392b'),px(7,4,'#e74c3c'),px(8,4,'#c0392b'),px(9,4,'#e74c3c'),px(10,4,'#c0392b'),px(11,4,'#e74c3c'),
  px(1,5,'#c0392b'),px(2,5,'#e74c3c'),px(3,5,'#c0392b'),px(4,5,'#f39c12'),px(5,5,'#f1c40f'),px(6,5,'#f39c12'),px(7,5,'#f39c12'),px(8,5,'#f1c40f'),px(9,5,'#f39c12'),px(10,5,'#e74c3c'),px(11,5,'#c0392b'),px(12,5,'#e74c3c'),
  px(1,6,'#e74c3c'),px(2,6,'#c0392b'),px(3,6,'#e74c3c'),px(4,6,'#f39c12'),px(5,6,'#f39c12'),px(6,6,'#e74c3c'),px(7,6,'#e74c3c'),px(8,6,'#f39c12'),px(9,6,'#f39c12'),px(10,6,'#c0392b'),px(11,6,'#e74c3c'),px(12,6,'#c0392b'),
  px(3,7,'#c0392b'),px(4,7,'#e74c3c'),px(5,7,'#c0392b'),px(6,7,'#e74c3c'),px(7,7,'#c0392b'),px(8,7,'#e74c3c'),px(9,7,'#c0392b'),px(10,7,'#e74c3c'),
  px(2,8,'#c0392b'),px(3,8,'#e74c3c'),px(4,8,'#c0392b'),px(6,8,'#c0392b'),px(7,8,'#e74c3c'),px(9,8,'#c0392b'),px(10,8,'#e74c3c'),px(11,8,'#c0392b'),
  px(2,9,'#7b241c'),px(3,9,'#c0392b'),px(4,9,'#7b241c'),px(6,9,'#7b241c'),px(7,9,'#c0392b'),px(9,9,'#7b241c'),px(10,9,'#c0392b'),px(11,9,'#7b241c'),
].join(',');

// Hell Hound BOSS (16x14)
const hellHoundPixels = [
  // Ears + horns
  px(3,0,'#e74c3c'),px(4,0,'#c0392b'),px(10,0,'#c0392b'),px(11,0,'#e74c3c'),
  px(2,1,'#c0392b'),px(3,1,'#e74c3c'),px(4,1,'#2c3e50'),px(5,1,'#34495e'),px(6,1,'#2c3e50'),px(7,1,'#34495e'),px(8,1,'#2c3e50'),px(9,1,'#34495e'),px(10,1,'#e74c3c'),px(11,1,'#c0392b'),
  // Head
  px(3,2,'#2c3e50'),px(4,2,'#34495e'),px(5,2,'#f39c12'),px(6,2,'#2c3e50'),px(7,2,'#2c3e50'),px(8,2,'#f39c12'),px(9,2,'#34495e'),px(10,2,'#2c3e50'),
  px(3,3,'#34495e'),px(4,3,'#2c3e50'),px(5,3,'#34495e'),px(6,3,'#e74c3c'),px(7,3,'#e74c3c'),px(8,3,'#34495e'),px(9,3,'#2c3e50'),px(10,3,'#34495e'),
  // Body
  px(2,4,'#2c3e50'),px(3,4,'#34495e'),px(4,4,'#2c3e50'),px(5,4,'#34495e'),px(6,4,'#2c3e50'),px(7,4,'#34495e'),px(8,4,'#2c3e50'),px(9,4,'#34495e'),px(10,4,'#2c3e50'),px(11,4,'#34495e'),
  px(1,5,'#34495e'),px(2,5,'#2c3e50'),px(3,5,'#34495e'),px(4,5,'#e74c3c'),px(5,5,'#f39c12'),px(6,5,'#e74c3c'),px(7,5,'#e74c3c'),px(8,5,'#f39c12'),px(9,5,'#e74c3c'),px(10,5,'#34495e'),px(11,5,'#2c3e50'),px(12,5,'#34495e'),
  px(1,6,'#2c3e50'),px(2,6,'#34495e'),px(3,6,'#2c3e50'),px(4,6,'#34495e'),px(5,6,'#2c3e50'),px(6,6,'#34495e'),px(7,6,'#2c3e50'),px(8,6,'#34495e'),px(9,6,'#2c3e50'),px(10,6,'#34495e'),px(11,6,'#2c3e50'),px(12,6,'#34495e'),px(13,6,'#2c3e50'),
  px(2,7,'#2c3e50'),px(3,7,'#34495e'),px(4,7,'#2c3e50'),px(5,7,'#34495e'),px(6,7,'#2c3e50'),px(7,7,'#34495e'),px(8,7,'#2c3e50'),px(9,7,'#34495e'),px(10,7,'#2c3e50'),px(11,7,'#34495e'),px(12,7,'#2c3e50'),px(13,7,'#34495e'),
  // Tail (fire)
  px(13,5,'#c0392b'),px(14,4,'#e74c3c'),px(14,5,'#f39c12'),px(15,3,'#f1c40f'),px(15,4,'#f39c12'),
  // Legs
  px(2,8,'#34495e'),px(3,8,'#2c3e50'),px(4,8,'#34495e'),px(6,8,'#34495e'),px(7,8,'#2c3e50'),px(9,8,'#2c3e50'),px(10,8,'#34495e'),px(11,8,'#2c3e50'),
  px(2,9,'#2c3e50'),px(3,9,'#34495e'),px(6,9,'#2c3e50'),px(7,9,'#34495e'),px(9,9,'#34495e'),px(10,9,'#2c3e50'),
].join(',');

// --- DEMON CASTLE ---

// Dark Knight (14x14)
const darkKnightPixels = [
  px(5,0,'#2c3e50'),px(6,0,'#34495e'),px(7,0,'#2c3e50'),px(8,0,'#34495e'),
  px(4,1,'#34495e'),px(5,1,'#2c3e50'),px(6,1,'#34495e'),px(7,1,'#2c3e50'),px(8,1,'#34495e'),px(9,1,'#2c3e50'),
  px(4,2,'#2c3e50'),px(5,2,'#e74c3c'),px(6,2,'#34495e'),px(7,2,'#34495e'),px(8,2,'#e74c3c'),px(9,2,'#2c3e50'),
  px(5,3,'#34495e'),px(6,3,'#2c3e50'),px(7,3,'#2c3e50'),px(8,3,'#34495e'),
  px(3,4,'#2c3e50'),px(4,4,'#34495e'),px(5,4,'#2c3e50'),px(6,4,'#e74c3c'),px(7,4,'#e74c3c'),px(8,4,'#2c3e50'),px(9,4,'#34495e'),px(10,4,'#2c3e50'),
  px(2,5,'#34495e'),px(3,5,'#2c3e50'),px(4,5,'#34495e'),px(5,5,'#2c3e50'),px(6,5,'#34495e'),px(7,5,'#2c3e50'),px(8,5,'#34495e'),px(9,5,'#2c3e50'),px(10,5,'#34495e'),px(11,5,'#2c3e50'),
  px(1,6,C.sword),px(2,6,'#2c3e50'),px(3,6,'#34495e'),px(4,6,'#2c3e50'),px(5,6,'#34495e'),px(6,6,'#2c3e50'),px(7,6,'#34495e'),px(8,6,'#2c3e50'),px(9,6,'#34495e'),px(10,6,'#2c3e50'),px(11,6,'#34495e'),
  px(0,7,C.sword),px(3,7,'#2c3e50'),px(4,7,'#34495e'),px(5,7,'#2c3e50'),px(6,7,'#34495e'),px(7,7,'#2c3e50'),px(8,7,'#34495e'),px(9,7,'#2c3e50'),px(10,7,'#34495e'),
  px(4,8,'#34495e'),px(5,8,'#2c3e50'),px(6,8,'#34495e'),px(7,8,'#2c3e50'),px(8,8,'#34495e'),px(9,8,'#2c3e50'),
  px(4,9,'#2c3e50'),px(5,9,'#34495e'),px(6,9,'#2c3e50'),px(8,9,'#2c3e50'),px(9,9,'#34495e'),
  px(3,10,'#34495e'),px(4,10,'#2c3e50'),px(5,10,'#34495e'),px(8,10,'#34495e'),px(9,10,'#2c3e50'),px(10,10,'#34495e'),
].join(',');

// Wyvern (14x12)
const wyvernPixels = [
  px(6,0,'#6c3483'),px(7,0,'#6c3483'),
  px(5,1,'#8e44ad'),px(6,1,'#6c3483'),px(7,1,'#6c3483'),px(8,1,'#8e44ad'),
  px(1,2,'#6c3483'),px(2,2,'#8e44ad'),px(4,2,'#8e44ad'),px(5,2,'#6c3483'),px(6,2,'#f1c40f'),px(7,2,'#6c3483'),px(8,2,'#f1c40f'),px(9,2,'#8e44ad'),px(11,2,'#8e44ad'),px(12,2,'#6c3483'),
  px(0,3,'#8e44ad'),px(1,3,'#6c3483'),px(2,3,'#8e44ad'),px(3,3,'#6c3483'),px(4,3,'#8e44ad'),px(5,3,'#6c3483'),px(6,3,'#8e44ad'),px(7,3,'#8e44ad'),px(8,3,'#6c3483'),px(9,3,'#8e44ad'),px(10,3,'#6c3483'),px(11,3,'#8e44ad'),px(12,3,'#6c3483'),px(13,3,'#8e44ad'),
  px(1,4,'#6c3483'),px(2,4,'#8e44ad'),px(3,4,'#6c3483'),px(4,4,'#8e44ad'),px(5,4,'#6c3483'),px(6,4,'#8e44ad'),px(7,4,'#6c3483'),px(8,4,'#8e44ad'),px(9,4,'#6c3483'),px(10,4,'#8e44ad'),px(11,4,'#6c3483'),px(12,4,'#8e44ad'),
  px(5,5,'#8e44ad'),px(6,5,'#6c3483'),px(7,5,'#c0392b'),px(8,5,'#6c3483'),px(9,5,'#8e44ad'),
  px(5,6,'#6c3483'),px(6,6,'#8e44ad'),px(7,6,'#6c3483'),px(8,6,'#8e44ad'),px(9,6,'#6c3483'),
  px(4,7,'#8e44ad'),px(5,7,'#6c3483'),px(6,7,'#8e44ad'),px(7,7,'#6c3483'),px(8,7,'#8e44ad'),px(9,7,'#6c3483'),px(10,7,'#8e44ad'),
  px(4,8,'#6c3483'),px(5,8,'#8e44ad'),px(9,8,'#8e44ad'),px(10,8,'#6c3483'),
].join(',');

// Demon Lord - FINAL BOSS (20x18)
const demonLordPixels = [
  // Crown/Horns
  px(3,0,'#c0392b'),px(4,0,'#e74c3c'),px(13,0,'#e74c3c'),px(14,0,'#c0392b'),
  px(3,1,'#e74c3c'),px(4,1,'#c0392b'),px(13,1,'#c0392b'),px(14,1,'#e74c3c'),
  px(4,2,'#c0392b'),px(5,2,'#f1c40f'),px(6,2,'#2c3e50'),px(7,2,'#34495e'),px(8,2,'#2c3e50'),px(9,2,'#34495e'),px(10,2,'#2c3e50'),px(11,2,'#f1c40f'),px(12,2,'#c0392b'),
  // Head
  px(5,3,'#2c3e50'),px(6,3,'#34495e'),px(7,3,'#2c3e50'),px(8,3,'#34495e'),px(9,3,'#2c3e50'),px(10,3,'#34495e'),px(11,3,'#2c3e50'),
  px(5,4,'#34495e'),px(6,4,'#e74c3c'),px(7,4,'#2c3e50'),px(8,4,'#34495e'),px(9,4,'#2c3e50'),px(10,4,'#e74c3c'),px(11,4,'#34495e'),
  px(5,5,'#2c3e50'),px(6,5,'#34495e'),px(7,5,'#e74c3c'),px(8,5,'#e74c3c'),px(9,5,'#34495e'),px(10,5,'#2c3e50'),px(11,5,'#34495e'),
  // Cape & Body
  px(2,6,'#6c3483'),px(3,6,'#4a235a'),px(4,6,'#2c3e50'),px(5,6,'#34495e'),px(6,6,'#2c3e50'),px(7,6,'#e74c3c'),px(8,6,'#f39c12'),px(9,6,'#e74c3c'),px(10,6,'#2c3e50'),px(11,6,'#34495e'),px(12,6,'#2c3e50'),px(13,6,'#4a235a'),px(14,6,'#6c3483'),
  px(1,7,'#4a235a'),px(2,7,'#6c3483'),px(3,7,'#2c3e50'),px(4,7,'#34495e'),px(5,7,'#2c3e50'),px(6,7,'#34495e'),px(7,7,'#2c3e50'),px(8,7,'#34495e'),px(9,7,'#2c3e50'),px(10,7,'#34495e'),px(11,7,'#2c3e50'),px(12,7,'#34495e'),px(13,7,'#6c3483'),px(14,7,'#4a235a'),
  px(0,8,'#6c3483'),px(1,8,'#4a235a'),px(2,8,'#2c3e50'),px(3,8,'#34495e'),px(4,8,'#2c3e50'),px(5,8,'#34495e'),px(6,8,'#2c3e50'),px(7,8,'#34495e'),px(8,8,'#2c3e50'),px(9,8,'#34495e'),px(10,8,'#2c3e50'),px(11,8,'#34495e'),px(12,8,'#2c3e50'),px(13,8,'#4a235a'),px(14,8,'#6c3483'),px(15,8,'#4a235a'),
  // Sword (left) and fire (right)
  px(0,6,C.sword),px(0,7,C.sword),px(0,5,C.sword),px(0,4,C.sword),
  px(15,6,'#e74c3c'),px(16,5,'#f39c12'),px(16,6,'#f1c40f'),px(16,7,'#e74c3c'),
  // Lower body
  px(3,9,'#4a235a'),px(4,9,'#2c3e50'),px(5,9,'#34495e'),px(6,9,'#2c3e50'),px(7,9,'#34495e'),px(8,9,'#2c3e50'),px(9,9,'#34495e'),px(10,9,'#2c3e50'),px(11,9,'#34495e'),px(12,9,'#2c3e50'),px(13,9,'#4a235a'),
  px(4,10,'#4a235a'),px(5,10,'#6c3483'),px(6,10,'#4a235a'),px(7,10,'#6c3483'),px(8,10,'#4a235a'),px(9,10,'#6c3483'),px(10,10,'#4a235a'),px(11,10,'#6c3483'),px(12,10,'#4a235a'),
  px(4,11,'#6c3483'),px(5,11,'#4a235a'),px(6,11,'#6c3483'),px(7,11,'#4a235a'),px(8,11,'#6c3483'),px(9,11,'#4a235a'),px(10,11,'#6c3483'),px(11,11,'#4a235a'),px(12,11,'#6c3483'),
  // Boots
  px(4,12,'#2c3e50'),px(5,12,'#34495e'),px(6,12,'#2c3e50'),px(9,12,'#2c3e50'),px(10,12,'#34495e'),px(11,12,'#2c3e50'),
].join(',');

// Campfire for rest mode
const campfirePixels = [
  px(4,0,'#f1c40f'),px(5,0,'#f39c12'),
  px(3,1,'#f39c12'),px(4,1,'#e74c3c'),px(5,1,'#f1c40f'),px(6,1,'#f39c12'),
  px(3,2,'#e74c3c'),px(4,2,'#f39c12'),px(5,2,'#e74c3c'),px(6,2,'#f1c40f'),
  px(2,3,'#f39c12'),px(3,3,'#e67e22'),px(4,3,'#e74c3c'),px(5,3,'#e67e22'),px(6,3,'#e74c3c'),px(7,3,'#f39c12'),
  px(2,4,'#8b4513'),px(3,4,'#a0522d'),px(4,4,'#8b4513'),px(5,4,'#a0522d'),px(6,4,'#8b4513'),px(7,4,'#a0522d'),
  px(1,5,'#6d4c41'),px(2,5,'#8b4513'),px(3,5,'#6d4c41'),px(4,5,'#8b4513'),px(5,5,'#6d4c41'),px(6,5,'#8b4513'),px(7,5,'#6d4c41'),px(8,5,'#8b4513'),
].join(',');

// Spirit for Summoner skill
const spiritPixels = [
  px(2,0,'#74b9ff'),px(3,0,'#a29bfe'),
  px(1,1,'#a29bfe'),px(2,1,'#74b9ff'),px(3,1,'#a29bfe'),px(4,1,'#74b9ff'),
  px(1,2,'#74b9ff'),px(2,2,'#ffffff'),px(3,2,'#ffffff'),px(4,2,'#74b9ff'),
  px(1,3,'#a29bfe'),px(2,3,'#74b9ff'),px(3,3,'#74b9ff'),px(4,3,'#a29bfe'),
  px(2,4,'#a29bfe'),px(3,4,'#74b9ff'),
].join(',');

// ========== EXPORT ==========
window.CharacterData = {
  // Allies
  warrior: warriorPixels,
  knight: knightPixels,
  mage: magePixels,
  healer: healerPixels,
  assassin: assassinPixels,
  summoner: summonerPixels,
  // Grassland
  slime: slimePixels,
  goblin: goblinPixels,
  wolf: wolfPixels,
  goblinKing: goblinKingPixels,
  // Cave
  bat: batPixels,
  skeleton: skeletonPixels,
  golem: golemPixels,
  lich: lichPixels,
  // Forest
  treant: treantPixels,
  fairy: fairyPixels,
  spider: spiderPixels,
  elfLord: elfLordPixels,
  // Volcano
  salamander: salamanderPixels,
  demon: demonPixels,
  flameDragon: flameDragonPixels,
  hellHound: hellHoundPixels,
  // Demon Castle
  darkKnight: darkKnightPixels,
  wyvern: wyvernPixels,
  demonLord: demonLordPixels,
  // Effects
  campfire: campfirePixels,
  spirit: spiritPixels,
  PX: PX
};
