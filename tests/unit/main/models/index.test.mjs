import { Sequelize, DataTypes } from 'sequelize';
import { createDbInstance } from '@models/index.js';
import { jest } from '@jest/globals';

describe('createDbInstance', () => {
  test('creates a database instance without errors', async () => {
    await expect(createDbInstance(':memory:')).resolves.toBeInstanceOf(Sequelize);
  });

  test('fails to authenticate database connection', async () => {
    jest.spyOn(Sequelize.prototype, 'authenticate').mockRejectedValue(new Error('Authentication failed'));
    
    await expect(createDbInstance(':memory:')).rejects.toThrow('Unable to authenticate database connection: Authentication failed');
    jest.restoreAllMocks();
  });

  test('fails to synchronize models with database', async () => {
    jest.spyOn(Sequelize.prototype, 'sync').mockRejectedValue(new Error('Sync failed'));
    
    await expect(createDbInstance(':memory:')).rejects.toThrow('Could not synchronize models with database: Sync failed');
    jest.restoreAllMocks();
  });
});