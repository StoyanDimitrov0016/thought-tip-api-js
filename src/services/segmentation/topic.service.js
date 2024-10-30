import mongoose from "mongoose";
import topicRepository from "../../repositories/segmentation/topic.repository.js";
import categoryRepository from "../../repositories/segmentation/category.repository.js";
import tagRepository from "../../repositories/segmentation/tag.repository.js";

class TopicService {
  async getOneById(id) {
    return topicRepository.findOneById(id);
  }

  async getOneBySlug(slug) {
    return topicRepository.findOneBySlug(slug);
  }

  async getAllByCategoryId(categoryId) {
    return topicRepository.findAllByCategoryId(categoryId);
  }

  async getAllByCategorySlug(categorySlug) {
    const category = await categoryRepository.findOneBySlug(categorySlug);
    if (!category) {
      throw new Error("Category not found");
    }
    return topicRepository.findAllByCategoryId(category._id);
  }

  async createOne(data) {
    return topicRepository.createOne(data);
  }

  async updateOneContent(id, data) {
    return topicRepository.updateOne(id, data);
  }

  async updateOneStatus(id, status) {
    switch (status) {
      case "active":
        return topicRepository.updateOneById(id, { status: "active" });
      case "inactive":
        const tags = tagRepository.findAllByTopicId(id);
        if (!Array.isArray(tags) || tags.length === 0) {
          return topicRepository.updateOneById(id, { status: "inactive" });
        }

        break;
      case "archived":
        break;
      case "in development":
        break;

      default:
        break;
    }
  }

  async archiveOneById(id) {
    return topicRepository.archiveOne(id);
  }

  async archiveAllByCategoryId(categoryId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const topics = await topicRepository.findAllByCategoryId(categoryId);
      if (!topics?.length) {
        console.log(`No topics found under category ID: ${categoryId}.`);
        await session.abortTransaction();
        return null;
      }

      const allArchivedTags = [];
      for (const topic of topics) {
        const tags = await tagRepository.findAllByTopicId(topic._id);
        if (tags?.length) {
          const archivedTags = await tagRepository.archiveAllByTopicId(topic._id, { session });
          allArchivedTags.push({ [topic._id]: archivedTags });
        } else {
          console.log(`No tags found for topic ID: ${topic._id} under category ID: ${categoryId}.`);
        }
      }

      const archivedTopics = await topicRepository.archiveAll(categoryId, { session });
      await session.commitTransaction();

      console.log("Successfully archived topics and tags for category ID:", categoryId);
      return { archivedTopics, allArchivedTags };
    } catch (error) {
      await session.abortTransaction();
      console.error(`Error archiving topics and tags for category ID ${categoryId}:`, error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}

const topicService = new TopicService();
export default topicService;
