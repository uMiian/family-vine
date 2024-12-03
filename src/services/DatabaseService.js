import { Sequelize } from 'sequelize';
import { sqlite3 } from 'sqlite3';
import * as fs from 'fs/promises';
import { createModels } from '../db/modelRelationships'

let sequelizeInstance = null;
let models = null;

/**
  * Create a new sequelize instance given a filepath to a .db file.
  * @param {String} dbPath - The filepath to a database file.
  */
export async function connectToDatabase(dbPath) {
  try {
    // Make sure that the file exists
    await fs.access(dbPath);

    // If connection is already made, disconnect
    if (sequelizeInstance) {
      await sequelizeInstance.close();
      sequelizeInstance = null;
    }
    
    // Establish new connection
    sequelizeInstance = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
    })

    // Authenticate the connection
    await sequelizeInstance.authenticate();
    
    // Reinitialize models
    models = createModels(sequelizeInstance);
    sequelizeInstance.sync()
    
    console.log("Connected to database at ", dbPath)
  } catch (error) {
    console.error("Could not connect to database ", dbPath, ": ", error);
    throw error;
  }
}

/**
  * Create a new database given a file path to a .db file and connect to it.
  * @param {String} newDbPath - the filepath to the database file.
  */
export async function createNewDatabase(newDbPath) {
  try {
    // If connection is already made, disconnect
    if (sequelizeInstance) {
      await sequelizeInstance.close();
      sequelizeInstance = null;
    }

    // Establish new connection
    sequelizeInstance = new Sequelize({
      dialect: 'sqlite',
      storage: newDbPath,
      logging: false,
    })

    // Authenticate the connection
    await sequelizeInstance.authenticate();
    
    // Reinitialize models
    models = createModels(sequelizeInstance);
    
    sequelizeInstance.sync({ force: true});
    console.log("Created database at ", newDbPath)
    console.log("Connected to database at ", dbPath)
  } catch (error) {
    console.error("Could not connect to database ", newDbPath, ": ", error);
  }
}

/**
  * Get the sequelize instance for the current database connection.
  * @returns {Sequelize} the current sequelize instance.
  */
export async function getDatabaseSequelizeInstance() {
  if (!sequelizeInstance) {
    console.error('There is no database connection');
    throw new Error('There is no database connection.');
  }
  return sequelizeInstance;
}


/**
  * Get the current model instance from the database connection.
  * @returns {object} the current model instance.
  */
export async function getDatabaseModels() {
  if (!models) {
    console.error('There is no database connection');
    throw new Error('There is no database connection.');
  }
  return models;
}

/**
  * Close the current connection to the database, making the sequelize instance and models instance null.
  */
export async function disconnectFromDatabase() {
  // See if datbase connection has even been made.
  if (!sequelizeInstance) {
    console.error('There is no database connection to close.');
    throw new Error('There is no database connection to close.');
  }

  // Close database connection.
  await sequelizeInstance.close()
  sequelizeInstance = null;
  models = null;

  console.log("Disconnected from Database.");
}
