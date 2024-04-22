import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = new User({
      name,
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const user = await newUser.save();

    if (user) {
      let token = generateToken(user._id);

      res.cookie("token", token, {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
      });

      console.log("cookie set succesfully!");
      return res.status(201).json({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
    res.status(409).send("Wrong details provided!");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Account not found!");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(404).send("Invalid credentials!");

    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully!" });
};
