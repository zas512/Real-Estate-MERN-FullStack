import express from "express";
import connectDb from "./database/dbConnect.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
connectDb();

app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server started on Port: 3000");
});
