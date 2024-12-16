import { Sequelize, DataTypes } from 'sequelize';
import { createMedia }  from 'Media.js';
import { createPerson }  from 'Person.js';
import { createLocation }  from 'Location.js';

// Given a database filepath, load the model instances.
// NOTE: If the connection does not exist, it will create a new sqlite db file.
export async function loadModels(dbFilepath) {

  // Connect to the database (or create it if it doesn't exist)
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: 'dbFilePath'
  })

  // Load all of the models
  const models = {
    Media: createMedia(sequelizeInstance),
    Person: createPerson(sequelizeInstance),
    Location: createLocation(sequelizeInstance)
  }

  // TODO: Load the relationships between the models

  return models;
}
