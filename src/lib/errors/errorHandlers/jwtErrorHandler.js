import { UnauthorizedError } from "../customErrors/ErrorSubclasses.js";

const jwtErrorHandler = (error) => {
  if (error.name === "TokenExpiredError") {
    throw new UnauthorizedError("Token has expired.", [
      { field: "token", message: "Token has expired." },
    ]);
  }

  if (error.name === "JsonWebTokenError") {
    throw new UnauthorizedError("Invalid token.", [
      { field: "token", message: "Invalid authentication token." },
    ]);
  }

  if (error.name === "NotBeforeError") {
    throw new UnauthorizedError("Token is not yet valid.", [
      { field: "token", message: "Token is not yet active." },
    ]);
  }

  console.error("---Unexpected JWT error:", error);
  throw new UnauthorizedError("JWT processing error.", [
    { field: "token", message: "Unexpected JWT error occurred." },
  ]);
};

export default jwtErrorHandler;
