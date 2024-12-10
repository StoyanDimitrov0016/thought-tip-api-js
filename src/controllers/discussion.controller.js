import { discussionService as service } from "../services/discussion.service.js";
import withNext from "../utils/HOFs/withNext.js";

class DiscussionController {
  #service;
  #type;

  constructor(service, type, wrapper) {
    this.#service = service;
    this.#type = type;

    this.getAll = wrapper(this.getAll.bind(this));
    this.getOne = wrapper(this.getOne.bind(this));
    this.create = wrapper(this.create.bind(this));
    this.update = wrapper(this.update.bind(this));
    this.remove = wrapper(this.remove.bind(this));
  }

  #extractQuery(req) {
    //TODO: I can add sort too
    const articleId = req.query["article-id"] || null;
    const parentId = this.#type === "comment" ? null : req.query["parent-id"] || null;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const size = Math.max(parseInt(req.query.size) || 10, 1);

    return { articleId, parentId, page, size: Math.min(size, 30) };
  }

  async getAll(req) {
    const { articleId, parentId, page, size } = this.#extractQuery(req);

    const filter = { articleId, parentId };
    const options = { skip: (page - 1) * size, limit: size };

    const items = await this.#service.getAll(filter, options, req.user);
    return {
      status: 200,
      data: items,
      message: "Successfully retrieved items.",
      metadata: { page, size, total: items.length },
    };
  }

  async getOne(req) {
    const item = await this.#service.getOne(req.params.id, req.user);
    return { status: 200, data: item, message: "Successfully retrieved item." };
  }

  async create(req) {
    const created = await this.#service.create(req.body, req.user);
    return { status: 201, data: created, message: "Successfully created item." };
  }

  async update(req) {
    const updated = await this.#service.update(req.params.id, req.body, req.user);
    return { status: 200, data: updated, message: "Successfully updated item." };
  }

  async remove(req) {
    await this.#service.remove(req.params.id, this.#type, req.user);
    return { status: 204, message: "Successfully deleted item." };
  }
}

export const commentController = new DiscussionController(service, "comment", withNext);
export const replyController = new DiscussionController(service, "reply", withNext);
