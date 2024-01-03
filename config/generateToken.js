import Jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};
