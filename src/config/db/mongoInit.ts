import mongoose from 'mongoose';

console.log(process.env.MONGO_URI);
const connectMongoDB = async () => {
  try {
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);

    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);

    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unexpected error', error);
    }
    process.exit(1);
  }
};

  export default connectMongoDB;
