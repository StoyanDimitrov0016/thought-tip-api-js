export default function inputValidator(schema) {
  return (req, res, next) => {
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
}
