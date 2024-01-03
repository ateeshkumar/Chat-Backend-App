import express from "express";
import { protect } from "../middleware/protect.js";
import { chatAccessController } from "../controller/chatController.js";
const chatRoute = express.Router();

chatRoute.post("/", protect, chatAccessController);

export default chatRoute;
