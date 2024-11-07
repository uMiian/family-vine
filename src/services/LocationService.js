import { getDatabaseModels } from './DatabaseService.js';

/** Create a location given a location name.
  * @param {String} locationName- The name of the location.
  * @return the new person's entry.
  */
export async function createLocation(locationName) {
  try {
    // Get the Location model from database service
    const { Location } = await getDatabaseModels();

    // Check to see if this location already exists
    const existingLocation = await Location.findOne({
      where: { name: locationName }
    });
    if (existingLocation) {
      throw new Error("This location already exists in the database!");
    }
    
    // Create new person
    const newLocation = await Location.create({ locationName });
    console.log("New location created succesfully:", newLocation.toJSON());
    return newLocation;
  } catch (error) {
    console.error("Could not create new entry for location:", error);
    throw error;
  }
}

/**
  * Get all the locations in the current database.
  * @return all of the locations from the database.
  */
export async function getAllLocations() {
  // Get the Location model from the database service.
  const { Location } = await getDatabaseModels();

  try {
    // Try getting all people from the database.
    return await Location.findAll(); 
  } catch(error) {
    console.error("Could not fetch all locations from the database:", error);
    throw error;
  }
}

/**
  * Get a location with a specific id.
  * @param {Number} id  - The id of the location in the database.
  * @return the location with a specific id.
  */
export async function getLocationByID(id) {
  try {
    const { Location } = await getDatabaseModels();

    const locationWithID = await Location.findByPk(id);

    if (locationWithID == null) {
      throw Error("Could not find a location with id", id);
    }

    return locationWithID;
  } catch(error) {
    console.error("Error getting a location with a specific id:", error);
    throw error
  }
}
