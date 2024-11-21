import topicRepository from "../../repositories/segmentation/topic.repository.js";
import categoryRepository from "../../repositories/segmentation/category.repository.js";
import {
  NotFoundError,
  InternalServerError,
} from "../../lib/errors/customErrors/ErrorSubclasses.js";
import { appendInteractionToEntry } from "../../lib/responses/helpers/interaction/appendInteractionToEntry.js";

class TopicService {
  attachInteraction(entry, user) {
    return appendInteractionToEntry("topic", entry, user);
  }

  async getOneById(topicId, user) {
    const topic = await topicRepository.findOneById(topicId);
    if (!topic) {
      throw new NotFoundError(`Topic with ID "${topicId}" could not be found.`, [
        { field: "id", message: "Topic not found." },
      ]);
    }

    return this.attachInteraction(topic, user);
  }

  async getOneBySlug(slug, user) {
    const topic = await topicRepository.findOneByFilter({ slug });
    if (!topic) {
      throw new NotFoundError(`Topic with slug "${slug}" could not be found.`, [
        { field: "slug", message: "Topic not found with the specified slug." },
      ]);
    }

    return this.attachInteraction(topic, user);
  }

  async getAllByCategorySlug(categorySlug, user) {
    const category = await categoryRepository.findOneByFilter({ slug: categorySlug });
    if (!category) {
      throw new NotFoundError(`Category with slug "${categorySlug}" not found.`, [
        { field: "slug", message: "Category not found with the specified slug." },
      ]);
    }

    const topics = await topicRepository.findManyByFilter({ categoryId: category.id });
    if (!topics.length) {
      throw new NotFoundError(`No topics found for category "${categorySlug}".`, [
        { field: "categoryId", message: "No topics associated with this category." },
      ]);
    }

    const enhancedTopics = topics.map((topic) => this.attachInteraction(topic, user));
    return enhancedTopics;
  }

  async createOne(createData) {
    const createdTopic = await topicRepository.createOne(createData);
    if (!createdTopic) {
      throw new InternalServerError("Failed to create the topic.", [
        { field: "topic", message: "Creation of the topic failed." },
      ]);
    }

    const categoryParent = await categoryRepository.findOneById(createdTopic.categoryId);
    if (!categoryParent) {
      throw new InternalServerError("Parent category for the topic not found.", [
        { field: "categoryId", message: "Parent category not found." },
      ]);
    }

    const updatedCategory = await categoryRepository.updateOneById(categoryParent.id, {
      $push: { topicPartials: { id: createdTopic.id, slug: createdTopic.slug } },
    });

    if (!updatedCategory) {
      throw new InternalServerError("Failed to update the parent category with the new topic.", [
        { field: "category", message: "Parent category update failed." },
      ]);
    }

    return createdTopic;
  }

  async updateOneById(topicId, data) {
    const updatedTopic = await topicRepository.updateOneById(topicId, data);
    if (!updatedTopic) {
      throw new NotFoundError(`Topic with ID "${topicId}" not found for update.`, [
        { field: "id", message: "Topic update failed because it was not found." },
      ]);
    }

    return updatedTopic;
  }

  async updateAllByCategoryId(categoryId, data) {
    const updateResult = await topicRepository.updateManyByCategoryId(categoryId, data);
    if (!updateResult || updateResult.nModified === 0) {
      throw new NotFoundError(
        `No topics associated with category ID "${categoryId}" could be updated.`,
        [{ field: "categoryId", message: "No topics updated for this category." }]
      );
    }

    return updateResult;
  }
}

const topicService = new TopicService();
export default topicService;
