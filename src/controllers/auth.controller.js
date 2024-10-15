import authService from "../services/auth.service.js";

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

const cookieOptions = {
  httpOnly: true,
  maxAge: WEEK_IN_MILLISECONDS,
  sameSite: "Lax",
  // secure: true,
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.userLogin(req.body);
    res.cookie("token", token, cookieOptions).status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.userRegister(req.body);
    res.cookie("token", token, cookieOptions).status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
  } catch (error) {}
};

const authController = {
  login,
  register,
  logout,
};

export default authController;
