import * as fs from 'fs/promises';
import { dialog } from 'electron';
import path from 'path';
import mime from 'mime-types';

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
  // Create destination filepath
  const extname = path.extname(fileToCopy);
  const dest = workingDirectory + '/' + copyFileName + "" + extname;
  
  // Copy the file to the current working directory
  try {
    await fs.copyFile(fileToCopy, dest);
    console.log('Copied', fileToCopy, 'to', dest);
  } catch (error) {
    console.error('Unable to copy file', fileToCopy, 'to', dest, ':', error);
    throw error;
  }
}

/**
  * Get the media file path to a media file from the user.
  */
export async function getMediaFilePath() {
  try {
    // Prompt the user to select a file
    const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile']});
    const filePath = filePaths[0];
    console.log("Got the file:", filePath);
    return filePath;
  } catch (error) {
    console.error('Error getting file location:', error);
    throw error;
  }
}

/** Get the base name of media file given the filepath to the file. 
 */
export async function getBaseMediaName(filepath) {
  try {
    return await path.basename(filepath);
  } catch (error) {
    console.error('Could not get base name from media file:', error);
  }
}

/** Get the data path from a given media file
 */
export async function getMediaData(filepath) {
  try {
    const mimetype = mime.lookup(filepath) || 'application/octet-stream';
    const fileBuffer = await fs.readFile(filepath);
    const dataString = fileBuffer.toString('base64');
    return `data:${mimetype};base64,${dataString}`
  } catch (error) {
    console.error('Could not create data path from file:', error);
    throw error;
  }
}

/**
  * Get the path to a family vine directory from the user.
  */
export async function getDirectoryPath() {
  try {
    // Prompt user to select a directory
    const { filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    const folderPath = filePaths[0]
    console.log("Got the directory:", folderPath);
    return folderPath
  } catch (error) {
    console.error('Error getting directory path:', error);
  }
}

/**
  * Create a new directory based on a given filepath
  * @param {String} - The file path of the new directory.
  */
export async function createNewDirectory(folderPath) {
  try {
    await fs.mkdir(folderPath);
  } catch (error) {
    console.error("Could not create directory:", error);
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

