import connectMongoDB from '@config/db/mongoInit';


const mongoDbConnection = {
  connectDB: connectMongoDB,
};

export { mongoDbConnection };
