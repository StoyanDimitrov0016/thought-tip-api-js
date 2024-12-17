import jwt from "jsonwebtoken";
import TokenModel from "../../models/Token.model.js";
import envConfig from "../../config/envConfig.js";
import { Errors } from "../classes/customErrors.js";

class TokenManager {
  #accessTokenSecret;
  #refreshTokenSecret;

  constructor(config) {
    this.#accessTokenSecret = config.accessTokenSecret;
    this.#refreshTokenSecret = config.refreshTokenSecret;
    this.accessTokenExpiry = config.accessTokenExpiry || "15m";
    this.refreshTokenExpiry = config.refreshTokenExpiry || "7d";
    this.algorithm = config.algorithm || "HS256";
    this.Errors = config.Errors;
    this.Model = config.Model;
    this.errMsgs = config.errMsgs;

    this.bindAllMethods();
  }

  bindAllMethods() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter((prop) => typeof this[prop] === "function" && prop !== "constructor")
      .forEach((method) => (this[method] = this[method].bind(this)));
  }

  throwError(ErrorType, message) {
    throw new ErrorType(message);
  }

  createAccessTokenPayload(user) {
    if (!user?.id || !user?.core?.username || !user?.core?.role) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.missingFields);
    }
    return {
      id: user.id,
      username: user.core.username,
      role: user.core.role,
      tokenVersion: user.tokenVersion || 1,
    };
  }

  createRefreshTokenPayload(user) {
    if (!user?.id) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.missingFields);
    }
    return {
      id: user.id,
      tokenVersion: user.tokenVersion || 1,
    };
  }

  signAccessToken(user) {
    try {
      const payload = this.createAccessTokenPayload(user);
      return jwt.sign(payload, this.#accessTokenSecret, {
        expiresIn: this.accessTokenExpiry,
        algorithm: this.algorithm,
      });
    } catch (error) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.tokenGenerationFailed);
    }
  }

  async signRefreshToken(user) {
    try {
      const payload = this.createRefreshTokenPayload(user);
      const refreshToken = jwt.sign(payload, this.#refreshTokenSecret, {
        expiresIn: this.refreshTokenExpiry,
        algorithm: this.algorithm,
      });

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + this.parseExpiry(this.refreshTokenExpiry));

      await this.Model.create({
        userId: payload.id,
        refreshToken,
        expiresAt,
        tokenVersion: payload.tokenVersion,
      });

      return refreshToken;
    } catch (error) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.tokenGenerationFailed);
    }
  }

  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.#accessTokenSecret, { algorithms: [this.algorithm] });
    } catch (error) {
      this.handleJwtError(error, this.errMsgs.invalidTokenFormat);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, this.#refreshTokenSecret, { algorithms: [this.algorithm] });
      const storedToken = await this.Model.findOne({
        refreshToken: token,
        userId: decoded.id,
        tokenVersion: decoded.tokenVersion,
      });

      if (!storedToken) {
        this.throwError(this.Errors.UnauthorizedError, this.errMsgs.revokeOneFailed);
      }

      if (new Date() > storedToken.expiresAt) {
        await this.revokeRefreshToken(token);
        this.throwError(this.Errors.UnauthorizedError, this.errMsgs.revokeOneFailed);
      }

      return decoded;
    } catch (error) {
      this.handleJwtError(error, this.errMsgs.invalidTokenFormat);
    }
  }

  decodeToken(token) {
    try {
      return jwt.decode(token, { complete: true });
    } catch (error) {
      this.throwError(this.Errors.BadRequestError, this.errMsgs.invalidTokenFormat);
    }
  }

  async revokeRefreshToken(token) {
    try {
      await this.Model.deleteOne({ refreshToken: token });
    } catch (error) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.revokeOneFailed);
    }
  }

  async revokeAllUserTokens(userId) {
    try {
      await this.Model.deleteMany({ userId });
    } catch (error) {
      this.throwError(this.Errors.InternalServerError, this.errMsgs.revokeAllFailed);
    }
  }

  async cleanupExpiredTokens() {
    try {
      await this.Model.deleteMany({ expiresAt: { $lt: new Date() } });
    } catch (error) {
      this.throwError(this.Errors.InternalServerError, "Failed to cleanup expired tokens");
    }
  }

  isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    return decoded?.payload?.exp ? Date.now() >= decoded.payload.exp * 1000 : true;
  }

  parseExpiry(expiry) {
    const conversions = { s: 1, m: 60, h: 3600, d: 86400 };
    const denominator = expiry.slice(-1);
    const quantity = parseInt(expiry.slice(0, -1), 10);

    if (isNaN(quantity) || quantity <= 0 || !conversions[denominator]) {
      this.throwError(
        this.Errors.InternalServerError,
        `${this.errMsgs.invalidExpiryFormat}: ${expiry}`
      );
    }

    return quantity * conversions[denominator];
  }

  handleJwtError(error, errorMessage) {
    if (error instanceof jwt.TokenExpiredError) {
      this.throwError(this.Errors.UnauthorizedError, "Token has expired.");
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.NotBeforeError) {
      this.throwError(this.Errors.UnauthorizedError, errorMessage);
    }
    this.throwError(this.Errors.InternalServerError, "Unexpected token error.");
  }
}

const tokenManagerConfig = {
  accessTokenSecret: envConfig.accessTokenSecret,
  refreshTokenSecret: envConfig.refreshTokenSecret,
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
  algorithm: "HS256",
  Errors: Errors,
  Model: TokenModel,
  errMsgs: {
    missingFields: "Missing fields for token payload creation.",
    tokenGenerationFailed: "Token creation internally failed.",
    invalidTokenFormat: "Invalid or malformed token.",
    revokeOneFailed: "Failed to revoke the refresh token.",
    revokeAllFailed: "Failed to revoke all user tokens.",
    invalidExpiryFormat: "Invalid token expiry format provided.",
  },
};

const tokenManager = Object.freeze(new TokenManager(tokenManagerConfig));
export default tokenManager;
