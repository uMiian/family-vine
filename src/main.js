const { app, BrowserWindow, ipcMain, dialog } = require('electron');
import { createDatabaseHandlers } from './handlers/DatabaseHandlers';
import { createWorkingDirectoryHandlers } from './handlers/WorkingDirectoryHandlers'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Load all handlers
  createDatabaseHandlers();
  createWorkingDirectoryHandlers();


  // Creat the new window!
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Load all handlers
//app.whenReady().then(() => {
//})


// COMMENTED OUT TO WORK ON DATABASE SERVICE AND HANDLERS
//app.whenReady().then(() => {
//  ipcMain.handle('Media::createMedia', createMedia);
//  ipcMain.handle('Media::getMedia', getMedia);
//  ipcMain.handle('Media::deleteMedia', deleteMedia);
//  ipcMain.handle('Media::updateMedia', updateMedia);
//});
//
//// Handle IPC Messages
//async function createMedia() {
//  const { canceled, filePaths } = await dialog.showOpenDialog() 
//  console.log(canceled)
//  console.log(filePaths)
//  if (!canceled) {
//    await Media.create({filepath: filePaths[0]})
//  }
//}
//
//
//async function deleteMedia(event, id) {
//  const result = await Media.destroy({ where: { id } });
//  return result > 0;  // returns true if any row was deleted
//}
//
//async function updateMedia(event, id, updates) {
//  const result = await Media.update(updates, { where: { id } });
//  return result[0] > 0;  // returns true if any row was updated
//}
//
//async function getMedia(event, filters = {}) {
//  try { 
//      const options = {
//          where: {},
//          order: [['createdAt', 'DESC']]  // Example of ordering the results
//      };
//
//      // Construct the query conditions based on filters
//      if (filters.description) {
//          options.where.description = {
//              [Sequelize.Op.like]: `%${filters.description}%`
//          };
//      }
//
//      if (filters.when) {
//          options.where.when = filters.when;
//      }
//
//      if (filters.filepath) {
//          options.where.filepath = {
//              [Sequelize.Op.like]: `%${filters.filepath}%`
//          };
//      }
//
//      // Retrieve filtered media entries
//      const mediaEntries = await Media.findAll(options);
//      return mediaEntries;
//  } catch (error) {
//      console.error('Failed to retrieve media:', error);
//      throw error;  // Re-throw the error to handle it in the renderer process if needed
//  }
//}
