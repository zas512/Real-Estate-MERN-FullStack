import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDb");
  } catch (e) {
    console.log("Cannot connect to MongoDb", e);
  }
};
