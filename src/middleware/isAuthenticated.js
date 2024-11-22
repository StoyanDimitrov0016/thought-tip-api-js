import { ForbiddenError } from "../lib/errors/customErrors/ErrorSubclasses.js";
import authRepository from "../repositories/account/auth.repository.js";

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.client) {
      throw new ForbiddenError("User is not authenticated.", [
        { field: "authentication", message: "No user information found in the request." },
      ]);
    }

    const { id: clientId } = req.client;

    const userExists = await authRepository.checkOne({ _id: clientId });
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
