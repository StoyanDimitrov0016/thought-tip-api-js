import tokenManager from "../../lib/managers/tokenManager.js";

export default function tokenValidator(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (token) {
      try {
        const decoded = tokenManager.verify(token);
        req.client = decoded;
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          res.clearCookie("token");
        }
        throw new Error("Invalid or expired token");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}
