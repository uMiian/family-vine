// Import model constructors
import MediaModel from './models/media.model';
import LocationModel from './models/location.model';
import PersonModel from './models/person.model';

/**
  * Given the sequelize instance, create the models and their relationshsips
  */
function createModels(sequelizeInstance) {
  const models = {
    Media: MediaModel(sequelizeInstance),
    Person: PersonModel(sequelizeInstance),
    Location: LocationModel(sequelizeInstance),
  }

  
  // Create relationships between models
  models.Person.belongsToMany(models.Media, {through: 'MediaPerson', foreignKey: 'personId'});
  models.Media.belongsToMany(models.Person, {through: 'MediaPerson', foreignKey: 'mediaId'});
  models.Media.belongsTo(models.Location, { foreignKey: 'locationId'});
  models.Location.hasMany(models.Media, { foreignKey: 'locationId'});
  
  return models;
}

export { createModels }
