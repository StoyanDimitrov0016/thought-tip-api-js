import TagModel from "../../models/segmentation/Tag.model.js";
import { validateMongooseObjectId } from "../../utils/mongooseIdsValidators.js";

class TagRepository {
  async findOneById(id) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for findOneById:", id);
      return null;
    }
    return TagModel.findById(validationResult).lean();
  }

  async findOneBySlug(slug) {
    return TagModel.findOne({ slug }).lean();
  }

  async findAllByTopicId(topicId) {
    const validationResult = validateMongooseObjectId(topicId, false);
    if (!validationResult) {
      console.error("Invalid topicId format for findAllByTopicId:", topicId);
      return null;
    }
    return TagModel.find({ topicId: validationResult }).sort({ name: 1 }).lean();
  }

  async createOne(data) {
    return TagModel.create(data);
  }

  async updateOneById(id, data) {
    const validationResult = validateMongooseObjectId(id, false);
    if (!validationResult) {
      console.error("Invalid ID format for updateOneById:", id);
      return null;
    }
    return TagModel.findByIdAndUpdate(validationResult, data, { new: true }).lean();
  }

  async updateAllStatusesByTopicId(topicId, status) {
    const validationResult = validateMongooseObjectId(topicId, false);
    if (!validationResult) {
      console.error("Invalid topicId format for updateManyByTopicId:", topicId);
      return null;
    }

    const updateResult = await TagModel.updateMany(
      { topicId: validationResult },
      { $set: { status } }
    );

    return updateResult;
  }
}

const tagRepository = new TagRepository();
export default tagRepository;
