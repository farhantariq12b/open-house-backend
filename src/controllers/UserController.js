const UserService = require("../services/UserService");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { name } = req.body;

      const users = await UserService.getUsers(name, req.isAdmin);
      res.status(200).send({ users });
    } catch (error) {
      res.status(error.code || 500).send({ message: error.message });
    }
  }

  static async createNewUser(req, res) {
    try {
      const { name } = req.body;

      const user = await UserService.createNewUser(name);
      res.status(200).send({ user });
    } catch (error) {
      res.status(error.code || 500).send({ message: error.message });
    }
  }
}

module.exports = UserController;
