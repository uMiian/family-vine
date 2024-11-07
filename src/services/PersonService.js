import { getDatabaseModels } from './DatabaseService.js';

/** Create a person given a first and last name in the current database.
  * @param {String} firstName - The first name of the person
  * @param {String} lastName - The last nameof the person
  * @return the new person's entry
  */
export async function createPerson(firstName, lastName) {
  try {
    // Get the Person model from database service
    const { Person } = await getDatabaseModels();

    // Check to see if this person already exists
    const existingPerson = await Person.findOne({
      where: { firstName, lastName }
    });
    if (existingPerson) {
      throw new Error("This person already exists in the database!");
    }
    
    // Create new person
    const newPerson = await Person.create({firstName, lastName});
    console.log("New person created succesfully:", newPerson.toJSON());
    return newPerson;
  } catch (error) {
    console.error("Could not create new entry for person:", error);
    throw error;
  }
}

/**
  * Get all the people in the current database
  */
export async function getAllPeople() {
  // Get the Person model from the database service.
  const { Person } = await getDatabaseModels();

  try {
    // Try getting all people from the database.
    return await Person.findAll(); 
  } catch(error) {
    console.error("Could not fetch all people from the database:", error);
    throw error;
  }
}

/**
  * Get a person with a specific id
  * @param {Number} id  - The id of the person in the database.
  */
export async function getPersonByID(id) {
  try {
    const { Person } = await getDatabaseModels();

    const personWithID = await Person.findByPk(id);

    if (personWithID == null) {
      throw Error("Could not find anyone with id", id);
    }

    return personWithID;
  } catch(error) {
    console.error("Error getting a person with a specific id:", error);
    throw error
  }
}
