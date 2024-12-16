// Given a sequelize instance and DataTypes, initialize the location model
export function createlocation(sequelize, DataTypes) {
  const location = sequelize.define('Location', {
    // Define model attributes
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  })
}
