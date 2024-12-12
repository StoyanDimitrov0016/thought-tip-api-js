export class SingleMetadata {
  constructor(linkGenerator, collectionName) {
    this.links = linkGenerator(collectionName);
  }
}

export class ListMetadata extends SingleMetadata {
  constructor(linkGenerator, collectionName, totalCount) {
    super(linkGenerator, collectionName);

    this.totalCount = totalCount;
  }
}

export class PaginatedMetadata extends ListMetadata {
  constructor(linkGenerator, collectionName, totalCount, page, size) {
    super(linkGenerator, collectionName, totalCount);

    const totalPages = Math.ceil(totalCount / size);
    this.pagination = {
      page,
      size,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }
}
