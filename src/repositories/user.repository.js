import UserModel from "../models/User.model.js";
import dbErrorHandler from "../utils/handlers/dbErrorHandler.js";
import { validateMongooseObjectId } from "../utils/mongooseIdsValidators.js";

class UserRepository {
  async findOneByMongoId(id) {
    try {
      const validationResult = validateMongooseObjectId(id, false);
      if (!validationResult) {
        console.error("Invalid ID format for findOneByMongoId:", id);
        return null;
      }
      return await UserModel.findById(validationResult).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByExternalUserId(externalUserId) {
    try {
      return await UserModel.findOne({ externalUserId }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByQueryWithoutIds(query) {
    try {
      return await UserModel.findOne(query).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(data) {
    try {
      const result = await UserModel.create(data);
      return result.toObject();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneByMongoId(id, updateData) {
    try {
      const validationResult = validateMongooseObjectId(id, false);
      if (!validationResult) {
        console.error("Invalid ID format for updateOneByMongoId:", id);
        return null;
      }
      return await UserModel.findByIdAndUpdate(validationResult, updateData, { new: true }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneByExternalUserId(externalUserId, updateData) {
    try {
      return await UserModel.findOneAndUpdate({ externalUserId }, updateData, { new: true }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneByQueryWithoutIds(query, updateData) {
    try {
      return await UserModel.findOneAndUpdate(query, updateData, { new: true }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneByMongoId(id) {
    try {
      const validationResult = validateMongooseObjectId(id, false);
      if (!validationResult) {
        console.error("Invalid ID format for deleteByMongoId:", id);
        return null;
      }
      return await UserModel.findByIdAndDelete(validationResult).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneByExternalUserId(externalUserId) {
    try {
      return await UserModel.findOneAndDelete({ externalUserId }).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneByQueryWithoutIds(query) {
    try {
      return await UserModel.findOneAndDelete(query).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkExistenceOfOne(filter) {
    try {
      return await UserModel.exists(filter).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const userRepository = new UserRepository();
export default userRepository;
