const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  connectToDatabase: async (dbPath) => {
    await ipcRenderer.invoke('connect-to-database', dbPath);
  },
  disconnectFromDatabase: async () => {
    await ipcRenderer.invoke('disconnect-from-database');
  },
  createNewDatabase: async (newDbPath) => {
    await ipcRenderer.invoke('create-new-database', newDbPath);
  }
});
