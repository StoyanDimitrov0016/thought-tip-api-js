const createPaginationMetadata = ({
  totalCount,
  validPage,
  validSize,
  sort = null,
  filters = null,
}) => {
  const totalPages = Math.ceil(totalCount / validSize);

  return {
    totalCount,
    page: validPage,
    size: validSize,
    totalPages,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
    ...(sort && { sort }),
    ...(filters && { filters }),
  };
};

export default createPaginationMetadata;
