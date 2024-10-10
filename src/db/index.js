// Import model constructors
import MediaModel from './models/media.model'
import PersonModel from './models/person.model'
import LocationModel from './models/location.model'

// Given a sequelize instance (new or not), load the models
// NOTE: If the database is empty, it will initiate the database
const initializeModels = (sequelize) => {
  const models = {
    Media: MediaModel(sequelize),
    Person: PersonModel(sequelize),
    Location: LocationModel(sequelize),
  };

  // Create relationships between models
  models.Person.belongsToMany(models.Media, {through: 'MediaPerson', foreignKey: 'personId'});
  models.Media.belongsToMany(models.Person, {through: 'MediaPerson', foreignKey: 'mediaId'});
  models.Media.belongsTo(models.Location, { foreignKey: 'locationId'});
  models.Location.hasMany(models.Media, { foreignKey: 'locationId'});
  
  // Alter tables in database to match models
  // or create them if they aren't there
  try {
    sequelize.sync({alter: true});
    console.log("Database and tables created!");
  } catch (error) {
    throw error;
  }

  return models;
}

export { initializeModels }
