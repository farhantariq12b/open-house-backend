const { validateEmail } = require("../helpers");

class AuthUtil {
  static validateLoginUser(user) {
    if (!user) {
      throw {
        code: 400,
        message: "Request is malformed or incorrect",
      };
    }

    if (!user.email || !user.password) {
      throw {
        code: 401,
        message: "Email or password is incorrect",
      };
    }

    if (!validateEmail(user.email)) {
      throw {
        code: 400,
        message: "Please enter a valid email address",
      };
    }
  }

  static validateSignUp(user) {
    if (!user) {
      throw {
        code: 400,
        message: "Request is malformed or incorrect",
      };
    }

    if (!user.name) {
      throw {
        code: 400,
        message: "Name is required",
      };
    }

    if (!user.email || !user.password) {
      throw {
        code: 401,
        message: "Email or password is required",
      };
    }

    if (!validateEmail(user.email)) {
      throw {
        code: 400,
        message: "Please enter a valid email address",
      };
    }
  }
}

module.exports = AuthUtil;
