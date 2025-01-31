// Given a sequelize instance and DataTypes, define the media model
export function defineMedia(sequelize, DataTypes) {
  const media = sequelize.define('Media', {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fileType: {
      type: DataTypes.TEXT,
    }
  })
}
