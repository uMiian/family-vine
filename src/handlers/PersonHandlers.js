import { ipcMain } from 'electron';
import { createPerson, getAllPeople, getPersonByID } from '../services/PersonService.js';

export async function createPersonHandlers() {
  // Handle creating a new person
  ipcMain.handle('create-person', async (context, firstName, lastName) => {
    try {
      return await createPerson(firstName, lastName);
    } catch (error) {
      throw error;
    }
  });
  
  // Handle getting all people
  ipcMain.handle('get-all-people', async (context) => {
    try {
      return await getAllPeople();
    } catch (error) {
      throw error;
    }
  })

  // Handle getting a person with a specific id
  ipcMain.handle('get-person-by-id', async (context, id) => {
    try {
      console.log("NIODCNSACL ", id);
      return getPersonByID(id);
    } catch (error) {
      throw error;
    }
  })
}
