# Tabletop Adventure Story: Idle Cozy Time

A desktop-resident idle game built with Electron. Tiny pixel-art adventurers automatically go on quests, defeat monsters, collect items, and level up — all while sitting on your desktop. Just watch and occasionally cheer them on!

## Features

- **Frameless transparent window** that sits on your desktop
- **CSS pixel art characters** drawn with box-shadow (no image assets)
- **Auto-adventure cycle**: monsters, items, rare events
- **Character growth**: level up to Lv.20 with stat increases
- **Gold economy**: earn gold passively and from battles
- **Cheer bonus**: click the scene to encourage your party
- **Rest mode**: campfire with HP recovery
- **Equipment system**: equip weapons and armor
- **Offline progress**: earn gold while the app is closed
- **System tray**: runs in background with tray icon

## Quick Start

```bash
npm install
npm start
```

## Controls

- **Drag** the title bar to move the window
- **Click** the adventure scene to cheer (5s cooldown)
- **Buttons**: Rest / Adventure / Equipment
- **System tray**: right-click for show/hide/quit
- **Menu (top-left)**: reset save data

## Tech Stack

- Electron (frameless transparent window)
- Pure CSS pixel art (box-shadow technique)
- Vanilla JavaScript (no frameworks)
- localStorage for save data

---

# 卓上冒険物語：放置ほっこりタイム

Electronで作ったデスクトップ常駐型の放置系ほっこりゲームです。ちいさなピクセルアートの冒険者たちが自動で冒険に出かけ、モンスターを倒し、アイテムを集め、レベルアップしていきます。あなたはただ見守るだけ。時々クリックで応援もできます！

## 特徴

- **フレームレス透明ウィンドウ** — デスクトップに溶け込むデザイン
- **CSSピクセルアート** — box-shadowで描かれたキャラクター（画像不要）
- **自動冒険サイクル** — モンスター遭遇、アイテム発見、レアイベント
- **キャラクター成長** — 最大Lv.20まで成長、攻撃力・HP上昇
- **ゴールド経済** — 放置でもゴールドが少しずつ増加
- **応援ボーナス** — クリックで一時的にステータスUP
- **休憩モード** — 焚き火でHP回復
- **装備システム** — 武器・防具の装備切り替え
- **オフライン進行** — アプリ再起動時に経過時間分のゴールドを獲得
- **システムトレイ** — バックグラウンドで動作

## 起動方法

```bash
npm install
npm start
```

## 操作方法

- タイトルバーを**ドラッグ**してウィンドウ移動
- 冒険シーンを**クリック**で応援（クールダウン5秒）
- **ボタン**: 休憩 / 冒険 / 装備
- **システムトレイ**: 右クリックで表示/非表示/終了
- **メニュー（左上）**: セーブデータリセット

## 技術スタック

- Electron（フレームレス透明ウィンドウ）
- 純粋CSSピクセルアート（box-shadow技法）
- バニラJavaScript（フレームワーク不使用）
- localStorage によるセーブ

## License

MIT
