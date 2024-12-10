import tokenManager from "../../lib/managers/tokenManager.js";

export default function tokenValidator(req, res, next) {
  try {
    req.user = { id: null, role: null, username: null };

    const token = req.cookies?.token;
    if (token) {
      try {
        const decoded = tokenManager.verify(token);
        req.user = decoded;
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
