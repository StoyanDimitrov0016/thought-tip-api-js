import tagService from "../../services/segmentation/tag.service.js";
import createMetadata from "../../lib/responses/helpers/metadata/createMetadata.js";
import OkSingleResponse from "../../lib/responses/successExtensions/OkSingleResponse.js";
import OkListResponse from "../../lib/responses/successExtensions/OkListResponse.js";
import CreatedResponse from "../../lib/responses/successExtensions/CreatedResponse.js";

const generateTagMetadata = (responseFormat, totalCount) =>
  createMetadata(responseFormat, "tag", totalCount);

const generateResponse = (ResponseClass, title, detail, instance, data, metadata) =>
  new ResponseClass(title, detail, instance, data, metadata);

class TagController {
  async getOneBySlug(req, res, next) {
    try {
      const { tagSlug } = req.params;
      const instance = req.originalUrl;
      const client = req.client;

      const tag = await tagService.getOneBySlug(tagSlug, client);
      const metadata = generateTagMetadata("single", 1);

      const response = generateResponse(
        OkSingleResponse,
        "Tag Retrieved",
        "The requested tag has been successfully retrieved.",
        instance,
        tag,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllByTopicSlug(req, res, next) {
    try {
      const { topic: topicSlug } = req.query;
      const instance = req.originalUrl;
      const client = req.client;

      const tags = await tagService.getAllByTopicSlug(topicSlug, client);
      const metadata = generateTagMetadata("list", tags.length);

      const response = generateResponse(
        OkListResponse,
        "Tags Retrieved by Topic",
        "The tags for the specified topic have been successfully retrieved.",
        instance,
        tags,
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
      const tagCreateData = req.body;

      const createdTag = await tagService.createOne(tagCreateData);
      const metadata = generateTagMetadata("single", 1);

      const response = generateResponse(
        CreatedResponse,
        "Tag Created",
        "The tag has been successfully created.",
        instance,
        createdTag,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const { id } = req.params;
      const instance = req.originalUrl;
      const tagUpdateData = req.body;

      const updatedTag = await tagService.updateOneById(id, tagUpdateData);
      const metadata = generateTagMetadata("single", 1);

      const response = generateResponse(
        OkSingleResponse,
        "Tag Updated",
        "The tag has been successfully updated.",
        instance,
        updatedTag,
        metadata
      );

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
}

const tagController = new TagController();
export default tagController;
