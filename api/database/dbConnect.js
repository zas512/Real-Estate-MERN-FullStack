import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () => {
  try {
    const URI = process.env.URI;
    if (URI) {
      await mongoose.connect(URI);
      console.log("Connected to MongoDb");
    } else {
      console.log("Add database link in .env file");
    }
  } catch (e) {
    console.log("Cannot connect to MongoDb", e);
  }
};
export default connectDb;