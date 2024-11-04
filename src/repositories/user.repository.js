import UserModel from "../models/User.model.js";
import { validateMongooseObjectId } from "../utils/mongooseIdsValidators.js";

class UserRepository {
  async findOneByMongoId(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for findOneByMongoId:", id);
      return null;
    }
    return await UserModel.findById(validationResult).lean();
  }

  async findOneByExternalUserId(externalUserId) {
    return await UserModel.findOne({ externalUserId }).lean();
  }

  async findOneByQueryWithoutIds(query) {
    return await UserModel.findOne(query).lean();
  }

  async createOne(data) {
    return await UserModel.create(data);
  }

  async updateOneByMongoId(id, updateData) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for updateOneByMongoId:", id);
      return null;
    }
    return await UserModel.findByIdAndUpdate(validationResult, updateData, { new: true }).lean();
  }

  async updateOneByExternalUserId(externalUserId, updateData) {
    return await UserModel.findOneAndUpdate({ externalUserId }, updateData, { new: true }).lean();
  }

  async updateOneByQueryWithoutIds(query, updateData) {
    return await UserModel.findOneAndUpdate(query, updateData, { new: true }).lean();
  }

  async deleteOneByMongoId(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for deleteByMongoId:", id);
      return null;
    }
    return await UserModel.findByIdAndDelete(validationResult).lean();
  }

  async deleteOneByExternalUserId(externalUserId) {
    return await UserModel.findOneAndDelete({ externalUserId }).lean();
  }

  async deleteOneByQueryWithoutIds(query) {
    return await UserModel.findOneAndDelete(query).lean();
  }

  async checkExistenceOfOne(filter) {
    return await UserModel.exists(filter).lean();
  }
}

const userRepository = new UserRepository();
export default userRepository;
