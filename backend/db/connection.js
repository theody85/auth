import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
