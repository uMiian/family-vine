import { Sequelize, DataTypes } from 'sequelize';
import { createDbInstance } from '@models/index.js';
import { defineMedia } from '@models/media.js';
import { definePerson } from '@models/person.js';
import { defineLocation } from '@models/location.js';
import { defineRelationships } from '@models/relationships.js';

// Mock Sequelize and model definition imports
jest.mock('sequelize');
jest.mock('@models/media.js');
jest.mock('@models/person.js');
jest.mock('@models/location.js');
jest.mock('@models/relationships.js');

// Start Testing
describe('createDbInstance...', () => {
  let mockSequelizeInstance;

  beforeEach(() => {
    // Set up mock sequelize instance
    mockSequelizeInstance = {
      authenticate: jest.fn(),
      define: jest.fn(),
      sync: jest.fn(),
      models: 'models array',
    }
    // Sequelize constructor returns mock sequelize instance
    Sequelize.mockImplementation(() => mockSequelizeInstance);
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creating a database instance without errors',  async () => {
    const dbFilepath = 'path/to/database.db';
    // Mock an instance where authentication and synchronization on database succeed
    mockSequelizeInstance.authenticate.mockResolvedValue();
    mockSequelizeInstance.sync.mockResolvedValue();

    // Expect createDbInstance to return the new sequelize instance
    expect(await createDbInstance(dbFilepath)).toBe(mockSequelizeInstance);

    // Ensure Sequelize constructor was called with proper arguments
    expect(Sequelize).toHaveBeenCalledWith({
      dialect: 'sqlite',
      storage: dbFilepath,
      logging: expect.any(Boolean)
    })
    // Expect authenticate to have been called once
    expect(mockSequelizeInstance.authenticate).toHaveBeenCalledTimes(1);
    
    // Expect model definition functions to have been called
    expect(defineMedia).toHaveBeenCalledTimes(1);
    expect(defineMedia).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(defineLocation).toHaveBeenCalledTimes(1);
    expect(defineLocation).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(definePerson).toHaveBeenCalledTimes(1);
    expect(definePerson).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(defineRelationships).toHaveBeenCalledTimes(1);
    expect(defineRelationships).toHaveBeenCalledWith(mockSequelizeInstance.models, DataTypes);

    // Expect sync to have been called once
    expect(mockSequelizeInstance.sync).toHaveBeenCalledTimes(1);
  });

  test('creating a database instance with an authentication error', async () => {
    const dbFilepath = 'path/to/database.db';
    // Mock an error when sequelize tries to authenticate the connection
    mockSequelizeInstance.authenticate.mockRejectedValue();

    await expect(createDbInstance(dbFilepath)).rejects.toThrow('Unable to authenticate database connection:');

    // Ensure Sequelize constructor was called with proper arguments
    expect(Sequelize).toHaveBeenCalledWith({
      dialect: 'sqlite',
      storage: dbFilepath,
      logging: expect.any(Boolean)
    })
    
    // Expect authenticate to have been called once
    expect(mockSequelizeInstance.authenticate).toHaveBeenCalledTimes(1);
    
    // Expect model definition functions to not have been called
    expect(defineMedia).toHaveBeenCalledTimes(0);
    expect(defineLocation).toHaveBeenCalledTimes(0);
    expect(definePerson).toHaveBeenCalledTimes(0);
    expect(defineRelationships).toHaveBeenCalledTimes(0);

    // Expect sync to not have been called
    expect(mockSequelizeInstance.sync).toHaveBeenCalledTimes(0);
  });

  test('creating a database instance with a synchronization error', async () => {
    const dbFilepath = 'path/to/database.db';
    // Mock a success on authentication with the database
    mockSequelizeInstance.authenticate.mockResolvedValue();
    // Mock an error when synchronizing the tables for the database fails and throws an error
    mockSequelizeInstance.sync.mockRejectedValue();

    await expect(createDbInstance(dbFilepath)).rejects.toThrow('Could not synchronize models with database:');

    // Ensure Sequelize constructor was called with proper arguments
    expect(Sequelize).toHaveBeenCalledWith({
      dialect: 'sqlite',
      storage: dbFilepath,
      logging: expect.any(Boolean)
    })
    
    // Expect authenticate to have been called once
    expect(mockSequelizeInstance.authenticate).toHaveBeenCalledTimes(1);
    //
    // Expect model definition functions to have been called
    expect(defineMedia).toHaveBeenCalledTimes(1);
    expect(defineMedia).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(defineLocation).toHaveBeenCalledTimes(1);
    expect(defineLocation).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(definePerson).toHaveBeenCalledTimes(1);
    expect(definePerson).toHaveBeenCalledWith(mockSequelizeInstance, DataTypes);

    expect(defineRelationships).toHaveBeenCalledTimes(1);
    expect(defineRelationships).toHaveBeenCalledWith(mockSequelizeInstance.models, DataTypes);


    // Expect sync to not have been called
    expect(mockSequelizeInstance.sync).toHaveBeenCalledTimes(1);
  });
})
