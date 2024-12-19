// Given a sequelize instance and DataTypes, define the location model
export function defineLocation(sequelize, DataTypes) {
  const location = sequelize.define('Location', {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqe: true,
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
