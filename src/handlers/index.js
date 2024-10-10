import { ipcMain } from 'electron';
import { IPC_HANDLERS } from './ipcConstants.js'
import {
  connectToDatabase
} from '../services/databaseService';
import { setupPersonHandlers } from './personHandlers.js';

// Function to set up database IPC handlers
export const setupHandlers = () => {
  // Handle when a connection is loaded/reloaded
  ipcMain.handle(IPC_HANDLERS.DATABASE_CONNECT, async (context, db_file_path) => {
    try {
      // Connect to the database
      const models = await connectToDatabase(db_file_path);

      // Load handlers based on new connection
      setupPersonHandlers(models);

    } catch (error) {
      console.error("Could not setup new handlers:", error);
    }
  });
}
