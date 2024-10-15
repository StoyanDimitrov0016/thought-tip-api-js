import userRepository from "../repositories/user.repository.js";
import generateToken from "../utils/generateJWT.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils.js";

const userLogin = async (credentials) => {
  const { email, username, password } = credentials;

  const existingUser = await userRepository.getUserByEmailOrUsername(email, username);
  if (!existingUser) throw new Error("Invalid credentials");

  const isPasswordMatch = await comparePasswords(password, existingUser.password);
  if (!isPasswordMatch) throw new Error("Invalid credentials");

  const { password: _, ...user } = existingUser;
  const token = generateToken(user);

  return { user, token };
};

const userRegister = async (registrationData) => {
  const { email, username, password, firstName, lastName } = registrationData;

  const existingUser = await userRepository.getUserByEmailOrUsername(email, username);
  if (existingUser) throw new Error("Email or username already taken");

  const hashedPassword = await hashPassword(password);

  const createdUser = await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });
  const { password: _, ...user } = createdUser;

  const token = generateToken(user);
  return { user, token };
};

const authService = { userLogin, userRegister };
export default authService;
