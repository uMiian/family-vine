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
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    what_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    why_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileType: {
      type: DataTypes.TEXT,
    }
  }, {
    // Create a unique index on media file type
    indexes: [
      {
        unique: false,
        fields: ['fileType', 'location'],
      }]
  })
}
