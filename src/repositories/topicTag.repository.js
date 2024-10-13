import TagModel from "../models/Tag.model.js";
import TopicModel from "../models/Topic.model.js";

class TagTopicRepository {
  async createTopic(topicName) {
    const topic = await TopicModel.create({ name: topicName });
    return topic;
  }

  async createTag(topicId, tagName) {
    const tag = await TagModel.create({ topicId, name: tagName });
    return tag;
  }

  async getAllTopics() {
    const topics = await TopicModel.find().lean();
    return topics;
  }

  async getTagsByTopicId(topicId) {
    const tags = await TagModel.find({ topicId }).lean();
    return tags;
  }

  async updateTopicById(topicId, topicName) {
    const updatedTopic = await TopicModel.findByIdAndUpdate(
      topicId,
      { name: topicName },
      { new: true }
    ).lean();
    return updatedTopic;
  }

  async updateTagById(tagId, tagName) {
    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      { name: tagName },
      { new: true }
    ).lean();
    return updatedTag;
  }

  async deleteTopicById(topicId) {
    await TagModel.deleteMany({ topicId });
    const result = await TopicModel.findByIdAndDelete(topicId);
    return result;
  }

  async deleteTagById(tagId) {
    const result = await TagModel.findByIdAndDelete(tagId);
    return result;
  }
}

const tagTopicRepository = new TagTopicRepository();
export default tagTopicRepository;
