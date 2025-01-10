import { definePerson } from '@models/person.js';
import { DataTypes } from 'sequelize';

jest.mock('sequelize');

test('definePerson', () => {
  const mockSequelizeInstance = {
    define: jest.fn(),
  };

  // Define location model
  definePerson(mockSequelizeInstance, DataTypes)
})
