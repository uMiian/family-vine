import DataTypes from 'sequelize';

// A function to create a new Location model from a sequelize instance
export default (sequelize) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,

    },
  });
  return Location;
};
