const { app } = require('electron');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './example.db',   // FIXME: This will eventually be dynamic
  logging: false,
})

/** Create models (i.e. tables)! */
const Person = sequelize.define('Person', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  }
})

const Location = sequelize.define('Location', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

const Media  = sequelize.define('Media', {
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
  },
})



/** Create relations between models */
const MediaPerson = sequelize.define('MediaPerson')

Media.belongsTo(Person); // A Media item belongs to one Person
Person.hasMany(Media);   // A Person can have taken multiple Media


Person.belongsToMany(Media, { through: MediaPerson }); // A Person can be associated with many Media
Media.belongsToMany(Person, { through: MediaPerson}); // A media can be associated with many Persons


// Sync the database (i.e. create the tables if not already made)
sequelize.sync({alter: true})
  .then(() => console.log("Database & tables created!"))
  .catch(err => console.log("Error syncing database, ", err))

module.exports = { sequelize, Media, Person, Location }
