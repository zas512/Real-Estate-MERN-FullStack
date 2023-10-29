import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email & password required" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: "New user registered", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Cannot register user", detail: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username & password required" });
    }
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return res.status(404).json({ error: "User not found", username });
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Password not correct" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: "User signed in", username: validUser.username });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Cannot sign in the user", detail: error.message });
  }
};
