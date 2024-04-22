import { Router } from "express";
import { checkLoginCredentials } from "../middlewares/checkLoginCredentials.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";
import { login, logout, signup } from "../controllers/authController.js";

const router = Router();

router.post("/signup", checkUserExists, signup);
router.post("/login", checkLoginCredentials, login);
router.get("/logout", logout);

export default router;
