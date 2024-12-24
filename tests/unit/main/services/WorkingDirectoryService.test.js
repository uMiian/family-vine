import * as wdService from '@services/WorkingDirectoryService.js';
import * as fs from 'fs/promises';
import path from 'path';

// Mock modules
jest.mock('fs/promises')

describe('createWorkingDirectory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('Creating and setting the working directory with no errors', async () => {
    const folderpath = 'path/to/non-existent-directory';
    // Mock not being able to find a folder in the same location
    fs.access.mockImplementation(() => {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    });

    // Mock succesfully making the folder
    fs.mkdir.mockResolvedValue();

    // Create and set working directory
    await wdService.createWorkingDirectory(folderpath);
    
    // Make sure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(folderpath);

    expect(fs.mkdir).toHaveBeenCalledTimes(1);
    expect(fs.mkdir).toHaveBeenCalledWith(folderpath);

    // Ensure working directory was set to folder path
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    
    // Set the working directory to be nothing
    await wdService.setNoWorkingDirectory();
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory')
  });

  test('creating and setting working directory when directory already exists', async () => {
    const folderpath = 'path/to/existent-directory';
    // Mock being able to find a folder in the same location
    fs.access.mockResolvedValue()

    // Create and set working directory
    await expect(wdService.createWorkingDirectory(folderpath)).rejects.toThrow(`Folder already exists at ${folderpath}`);

    // Make sure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(folderpath);

    expect(fs.mkdir).toHaveBeenCalledTimes(0);

    // Make sure working directory is null
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory')
  });

  test('creating and setting working directory when directory cannot be made', async () => {
    const folderpath = 'path/to/existent-directory';
    
    // Mock not being able to find a folder in the same location
    fs.access.mockImplementation(() => {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    });

    // Mock making a directory not working
    fs.mkdir.mockRejectedValue();

    // Create and set working directory
    await expect(wdService.createWorkingDirectory(folderpath)).rejects.toThrow(`Could not create folder at ${folderpath}:`);

    // Make sure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(folderpath);

    expect(fs.mkdir).toHaveBeenCalledTimes(1);
    expect(fs.mkdir).toHaveBeenCalledWith(folderpath);
    // Make sure working directory is null
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory')
  });
})

describe('removeWorkingDirectory...', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('removing a directory without any errors', async () => {
    const folderpath = 'path/to/existent-directory';

    // Mock the directory existing
    fs.access.mockResolvedValue();

    // Mock being able to remove the directory
    fs.rm.mockResolvedValue();

    // Remove a directory
    await wdService.removeDirectory(folderpath);

    // Make sure functions were called as expected
    expect(fs.access).toBeCalledTimes(1);
    expect(fs.access).toBeCalledWith(folderpath);

    expect(fs.rm).toBeCalledTimes(1);
    expect(fs.rm).toBeCalledWith(folderpath, { recursive: true, force: true });
  });

  test('removing a directory when the folder does not exist', async () => {
    const folderpath = 'path/to/nonexistent-directory';

    // Mock the directory not existing
    fs.access.mockRejectedValue();

    // Remove a directory
    await expect(wdService.removeDirectory(folderpath)).rejects.toThrow(`Cannot access folder at ${folderpath}:`);

    // Make sure functions were called as expected
    expect(fs.access).toBeCalledTimes(1);
    expect(fs.access).toBeCalledWith(folderpath);

    expect(fs.rm).toBeCalledTimes(0);
  });

  test('removing a directory when the folder cannot be successfully be removed', async () => {
    const folderpath = 'path/to/nonexistent-directory';

    // Mock the directory existing
    fs.access.mockResolvedValue();

    // Mock not being able to remove the directory
    fs.rm.mockRejectedValue();

    // Remove a directory
    await expect(wdService.removeDirectory(folderpath)).rejects.toThrow(`Could not remove folder or all of its contents at ${folderpath}:`);

    // Make sure functions were called as expected
    expect(fs.access).toBeCalledTimes(1);
    expect(fs.access).toBeCalledWith(folderpath);

    expect(fs.rm).toBeCalledTimes(1);
    expect(fs.rm).toBeCalledWith(folderpath, { recursive: true, force: true });
  });

  test('removing the current working directory', async () => {
    const folderpath = 'path/to/existing-folder';
    // Connect to a directory with no errors
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);

    // Remove the current working directory
    await expect(wdService.removeDirectory(folderpath)).rejects.toThrow('Cannot remove current working directory');

    // Set the working directory to nothing
    await wdService.setNoWorkingDirectory();
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });
});

