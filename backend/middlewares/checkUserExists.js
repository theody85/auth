import { User } from "../models/userModel.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    if (!(name && username && email && password))
      return res.status(400).json({ message: "All inputs are required!" });

    let oldUser = await User.findOne({ username });
    if (oldUser)
      return res.status(409).json({ message: "Username is already taken!" });

    oldUser = await User.findOne({ email });
    if (oldUser)
      return res
        .status(409)
        .json({ message: "User already exist. Please login" });

    next();
  } catch (error) {
    console.log(error);
  }
};
