const { app, BrowserWindow, Tray, Menu, screen, nativeImage } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

function createTrayIcon() {
  // Create a simple 16x16 tray icon using nativeImage
  const iconSize = 16;
  const canvas = nativeImage.createEmpty();
  // Use a simple colored square as tray icon
  const buf = Buffer.alloc(iconSize * iconSize * 4);
  for (let y = 0; y < iconSize; y++) {
    for (let x = 0; x < iconSize; x++) {
      const i = (y * iconSize + x) * 4;
      // Draw a sword-like icon shape
      const cx = iconSize / 2;
      const cy = iconSize / 2;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      if ((dx < 2 && dy < 6) || (dy < 2 && dx < 4 && y > cy)) {
        // Gold color for sword
        buf[i] = 0xff;     // R
        buf[i + 1] = 0xd7; // G
        buf[i + 2] = 0x00; // B
        buf[i + 3] = 0xff; // A
      } else if (dx + dy < 7) {
        // Dark purple background
        buf[i] = 0x2d;     // R
        buf[i + 1] = 0x1b; // G
        buf[i + 2] = 0x45; // B
        buf[i + 3] = 0xff; // A
      } else {
        // Transparent
        buf[i] = 0;
        buf[i + 1] = 0;
        buf[i + 2] = 0;
        buf[i + 3] = 0;
      }
    }
  }
  return nativeImage.createFromBuffer(buf, { width: iconSize, height: iconSize });
}

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 700,
    height: 450,
    x: screenWidth - 720,
    y: screenHeight - 470,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Mouse pass-through for transparent areas
  mainWindow.setIgnoreMouseEvents(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  const icon = createTrayIcon();
  tray = new Tray(icon);
  tray.setToolTip('卓上冒険物語：放置ほっこりタイム');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '表示/非表示',
      click: () => {
        if (mainWindow) {
          if (mainWindow.isVisible()) {
            mainWindow.hide();
          } else {
            mainWindow.show();
          }
        }
      }
    },
    { type: 'separator' },
    {
      label: '終了',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  // Keep running in tray on all platforms
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
