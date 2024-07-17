import connectMongoDB from '@config/db/mongoInit';
import PostgresDataSource from '@config/db/typeOrm';

const pgInit = () => {
  PostgresDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

};
const postgreConnection = {
  connectDB: pgInit
};
const mongoDbConnection = {
  connectDB: connectMongoDB,
};

export { mongoDbConnection, postgreConnection };
