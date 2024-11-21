import { ForbiddenError } from "../lib/errors/customErrors/ErrorSubclasses.js";
import authRepository from "../repositories/account/auth.repository.js";

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ForbiddenError("User is not authenticated.", [
        { field: "authentication", message: "No user information found in the request." },
      ]);
    }

    const { id: requestedUserId } = req.user;

    const userExists = await authRepository.checkOne({ _id: requestedUserId });
    if (!userExists) {
      res.clearCookie("token");
      throw new ForbiddenError("User session is invalid.", [
        {
          field: "authentication",
          message: "Your session is invalid. Please log in again.",
        },
      ]);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
