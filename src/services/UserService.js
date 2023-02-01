const UserHandler = require("../handler/UserHandler");

class UserService {
  static async createNewUser(name) {
    if (!name) {
      throw {
        code: 400,
        message: "Name is missing. Please provide one to proceed.",
      };
    }

    const user = await UserHandler.insertUser(name);

    return user.find(user => user);
  }

  static async getUsers(name, isAdmin) {
    if (!isAdmin) {
      throw {
        code: 403,
        message: "Only Admin is allowed to access this page.",
      };
    }

    const users = await UserHandler.getAllUser(name);

    return users || [];
  }
}

module.exports = UserService;
