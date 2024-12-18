import { Sequelize, DataTypes } from 'sequelize';
import { defineMedia }  from './media.js';
import { definePerson } from './person.js';
import { defineLocation }  from './location.js';
import { defineRelationships } from './relationships.js';

// Check if we are in testing
const isTest = process.env.NODE_ENV === 'test';

// Given a database filepath, connect to a database, define the models, and return the sequelize instance
// NOTE: If the connection does not exist, it will create a new sqlite db file.
export async function createDbInstance(dbFilepath) {

  // Connect to the database (or create it if it doesn't exist)
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: dbFilepath,

    // If we are testing, disable logging
    logging: isTest ? false : console.log,
  })

  // Make sure the connection is ok
  try {
    await sequelizeInstance.authenticate();
  } catch (error) {
    throw Error('Unable to authenticate database connection:', error);
  }

  // Define the models
  defineMedia(sequelizeInstance, DataTypes);
  defineLocation(sequelizeInstance, DataTypes);
  definePerson(sequelizeInstance, DataTypes);
  

  // Define relationships between the models
  defineRelationships(sequelizeInstance.models, DataTypes);

  // Sync the models with the database
  try {
    await sequelizeInstance.sync();
  } catch (error) {
    throw Error('Could not synchronize models with database:', error);
  }

  // Return the defined models
  return sequelizeInstance;
}
