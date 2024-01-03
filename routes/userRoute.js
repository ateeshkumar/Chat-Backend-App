import express from "express";
import {
  getAllUserController,
  loginController,
  registerController,
  searchUser,
} from "../controller/userController.js";
import { protect } from "../middleware/protect.js";

const userRoute = express.Router();

userRoute.post("/login", loginController);
userRoute.post("/register", registerController);
userRoute.get("/", getAllUserController);
userRoute.get("/search", protect, searchUser);

export default userRoute;
