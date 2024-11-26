import ProfileModel from "../../models/account/ProfileModel.js";
import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";
import mongoDocumentFormatter from "../../utils/mongoDocumentFormatter.js";

class ProfileRepository {
  async findOneByFilter(filter = {}) {
    try {
      const profile = await ProfileModel.findOne(filter).lean();
      return mongoDocumentFormatter(profile);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOne(filter = {}) {
    try {
      const match = await ProfileModel.exists(filter).lean();
      return mongoDocumentFormatter(match);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(profileCreateData) {
    try {
      const newProfile = await ProfileModel.create(profileCreateData);
      return mongoDocumentFormatter(newProfile.toObject());
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneByFilter(filter, updateData, options = { new: true }) {
    try {
      const updatedProfile = await ProfileModel.findOneAndUpdate(
        filter,
        updateData,
        options
      ).lean();
      return mongoDocumentFormatter(updatedProfile);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async deleteOneByFilter(filter) {
    try {
      const deletedProfile = await ProfileModel.deleteOne(filter).lean();
      return mongoDocumentFormatter(deletedProfile);
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
