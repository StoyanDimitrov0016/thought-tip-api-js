import userRepository from "../repositories/user.repository.js";
import generateToken from "../utils/generateJWT.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils.js";
import { INITIAL_USER_ARTICLE_COUNT, INITIAL_USER_ARTICLE_LIMIT } from "../constants/user.js";

class AuthService {
  async login(credentials) {
    try {
      const { email, username, password } = credentials;

      const existingUser = await userRepository.findOneByQueryWithoutIds({
        $or: [{ email }, { username }],
      });
      if (!existingUser) {
        throw new Error("Invalid credentials");
      }

      const doesPasswordsMatch = await comparePasswords(password, existingUser.encryptedPassword);
      if (!doesPasswordsMatch) {
        throw new Error("Invalid credentials");
      }

      const { encryptedPassword: _, bio, ...user } = existingUser;
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async register(registrationData) {
    try {
      const { email, username, password, firstName, lastName } = registrationData;

      const existingUserPartial = await userRepository.checkExistenceOfOne({
        $or: [{ email }, { username }],
      });
      if (existingUserPartial) {
        throw new Error("Email or username already taken");
      }

      const encryptedPassword = await hashPassword(password);

      const createdUser = await userRepository.createOne({
        email,
        username,
        encryptedPassword,
        firstName,
        lastName,
        role: "regular",
        verificationLevel: "none",
        articleLimit: INITIAL_USER_ARTICLE_LIMIT,
        userArticleCount: INITIAL_USER_ARTICLE_COUNT,
      });
      const { encryptedPassword: _, bio, ...user } = createdUser;

      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  //TODO: build these methods:
  /*
    async changePassword() {}
    async forgotPassword() {}
  */
}

const authService = new AuthService();
export default authService;
