import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

const JWT_SECRET = envConfig.jwtSecret;

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default isAuthenticated;
