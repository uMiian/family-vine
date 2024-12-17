import { Sequelize, DataTypes } from 'sequelize';
import { defineMedia }  from './media.js';
import { definePerson } from './person.js';
import { defineLocation }  from './location.js';

// Given a database filepath, load the model instances.
// NOTE: If the connection does not exist, it will create a new sqlite db file.
export async function loadModels(dbFilepath) {

  // Connect to the database (or create it if it doesn't exist)
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: dbFilepath
  })

  // Make sure the connection is ok
  try {
    await sequelizeInstance.authenticate();
  } catch (error) {
    throw Error('Unable to authenticate database connection:', error);
  }

  // Define all of the models
  const models = {
    Media: defineMedia(sequelizeInstance, DataTypes),
    Person: definePerson(sequelizeInstance, DataTypes),
    Location: defineLocation(sequelizeInstance, DataTypes)
  }

  // TODO: Load the relationships between the models

  // Sync the models with the database
  try {
    await sequelizeInstance.sync({ alter: true })
  } catch (error) {
    throw Error('Could not synchronize models with database:', error);
  }

  return models;
}

loadModels("./example.db");