describe('setWorkingDirectory...', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setting the working directory without any errors', async () => {
    const folderpath = 'path/to/existent-directory';

    // Mock being able to find the directory
    fs.access.mockResolvedValue();

    // Set working directory
    await wdService.setWorkingDirectory(folderpath);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(folderpath);

    // Ensure value was set properly
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath.replace(/\/$/, ''));

    // Set the working directory to be nothing
    await wdService.setNoWorkingDirectory();
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test('setting the working directory when the folder does not exist', async () => {
    const folderpath = 'path/to/nonexistent-folder';
    // Mock not being able to find the folder
    fs.access.mockRejectedValue();

    // Set the working directory
    await expect(wdService.setWorkingDirectory(folderpath)).rejects.toThrow(`Could not find folder at ${folderpath}`);
    
    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(folderpath);

    // Ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });
});

describe('setNoWorkingDirectory...', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('set no working directory without any errors', async () => {
    const folderpath = 'path/to/existing-folder';

    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    
    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test('set no working directory when there is already no working directory', async () => {
    await expect(wdService.setNoWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });
});

describe('copyFileIntoWorkingDirectory...', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('copying a file into the working directory without any errors', async () => {
    const folderpath = 'path/to/existing-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const srcFilepath = 'src/file.txt';
    const newFileName = 'file.txt';
    const newFileLocation = `${folderpath}/${newFileName}`

    // Mock being able to find the file to be copied
    fs.access.mockResolvedValue();

    // Mock being able to copy the file successfully
    fs.copyFile.mockResolvedValue();

    // Copy a file to the working directory
    await wdService.copyFileIntoWorkingDirectory(srcFilepath, newFileName);
    
    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(srcFilepath);

    expect(fs.copyFile).toHaveBeenCalledTimes(1);
    expect(fs.copyFile).toHaveBeenCalledWith(srcFilepath, newFileLocation);
    
    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test('copying a file into the working directory when there is no working directory', async () => {
    const folderpath = 'path/to/non-existent-folder';
    const srcFilepath = 'src/file.txt';
    const newFileName = 'file.txt';
    const newFileLocation = `${folderpath}/${newFileName}`
    
    // Copy a file to the working directory
    await expect(wdService.copyFileIntoWorkingDirectory(srcFilepath, newFileName)).rejects.toThrow('There is no set working directory');

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(0);
    expect(fs.copyFile).toHaveBeenCalledTimes(0);
  });

  test('copying a file into the working directory when the file cannot be accessed', async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const srcFilepath = 'src/file.txt';
    const newFileName = 'file.txt';
    const newFileLocation = `${folderpath}/${newFileName}`
    
    // Mock not being able to access the source file
    fs.access.mockRejectedValue();

    // Copy a file to the working directory
    await expect(wdService.copyFileIntoWorkingDirectory(srcFilepath, newFileName)).rejects.toThrow(`Could not access file to be copied ${srcFilepath}:`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(srcFilepath);

    expect(fs.copyFile).toHaveBeenCalledTimes(0);

    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test("copying a file into the working directory when the file's new name does not have an extension", async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const srcFilepath = 'src/file.txt';
    const newFileName = 'file';
    const newFileLocation = `${folderpath}/${newFileName}`
    
    // Mock being able to access the source file
    fs.access.mockResolvedValue();

    // Copy a file to the working directory
    await expect(wdService.copyFileIntoWorkingDirectory(srcFilepath, newFileName)).rejects.toThrow(`The new name of the file ${newFileName} does not contain the file extension`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(srcFilepath);

    expect(fs.copyFile).toHaveBeenCalledTimes(0);

    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test("copying a file into the working directory when the file cannot be copied properly", async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const srcFilepath = 'src/file.txt';
    const newFileName = 'file.txt';
    const newFileLocation = `${folderpath}/${newFileName}`
    
    // Mock being able to access the source file
    fs.access.mockResolvedValue();

    // Mock not being able to copy the file
    fs.copyFile.mockRejectedValue();

    // Copy a file to the working directory
    await expect(wdService.copyFileIntoWorkingDirectory(srcFilepath, newFileName)).rejects.toThrow(`Could not copy file ${srcFilepath} to ${newFileLocation}`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(srcFilepath);

    expect(fs.copyFile).toHaveBeenCalledTimes(1);
    expect(fs.copyFile).toHaveBeenCalledWith(srcFilepath, newFileLocation);

    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });
});

describe('removeFileFromWorkingDirectory...', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('removing a file without errors', async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const fileToRemove = 'remove-me.txt';
    const pathToFileToBeRemoved = `${folderpath}/${fileToRemove}`;

    // Mock being able to find the file
    fs.access.mockResolvedValue();

    // Mock being able to remove the file
    fs.rm.mockResolvedValue();

    // Remove the file
    await wdService.removeFileFromWorkingDirectory(fileToRemove);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(pathToFileToBeRemoved);

    expect(fs.rm).toHaveBeenCalledTimes(1);
    expect(fs.rm).toHaveBeenCalledWith(pathToFileToBeRemoved);
    
    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test('removing a file when there is no set working directory', async () => {
    const fileToRemove = 'remove-me.txt';
    await expect(wdService.removeFileFromWorkingDirectory(fileToRemove)).rejects.toThrow('There is no set working directory');
  });

  test('removing a file when the file cannot be found', async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const fileToRemove = 'remove-me.txt';
    const pathToFileToBeRemoved = `${folderpath}/${fileToRemove}`;

    // Mock not being able to find the file
    fs.access.mockRejectedValue();

    // Remove the file
    await expect(wdService.removeFileFromWorkingDirectory(fileToRemove)).rejects.toThrow(`Could not access file to be removed ${pathToFileToBeRemoved}:`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(pathToFileToBeRemoved);

    expect(fs.rm).toHaveBeenCalledTimes(0);
    
    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });

  test('removing a file when the file cannot be removed', async () => {
    const folderpath = 'path/to/non-existent-folder';
    // Connect to a directory with no errors
    fs.access.mockResolvedValue();
    await wdService.setWorkingDirectory(folderpath);
    await expect(wdService.getWorkingDirectory()).resolves.toBe(folderpath);
    fs.access.mockClear();

    const fileToRemove = 'remove-me.txt';
    const pathToFileToBeRemoved = `${folderpath}/${fileToRemove}`;

    // Mock not being able to find the file
    fs.access.mockResolvedValue();

    // Mock not being able to remove the file
    fs.rm.mockRejectedValue();

    // Remove the file
    await expect(wdService.removeFileFromWorkingDirectory(fileToRemove)).rejects.toThrow(`Could not remove file at ${pathToFileToBeRemoved}:`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(pathToFileToBeRemoved);

    expect(fs.rm).toHaveBeenCalledTimes(1);
    expect(fs.rm).toHaveBeenCalledWith(pathToFileToBeRemoved);
    
    // set no working directory
    await wdService.setNoWorkingDirectory();
    
    // ensure there is no working directory
    await expect(wdService.getWorkingDirectory()).rejects.toThrow('There is no set working directory');
  });
})
