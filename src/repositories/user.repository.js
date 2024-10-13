import UserModel from "../models/User.model.js";

class UserRepository {
  async getUserById(userId) {
    const user = await UserModel.findById(userId).lean();
    return user;
  }

  async createUser(data) {
    const result = await UserModel.create(data);
    return result;
  }

  async updateUserById(userId, data) {
    const result = await UserModel.findByIdAndUpdate(userId, data, { new: true }).lean();
    return result;
  }

  async deleteUserById(userId) {
    const result = await UserModel.findByIdAndDelete(userId);
    return result;
  }
}

const userRepository = new UserRepository();
export default userRepository;
