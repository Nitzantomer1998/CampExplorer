import mongoose from 'mongoose';

const mongodbConfig = async () => {
  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGODB_URL, connectOptions);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`mongodbConfig Error: ${error.message}`);
  }
};

export default mongodbConfig;
