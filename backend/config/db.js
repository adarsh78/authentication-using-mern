import mongoose from "mongoose";

 export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process exit with code 1 means failure, 0 means success;
  }
  console.log("From DB: ", process.env.MONGO_URI)
 };



