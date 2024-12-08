import { Schema, Types, model } from "mongoose";

const bookmarkSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    articleId: {
      type: Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookmarkSchema.index({ userId: 1 });
bookmarkSchema.index({ articleId: 1 });
bookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const BookmarkModel = model("Bookmark", bookmarkSchema);
export default BookmarkModel;
