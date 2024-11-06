import { ipcMain } from 'electron';
import { createLocation, getAllLocations, getLocationByID } from '../services/LocationService.js';

export async function createLocationHandlers() {
  // Handle creating a new location
  ipcMain.handle('create-location', async (context, locationName) => {
    try {
      return await createLocation(locationName);
    } catch (error) {
      throw error;
    }
  });
  
  // Handle getting all locations 
  ipcMain.handle('get-all-locations', async (context) => {
    try {
      return await getAllLocations();
    } catch (error) {
      throw error;
    }
  })

  // Handle getting a location with a specific id
  ipcMain.handle('get-location-by-id', async (context, id) => {
    try {
      return getLocationByID(id);
    } catch (error) {
      throw error;
    }
  })
}
