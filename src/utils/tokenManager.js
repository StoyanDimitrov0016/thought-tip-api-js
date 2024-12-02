import jwt from "jsonwebtoken";

const DEFAULT_EXPIRATION_DURATION_IN_DAYS = "7d";

export default class TokenManager {
  /**
   * Creates an instance of TokenManager.
   * @param {string} secret - The secret key for signing tokens.
   * @param {string} expiration - The default token expiration duration.
   * @param {function} jwtErrorHandler - A function to handle JWT-related errors.
   */
  constructor(secret, expiration = DEFAULT_EXPIRATION_DURATION_IN_DAYS, jwtErrorHandler) {
    if (!secret || typeof secret !== "string") {
      throw new Error("JWT secret must be a valid string.");
    }

    if (!jwtErrorHandler || typeof jwtErrorHandler !== "function") {
      throw new Error("JWT error handler must be a valid function.");
    }

    this.secret = secret;
    this.expiration = expiration;
    this.jwtErrorHandler = jwtErrorHandler;
  }

  /**
   * Signs a JWT with the provided payload.
   * @param {Object} payload - The payload to include in the token.
   * @param {Object} options - Additional options for signing the token.
   * @returns {string} - The signed JWT.
   * @throws {Error} If signing fails.
   */
  signToken(payload, options = {}) {
    try {
      return jwt.sign(payload, this.secret, {
        expiresIn: this.expiration,
        ...options,
      });
    } catch (error) {
      this.jwtErrorHandler(error);
    }
  }

  /**
   * Verifies and decodes a JWT.
   * @param {string} token - The JWT to verify.
   * @param {Object} options - Additional options for verification.
   * @returns {Object} - The decoded payload.
   * @throws {Error} If verification fails.
   */
  verifyToken(token, options = {}) {
    try {
      return jwt.verify(token, this.secret, options);
    } catch (error) {
      this.jwtErrorHandler(error);
    }
  }

  /**
   * Decodes a JWT without verifying its signature.
   * @param {string} token - The JWT to decode.
   * @returns {Object|null} - The decoded payload or null if decoding fails.
   */
  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      this.jwtErrorHandler(error);
    }
  }
}
