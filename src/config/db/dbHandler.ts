import connectMongoDB from './mongoConfig';
import sequelize from './sequelize';
const sequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully to PG db.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const postgreDbConnection = {
  connectDB: sequelizeConnection,
};
const mongoDbConnection = {
    connectDB: connectMongoDB,
  };

  export {postgreDbConnection,mongoDbConnection};
