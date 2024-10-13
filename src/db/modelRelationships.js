/**
  * Given the database models, establish the proper relationships.
  */
const createRelationships = (models) => {
  
  // Create relationships between models
  models.Person.belongsToMany(models.Media, {through: 'MediaPerson', foreignKey: 'personId'});
  models.Media.belongsToMany(models.Person, {through: 'MediaPerson', foreignKey: 'mediaId'});
  models.Media.belongsTo(models.Location, { foreignKey: 'locationId'});
  models.Location.hasMany(models.Media, { foreignKey: 'locationId'});
  
  return models;
}

export { createRelationships }
