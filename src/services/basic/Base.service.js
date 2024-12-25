export class ServiceBase {
  constructor({ Model, Errors, wrapper }) {
    this.Model = Model;
    this.Errors = Errors;
    this.wrapper = wrapper;

    this.exists = this.defineMethod(this.exists);
    this.countDocuments = this.defineMethod(this.countDocuments);
  }

  async exists(filter, toBoolean = true) {
    const match = await this.Model.exists(filter);
    return toBoolean ? !!match : match;
  }

  async countDocuments(filter) {
    return await this.Model.countDocuments(filter);
  }

  ensureNotFalsy(value, errorMessage = "Expected value is falsy.") {
    if (Boolean(value) == false) throw new this.Errors.NotFoundError(errorMessage);
    return value;
  }

  ensureFalsy(value, errorMessage = "Value should be falsy.") {
    if (Boolean(value) == true) throw new this.Errors.ConflictError(errorMessage);
    return value;
  }

  handleRetrieved(result, errorMessage) {
    return this.ensureNotFalsy(result, errorMessage);
  }

  handleCreated(result, errorMessage) {
    const parsed = typeof result.toObject === "function" ? result.toObject() : result;
    return this.ensureNotFalsy(parsed, errorMessage);
  }

  handleUpdated(result, errorMessage) {
    return this.ensureNotFalsy(result, errorMessage);
  }

  handleRemoved(result, errorMessage, expectedCount) {
    this.ensureNotFalsy(result, errorMessage);

    if (result._id) return { deletedCount: 1, result };

    if (result.ok) {
      if (expectedCount && expectedCount !== result.deletedCount) {
        throw new this.Errors.NotFoundError(
          `Mismatch between expected and actual deletions. Expected: ${expectedCount}. Deleted: ${result.deletedCount}.`
        );
      }

      return { deletedCount: result.deletedCount, result: null };
    }

    throw new this.Errors.InternalServerError(errorMessage);
  }

  wrapMethod(method) {
    if (this.wrapper) return this.wrapper(method);
    return method;
  }

  defineMethod(method) {
    return this.wrapMethod(method.bind(this));
  }
}
