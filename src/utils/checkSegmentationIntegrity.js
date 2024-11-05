import categoryRepository from "../repositories/segmentation/category.repository.js";
import topicRepository from "../repositories/segmentation/topic.repository.js";
import tagRepository from "../repositories/segmentation/tag.repository.js";

const checkSegmentationIntegrity = async (categoryId, topicIds = [], tagIds = []) => {
  const existenceChecks = [
    categoryRepository.checkExistenceOfOne({ _id: categoryId }).then((result) => {
      if (!result) throw new Error(`Category with ID ${categoryId} not found`);
    }),
    ...topicIds.map((topicId) =>
      topicRepository.checkExistenceOfOne({ _id: topicId }).then((result) => {
        if (!result) throw new Error(`Topic with ID ${topicId} not found`);
      })
    ),
    ...tagIds.map((tagId) =>
      tagRepository.checkExistenceOfOne({ _id: tagId }).then((result) => {
        if (!result) throw new Error(`Tag with ID ${tagId} not found`);
      })
    ),
  ];

  return Promise.all(existenceChecks);
};

export default checkSegmentationIntegrity;
