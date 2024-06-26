import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_TEST!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unexpected error', error);
    }
    process.exit(1);
  }
};

  export default connectMongoDB;
