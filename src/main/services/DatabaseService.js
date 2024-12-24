import * as fs from 'fs/promises';
import { createDbInstance } from '../models';

// The current instance of the database
let dbInstance = null;
let currentDbFilepath = null;

// Given a database filepath connect to an already existing database.
export async function connectToDb(dbFilepath) {
  // Check to see if db exists
  try {
    await fs.access(dbFilepath);
  } catch (error) {
    throw new Error(`Could not find database at ${dbFilepath}: ${error}`);
  }

  // Try to connect to db
  try {
    dbInstance = await createDbInstance(dbFilepath);
    currentDbFilepath = dbFilepath;
  } catch (error) {
    throw new Error(`Could not connect to database at ${dbFilepath}: ${error}`);
  }
}


// Given a database filepath, create and connect to a database
export async function createAndConnectToDb(dbFilepath) {
  // Ensure there is not already a db with that name
  try {
    await fs.access(dbFilepath);
    throw new Error(`Database already exists at ${dbFilepath}`);
  } catch (error) {
    // Don't raise an error if it is a 'file does not exist error'
    // raise all other errors
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  // Try to create and connect to db
  try {
    dbInstance = await createDbInstance(dbFilepath);
    currentDbFilepath = dbFilepath;
  } catch (error) {
    throw new Error(`Could not create and connect to database at ${dbFilepath}: ${error}`);
  }
}

// Disconnect from a database
export async function disconnectFromDb() {
  if (!dbInstance & !currentDbFilepath) {
    throw new Error('There is no database instance');
  }

  // Try to end the db connection
  try {
    await dbInstance.close();
  } catch (error) {
    throw new Error(`There was a problem closing the database connection: ${error}`);
  }
  
  // Set db instance to null
  dbInstance = null;
  currentDbFilepath = null;
}

// Given a database filepath, delete the database
export async function deleteDb(dbFilepath) {
  
  // Check to make sure db exists
  try {
    await fs.access(dbFilepath);
  } catch (error) {
    throw new Error(`Could not find database ${dbFilepath}: ${error}`);
  }

  // Ensure that the db to be deleted is the current connection
  if (dbFilepath == currentDbFilepath) {
    throw new Error(`Cannot delete database at ${dbFilepath} that is the current connection.`)
  }

  // Try to delete the file
  try {
    await fs.rm(dbFilepath);
  } catch(error) {
    throw new Error(`Could not delete database at ${dbFilepath}: ${error}`);
  }
}

// Get database instance
export async function getDbInstance() {
  // Ensure there is currently a db instance
  if (!dbInstance & !currentDbFilepath) {
    throw new Error('There is no database instance');
  }
  
  // Return the db instance
  return dbInstance;
}

