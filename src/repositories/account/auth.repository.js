import UserModel from "../../models/account/UserModel.js";
import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";
import mongoDocumentFormatter from "../../utils/mongoDocumentFormatter.js";

class AuthRepository {
  async findOneByMongooseId(mongooseId) {
    try {
      const user = await UserModel.findById(mongooseId).lean();
      return mongoDocumentFormatter(user);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByExternalId(externalId) {
    try {
      const user = await UserModel.findOne({ externalUserId: externalId }).lean();
      return mongoDocumentFormatter(user);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByFilter(filter = {}) {
    try {
      const user = await UserModel.findOne(filter).lean();
      return mongoDocumentFormatter(user);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOne(filter = {}) {
    try {
      const match = await UserModel.exists(filter);
      return mongoDocumentFormatter(match);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(userCreateData) {
    try {
      const newUser = await UserModel.create(userCreateData);
      return mongoDocumentFormatter(newUser.toObject());
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneByMongooseId(mongooseId, userUpdateData) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(mongooseId, userUpdateData, {
        new: true,
      }).lean();
      return mongoDocumentFormatter(updatedUser);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneByMongooseId(mongooseId) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(mongooseId).lean();
      return mongoDocumentFormatter(deletedUser);
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const authRepository = new AuthRepository();
export default authRepository;
