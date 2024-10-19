import * as fs from 'fs/promises';
import { dialog } from 'electron';

let workingDirectory = null;

/**
  * Set the working directory given a folder location.
  * @param {String} folderPath - The path to a folder location.
  */
export async function setWorkingDirectory(folderPath) {
  try {
    // Ensure that the folder exists
    await fs.access(folderPath);

    // Set the working directory
    workingDirectory = folderPath;
    console.log('Set working directory to', folderPath);
  } catch (error) {
    console.error('Could not set working directory', error);
    throw error;
  }
}

/**
  * Get the current working directory.
  */
export async function getWorkingDirectory() {
  if (!workingDirectory) {
    throw new Error('There is no current working directory.');
  }

  return workingDirectory;
}

/**
  * Save a file to the working directory.
  * @param {String} filepath - The path to the file that you wish to safe.
  * @param {String} copyFileName - the new name of the copied file.
  */
export async function saveFileToWorkingDirectory(fileToCopy, copyFileName) {
  try {
    const dest = workingDirectory + '/' + copyFileName;
    await fs.copyFile(fileToCopy, dest);
    console.log('Copied', fileToCopy, 'to', dest);
  } catch (error) {
    console.error('Unable to copy file', fileToCopy, 'to', dest, ':', error);
    throw error;
  }
}

/**
  * Get a filepath from the user.
  */
export async function getFileLocation() {
  try {
    // Prompt the user to select a file
    const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile']});
    console.log("Got the file:", filePaths);
    return filePaths;
  } catch (error) {
    console.error('Error getting file location:', error);
    throw error;
  }
}

/**
  * Delete a file from the working directory.
  * @param {String} fileName - The name of the file to delete in the folder.
  */
export async function removeFileFromWorkingDirectory(fileName) {
  try {
    const path = workingDirectory + '/' + fileName;
    console.log(path)
    await fs.rm(path);
    console.log('Removed', path, 'from', workingDirectory);
  } catch (error) {
    console.error('Could not remove', fileName, 'from', workingDirectory);
    throw error;
  }
}

