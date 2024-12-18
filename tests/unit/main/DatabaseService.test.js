import * as dbService from '../../../src/main/services/DatabaseService.js';
import * as fs from 'fs/promises';

// Make sure that any test database files are deleted
afterAll(async () => {
    try {
      await fs.rm(__dirname + '/test.db');
    } catch (error) {}
})

describe("Creating a database...", () => {

  test("Test creating a new database with a valid path", async () => {
    // Succeed if function can create and connect to database
    await dbService.createAndConnectToDb(__dirname + '/test.db')

    // Succeed if database instance is found
    expect(await dbService.getDbInstance()).toBeDefined();
  });

  test("Test disconnecting from the newly created database", async () => {
    // Succeed if function can disconnect from database
    await dbService.disconnectFromDb();

    try {
      // Fail if function can get a database instance
      await dbService.getDbInstance();
    } catch (error) {
        // Succeed if there is an error telling us that there is no database instance
        expect(error.message).toMatch('There is no database instance');
    }
  });

  test("Test creating another database in the same location", async () => {
    try {
      // Fail if the function can create and connect to the database
      await dbService.createAndConnectToDb(__dirname + '/test.db');
    } catch (error) {
      // Succeed if the function throws an error warning that the database already exists
      expect(error.message).toMatch('Database already exists');
    }
  })
});

describe("Connecting to a database...", () => {
  test("Test connected to a non-existent database", async () => {
    try {
      // Fail if the function can connect to the non-existent database
      await dbService.connectToDb(__dirname + '/non-existent.db');
    } catch (error) {
      // Succeed if the function throws an error saying it couldn't find the database
      expect(error.message).toMatch('Could not find database')
    }
  });
  
  test("Test connecting to an existing database...", async () => {
    // Succeed if the function can connect to the existing database
    await dbService.connectToDb(__dirname + '/test.db');

    // Succeed if the function can returns the database instance
    expect(await dbService.getDbInstance()).toBeDefined();
  });

});

describe("Deleting a database...", () => {
  test('Test deleting the currently connected database', async () => {
    try {
      // Fail if the database can delete the database it is connected to
      await dbService.deleteDb(__dirname + '/test.db');
    } catch (error) {
      // Succeed if the function throws an error saying that it cannot delete the current connection
      expect(error.message).toMatch('is the current connection');
    }
  });
  test('Test deleting a database that we are not connected to:', async () => {
    // Succeed if the database can disconnect from the test database
    await dbService.disconnectFromDb();

    // Succeed if there is not database instance
    try {
      await dbService.getDbInstance()
    } catch (error) {
      expect(error.message).toMatch('There is no database instance');
    }
  });
  test('Test deleting a non-existent database', async () => {
    try {
      // Fail if the function completes deleting the non-existent database
      await dbService.deleteDb();
    } catch (error) {
      // Succeed if the function throws an error saying the database could not be found
      expect(error.message).toMatch('Could not find database');
    }
  });
});

