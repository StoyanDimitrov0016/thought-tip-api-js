export const personalizeArticle = (article, userId) => {
  const isAuthor = article.author._id.toString() === userId;
  // TODO: check if the user has liked the article also after adding like pipeline

  article["isAuthor"] = isAuthor;
  return article;
};
