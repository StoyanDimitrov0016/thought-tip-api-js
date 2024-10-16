import { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
  },
});

export default CategorySchema;
