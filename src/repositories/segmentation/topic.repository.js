import TopicModel from "../../models/segmentation/Topic.model.js";
import {
  validateMongooseObjectId,
  validateMongooseIdsInQuery,
} from "../../utils/mongooseIdsValidators.js";

class TopicRepository {
  async findById(id) {
    try {
      validateMongooseObjectId(id);
      return await TopicModel.findById(id).lean();
    } catch (error) {
      throw new Error(`Failed to find topic by ID: ${error.message}`);
    }
  }

  async findOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "categoryId"]);
      return await TopicModel.findOne(query).lean();
    } catch (error) {
      throw new Error(`Failed to find topic by query: ${error.message}`);
    }
  }

  async findManyByQuery(query = {}) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "categoryId"]);
      return await TopicModel.find(query).lean();
    } catch (error) {
      throw new Error(`Failed to find topics: ${error.message}`);
    }
  }

  async checkOneExists(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "categoryId"]);
      return await TopicModel.exists(query);
    } catch (error) {
      throw new Error(`Failed to check topic existence: ${error.message}`);
    }
  }

  async createOne(topicData) {
    try {
      validateMongooseObjectId(topicData.categoryId);
      return await TopicModel.create(topicData);
    } catch (error) {
      throw new Error(`Failed to create topic: ${error.message}`);
    }
  }

  async createMany(topicsData) {
    try {
      topicsData.forEach((topic) => {
        validateMongooseObjectId(topic.categoryId);
      });
      return await TopicModel.insertMany(topicsData);
    } catch (error) {
      throw new Error(`Failed to create topics: ${error.message}`);
    }
  }

  async updateOneById(id, updateData) {
    try {
      validateMongooseObjectId(id);
      if (updateData.categoryId) {
        validateMongooseObjectId(updateData.categoryId);
      }
      return await TopicModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update topic: ${error.message}`);
    }
  }

  async updateOneByQuery(query, updateData) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "categoryId"]);
      if (updateData.categoryId) {
        validateMongooseObjectId(updateData.categoryId);
      }
      return await TopicModel.findOneAndUpdate(query, updateData, { new: true }).lean();
    } catch (error) {
      throw new Error(`Failed to update topic: ${error.message}`);
    }
  }

  async deleteOneById(id) {
    try {
      validateMongooseObjectId(id);
      return await TopicModel.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new Error(`Failed to delete topic: ${error.message}`);
    }
  }

  async deleteOneByQuery(query) {
    try {
      validateMongooseIdsInQuery(query, ["_id", "categoryId"]);
      return await TopicModel.findOneAndDelete(query).lean();
    } catch (error) {
      throw new Error(`Failed to delete topic: ${error.message}`);
    }
  }

  async deleteManyByCategoryId(categoryId) {
    try {
      validateMongooseObjectId(categoryId);
      return await TopicModel.deleteMany({ categoryId }).lean();
    } catch (error) {
      throw new Error(`Failed to delete topics by category ID: ${error.message}`);
    }
  }
}

const topicRepository = new TopicRepository();
export default topicRepository;
