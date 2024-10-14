import * as fs from 'fs/promises';

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
  * Save a file to the folder path.
  * @param {String} filepath - The path to the file that you wish to safe
  */
export async function saveFile(filepath) {
  try {
    await fs.copyFile(filepath, workingDirectory);
  } catch (error) {
    console.error('Error copying file:', error);
  }
}

/**
  * Get a filepath from the user.
  */
export async function getFile() {
  //TODO: Call file dialog and return result.
}

/**
  * Delete a file in the folder path.
  * @param {String} fileName - The name of the file to delete in the folder.
  */
export async function removeFile(fileName) {

}

