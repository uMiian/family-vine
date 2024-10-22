import { ipcMain } from 'electron';
import { connectToDatabase, disconnectFromDatabase, createNewDatabase } from '../services/DatabaseService';

export function createDatabaseHandlers() {

  ipcMain.handle('connect-to-database', async (context, dbPath) => {
    try {
      await connectToDatabase(dbPath);
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('disconnect-from-database', async (context) => {
    try {
      await disconnectFromDatabase();
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('create-new-database', async (context, newDbPath) => {
    try {
      await createNewDatabase(newDbPath);
    } catch (error) {
      throw error;
    }
  });
}
