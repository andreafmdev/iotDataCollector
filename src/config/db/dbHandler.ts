import connectMongoDB from '@config/db/mongoInit';
import pgInit from '@config/db/postgreInit'; //sequelize
const postgreConnection = async () => {
  try {
    await pgInit.authenticate();
    await init();//rimuovere in prod
    console.log('Connection has been established successfully to PG db.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const postgreDbConnection = {
  connectDB: postgreConnection,
};
const mongoDbConnection = {
  connectDB: connectMongoDB,
};

async function init() {
  try {
    await pgInit.sync({ force: true }); // `force: true` reimposta il database ad ogni avvio, rimuovi in produzione
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
}
export { postgreDbConnection, mongoDbConnection };
