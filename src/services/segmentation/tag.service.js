import tagRepository from "../../repositories/segmentation/tag.repository.js";
import topicRepository from "../../repositories/segmentation/topic.repository.js";

class TagService {
  async getOneById(id) {
    return tagRepository.findOneById(id);
  }

  async getOneBySlug(slug) {
    return tagRepository.findOneBySlug(slug);
  }

  async getAllByTopicId(topicId) {
    return tagRepository.findAllByCategoryId(topicId);
  }

  async getAllByTopicSlug(topicSlug) {
    const topic = await topicRepository.findOneBySlug(topicSlug);
    if (!topic) {
      throw new Error("Topic not found");
    }
    return tagRepository.findAllByCategoryId(topic._id);
  }

  async createOne(data) {
    return tagRepository.createOne(data);
  }

  async updateOne(id, data) {
    return tagRepository.updateOne(id, data);
  }

  async archiveOneById(id) {
    return tagRepository.archiveOne(id);
  }

  async archiveAllByTopicId(topicId) {
    return tagRepository.archiveAll(topicId);
  }
}

const tagService = new TagService();
export default tagService;
