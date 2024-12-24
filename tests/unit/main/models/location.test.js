import { defineLocation } from '@models/location.js';
import { DataTypes } from 'sequelize';

jest.mock('sequelize');

test('defineLocation', () => {
  const mockSequelizeInstance = {
    define: jest.fn(),
  };

  // Define location model
  defineLocation(mockSequelizeInstance, DataTypes)
})
