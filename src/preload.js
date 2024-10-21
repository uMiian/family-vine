const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loadFamilyVine: async () => {
    await ipcRenderer.invoke('load-family-vine');
  },
  createFamilyVine: async (familyVineName) => {
    await ipcRenderer.invoke('create-family-vine', familyVineName);
  }
});
