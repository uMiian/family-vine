import * as dbService from '@services/DatabaseService.js';
import * as fs from 'fs/promises';
import { createDbInstance } from '@models/index.js';

// Mock fs and createDbInstance modules
jest.mock('fs/promises')
jest.mock('@models/index.js');

describe('connectToDb...', () => {
  let mockDbInstance;

  beforeEach(() => {
    mockDbInstance = {
      close: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('connecting and disconnecting from database when database file exists and connection is resolved', async () => {
    const dbFilepath = 'existing/database.db';
    
    // Mock the database file being found
    fs.access.mockResolvedValue();

    // Mock the connection being resolved
    createDbInstance.mockResolvedValue(mockDbInstance);

    // Connect to the database
    await dbService.connectToDb(dbFilepath);

    // Ensure that the mock db instance was set
    await expect(dbService.getDbInstance()).resolves.toBe(mockDbInstance);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(1);
    expect(createDbInstance).toHaveBeenCalledWith(dbFilepath);

    // Disconnect from the database
    await dbService.disconnectFromDb();

    // Ensure the database instance is now null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
    expect(mockDbInstance.close).toHaveBeenCalledTimes(1);
  });



  test('connecting to a database when the given database file does not exist', async () => {
    const dbFilepath = 'non-existing/database.db'

    // Mock not being able to find the database file
    fs.access.mockRejectedValue();

    // Connect to database
    await expect(dbService.connectToDb(dbFilepath)).rejects.toThrow('Could not find database at');

    // Ensure proper functions were called with expected arguements
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(0);

    // Ensure getting database instance raises an error
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });

  test('connecting to a database when an instance cannot be properly created', async () => {
    const dbFilepath = 'path/to/existing/database.db';

    // Mock being able to find database file
    fs.access.mockResolvedValue();

    // Mock not being able to create database instance
    createDbInstance.mockRejectedValue();

    // Connect to database
    await expect(dbService.connectToDb(dbFilepath)).rejects.toThrow('Could not connect to database at');
    
    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(1);
    expect(createDbInstance).toHaveBeenCalledWith(dbFilepath);

    // Ensure the database instance is now null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });
});

describe('createAndConnectToDb...', () => {
  let mockDbInstance;

  beforeEach(() => {
    mockDbInstance = {
      close: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creating and connecting to a database without any errors', async () => {
    const dbFilepath = 'non-existent/database.db';

    // Mock not being able to find a database file with the same name
    fs.access.mockImplementation(() => {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    });

    // Mock being able to connect and create database instance
    createDbInstance.mockResolvedValue(mockDbInstance);

    // Connect and create database instance
    await dbService.createAndConnectToDb(dbFilepath);

    // Ensure functions were called expected number of times with expected arguments
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(1);
    expect(createDbInstance).toHaveBeenCalledWith(dbFilepath);

    // Ensure database instance was set
    await expect(dbService.getDbInstance()).resolves.toBe(mockDbInstance);

    // Disconnect from the database instance
    await dbService.disconnectFromDb();

    // Ensure the database instance is now null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });

  test('creating and connecting to database when instance cannot be created', async () => {
    const dbFilepath = 'non-existent/database.db';

    // Mock not being able to find a database file with the same name
    fs.access.mockImplementation(() => {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    });


    // Mock not being able to create database instance
    createDbInstance.mockRejectedValue();

    // Connect to database
    await expect(dbService.createAndConnectToDb(dbFilepath)).rejects.toThrow('Could not create and connect to database at');
    
    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(1);
    expect(createDbInstance).toHaveBeenCalledWith(dbFilepath);

    // Ensure the database instance is now null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });

  test('creating and connecting to a database that already exists', async () => {
    const dbFilepath = 'existent/database.db';

    // Mock being able to find a database in the same location
    fs.access.mockResolvedValue();

    // Connect to database
    await expect(dbService.createAndConnectToDb(dbFilepath)).rejects.toThrow('Database already exists at');
    
    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(createDbInstance).toHaveBeenCalledTimes(0);

    // Ensure the database instance is now null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  })
});

describe('disconnectFromDb...', () => {
  let mockDbInstance;

  beforeEach(() => {
    mockDbInstance = {
      close: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('disconnecting from database when connection has been made', async () => {
    // Mock connecting to a database
    const dbFilepath = 'path/to/existing/database.db';
    fs.access.mockResolvedValue();
    createDbInstance.mockResolvedValue(mockDbInstance);
    await dbService.connectToDb(dbFilepath)

    // Disconnect from database
    mockDbInstance.close.mockResolvedValue();
    await dbService.disconnectFromDb();

    // Ensure database instance is null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });

  test('disconnecting from database when there is no prior connection', async () => {
    // Disconnecting should result in error
    await expect(dbService.disconnectFromDb()).rejects.toThrow('There is no database instance');
    
    // Ensure database instance is null
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });

  test('disconnecting from database when there is an error is closing the connection', async () => {
    // Mock connecting to a database
    const dbFilepath = 'path/to/existing/database.db';
    fs.access.mockResolvedValue();
    createDbInstance.mockResolvedValue(mockDbInstance);
    await dbService.connectToDb(dbFilepath)

    // Disconnect from database
    mockDbInstance.close.mockRejectedValue();
    await expect(dbService.disconnectFromDb()).rejects.toThrow('There was a problem closing the database connection');

    // Ensure database instance is null
    await expect(dbService.getDbInstance()).resolves.toBe(mockDbInstance);

    // Now actually disconnect from database
    mockDbInstance.close.mockResolvedValue();
    await dbService.disconnectFromDb();
    await expect(dbService.getDbInstance()).rejects.toThrow('There is no database instance');
  });
});

describe('deleteDb...', () => {
  let mockDbInstance;

  beforeEach(() => {
    mockDbInstance = {
      close: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deleting a database with no errors', async () => {
    const dbFilepath = 'existent/database.db';

    // Mock being able to find the database file
    fs.access.mockResolvedValue();
    
    // Mock being able to remove the datbase file
    fs.rm.mockResolvedValue();
    
    // Delete a database file
    await dbService.deleteDb(dbFilepath);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(fs.rm).toHaveBeenCalledTimes(1);
    expect(fs.rm).toHaveBeenCalledWith(dbFilepath);
  });

  test('deleting a database when the database file does not exist', async () => {
    const dbFilepath = 'non-existent/database.db';

    // Mock not being able to find the database
    fs.access.mockRejectedValue();
    
    // Delete a database file
    await expect(dbService.deleteDb(dbFilepath)).rejects.toThrow('Could not find database');

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(fs.rm).toHaveBeenCalledTimes(0);
  });

  test('deleting a database when the file errors while being removed', async () => {
    const dbFilepath = 'existent/database.db';

    // Mock being able to find the database
    fs.access.mockResolvedValue();

    // Mock not being able to remove the file
    fs.rm.mockRejectedValue();
    
    // Delete a database file
    await expect(dbService.deleteDb(dbFilepath)).rejects.toThrow('Could not delete database at');

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(1);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(fs.rm).toHaveBeenCalledTimes(1);
    expect(fs.rm).toHaveBeenCalledWith(dbFilepath);
  });

  test('deleting a database that is the currently connected database', async () => {
    // Mock connecting to a database
    const dbFilepath = 'path/to/existing/database.db';
    fs.access.mockResolvedValue();
    createDbInstance.mockResolvedValue(mockDbInstance);
    await dbService.connectToDb(dbFilepath)
    
    // Delete database
    await expect(dbService.deleteDb(dbFilepath)).rejects.toThrow(`Cannot delete database at ${dbFilepath} that is the current connection`);

    // Ensure functions were called as expected
    expect(fs.access).toHaveBeenCalledTimes(2);
    expect(fs.access).toHaveBeenCalledWith(dbFilepath);

    expect(fs.rm).toHaveBeenCalledTimes(0);
  });
});
