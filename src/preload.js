const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loadFamilyVine: async () => {
    await ipcRenderer.invoke('load-family-vine');
  },
  createFamilyVine: async (familyVineName) => {
    await ipcRenderer.invoke('create-family-vine', familyVineName);
  },

  createPerson: async (firstName, lastName) => {
    return await ipcRenderer.invoke('create-person', firstName, lastName);
  },
  getAllPeople: async () => {
    return await ipcRenderer.invoke('get-all-people');
  },
  getPersonByID: async (id) => {
    return await ipcRenderer.invoke('get-person-by-id', id);
  }
});
