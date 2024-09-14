import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionOptions = {
      dbName: process.env.DBNAME, // Make sure this is set in your .env file
      useNewUrlParser: true, // Ensures that the new connection string parser is used
      useUnifiedTopology: true, // Enables the new Server Discovery and Monitoring engine
    };
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
