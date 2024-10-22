import DataTypes from 'sequelize';

// A function to create a new Person model from a sequelize instance
export default (sequelize) => {
  const Person = sequelize.define('Person', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Person;
};
