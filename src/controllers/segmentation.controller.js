import { segmentationService as service } from "../services/segmentation.service.js";
import withNext from "../utils/HOFs/withNext.js";

class SegmentationController {
  constructor(service, type, wrapper) {
    this.service = service;
    this.type = type;

    this.getAll = wrapper(this.getAll.bind(this));
    this.getOne = wrapper(this.getOne.bind(this));
    this.create = wrapper(this.create.bind(this));
    this.update = wrapper(this.update.bind(this));
    this.remove = wrapper(this.remove.bind(this));
  }

  async getAll(req) {
    const { parentId } = req.params;
    const items = await this.service.getAll(parentId);
    return {
      status: 200,
      data: items,
      message: "Successfully retrieved items.",
    };
  }

  async getOne(req) {
    const { id } = req.params;
    const item = await this.service.getOne(id);
    return {
      status: 200,
      data: item,
      message: "Successfully retrieved item.",
    };
  }

  async create(req) {
    const { parentId } = req.params;
    const createdItem = await this.service.create(req.body, this.type, parentId);
    return {
      status: 201,
      data: createdItem,
      message: "Successfully created item.",
    };
  }

  async update(req) {
    const { id } = req.params;
    const updatedItem = await this.service.update(id, req.body);
    return {
      status: 200,
      data: updatedItem,
      message: "Successfully updated item.",
    };
  }

  async remove(req) {
    const { id } = req.params;
    await this.service.remove(id);
    return {
      status: 204,
      message: "Successfully deleted item.",
    };
  }
}

export const categoryController = new SegmentationController(service, "category", withNext);
export const topicController = new SegmentationController(service, "topic", withNext);
export const tagController = new SegmentationController(service, "tag", withNext);
