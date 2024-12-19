import * as workingDirectoryService from '../../../src/main/services/WorkingDirectoryService.js';
import * as fs from 'fs/promises';

beforeAll(async () => {
  // Create a test file for copying into working directory
  try {
    await fs.writeFile(__dirname + '/test.txt', 'This is the contents of the test file!');
  } catch (error) {
    throw Error(`Trouble creating test file:`, error);
  }
})

afterAll(async () => {
  // Make sure that any test directory is deleted
  try {
    await fs.rm(__dirname + '/test/', { recursive: true, force: true });
  } catch (error) {
    console.error(`Could not remove database: ${error}`)
  }

  // Make sure the test file is deleted
  try {
    await fs.rm(__dirname + '/test.txt');
  } catch (error) {
    console.error(`Could not remove test file: ${error}`)
  }
})

describe('Creating working directory...', () => {
  test('Test creating a new working directory', async () => {
    const test_dir = __dirname + '/test';
    // Succeed if new directory is made
    await workingDirectoryService.createWorkingDirectory(test_dir);

    // Succeed if working directory is changed
    expect(await workingDirectoryService.getWorkingDirectory()).toBe(test_dir);
  });

  test('Test creating a new directory that already exists', async () => {
    const test_dir = __dirname + '/test';

    try {
      // Faile if service succeeds in making new directory when one already exists with the same name
      await workingDirectoryService.createWorkingDirectory(test_dir);
    } catch (error) {
      expect(error.message).toMatch('Folder already exists');
    }
  });

  test('Test making the working directory null', async () => {
    // Succeed if the service can set the working directory to null
    await workingDirectoryService.setNoWorkingDirectory();

    try {
      // Fail if the function runs without an error
      await workingDirectoryService.setNoWorkingDirectory();
    } catch (error) {
      // Succeed if the function throws an error telling us there is no working directory
      expect(error.message).toMatch('There is no working directory');
    }
  });
});

describe('Setting the working directory...', () => {
  test('Test setting the working directory to a valid path', async () => {
    // Succeed if we can change the working directory
    await workingDirectoryService.setWorkingDirectory(__dirname + '/test');
    expect(await workingDirectoryService.getWorkingDirectory()).toBe(__dirname + '/test');
  });

  test('Test setting the working directory to an invalid path', async () => {
    try {
      // Fail if the function is able to set the working directory without error
      await workingDirectoryService.setWorkingDirectory(__dirname + '/non-existent');
    } catch (error) {
      // Succeed if the function throws an error saying it couldn't find the folder
      expect(error.message).toMatch('Could not find folder');
    }
  });
});

describe('Copying files from the working directory...', () => {
  test('Test copying a non-existent file to the working directory', async () => {
    try {
      // Fail if the function is able to copy a non-existent file
      await workingDirectoryService.copyFileIntoWorkingDirectory(__dirname + '/non-existent.txt', 'non-existent.txt');
    } catch(error) {
      // Succeed if the function throws an error telling us the file does not exist
      expect(error.message).toMatch('Could not access file to be copied');
    }
  });

  test('Test copying an existing file but whose new name does not contain an file extension into working directory', async () => {
    try {
      // Fail if the function can copy the file using a new name without a file extension
      await workingDirectoryService.copyFileIntoWorkingDirectory(__dirname + '/test.txt', 'test');
    } catch (error) {
      // Succeed if the function tells us that the new name must have a file extension
      expect(error.message).toMatch('does not contain the file extension');
    }
  });

  test('Test copying an existing file to the working directory when there is a working directory', async () => {
    // Succeed if the function can successfully copy a file into the working directory
    await workingDirectoryService.copyFileIntoWorkingDirectory(__dirname + '/test.txt', 'test.txt');

    // Succeed if the file does actually exist in the working directory
    await fs.access(__dirname + '/test/test.txt')
  });
  
  test('Test copying a file to the working directory when there is no working directory', async () => {
    // Set the working directory to null
    await workingDirectoryService.setNoWorkingDirectory();
    
    try {
      // Fail if we can copy a file when the working directory is not set
      await workingDirectoryService.copyFileIntoWorkingDirectory(__dirname + '/test.txt', 'test2.txt');
    } catch (error) {
      // Succeed if the function throws an error telling us that the working directory is not set 
      expect(error.message).toBe('There is no set working directory');
    }
  });
});

describe('Removing files from the working directory...', () => {
  test('Test removing a file from the working directory when there is no working directory', async () => {
    try {
      // Fail if we can remove a file when the working directory is not set
      await workingDirectoryService.removeFileFromWorkingDirectory('test1.txt');
    } catch (error) {
      // Succeed if the function throws an error telling us that the working directory is not set 
      expect(error.message).toBe('There is no set working directory');
    }
  });
  test('Test removing a non-existent file from the working directory', async () => {
    // Set the working directory back to the test directory
    await workingDirectoryService.setWorkingDirectory(__dirname + '/test');
    try {
      // Fail if we can remove a file that does not exist in the working directory
      await workingDirectoryService.removeFileFromWorkingDirectory('non-existent.txt');
    } catch (error) {
      // Succeed if the function throws an error telling us that the file cannot be found/accessed
      expect(error.message).toMatch('Could not access file to be removed');
    }
  });

  test('Test removing a existing file from the working directory', async () => {
    // Succeed if the function can succesfully remove a file from the working directory
    await workingDirectoryService.removeFileFromWorkingDirectory('test.txt');
    
    try {
      // Fail if test file copied into the working directory exists
      await fs.access(__dirname + '/test/test.txt');
    } catch (error) {
      // Succeed if the test file cannot be found
      expect(error.message).toMatch('ENOENT');
    }
  });
})

describe('Removing the working directory...', () => {
  test('Test removing a non-existent directory', async () => {
    try {
      // Fail if the function is able to remove a non-existent directory
      await workingDirectoryService.removeWorkingDirectory(__dirname + '/non-existent/');
    } catch (error) {
      // Succeed if the function gives us an error telling us it cannot find/access the folder
      expect(error.message).toMatch('Cannot access folder');
    }
  });
  test('Test removing the currently working directory', async () => {
    try {
      // Fail if the function is able to remove the current working directory
      await workingDirectoryService.removeWorkingDirectory(__dirname + '/test/');
    } catch (error) {
      // Succeed if the function gives us an error telling us it cannot remove the current working directory
      expect(error.message).toMatch('Cannot remove current working directory');
    }
  });
  test('Test removing an existing directory', async () => {
    // Set the working directory to be none
    await workingDirectoryService.setNoWorkingDirectory()

    // Succeed if we can remove the working directory used for testing
    await workingDirectoryService.removeWorkingDirectory(__dirname + '/test');
  });
})
