import { getDatabaseModels } from './DatabaseService.js';

/** Create a media given the description of the media, who is in the media (person ids), where it was taken (location id), and when it was taken.
 * @param {String} description - A description of the media
 * @param {number[]} personIds - The ids of all people in the photo
 * @param {number} locationId - The location id of the place where the media was taken
 * @param {String} dateCreated - A date from when the media was made/taken
 *
 * @return the newly made media instance
 */
export async function createMedia(description, personIds, locationId, dateCreated) {
  try {
    // Get the media model from the database service
    const { Media }  = await getDatabaseModels();

    // Create new media
    const newMedia = await Media.create({ description: description, when: dateCreated, locationId: locationId })
    await newMedia.addPeople(personIds);
    console.log("New media created succesfully:", newMedia.toJSON());

    return newMedia;
  } catch (error) {
    console.error("Could not create new entry for media: ", error);
    throw error;
  }
}

/**
 * Get all the media in the current database.
 * @return all of the media in the database
 */
export async function getAllMedia() {
  try {
    // Get the media model
    const { Media } = await getDatabaseModels();
    return Media.findAll(); 
  } catch (error) {
    console.error("Could not get all the media in the database:", error);
    throw error;
  }
}


/**
 * Get a media with a specific id
 * @param {Number} id - The id of the media in the database.
 *
 * @return the media instance with the id
 */
export async function getMediaById(id) {
  try {

    // Get the media model
    const { Media } = await getDatabaseModels();
    const modelWithId = await Media.findByPk(id);

    if (modelWithId == null) {
      throw Error("Could not find a media with id", id);
    }
    return modelWithId;
  } catch (error) {
    console.error("Could not get the media with id:", id, ":", error);
    throw error;
  }
}
