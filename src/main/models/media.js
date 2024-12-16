// Given a sequelize instance and DataTypes, initialize the media model
export function createMedia(sequelize, DataTypes) {
  const Media = sequelize.define('Media', {
    // Define model attributes
    filepath: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    }
  })
}
