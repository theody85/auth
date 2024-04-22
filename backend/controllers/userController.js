import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { verifyToken } from "../utils/verifyToken.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        message: "Invalid user id!",
      });
    }

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        message: "Invalid user id!",
      });
    }

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const payload = req.body;

    if (payload.email || payload.password || payload.username) {
      return res.status(401).json({
        message: "You cannot up any of these {email, password, username}",
      });
    }

    delete payload.email;
    delete payload.password;

    if (!payload.name) {
      return res.status(404).json({
        message: "You need to provide at least one field",
      });
    }
    const results = await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          name: payload.name,
        },
      }
    );

    const updatedUser = await User.findOne({
      _id: userId,
    });

    delete updatedUser.password;

    console.log(updatedUser);
    return res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
};
