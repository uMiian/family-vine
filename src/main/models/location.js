// Given a sequelize instance and DataTypes, define the location model
export function defineLocation(sequelize, DataTypes) {
  const location = sequelize.define('Location', {
    // Define model attributes
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  })
  return location;
}
