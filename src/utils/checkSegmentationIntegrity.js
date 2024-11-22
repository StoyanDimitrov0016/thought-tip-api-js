import categoryRepository from "../repositories/segmentation/category.repository.js";
import topicRepository from "../repositories/segmentation/topic.repository.js";
import tagRepository from "../repositories/segmentation/tag.repository.js";
import { NotFoundError } from "../lib/errors/customErrors/ErrorSubclasses.js";

const checkSegmentationIntegrity = async (categorySlug, topicSlugs = [], tagSlugs = []) => {
  const categoryCheck = categoryRepository.checkOneByFilter({ slug: categorySlug });
  const topicChecks = topicSlugs.map((ts) => topicRepository.checkOneByFilter({ slug: ts }));
  const tagChecks = tagSlugs.map((ts) => tagRepository.checkOneByFilter({ slug: ts }));

  const allChecks = [categoryCheck, ...topicChecks, ...tagChecks];
  const results = await Promise.allSettled(allChecks);

  const errors = results
    .map((result, index) => {
      if (result.status === "rejected" || !result.value) {
        if (index === 0) {
          return {
            field: "category",
            message: `Category with slug "${categorySlug}" not found.`,
          };
        } else if (index <= topicSlugs.length) {
          return {
            field: "topics",
            message: `Topic with slug "${topicSlugs[index - 1]}" not found.`,
          };
        } else {
          const tagIndex = index - 1 - topicSlugs.length;
          return {
            field: "tags",
            message: `Tag with slug "${tagSlugs[tagIndex]}" not found.`,
          };
        }
      }
      return null;
    })
    .filter(Boolean);

  if (errors.length > 0) {
    throw new NotFoundError("Segmentation integrity check failed.", errors);
  }

  const parsedSegmentationIds = {
    category: results[0].value.id,
    topics: results.slice(1, 1 + topicSlugs.length).map((r) => r.value.id),
    tags: results.slice(1 + topicSlugs.length).map((r) => r.value.id),
  };

  return parsedSegmentationIds;
};

export default checkSegmentationIntegrity;
