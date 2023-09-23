import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    // console.log('Connected to MongoDB.');
  } catch (error) {
    console.log(error);
  }
};

export async function closeDatabaseConnection() {
  try {
    await mongoose.disconnect();
    // console.log('Closed MongoDB connection');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

export default connectMongoDB;
