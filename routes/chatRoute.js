import express from "express";
import { protect } from "../middleware/protect.js";
import {
  chatAccessController,
  fetchChatcontroller,
} from "../controller/chatController.js";
const chatRoute = express.Router();

chatRoute.post("/", protect, chatAccessController);
chatRoute.get("/", protect, fetchChatcontroller);

export default chatRoute;
