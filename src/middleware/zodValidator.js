const zodValidator = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
};

export default zodValidator;