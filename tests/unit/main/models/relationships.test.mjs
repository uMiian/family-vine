import { defineRelationships } from '@models/relationships.js';
import { Sequelize, DataTypes } from 'sequelize';

// Initialize an in-memory database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define mock models
sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

sequelize.define('Person', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Media = sequelize.models.Media;
const Person = sequelize.models.Person;

// Apply relationships
defineRelationships({ Media, Person }, DataTypes);

describe('Sequelize Relationships', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Media and Person have many-to-many relationship through MediaContainsPerson', async () => {
    const media = await Media.create();
    const person = await Person.create();
    await media.addPerson(person); // Testing association
    const peopleInMedia = await media.getPeople();

    expect(peopleInMedia.length).toBe(1);
    expect(peopleInMedia[0].id).toBe(person.id);
  });

  test('Media and Person have many-to-many relationship through MediaCapturedByPerson', async () => {
    const media = await Media.create();
    const person = await Person.create();
    await media.addPerson(person, { through: 'MediaCapturedByPerson' });
    const capturedBy = await media.getPeople({ through: 'MediaCapturedByPerson' });

    expect(capturedBy.length).toBe(1);
    expect(capturedBy[0].id).toBe(person.id);
  });
});
