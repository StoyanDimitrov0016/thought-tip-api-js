import tagRepository from "../../repositories/segmentation/tag.repository.js";
import topicRepository from "../../repositories/segmentation/topic.repository.js";

class TagService {
  async findOneById(id) {
    return tagRepository.findOneById(id);
  }

  async findOneBySlug(slug) {
    return tagRepository.findOneBySlug(slug);
  }

  async findAllByTopicId(topicId) {
    return tagRepository.findAllByCategoryId(topicId);
  }

  async findAllByTopicSlug(topicSlug) {
    const topic = await topicRepository.findOneBySlug(topicSlug);
    if (!topic) {
      throw new Error("Topic not found");
    }
    return tagRepository.findAllByCategoryId(topic._id);
  }

  async findAllByTopicId(topicId) {
    return tagRepository.findAllByTopicId(topicId);
  }

  async createOne(data) {
    return tagRepository.createOne(data);
  }

  async updateOneById(id, data) {
    return tagRepository.updateOne(id, data);
  }

  async updateAllStatusesByTopicId(topicId, newStatus) {
    return tagRepository.updateAllStatusesByTopicId(topicId, newStatus);
  }
}

const tagService = new TagService();
export default tagService;
