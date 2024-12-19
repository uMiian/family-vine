import * as fs from 'fs/promises';
import * as path from 'path';

let workingDirectory = null;

// Create and set a new working directory given a folderpath
export async function createWorkingDirectory(folderpath) {
  // Ensure there is not already a folder at the given path
  try {
    await fs.access(folderpath);
    throw new Error(`Folder already exists at ${folderpath}`);
  } catch (error) {
    // Don't raise an error if it is a 'file does not exist error'
    // raise all other errors
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  // Try to create a new folder
  try {
    await fs.mkdir(folderpath);
  } catch (error) {
    throw Error(`Could not create folder at ${folderpath}: ${error}`);
  }

  // Set the working directory to the newly created folder
  workingDirectory = folderpath;
}

export async function removeWorkingDirectory(folderpath) {
  // Make sure that the file to be removed is not the current working directory
  if (folderpath.replace(/\/$/, '') === workingDirectory) {
    throw new Error('Cannot remove current working directory');
  }

  // Make sure that the directory exists
  try {
    await fs.access(folderpath);
  } catch (error) {
    throw new Error(`Cannot access folder at ${folderpath}: ${error}`);
  }

  // Try to remove the folder
  try {
    await fs.rm(folderpath, { recursive: true, force: true });
  } catch (error) {
    throw new Error(`Could not remove folder or all of its contents at ${folderpath}: ${error}`);
  }
}

// Set the working directory to the given folderpath
export async function setWorkingDirectory(folderpath) {
  // Make sure that the folder exists
  try {
    await fs.access(folderpath);
  } catch (error) {
    throw Error(`Could not find folder at ${folderpath}`);
  }

  // Set working directory to folderpath
  // remove the trailing '/' if it has one
  workingDirectory = folderpath.replace(/\/$/, '');
}

// Set the working directory to null (or nothing)
export async function setNoWorkingDirectory() {
  workingDirectory = null;
}

// Get the working directory 
export async function getWorkingDirectory() {
  // Make sure there is a working directory to begin with
  if (!workingDirectory) {
    throw new Error('There is no set working directory');
  }
  return workingDirectory;
}

// Copy a file into the working directory 
// given the filepath to the file to be copied and its new name in the working directory
// NOTE: the new file name is expected to include the extension
export async function copyFileIntoWorkingDirectory(srcFilepath, newFileName) {
  // Make sure there is a working directory to begin with
  if (!workingDirectory) {
    throw new Error('There is no set working directory');
  }

  // Make sure that file to be copied exists
  try {
    await fs.access(srcFilepath);
  } catch (error) {
    throw new Error(`Could not access file to be copied ${srcFilepath}: ${error}`);
  }

  // Make sure that the new name of the file contains an extension
  if (!path.extname(newFileName)) {
    throw new Error(`The new name of the file ${newFileName} does not contain the file extension`);
  }
  
  // Try to copy the file
  const destFilepath = workingDirectory + '/' + newFileName;
  try {
    await fs.copyFile(srcFilepath, destFilepath);
  } catch (error) {
    throw new Error(`Could not copy file ${srcFilepath} to ${destFilepath}: ${error}`);
  }
}

// Remove a file from the working directory given the name of the file
// NOTE: the file name is expected to include the extension
export async function removeFileFromWorkingDirectory(fileName) {
  // Make sure there is a working directory to begin with
  if (!workingDirectory) {
    throw new Error('There is no set working directory');
  }

  // Make sure that file to be remove exists
  const filepath = workingDirectory + '/' + fileName;
  try {
    await fs.access(filepath);
  } catch (error) {
    throw new Error(`Could not access file to be removed ${filepath}: ${error}`);
  }

  // Try to remove the file
  try {
    await fs.rm(filepath);
  } catch (error) {
    throw new Error(`Could not remove file at ${filepath}: ${error}`);
  }
}

