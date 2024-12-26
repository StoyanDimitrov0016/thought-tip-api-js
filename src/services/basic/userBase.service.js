import { ServiceBase } from "./Base.service.js";
import UserModel from "../../models/User.model.js";
import { Errors } from "../../lib/classes/customErrors.js";
import { wrapService } from "../../lib/HOFs/wrapService.js";
import { checkPrivilege } from "../../utils/helpers/checkPrivilege.js";
import passwordManager from "../../lib/managers/passwordManager.js";

class UserBaseService extends ServiceBase {
  constructor(config) {
    super(config);
    this.passwordManager = config.passwordManager;
    this.checkPrivilege = config.checkPrivilege;

    this.registerUser = this.defineMethod(this.registerUser);
    this.loginUser = this.defineMethod(this.loginUser);
    this.getUser = this.defineMethod(this.getUser);
    this.updateUserByClient = this.defineMethod(this.updateUserByClient);
    this.updateUserInternally = this.defineMethod(this.updateUserInternally);
  }

  sanitizeUser(document) {
    const { _id, core, ...rest } = document;
    const { hashedPassword: _, ...coreSanitized } = core;
    const sanitized = { id: _id, core: coreSanitized, ...rest };
    return sanitized;
  }

  async registerUser(email, username, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new this.Errors.ValidationError("Passwords does not match.");
    }

    const [isEmailTaken, isUsernameTaken] = await Promise.all([
      this.exists({ email }),
      this.exists({ username }),
    ]);

    if (isEmailTaken) {
      throw new this.Errors.DuplicationError(`Email '${email}' is already in use.`);
    }

    if (isUsernameTaken) {
      throw new this.Errors.DuplicationError(`Username '${username}' is already in use.`);
    }

    const hashedPassword = await this.passwordManager.hash(password);
    const userData = {
      core: {
        email,
        username,
        hashedPassword,
        role: "regular",
        wallet: null,
        verified: false,
        articleCountLimit: 20,
        publishedArticles: 0,
      },
      details: { firstName: null, lastName: null, profilePicture: null, bio: null },
    };

    const created = await this.Model.create(userData);
    const parsed = this.handleCreated(created);
    return this.sanitizeUser(parsed);
  }

  async loginUser(usernameOrEmail, password) {
    const existingUser = await this.Model.findOne({
      $or: [{ "core.email": usernameOrEmail }, { "core.username": usernameOrEmail }],
    }).lean();

    this.handleRetrieved(existingUser, "Invalid credentials.");

    const doesPasswordsMatch = await this.passwordManager.compare(
      password,
      existingUser.core.hashedPassword
    );
    console.log("after pass manager", doesPasswordsMatch);
    if (!doesPasswordsMatch) {
      throw new this.BadRequestError("Invalid credentials.");
    }

    return this.sanitizeUser(existingUser);
  }

  async getUser(userId) {
    const user = await this.Model.findById(userId).lean();
    this.handleRetrieved(user, `User with id: ${userId} not found.`);
    return this.sanitizeUser(user);
  }

  async updateUserByClient(userId, updateData, client) {
    const existingUser = await this.Model.findById(userId).lean();
    this.handleRetrieved(existingUser, `User with id: ${userId} not found.`);

    const { isOwner } = this.checkPrivilege(existingUser._id, client);
    if (!isOwner) {
      throw new this.Errors.ForbiddenError(
        `Only the owner can update user data. Client id: ${client.id}, User id: ${userId}.`
      );
    }

    const updated = await this.Model.findByIdAndUpdate(userId, updateData, { new: true }).lean();
    this.handleUpdated(updated);
    return this.sanitizeUser(updated);
  }

  async updateUserInternally(userId, updateData) {
    const existingUser = await this.Model.findById(userId).lean();
    this.handleRetrieved(existingUser, `User with id: ${userId} not found.`);

    const updated = await this.Model.findByIdAndUpdate(userId, updateData, { new: true }).lean();
    this.handleUpdated(updated);
    return this.sanitizeUser(updated);
  }
}

const config = {
  Model: UserModel,
  Errors,
  wrapper: wrapService,
  passwordManager,
  checkPrivilege,
};

const userBaseService = Object.freeze(new UserBaseService(config));
export default userBaseService;
