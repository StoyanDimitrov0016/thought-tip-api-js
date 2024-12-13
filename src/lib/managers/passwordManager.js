import bcrypt from "bcryptjs";
import { BadRequestError, InternalServerError } from "../classes/customErrors.js";

const SALT_ROUNDS = 10;
const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 128,
  requireUpperCase: true,
  requireLowerCase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

class PasswordManager {
  constructor(saltRounds = SALT_ROUNDS, passwordPolicy = PASSWORD_POLICY) {
    if (!Number.isInteger(saltRounds) || saltRounds < 10) {
      throw new BadRequestError("Salt rounds must be an integer of at least 10.");
    }
    this.saltRounds = saltRounds;
    this.passwordPolicy = passwordPolicy;
  }

  ensureExistsAndString(argument, errorMessage) {
    if (!argument || typeof argument !== "string") {
      throw new BadRequestError(errorMessage);
    }
  }

  validatePassword(password) {
    this.ensureExistsAndString(password, "Password must be a string.");

    const {
      minLength,
      maxLength,
      requireUpperCase,
      requireLowerCase,
      requireNumbers,
      requireSpecialChars,
    } = this.passwordPolicy;

    if (password.length < minLength || password.length > maxLength) {
      throw new BadRequestError(
        `Password length must be between ${minLength} and ${maxLength} characters.`
      );
    }

    if (requireUpperCase && !/[A-Z]/.test(password)) {
      throw new BadRequestError("Password must contain at least one uppercase letter.");
    }
    if (requireLowerCase && !/[a-z]/.test(password)) {
      throw new BadRequestError("Password must contain at least one lowercase letter.");
    }
    if (requireNumbers && !/\d/.test(password)) {
      throw new BadRequestError("Password must contain at least one number.");
    }
    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new BadRequestError("Password must contain at least one special character.");
    }
  }

  validateHash(hash) {
    this.ensureExistsAndString(hash, "Hash must be a string.");
    if (!/^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash)) {
      throw new BadRequestError("Invalid bcrypt hash format.");
    }
  }

  async hash(plainPassword) {
    try {
      this.validatePassword(plainPassword);
      const salt = await this.generateSalt();
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      // Verify the hash
      if (!(await this.compare(plainPassword, hashedPassword))) {
        throw new InternalServerError("Hash verification failed.");
      }

      return hashedPassword;
    } catch (error) {
      throw error instanceof BadRequestError
        ? error
        : new InternalServerError("Hashing operation failed.");
    }
  }

  async compare(plainPassword, hashedPassword) {
    try {
      this.validateHash(hashedPassword);
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new BadRequestError("Password comparison operation failed.");
    }
  }

  async generateSalt() {
    try {
      return await bcrypt.genSalt(this.saltRounds);
    } catch (error) {
      throw new InternalServerError("Salt generation operation failed.");
    }
  }

  async needsRehash(hashedPassword) {
    try {
      this.validateHash(hashedPassword);
      const rounds = bcrypt.getRounds(hashedPassword);
      return rounds !== this.saltRounds;
    } catch (error) {
      throw error instanceof BadRequestError
        ? error
        : new InternalServerError("Error during rehash check.");
    }
  }
}

const passwordManager = Object.freeze(new PasswordManager(SALT_ROUNDS, PASSWORD_POLICY));
export default passwordManager;
