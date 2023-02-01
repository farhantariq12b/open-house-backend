const AuthService = require("../services/AuthService");

class AuthController {
  static async login(req, res) {
    try {
      const user = req.body;

      const updateUser = await AuthService.login(user);
      console.log(updateUser, 'updateUser')
      res.status(200).send({ user: updateUser, success: true });
    } catch (error) {
      res.status(error.code || 500).send({
        message: error.message || "Something went wrong while logging you in",
      });
    }
  }

  static async signup(req, res) {
    try {
      const { isAdmin, ...user } = req.body;

      const updateUser = await AuthService.signUp(user, isAdmin);
      res.status(200).send({ user: updateUser, success: true });
    } catch (error) {
      console.log(error)
      res.status(error.code || 500).send({
        message: error.message || "Something went wrong while logging you in",
      });
    }
  }

  static async verifyJWT(req, res, next) {
    try {
      const authorization = req.headers['authorization'];

      const isAdmin = await AuthService.verifyJWT(authorization);
      req.isAdmin = isAdmin
      next()
    } catch (error) {
      res.status(error.code || 500).send({
        message: error.message || "Something went wrong while logging you in",
      });
    }
  }
}

module.exports = AuthController;
