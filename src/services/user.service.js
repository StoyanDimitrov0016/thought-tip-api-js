import userRepository from "../repositories/user.repository.js";
import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";

export const createAccount = async (userData) => {
  const match = await userRepository.checkUserExistence({ email: userData.email });
  if (match) {
    throw new Error("Email taken");
  }

  const hashedPassword = await hashPassword(userData.password);
  userData = { ...userData, password: hashedPassword };

  const { password, ...newUserWithoutPassword } = await userRepository.createUser(userData);
  return newUserWithoutPassword;
};

export const enterAccount = async (credentials) => {
  const userExists = await userRepository.checkUserExistence({ email: credentials.email });
  if (!userExists) {
    throw new Error("Invalid credentials");
  }

  const user = await userRepository.getUserById(userExists._id);
  console.log(user.password, credentials.password);
  const isMatch = await comparePasswords(credentials.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateAccount = async (userId, updatedData) => {
  const userExists = await userRepository.checkUserExistence({ _id: userId });
  if (!userExists) {
    throw new Error("Account not found");
  }

  const updatedUser = await userRepository.updateUserById(userId, updatedData);
  const { password, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
};

export const deleteAccount = async (userId) => {
  const match = await userRepository.checkUserExistence({ _id: userId });
  if (!match) {
    throw new Error("Account not found");
  }

  const result = await userRepository.deleteUserById(userId);
  return result;
};
