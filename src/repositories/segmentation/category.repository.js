import CategoryModel from "../../models/segmentation/Category.model.js";
import dbErrorHandler from "../../lib/errors/errorHandlers/dbErrorHandler.js";
import mongoDocumentFormatter from "../../utils/mongoDocumentFormatter.js";

class CategoryRepository {
  async findOneById(id) {
    try {
      const category = await CategoryModel.findById(id).lean();
      return mongoDocumentFormatter(category);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findOneByFilter(filter = {}) {
    try {
      const category = await CategoryModel.findOne(filter).lean();
      return mongoDocumentFormatter(category);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async findManyByFilter(filter = {}, size = 10, skip = 0, sort = { popularity: -1 }) {
    try {
      const categories = await CategoryModel.find(filter).sort(sort).skip(skip).limit(size).lean();
      return mongoDocumentFormatter(categories);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async createOne(createData) {
    try {
      const newCategory = await CategoryModel.create(createData);
      return mongoDocumentFormatter(newCategory.toObject());
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async updateOneById(id, updateData, session = null) {
    try {
      const updatedDocument = await CategoryModel.findByIdAndUpdate(id, updateData, {
        new: true,
      })
        .session(session)
        .lean();
      return mongoDocumentFormatter(updatedDocument);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async checkOneByFilter(filter = {}) {
    try {
      const exists = await CategoryModel.exists(filter);
      return mongoDocumentFormatter(exists);
    } catch (error) {
      dbErrorHandler(error);
    }
  }

  async countDocumentsByFilter(filter = {}) {
    try {
      return await CategoryModel.countDocuments(filter);
    } catch (error) {
      dbErrorHandler(error);
    }
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
