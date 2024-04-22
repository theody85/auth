import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
};
