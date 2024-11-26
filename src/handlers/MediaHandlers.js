import { ipcMain } from 'electron';
import { createMedia, getAllMedia, getMediaById } from '../services/MediaService.js';
import { saveFileToWorkingDirectory } from '../services/WorkingDirectoryService.js';

export async function createMediaHandlers() {
  // Handle creating a new media
  ipcMain.handle('create-media', async (context, filepath, description, personIds, locationId, dateCreated) => {
    // Add the media to the database
    let newMedia
    try {
      newMedia = await createMedia(description, personIds, locationId, dateCreated);
    } catch (error) {
      throw error;
    }

    // Copy the media to the family vine folder 
    try {
      // Get the file extension
      await saveFileToWorkingDirectory(filepath, newMedia.id);
    } catch (error) {
      throw error;
    }

    return newMedia;
  })

  // Handle getting all media
  ipcMain.handle('get-all-media', async(context) => {
    try {
      return await getAllMedia();
    } catch (error) {
      throw error;
    }
  }) 
  
  // Handle getting all media
  ipcMain.handle('get-media-by-id', async(context, id) => {
    try {
      return await getMediaById(id);
    } catch (error) {
      throw error;
    }
  }) 

}
