const { contextBridge } = require('electron');

// Expose minimal API to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  close: () => {
    window.close();
  },
  minimize: () => {
    // We handle minimize by hiding the window
    const { ipcRenderer } = require('electron');
  }
});
