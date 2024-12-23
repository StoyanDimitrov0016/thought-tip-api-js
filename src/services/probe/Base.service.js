export class ServiceBase {
  constructor({ Model, Errors, wrapper }) {
    this.Model = Model;
    this.Errors = Errors;
    this.wrapper = wrapper;

    this.checkDocumentExists = this.defineMethod(this.checkDocumentExists);
    this.getDocumentId = this.defineMethod(this.getDocumentId);
    this.getDocumentsCount = this.defineMethod(this.getDocumentsCount);
  }

  confirmExists(result, errorMessage = "Resource not found.") {
    if ((Array.isArray(result) && result.length === 0) || !result) {
      throw new this.Errors.NotFoundError(errorMessage);
    }
    return result;
  }

  confirmNonExists(result, errorMessage = "Resource already exists.") {
    if (result) {
      throw new this.Errors.DuplicationError(errorMessage);
    }
  }

  confirmCreated(result, errorMessage = "Resource creation failed.") {
    if (!result) {
      throw new this.Errors.InternalServerError(errorMessage);
    }

    return typeof result.toObject === "function" ? result.toObject() : result;
  }

  confirmDeleted(result, errorMessage = "Resource deletion failed.", expectedCount) {
    // case: findByIdAndDelete
    if (result._id) {
      return { deletedCount: 1, result };
    }

    // case: deleteOne or deleteMany
    if (result.ok) {
      if (result.deletedCount !== expectedCount) {
        throw new this.Errors.NotFoundError(
          `Mismatch between expected and actual deletions. Expected: ${expectedCount}. Deleted: ${result.deletedCount}.`
        );
      }

      return { deletedCount: result.deletedCount, result: null };
    }

    throw new this.Errors.InternalServerError(errorMessage);
  }

  async checkDocumentExists(filter) {
    const match = await this.Model.exists(filter);
    return !!match;
  }

  async getDocumentId(filter) {
    const match = await this.Model.exists(filter);
    return match?._id || null;
  }

  async getDocumentsCount(filter) {
    return this.Model.countDocuments(filter);
  }

  wrapMethod(method) {
    if (this.wrapper) {
      return this.wrapper(method);
    }
    return method;
  }

  defineMethod(method) {
    return this.wrapMethod(method.bind(this));
  }
}
