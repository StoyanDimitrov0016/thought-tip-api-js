import bcrypt from "bcryptjs";

const DEFAULT_SALT_ROUNDS = 10;

export default class PasswordManager {
  /**
   * Creates an instance of PasswordManager.
   * @param {number} saltRounds - The number of salt rounds for password hashing.
   * @param {Error} InternalServerError - A custom error class for handling internal server errors.
   */
  constructor(saltRounds = DEFAULT_SALT_ROUNDS, InternalServerError = Error) {
    if (typeof saltRounds !== "number" || saltRounds <= 0) {
      throw new Error("saltRounds must be a positive number.");
    }
    this.saltRounds = saltRounds;
    this.InternalServerError = InternalServerError;
  }

  /**
   * Hashes a plain text password.
   * @param {string} plainPassword - The plain text password to hash.
   * @returns {Promise<string>} - The hashed password.
   * @throws {InternalServerError} If hashing fails.
   */
  async hashPassword(plainPassword) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(plainPassword, salt);
    } catch (error) {
      throw new this.InternalServerError("Failed to hash password.", [
        { field: "password", message: "Password hashing operation failed." },
      ]);
    }
  }

  /**
   * Compares a plain password with a hashed password.
   * @param {string} plainPassword - The plain text password.
   * @param {string} hashedPassword - The hashed password to compare.
   * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
   * @throws {InternalServerError} - A custom error class for handling internal server errors.
   */
  async comparePasswords(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new this.InternalServerError("Failed to compare passwords.", [
        {
          field: "password",
          message: "Password comparison operation failed.",
        },
      ]);
    }
  }
}
