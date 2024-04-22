import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Connection from "./db/connection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

//add middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//add routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//set up mongo db connection
Connection();

//listening to server connection
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
