import mongoose from 'mongoose';

const connectDB = async () => {
  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.DATABASE_URL, connectOptions);
    console.log('Database Connected');
  } catch (error) {
    console.error(`connectDB Error: ${error.message}`);
  }
};

export default connectDB;
