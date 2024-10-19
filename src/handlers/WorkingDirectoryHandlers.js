import { ipcMain } from 'electron';
import { setWorkingDirectory, getWorkingDirectory, getFileLocation, saveFileToWorkingDirectory, removeFileFromWorkingDirectory } from '../services/WorkingDirectoryService';

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
  });

  ipcMain.handle('get-file-location', async (context) => {
    try {
      return await getFileLocation();
    } catch (error) {
      throw error;
    }
  })

  ipcMain.handle('save-file-to-working-directory', async (context, fileToCopy) => {
    try {
      await saveFileToWorkingDirectory(fileToCopy, 'example.png');
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('remove-file-from-working-directory', async (context, fileName) => {
    try {
      console.log("Received:", fileName);
      await removeFileFromWorkingDirectory(fileName);
    } catch (error) {
      throw error;
    }
  });
}

