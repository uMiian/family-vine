import { ipcMain } from 'electron';
import { setWorkingDirectory, getDirectoryPath, createNewDirectory } from '../services/WorkingDirectoryService.js';
import { connectToDatabase, createNewDatabase } from '../services/DatabaseService.js';

export function createFamilyVineHandlers() {
  // Handle loading a new Family Vine
  ipcMain.handle('load-family-vine', async (context) => {
    try {
      // Get a family vine folder
      const folderPath = await getDirectoryPath();

      // Throw error if user did not select directory
      if (folderPath == null) {
        throw new Error("User did not select a family vine!");
      }
      
      // Make the folder the new working directory
      await setWorkingDirectory(folderPath);

      // Connect to the database in the folder
      const dbFilePath = folderPath + "/database.db";
      await connectToDatabase(dbFilePath);
    } catch (error) {
      throw error;
    }
  });

  // Handle creating a new family vine
  ipcMain.handle('create-family-vine', async (context, familyVineName) => {
    try {
      // Make sure we are given a family vine name
      if (familyVineName == '') {
        throw new Error("No name was given for the new family vine!");
      }
      
      // Get the location of the new family vine 
      const creationDirectory = await getDirectoryPath();
      if (creationDirectory == null) {
        throw new Error("User did not select a place to make the family vine!");
      }
      
      // Create the new family vine folder
      const familyVinePath = creationDirectory + '/'+ familyVineName;
      await createNewDirectory(familyVinePath);
      
      // Make the folder the new working directory
      await setWorkingDirectory(familyVinePath);

      // Create and connect to the database based on the folder path
      const dbFilePath = familyVinePath + "/database.db";
      await createNewDatabase(dbFilePath);
    } catch (error) {
      throw error;
    }
  });
}
