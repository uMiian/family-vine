import * as fs from 'fs/promises';

// The current instance of the database
let dbInstance = null;

// Given a database filepath connect to an already existing database.
async function connectToDb(dbFilepath) {
  // Check to see if db exists

  // Try to connect to db
  
  // Set the new instance
}


// Given a database filepath, create and connect to a database
async function createAndConnectToDb(dbFilpath) {
  // Ensure there is not already a db with that name

  // Try to create and connect to db

  // Set the new instance
}

// Disconnect from a database
async function disconnectFromDb() {
  // End the db connection
  
  // Set db instance to null

}

// Given a database filepath, delete the database
async function deleteDb(dbFilepath) {
  // Check that the db exists

}

// Get database instance
async function getDbInstance() {
  // Ensure there is currently a db instance
  
  // Return the db instance

}
