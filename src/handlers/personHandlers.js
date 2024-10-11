import { ipcMain } from 'electron';
import { IPC_HANDLERS } from './ipcConstants';

export const setupPersonHandlers = (models) => {
  // If handlers have already been made, remake them
  ipcMain.removeHandler(IPC_HANDLERS.PERSON_ADD);
  ipcMain.removeHandler(IPC_HANDLERS.PERSON_GET_ALL);

  // Handler to create new person
  ipcMain.handle(IPC_HANDLERS.PERSON_ADD, async (context, personData) => {
    try {
      const newPerson = await models.Person.create(personData);
      return newPerson;
    } catch (error) {
      console.error("Error adding person:", error);
    }
  });

  // Handler to get new people
  ipcMain.handle(IPC_HANDLERS.PERSON_GET_ALL, async (context) => {
    console.log("Getting all people from the database!")
    try {
      return models.Person.findAll();
    } catch (error) {
      console.error("Error getting all people:", error);
    }
  })

  // TODO: Handler to get specific person
  
  // TODO: Handler to delete person
}
