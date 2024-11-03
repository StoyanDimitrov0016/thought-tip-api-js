const generateRelativeURLs = (segmentationType, entrySlug) => {
  switch (segmentationType) {
    case "category":
      return {
        categoryURL: `/resources/categories/${entrySlug}`,
        categoryTopicURL: `/resources/topics?category=${entrySlug}`,
        categoryArticlesURL: `/articles?category=${entrySlug}`,
      };

    case "topic":
      return {
        topicURL: `/resources/topics/${entrySlug}`,
        topicTagURL: `/resources/tags?topic=${entrySlug}`,
        topicArticlesURL: `/articles?topic=${entrySlug}`,
      };

    case "tag":
      return {
        tagURL: `/resources/tags/${entrySlug}`,
        tagArticlesURL: `/articles?tag=${entrySlug}`,
      };

    default:
      return {};
  }
};

export default generateRelativeURLs;
