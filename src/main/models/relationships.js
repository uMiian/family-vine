// Given the defined models and some DataTypes, create the relationships between them
export function defineRelationships(models, DataTypes) {
  // Unpack the models involved in relationships
  const { Media, Person } = models;

  // Many people can be in a media
  Media.belongsToMany(Person, { through: 'MediaContainsPerson'});
  Person.belongsToMany(Media, { through: 'MediaContainsPerson'});
  
  // Many people can have captured a media
  Media.belongsToMany(Person, { through: 'MediaCapturedByPerson'});
  Person.belongsToMany(Media, { through: 'MediaCapturedByPerson'});
  
}

