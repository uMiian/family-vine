import * as dbService from '@services/DatabaseService.js';


export function setupModelHandlers(ipcMain) {

  /** BASIC CRUD FUNCTIONS */
  async function modelFindAll(model) {
    try {
      return await model.findAll();
    } catch (error) {
      throw new Error(`There was a problem getting all instances of ${model.name}: ${error}`);
    }
  }

  async function modelGetById(model, id) {
    try {
      return await model.findByPk(id);
    } catch (error) {
      throw new Error(`There was a problem while looking for ${model.name} with ${id}: ${error}`);
    }
  }

  async function modelCreate(model, attributes) {
    try {
      return await model.create(attributes);
    } catch (error) {
      throw new Error(`There was a problem while creating an instance of ${model.name} with ${attributes}: ${error}`);
    }
  }

  async function modelDelete(model, attributes) {
    try {
      await model.destroy(attributes);
    } catch (error) {
      throw new Error(`There was a problem while deleting an instance of ${model.name} with ${attributes}: ${error}`);
    }
  }
  
  async function modelUpdate(model, newAttributes, searchAttributes) {
    try {
      await model.update(newAttributes, searchAttributes);
    } catch (error) {
      throw new Error(`There was a problem while updating an instance of ${model.name} with attributes ${searchAttributes} and new attributes ${newAttributes}: ${error}`);
    }
  }

  /** PERSON MODEL */
  // Find all people
  ipcMain.handle('get-all-people', async (event) => {
    // Try to get person model
    try {
      const { Person } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get all people in database
    try {
      return await modelFindAll(Person);
    } catch (error) {
      throw error;
    }
  });

  // Find a person by id
  ipcMain.handle('get-person-by-id', async (event, id) => {
    // Try to get person model
    try {
      const { Person } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get person by id
    try {
      const personWithId = await modelGetById(Person, id);
    } catch (error) {
      throw error;
    }

    // If nobody was found with that id, throw an error
    if (!personWithId) {
      throw new Error(`Could not find person with id: ${id}`);
    }
    return personWithId;
  });

  // Create a person
  ipcMain.handle('create-person', async (event, attributes) => {
    // Try to get person model
    try {
      const { Person } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to create the new person
    try {
      const newPerson = await modelCreate(Person, attributes);
    } catch (error) {
      throw error;
    }
    return newPerson;
  });

  // Delete a person
  ipcMain.handle('delete-person', async (event, attributes) => {
    // Try to get person model
    try {
      const { Person } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try deleting the person
    try {
      await modelDelete(Person, attributes);
    } catch (error) {
      throw error;
    }
  });
  
  // Update a person
  ipcMain.handle('update-person', async (event, searchAttributes, newAttributes) => {
    // Try to get person model
    try {
      const { Person } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to update person
    try {
      await modelUpdate(Person, searchAttributes, newAttributes);
    } catch (error) {
      throw error;
    }
  });
  
  /** LOCATION MODEL */

  // Find all locations
  ipcMain.handle('get-all-locations', async (event) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get all locations in database
    try {
      return await modelFindAll(Location);
    } catch (error) {
      throw error;
    }
  });

  // Find a location based on id
  ipcMain.handle('get-location-by-id', async (event, id) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get location by id
    try {
      const locationWithId = await modelGetById(Location, id);
    } catch (error) {
      throw error;
    }

    // If no location was found with that id, throw an error
    if (!locationWithId) {
      throw new Error(`Could not find location with id: ${id}`);
    }
    return locationWithId;
  });

  // Find a location based on name
  ipcMain.handle('get-location-by-name', async (event, locationName) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get location by name
    try {
      const locationWithName = await Location.findOne({ where: { name: locationName } })
    } catch (error) {
      throw error;
    }

    // If no location was found with the name, throw an error
    if (!locationWithId) {
      throw new Error(`Could not find location with name: ${locationName}`);
    }
    return locationWithId;
  });

  // Create a location
  ipcMain.handle('create-location', async (event, attributes) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to create the new location
    try {
      const newLocation = await modelCreate(Location, attributes);
    } catch (error) {
      throw error;
    }
    return newLocation;
  });

  // Delete a location
  ipcMain.handle('delete-location', async (event, attributes) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try deleting the location 
    try {
      await modelDelete(Location, attributes);
    } catch (error) {
      throw error;
    }
  });

  // Update a location
  ipcMain.handle('update-location', async (event, searchAttributes, newAttributes) => {
    // Try to get location model
    try {
      const { Location } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to update location 
    try {
      await modelUpdate(Location, searchAttributes, newAttributes);
    } catch (error) {
      throw error;
    }
  });

  /** MEDIA MODEL */

  // Find all media
  ipcMain.handle('get-all-media', async (event) => {
    // Try to get media model
    try {
      const { Media } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get all media in database
    try {
      return await modelFindAll(Media);
    } catch (error) {
      throw error;
    }
  });
  
  // Find a media based on its id
  ipcMain.handle('get-media-by-id', async (event, id) => {
    // Try to get media model
    try {
      const { Media } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to get media by id
    try {
      const mediaWithId = await modelGetById(Media, id);
    } catch (error) {
      throw error;
    }

    // If no media with the id was found, throw an error
    if (!mediaWithId) {
      throw new Error(`Could not find person with id: ${id}`);
    }
    return personWithId;
  });
  
  // Create a media
  ipcMain.handle('create-media', async (event, attributes) => {
    // Try to get media model
    try {
      const { Media } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to create the new media
    try {
      const newMedia = await modelCreate(Media, attributes);
    } catch (error) {
      throw error;
    }
    return newMedia;
  });

  // Update a media
  ipcMain.handle('update-media', async (event, searchAttributes, newAttributes) => {
    // Try to get person model
    try {
      const { Media } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try to update person
    try {
      await modelUpdate(Media, searchAttributes, newAttributes);
    } catch (error) {
      throw error;
    }
  });

  // Delete a media
  ipcMain.handle('delete-media', async (event, attributes) => {
    // Try to get person model
    try {
      const { Media } = await dbService.getDbInstance().models;
    } catch (error) {
      throw error;
    }

    // Try deleting the person
    try {
      await modelDelete(Person, attributes);
    } catch (error) {
      throw error;
    }
  });
}
