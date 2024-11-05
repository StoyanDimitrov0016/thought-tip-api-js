import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

const JWT_SECRET = envConfig.jwtSecret;
const JWT_EXPIRATION_TIME_IN_STRING = "7d";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    externalUserId: user.externalUserId !== undefined ? user.externalUserId : null,
    email: user.email,
    username: user.username,
    role: user.role,
    profilePicture: user.profilePicture !== undefined ? user.profilePicture : null,
    verificationLevel: user.verificationLevel,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME_IN_STRING });
  return token;
};

export default generateToken;
