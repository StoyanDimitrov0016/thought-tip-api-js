export default function withNext(asyncFunction) {
  return async (req, res, next) => {
    try {
      const customResponse = await asyncFunction(req);

      if (customResponse.status === 204) {
        res.status(customResponse.status).end();
      }

      res.status(customResponse.status).json(customResponse);
    } catch (error) {
      next(error);
    }
  };
}
