import topicService from "../../services/segmentation/topic.service.js";
import createMetadata from "../../lib/responses/helpers/metadata/createMetadata.js";
import OkSingleResponse from "../../lib/responses/successExtensions/OkSingleResponse.js";
import OkListResponse from "../../lib/responses/successExtensions/OkListResponse.js";
import CreatedResponse from "../../lib/responses/successExtensions/CreatedResponse.js";

const generateTopicMetadata = (responseFormat, totalCount) =>
  createMetadata(responseFormat, "topic", totalCount);

const generateResponse = (ResponseClass, title, detail, instance, data, metadata) =>
  new ResponseClass(title, detail, instance, data, metadata);

class TopicController {
  async getAllByCategorySlug(req, res, next) {
    try {
      const { category: categorySlug } = req.query;
      const instance = req.originalUrl;
      const client = req.client;

      const topics = await topicService.getAllByCategorySlug(categorySlug, client);

      const metadata = generateTopicMetadata("list", topics.length);
      const response = generateResponse(
        OkListResponse,
        "Topics Retrieved",
        `The topics for the category "${categorySlug}" have been successfully retrieved.`,
        instance,
        topics,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOneBySlug(req, res, next) {
    try {
      const { topicSlug } = req.params;
      const instance = req.originalUrl;
      const client = req.client;

      const topic = await topicService.getOneBySlug(topicSlug, client);

      const metadata = generateTopicMetadata("single", 1);
      const response = generateResponse(
        OkSingleResponse,
        "Topic Retrieved",
        `The topic with slug "${topicSlug}" has been successfully retrieved.`,
        instance,
        topic,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createOne(req, res, next) {
    try {
      const instance = req.originalUrl;
      const data = req.body;

      const createdTopic = await topicService.createOne(data);

      const metadata = generateTopicMetadata("single", 1);
      const response = generateResponse(
        CreatedResponse,
        "Topic Created",
        "The topic has been successfully created.",
        instance,
        createdTopic,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const { topicId } = req.params;
      const instance = req.originalUrl;
      const data = req.body;

      const updatedTopic = await topicService.updateOneById(topicId, data);

      const metadata = generateTopicMetadata("single", 1);
      const response = generateResponse(
        OkSingleResponse,
        "Topic Updated",
        "The topic has been successfully updated.",
        instance,
        updatedTopic,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { topicId } = req.params;
      const instance = req.originalUrl;
      const { status } = req.body;

      const updatedStatus = await topicService.updateOneById(topicId, { status });

      const metadata = generateTopicMetadata("single", 1);
      const response = generateResponse(
        OkSingleResponse,
        "Topic Status Updated",
        "The topic status has been successfully updated.",
        instance,
        updatedStatus,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

const topicController = new TopicController();
export default topicController;
