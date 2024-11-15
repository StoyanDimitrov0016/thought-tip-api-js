import mongoose from "mongoose";

const mongoDocumentFormatter = (document) => {
  if (Array.isArray(document)) {
    return document.map((d) => mongoDocumentFormatter(d));
  }

  if (document instanceof mongoose.Document) {
    document = document.toObject();
  }

  if (typeof document === "object" && document !== null) {
    const docCopy = { ...document };

    for (const key in docCopy) {
      if (docCopy[key] instanceof mongoose.Types.ObjectId) {
        docCopy[key] = docCopy[key].toHexString();
      } else if (docCopy[key] instanceof Date) {
        continue;
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
