export default function withNext(asyncFunction) {
  return async (req, res, next) => {
    try {
      const customResponse = await asyncFunction(req);
      res.status(customResponse.status).json(customResponse);
    } catch (error) {
      next(error);
    }
  };
}
