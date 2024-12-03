import { ipcMain } from 'electron';
import { setWorkingDirectory, getWorkingDirectory, getMediaFilePath, saveFileToWorkingDirectory, removeFileFromWorkingDirectory, getBaseMediaName, getMediaData } from '../services/WorkingDirectoryService';

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

  ipcMain.handle('get-media-file-path', async (context) => {
    try {
      return await getMediaFilePath();
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('get-base-media-name', async (context, filepath) => {
    try {
      return await getBaseMediaName(filepath)
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('get-media-data', async (context, filepath) => {
    try {
      return await getMediaData(filepath);
    } catch (error) {
      throw error;
    }
  });

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

