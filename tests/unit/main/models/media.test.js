import { defineMedia } from '@models/media.js';
import { DataTypes } from 'sequelize';

jest.mock('sequelize');

test('defineMedia', () => {
  const mockSequelizeInstance = {
    define: jest.fn(),
  };

  // Define location model
  defineMedia(mockSequelizeInstance, DataTypes)
})
