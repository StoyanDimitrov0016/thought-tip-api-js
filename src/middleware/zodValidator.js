import { ZodError } from "zod";
import { ValidationError } from "../lib/errors/customErrors/ErrorSubclasses.js";

//TODO: add different req properties apart from the body
const zodValidator = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return next(new ValidationError("Validation failed", formattedErrors));
    }
    next(error);
  }
};

export default zodValidator;
