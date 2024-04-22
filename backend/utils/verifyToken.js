import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findOne({
      _id: userId,
    });

    if (user) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
