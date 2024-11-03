const MATCH_NON_ALPHANUMERIC_CHARS = /[^a-z0-9\s]/g;
const MATCH_WHITESPACE_CHARS = /\s+/g;
const MATCH_LEADING_AND_TRAILING_HYPHENS = /^-+|-+$/g;

const createSlug = (content) => {
  if (typeof content !== "string") {
    throw new Error(`Invalid content type for slug. Expected string instead of: ${typeof content}`);
  }

  if (content.length < 2) {
    throw new Error("Insufficient content length. Expected length over 1.");
  }

  const sanitizedContent = content.trim().toLowerCase().replace(MATCH_NON_ALPHANUMERIC_CHARS, "");

  const slug = sanitizedContent
    .replace(MATCH_WHITESPACE_CHARS, "-")
    .replace(MATCH_LEADING_AND_TRAILING_HYPHENS, "");

  return slug;
};

export default createSlug;
