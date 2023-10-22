import express from "express";
import { connectDb } from "./database/dbConnect.js";
const app = express();
connectDb();
app.listen(3000, () => {
  console.log("Server started on Port: 3000");
});
