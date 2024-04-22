export const checkLoginCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required!" });
    if (!password)
      return res.status(400).json({ message: "Password is required!" });

    next();
  } catch (error) {
    console.log(error);
  }
};
