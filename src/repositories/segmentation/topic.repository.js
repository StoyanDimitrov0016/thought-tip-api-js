import TopicModel from "../../models/segmentation/Topic.model.js";
import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";
import mongoDocumentFormatter from "../../utils/mongoDocumentFormatter.js";

class TopicRepository {
  async findOneById(id) {
    try {
      const topic = await TopicModel.findById(id).lean();
      return mongoDocumentFormatter(topic);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByFilter(filter = {}) {
    try {
      const topic = await TopicModel.findOne(filter).lean();
      return mongoDocumentFormatter(topic);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByFilter(filter) {
    try {
      const topics = await TopicModel.find(filter).sort({ popularity: -1 }).lean();
      return mongoDocumentFormatter(topics);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(createData) {
    try {
      const newTopic = await TopicModel.create(createData);
      const formattedTopic = newTopic.toObject();
      return mongoDocumentFormatter(formattedTopic);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(id, updateData) {
    try {
      const updatedTopic = await TopicModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }).lean();
      return mongoDocumentFormatter(updatedTopic);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOneByFilter(filter = {}) {
    try {
      const exists = await TopicModel.exists(filter).lean();
      return mongoDocumentFormatter(exists);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async countDocumentsByFilter(filter = {}) {
    try {
      return await TopicModel.countDocuments(filter);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateManyByCategoryId(categoryId, updateData) {
    try {
      return await TopicModel.updateMany({ categoryId }, updateData).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const topicRepository = new TopicRepository();
export default topicRepository;
