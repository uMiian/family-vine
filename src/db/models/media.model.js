import DataTypes from 'sequelize';

// A function to create a new Media model from a sequelize instance
export default (sequelize) => {
  const Media = sequelize.define('Media', {
    description: {
      type: DataTypes.TEXT,
    },
    when: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Media;
};
