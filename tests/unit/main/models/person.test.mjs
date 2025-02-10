import { Sequelize, DataTypes } from 'sequelize';
import { definePerson } from '@models/person.js';

describe('Person Model', () => {
  let sequelize;
  let Person;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false }); // Create mock or in-memory SQLite database
    Person = definePerson(sequelize, DataTypes);
    await sequelize.sync(); // Sync the database (creates tables)
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });

  test('Person model should be defined', () => {
    expect(Person).toBeDefined();
  });

  test('Should create a Person successfully', async () => {
    const person = await Person.create({ name: 'John Doe' });

    expect(person).toBeDefined();
    expect(person.name).toBe('John Doe');
  });

  test('Should enforce unique constraint on name', async () => {
    await Person.create({ name: 'Jane Doe' });

    await expect(Person.create({ name: 'Jane Doe' })).rejects.toThrow();
  });

  test('Should not allow null value for name', async () => {
    await expect(Person.create({ name: null })).rejects.toThrow();
  });
});
