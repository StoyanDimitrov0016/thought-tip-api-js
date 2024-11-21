import tagRepository from "../../repositories/segmentation/tag.repository.js";
import topicRepository from "../../repositories/segmentation/topic.repository.js";
import { NotFoundError } from "../../lib/errors/customErrors/ErrorSubclasses.js";
import { appendInteractionToEntry } from "../../lib/responses/helpers/interaction/appendInteractionToEntry.js";

class TagService {
  attachInteraction(entry, user) {
    return appendInteractionToEntry("tag", entry, user);
  }

  async getOneById(tagId, user) {
    const tag = await tagRepository.findOneById(tagId);
    if (!tag) {
      throw new NotFoundError(`Tag with ID "${tagId}" not found.`, [
        { field: "id", message: "No tag exists with the specified ID." },
      ]);
    }

    return this.attachInteraction(tag, user);
  }

  async getOneBySlug(slug, user) {
    const tag = await tagRepository.findOneByFilter({ slug });
    if (!tag) {
      throw new NotFoundError(`Tag with slug "${slug}" not found.`, [
        { field: "slug", message: "No tag exists with the specified slug." },
      ]);
    }

    return this.attachInteraction(tag, user);
  }

  async getAll(user) {
    const tags = await tagRepository.findManyByFilter();

    if (!tags.length) {
      throw new NotFoundError("No tags found.", [
        { field: "tags", message: "No tags are currently available." },
      ]);
    }

    const enhancedTags = tags.map((t) => this.attachInteraction(t, user));
    return enhancedTags;
  }

  async getAllByTopicSlug(topicSlug, user) {
    const topic = await topicRepository.findOneByFilter({ slug: topicSlug });
    if (!topic) {
      throw new NotFoundError(`Topic with slug "${topicSlug}" not found.`, [
        { field: "topicSlug", message: "No topic exists with the specified slug." },
      ]);
    }

    const tags = await tagRepository.findManyByFilter({ topicId: topic.id });
    if (!tags.length) {
      throw new NotFoundError("No tags found for the specified topic.", [
        { field: "tags", message: "No tags exist for the given topic." },
      ]);
    }

    const enhancedTags = tags.map((t) => this.attachInteraction(t, user));
    return enhancedTags;
  }

  async createOne(data) {
    const createdTag = await tagRepository.createOne(data);

    const topicParent = await topicRepository.findOneById(createdTag.topicId);
    if (!topicParent) {
      throw new NotFoundError("Failed to find the parent topic for the tag.", [
        { field: "topicId", message: "Parent topic not found." },
      ]);
    }

    const updatedTopic = await topicRepository.updateOneById(topicParent.id, {
      $push: { tagPartials: { id: createdTag.id, slug: createdTag.slug } },
    });

    if (!updatedTopic) {
      throw new NotFoundError("Failed to update the parent topic with the new tag.", [
        { field: "topic", message: "Parent topic update failed." },
      ]);
    }

    return createdTag;
  }

  async updateOneById(id, data) {
    const updatedTag = await tagRepository.updateOneById(id, data);
    if (!updatedTag) {
      throw new NotFoundError(`Tag with ID "${id}" not found for update.`, [
        { field: "id", message: "Tag update failed because it was not found." },
      ]);
    }

    return updatedTag;
  }
}

const tagService = new TagService();
export default tagService;
