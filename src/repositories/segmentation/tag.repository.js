import TagModel from "../../models/segmentation/Tag.model.js";
import {
  validateMongooseObjectId,
  validateMongooseIdsInQuery,
} from "../../utils/mongooseIdsValidators.js";

class TagRepository {
  async findById(id) {
    try {
      validateMongooseObjectId(id);
      return await TagModel.findById(id).lean();
    } catch (error) {
      throw new Error(`Failed to find tag by ID: ${error.message}`);
    }
  }

  async findOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "topicId"]);
      return await TagModel.findOne(query).lean();
    } catch (error) {
      throw new Error(`Failed to find tag by query: ${error.message}`);
    }
  }

  async findManyByQuery(query = {}) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "topicId"]);
      return await TagModel.find(query).lean();
    } catch (error) {
      throw new Error(`Failed to find tags: ${error.message}`);
    }
  }

  async checkOneExists(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "topicId"]);
      return await TagModel.exists(query);
    } catch (error) {
      throw new Error(`Failed to check tag existence: ${error.message}`);
    }
  }

  async createOne(tagData) {
    try {
      validateMongooseObjectId(tagData.topicId);
      return await TagModel.create(tagData);
    } catch (error) {
      throw new Error(`Failed to create tag: ${error.message}`);
    }
  }

  async createMany(tagsData) {
    try {
      tagsData.forEach((tag) => {
        validateMongooseObjectId(tag.topicId);
      });
      return await TagModel.insertMany(tagsData);
    } catch (error) {
      throw new Error(`Failed to create tags: ${error.message}`);
    }
  }

  async updateOneById(id, updateData) {
    try {
      validateMongooseObjectId(id);
      if (updateData.topicId) {
        validateMongooseObjectId(updateData.topicId);
      }
      return await TagModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update tag: ${error.message}`);
    }
  }

  async updateOneByQuery(query, updateData) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "topicId"]);
      if (updateData.topicId) {
        validateMongooseObjectId(updateData.topicId);
      }
      return await TagModel.findOneAndUpdate(query, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update tag: ${error.message}`);
    }
  }

  async deleteOneById(id) {
    try {
      validateMongooseObjectId(id);
      return await TagModel.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new Error(`Failed to delete tag: ${error.message}`);
    }
  }

  async deleteOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "topicId"]);
      return await TagModel.findOneAndDelete(query).lean();
    } catch (error) {
      throw new Error(`Failed to delete tag: ${error.message}`);
    }
  }

  async deleteManyByTopicId(topicId) {
    try {
      validateMongooseObjectId(topicId);
      return await TagModel.deleteMany({ topicId }).lean();
    } catch (error) {
      throw new Error(`Failed to delete tags by topic ID: ${error.message}`);
    }
  }
}

const tagRepository = new TagRepository();
export default tagRepository;
