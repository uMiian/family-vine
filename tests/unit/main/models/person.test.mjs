import { Sequelize, DataTypes } from 'sequelize';
import { definePerson } from '@models/person.js';

describe('Person Model', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false }); // Create mock or in-memory SQLite database
    definePerson(sequelize, DataTypes);
    await sequelize.sync(); // Sync the database (creates tables)
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  test('Person model should be defined', () => {
    expect(sequelize.models.Person).toBeDefined();
  });

  test('Should create a Person successfully', async () => {
    const person = await sequelize.models.Person.create({ name: 'John Doe' });

    expect(person).toBeDefined();
    expect(person.name).toBe('John Doe');
  });

  test('Should enforce unique constraint on name', async () => {
    await sequelize.models.Person.create({ name: 'Jane Doe' });

    await expect(sequelize.models.Person.create({ name: 'Jane Doe' })).rejects.toThrow();
  });

  test('Should not allow null value for name', async () => {
    await expect(sequelize.models.Person.create({ name: null })).rejects.toThrow();
  });
});
