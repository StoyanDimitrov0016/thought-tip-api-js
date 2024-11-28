import {
  AlreadyExistsError,
  UnauthorizedError,
} from "../../lib/errors/customErrors/ErrorSubclasses.js";
import authRepository from "../../repositories/account/auth.repository.js";
import profileRepository from "../../repositories/account/profile.repository.js";
import jwtManager from "../../utils/jwtManager.js";
import { comparePasswords, hashPassword } from "../../utils/passwordUtils.js";

class AuthService {
  createTokenPayload(user) {
    return {
      id: user.id,
      externalUserId: user.externalUserId || null,
      email: user.email,
      username: user.username,
      role: user.role,
      verificationLevel: user.verificationLevel,
    };
  }

  sanitizeUserEntry(user) {
    const { hashedPassword, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  async register(email, username, password, externalUserId = null) {
    const checkFields = [{ email }, { username }];
    if (externalUserId) checkFields.push({ externalUserId });

    const existingUser = await authRepository.checkOne({ $or: checkFields });
    if (existingUser) {
      throw new AlreadyExistsError("Email or username already taken", [
        { field: "email", message: "Email might be taken" },
        { field: "username", message: "Username might be taken" },
      ]);
    }

    const hashedPassword = await hashPassword(password);

    const userCreateData = { email, username, hashedPassword };
    if (externalUserId) userCreateData.externalUserId = externalUserId;

    const newUserRecord = await authRepository.createOne(userCreateData);
    const sanitizedNewUserRecord = this.sanitizeUserEntry(newUserRecord);

    await profileRepository.createOne({ userId: sanitizedNewUserRecord.id });

    const tokenPayload = this.createTokenPayload(sanitizedNewUserRecord);
    const jwtToken = jwtManager.signToken(tokenPayload);

    //TODO: check if there is a need to append interaction
    return { user: sanitizedNewUserRecord, token: jwtToken };
  }

  async login(usernameOrEmail, password) {
    const existingUser = await authRepository.findOneByFilter({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!existingUser) {
      throw new UnauthorizedError("Login failed. Please check your credentials.");
    }

    const passwordsMatch = await comparePasswords(password, existingUser.hashedPassword);
    if (!passwordsMatch) {
      throw new UnauthorizedError("Login failed. Please check your credentials.");
    }

    const sanitizedUser = this.sanitizeUserEntry(existingUser);

    const tokenPayload = this.createTokenPayload(sanitizedUser);
    const jwtToken = jwtManager.signToken(tokenPayload);

    //TODO: check if there is a need to append interaction
    return { user: sanitizedUser, token: jwtToken };
  }

  // TODO: Add functionality for changePassword, forgotPassword, and deleteAccount
}

const authService = new AuthService();
export default authService;
