import {
  createAccount,
  enterAccount,
  deleteAccount,
  updateAccount,
} from "../services/user.service.js";
import generateToken from "../utils/generateJWT.js";

export const handleRegister = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await createAccount(userData);
    console.log("from controller:", user);
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await enterAccount({ email, password });
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleUpdateAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedUser = await updateAccount(userId, updatedData);
    const token = generateToken(updatedUser);

    res.status(200).json({ user: updatedUser, token, message: "Account updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleDeleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id; // Directly extract userId
    const result = await deleteAccount(userId);
    res.status(203).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
