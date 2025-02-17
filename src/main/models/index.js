import { Sequelize, DataTypes } from 'sequelize';
import { defineMedia }  from './media.js';
import { definePerson } from './person.js';
import { defineRelationships } from './relationships.js';

// Check if we are in testing
const isTest = process.env.NODE_ENV === 'test';

// Given a database filepath, connect to a database, define the models, and return the sequelize instance
// NOTE: If the connection does not exist, it will create a new sqlite db file.
export async function createDbInstance(dbFilepath) {
  // Connect to the database (or create it if it doesn't exist)
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    // If we are testing, store db in memory and disable logging
    storage: isTest ? ':memory:' : dbFilepath,
    logging: isTest ? false : console.log,
  })

  // Make sure the connection is ok
  try {
    await sequelizeInstance.authenticate();
  } catch (error) {
    throw new Error(`Unable to authenticate database connection: ${error.message}`);
  }

  // Define the models
  defineMedia(sequelizeInstance, DataTypes);
  definePerson(sequelizeInstance, DataTypes);

  // Define relationships between the models
  defineRelationships(sequelizeInstance.models, DataTypes);

  // Sync the models with the database
  try {
    await sequelizeInstance.sync();
  } catch (error) {
    throw Error(`Could not synchronize models with database: ${error.message}`);
  }

  // Return the defined models
  return sequelizeInstance;
}
