import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/146901496?v=4",
    },
  },
  { timestamps: true }
);
export const user = mongoose.model("User", userSchema);
