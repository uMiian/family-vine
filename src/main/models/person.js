// Given a sequelize instance and DataTypes, define the person model
export function definePerson(sequelize, DataTypes) {
  const person = sequelize.define('Person', {
    // Define model attributes
    firstName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: true
    }
  })
}
