import { UnauthorizedError } from "../../lib/classes/customErrors.js";
import tokenManager from "../../lib/managers/tokenManager.js";

export default function tokenValidator(req, res, next) {
  try {
    req.user = { id: null, username: null, role: null };

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const [scheme, accessToken] = authHeader.split(" ");
    if (scheme !== "Bearer" || !accessToken?.trim) {
      return next(new UnauthorizedError("Invalid authorization header format"));
    }

    if (tokenManager.isTokenExpired(accessToken)) {
      return next(new UnauthorizedError("Access token has expired"));
    }

    const { id, username, role } = tokenManager.verifyAccessToken(accessToken);
    if (!id || !username || !role) {
      return next(new UnauthorizedError("Invalid token payload"));
    }

    req.user = {
      id,
      username: username.trim(),
      role: role.trim().toLowerCase(),
    };
    return next();
  } catch (error) {
    return next(error);
  }
}
