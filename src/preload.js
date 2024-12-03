const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Functions for loading/creating family vine folders
  loadFamilyVine: async () => {
    await ipcRenderer.invoke('load-family-vine');
  },
  createFamilyVine: async (familyVineName) => {
    await ipcRenderer.invoke('create-family-vine', familyVineName);
  },

  // Functions for interacting with files on machine
  getMediaFilePath: async () => {
    return await ipcRenderer.invoke('get-media-file-path');
  },
  getBaseMediaName: async (filepath) => {
    return await ipcRenderer.invoke('get-base-media-name', filepath);
  },
  getMediaData: async (filepath) => {
    return await ipcRenderer.invoke('get-media-data', filepath);
  },

  // Functions for interacting with people in database
  createPerson: async (firstName, lastName) => {
    return await ipcRenderer.invoke('create-person', firstName, lastName);
  },
  getAllPeople: async () => {
    return await ipcRenderer.invoke('get-all-people');
  },
  getPersonByID: async (id) => {
    return await ipcRenderer.invoke('get-person-by-id', id);
  },

  // Functions for interacting with locations in database
  createLocation: async (locationName) => {
    return await ipcRenderer.invoke('create-location', locationName);
  },
  getAllLocations: async () => {
    return await ipcRenderer.invoke('get-all-locations');
  },
  getLocationByID: async (id) => {
    return await ipcRenderer.invoke('get-location-by-id', id);
  },

  // Functions for interacting with media in database
  createMedia: async (filepath, description, personIds, locationId, dateCreated) => {
    return await ipcRenderer.invoke('create-media', filepath, description, personIds, locationId, dateCreated);
  },
  getAllMedia: async () => {
    return await ipcRenderer.invoke('get-all-media');
  },
  getMediaByID: async (id) => {
    return await ipcRenderer.invoke('get-media-by-id', id);
  }
});
