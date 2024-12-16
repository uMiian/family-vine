// Given a sequelize instance and DataTypes, initialize the person model
export function createPerson(sequelize, DataTypes) {
  const Person = sequelize.define('Person', {
    // Define model attributes
    firstName: {
      DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    lastName: {
      DataTypes.STRING,
      primaryKey:true,
      allowNull: true,
    }
  })
}
