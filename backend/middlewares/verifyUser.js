import { verifyToken } from "../utils/verifyToken.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        message: "Unauthorised",
      });
    }

    const isVerified = await verifyToken(token);
    if (isVerified) {
      next();
    } else {
      return res.status(404).json({
        message: "Unauthorised",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unauthorised",
    });
  }
};
