import dbService from '@services/DatabaseService.js';
import wdService from '@services/WorkingDirectoryService.js';

export function setupDirectoryHandlers(ipcMain) {
  /** FAMILY VINE LOAD, CREATE, DELETE */
  // Create Family Vine Folder
  ipcMain.on('create-family-vine', async (event, folderpath) => {
    // Try to create and set a new working directory
    try {
      await wdService.createWorkingDirectory(folderpath);
    } catch (error) {
      throw error;
    }

    // Try to create and connect a database in the new folder
    const dbFilepath = `${folderpath}/database.db`;
    try {
      await dbService.createAndConnectToDb(dbFilepath);
    } catch (error) {
      throw error;
    }
  });

  // Load Family Vine Folder
  ipcMain.handle('load-family-vine', async (event, folderpath) => {
    // Try to set the working directory
    try {
      await wdService.setWorkingDirectory(folderpath);
    } catch (error) {
      throw error;
    }

    // Try to connect to a database in a family vine folder
    const dbFilepath = `${folderpath}/database.db`;
    try {
      await dbService.connectToDb(dbFilepath);
    } catch (error) {
      throw error;
    }
  });
  
  // Disconnect from Family Vine Folder
  ipcMain.handle('disconnect-family-vine', async (event) => {
    // Try to set no working directory
    try {
      await wdService.setNoWorkingDirectory(folderpath);
    } catch (error) {
      throw error;
    }

    // Try to connect to a database in a family vine folder
    const dbFilepath = `${folderpath}/database.db`;
    try {
      await dbService.disconnectToDb(dbFilepath);
    } catch (error) {
      throw error;
    }
  });

  // Remove Family Vine Folder
  ipcMain.on('remove-family-vine', async (event, folderpath) => {
    // Try to delete the database
    const dbFilepath = `${folderpath}/database.db`;
    try {
      await dbService.deleteDb(dbFilepath);
    } catch (error) {
      throw error;
    }

    // Try to delete folder
    try {
      await wdService.removeDirectory(folderpath);
    } catch (error) {
      throw error;
    }
  });
  
  /** MEDIA LOAD, CREATE, UPDATE, DELETE */
  // Create Media

  // Load Media

  // Update Media

  // Delete Media
}
