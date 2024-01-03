import { generateToken } from "../config/generateToken.js";
import { comparePassword, hashPassword } from "../helper/hashPassword.js";
import { user } from "../models/userModel.js";
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "all fields are required",
      });
    }
    const luser = await user.findOne({ email });
    if (!luser) {
      res.status(301).send({
        success: false,
        message: "User not Register Yet",
      });
    }
    const match = await comparePassword(password, luser.password);
    if (!match) {
      res.status(301).send({
        success: false,
        message: "user password is incorrect",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Login Successfully",
      luser,
      token: generateToken(luser._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
export const registerController = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      return res.status(401).send({
        success: false,
        message: "Fields are required",
      });
    }
    const existuser = await user.findOne({ email });
    if (existuser) {
      res.status(300).send({
        success: false,
        message: "User Already Exist",
      });
    }
    const bcrpassword = await hashPassword(password);
    const newUser = await new user({
      name,
      email,
      password: bcrpassword,
      pic,
    });
    await newUser.save();
    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "New User Created",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pic: newUser.pic,
        token: generateToken(newUser._id),
      });
    }
    await newUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const alluser = await user.find({});
    if (!alluser) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Get Successfully",
      alluser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};
export const searchUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await user.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.status(200).send({
      success: true,
      message: "Search resuelts",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};
