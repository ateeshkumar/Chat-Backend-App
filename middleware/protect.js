import Jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.User = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
