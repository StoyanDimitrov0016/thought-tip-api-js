const AVG_READ_WORDS_PER_MIN = 230;
const MATCH_WHITESPACE = /\s+/g;

const sanitizeContent = (content) => {
  return content.replace(MATCH_WHITESPACE, " ").trim();
};

const calculateContentReadingTime = (content) => {
  const sanitizedContent = sanitizeContent(content);

  const sanitizedWordsArray = sanitizedContent.split(" ").filter((word) => word.length > 0);
  const words = sanitizedWordsArray.length;

  const averageReadingTime = Math.ceil(words / AVG_READ_WORDS_PER_MIN);

  return averageReadingTime;
};

export default calculateContentReadingTime;
