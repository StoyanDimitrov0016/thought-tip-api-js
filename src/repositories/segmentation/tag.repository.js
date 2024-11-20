import TagModel from "../../models/segmentation/Tag.model.js";
import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";
import mongoDocumentFormatter from "../../utils/mongoDocumentFormatter.js";

class TagRepository {
  async findOneById(id) {
    try {
      const tag = await TagModel.findById(id).lean();
      return mongoDocumentFormatter(tag);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByFilter(filter) {
    try {
      const tag = await TagModel.findOne(filter).lean();
      return mongoDocumentFormatter(tag);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByFilter(filter) {
    try {
      const tags = await TagModel.find(filter).sort({ name: 1 }).lean();
      return mongoDocumentFormatter(tags);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(createData) {
    try {
      const newTag = await TagModel.create(createData);
      const formattedTag = newTag.toObject();
      return mongoDocumentFormatter(formattedTag);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(id, updateData) {
    try {
      const updatedTag = await TagModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
      return mongoDocumentFormatter(updatedTag);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOneByFilter(filter) {
    try {
      const match = await TagModel.exists(filter).lean();
      return mongoDocumentFormatter(match);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async countDocumentsByFilter(filter) {
    try {
      return await TagModel.countDocuments(filter);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateAllByTopicId(topicId, updateData, session = null) {
    try {
      return await TagModel.updateMany({ topicId }, updateData).session(session).lean();
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}
const tagRepository = new TagRepository();
export default tagRepository;
