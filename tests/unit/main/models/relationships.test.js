import { defineRelationships } from '@models/relationships.js';
import { DataTypes } from 'sequelize';

jest.mock('sequelize');

test('defineRelationships', () => {
  const mockModels = {
    Media: {
      belongsTo: jest.fn(),
      belongsToMany: jest.fn(),
    },
    Location: {
      hasMany: jest.fn(),
    },
    Person: {
      belongsToMany: jest.fn(),
    },
  }

  defineRelationships(mockModels, DataTypes);
});
