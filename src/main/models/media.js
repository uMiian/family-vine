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
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    what_description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    why_description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    fileType: {
      type: DataTypes.TEXT,
      defaultValue: ""
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
