import { ipcMain } from 'electron';
import { setWorkingDirectory, getWorkingDirectory } from '../services/WorkingDirectoryService';

export function createWorkingDirectoryHandlers() {
  ipcMain.handle('set-working-directory', async (context, folderPath) => {
    try {
      await setWorkingDirectory(folderPath);
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('get-working-directory', async (context) => {
    try {
      return await getWorkingDirectory();
    } catch (error) {
      throw error;
    }
  })

}


