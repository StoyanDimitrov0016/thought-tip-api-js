import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";
import jwtErrorHandler from "../lib/errors/errorHandlers/jwtErrorHandler.js";

const JWT_SECRET = envConfig.jwtSecret;
const EXPIRATION_DURATION = "7d";

class JWTManager {
  signToken(payload, options = {}) {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION_DURATION, ...options });
    } catch (error) {
      jwtErrorHandler(error);
    }
  }

  verifyAndDecodeToken(token, options = {}) {
    try {
      return jwt.verify(token, JWT_SECRET, options);
    } catch (error) {
      jwtErrorHandler(error);
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

const jwtManager = new JWTManager();
export default jwtManager;
