export const extractFromMongooseValidationError = (error) => {
  const errorsObject = error.errors;
  const errorsArray = Object.entries(errorsObject);
  const errorFields = errorsArray.map(([field, detail]) => ({
    field,
    message: detail.message,
  }));

  return errorFields;
};

export const extractFromMongooseDuplicationError = (error) => {
  const duplicateKey = Object.keys(error.keyValue)[0];
  const duplicateValue = error.keyValue[duplicateKey];
  return { duplicateKey, duplicateValue };
};
