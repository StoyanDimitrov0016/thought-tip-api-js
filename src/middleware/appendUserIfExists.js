import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

const JWT_SECRET = envConfig.jwtSecret;

const appendUserIfExists = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = {
        id: decoded.id,
        role: decoded.role,
        verificationLevel: decoded.verificationLevel,
        externalUserId: decoded.externalUserId,
      };
    } catch (error) {
      console.log("Invalid or expired token");
    }
  }
  next();
};

export default appendUserIfExists;
