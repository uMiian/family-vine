// Given a sequelize instance and DataTypes, define the person model
export function definePerson(sequelize, DataTypes) {
  const person = sequelize.define('Person', {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    // Create a unique index on location name
    indexes: [
      {
        unique: true,
        fields: ['name'],
      }]
  })
}
