import mongoose from "mongoose";

const mongoDocumentFormatter = (document) => {
  if (Array.isArray(document)) {
    return document.map(mongoDocumentFormatter);
  }

  if (document instanceof mongoose.Document) {
    return mongoDocumentFormatter(document.toObject());
  }

  if (typeof document === "object" && document !== null) {
    if (document instanceof mongoose.Types.ObjectId) {
      return document.toHexString();
    }

    const docCopy = { ...document };

    for (const key in docCopy) {
      if (docCopy[key] instanceof mongoose.Types.ObjectId) {
        docCopy[key] = docCopy[key].toHexString();
      } else if (docCopy[key] instanceof Date) {
        docCopy[key] = docCopy[key].toISOString();
      } else if (typeof docCopy[key] === "object") {
        docCopy[key] = mongoDocumentFormatter(docCopy[key]);
      }
    }

    const { _id, __v, ...rest } = docCopy;
    return { id: _id, ...rest };
  }

  return document;
};

export default mongoDocumentFormatter;
