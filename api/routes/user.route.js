import express from "express";
import { getUser } from "../controllers/user.contoller.js";

const router = express.Router();

router.get("/getuser", getUser);

export default router;
