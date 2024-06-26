import sequelize from './sequelize';
import User from '@models/User';

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
    
    // Synchronize all models
    await User.sync({ alter: true });
    console.log('User table has been synchronized successfully.');

    // Add synchronization for other models here
    // await OtherModel.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

export default initDb;
