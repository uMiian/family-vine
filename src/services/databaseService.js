import Sequelize from 'sequelize';
import { initializeModels } from '../db/index.js';

// Function to create a new Sequelize instance
const createSequelizeInstance = (db_file_path) => {
  // Create a new sequelize instance
  const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: db_file_path,
    logging: false,
  });

  return sequelizeInstance;
}

// Function to connect to database
// returns new Sequelize instance and models
const connectToDatabase = async (db_file_path) => {
  try {
    // Create and authenticate connection to database
    const sequelize = createSequelizeInstance(db_file_path);
    await sequelize.authenticate();

    // Initialize models
    const models = initializeModels(sequelize);

    return { sequelize, models }

  } catch (error) {
    throw error;
  }
}

export { connectToDatabase }
