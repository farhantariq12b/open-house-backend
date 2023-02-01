const jwt = require("jsonwebtoken");
const AuthHandler = require("../handler/AuthHandler");
const AuthUtil = require("../utils/AuthUtil");
const BCrypt = require("../utils/ByCrypt");

class AuthService {
  static async verifyJWT(authorization) {
    if (!authorization) {
      throw {
        code: 401,
        message: "Invalid token provided",
      };
    }

    const token = authorization.replace("Bearer ", "");
    try {
      const { email, user_id, isAdmin } = jwt.verify(
        token,
        process.env.TOKEN_KEY
      );

      let user = null;

      if (isAdmin) {
        user = await AuthHandler.findAdmin(email, user_id);
      } else {
        user = await AuthHandler.find(email, user_id);
      }

      if (!user.length) {
        throw "error";
      }

      return isAdmin || false;
    } catch (error) {
      console.log(error, 401);
      throw {
        code: 401,
        message: "Invalid token provided",
      };
    }
  }

  static async login(user) {
    AuthUtil.validateLoginUser(user);
    let isAdmin = false;
    let existingUser = await AuthHandler.findbyEmail(user.email);

    if (!existingUser.length) {
      existingUser = await AuthHandler.findAdminbyEmail(user.email);

      if (!existingUser.length) {
        throw {
          code: 401,
          message: "User with this email is not registered.",
        };
      }

      isAdmin = true;
    }

    const userFound = existingUser.find((u) => u);

    await BCrypt.comparePassword(user.password, userFound.password);

    const token = jwt.sign(
      { user_id: userFound.id, email: user.email, isAdmin },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    console.log(token, "token");

    await AuthHandler.updateUser({
      ...userFound,
      token,
    });

    return { ...userFound, token };
  }

  static async signUp(user, isAdmin) {
    AuthUtil.validateSignUp(user);

    if (!isAdmin) {
      return this.createUser(user);
    }

    return this.createAdmin(user);
  }

  static async createUser(user) {
    await this.checkIfExistInSystem(user.email);

    const encryptedPassword = await BCrypt.convertPasswordToHash(user.password);

    const createdUser = await AuthHandler.createNewUser({
      ...user,
      password: encryptedPassword,
    });

    let newUser = createdUser.find((u) => u);

    const token = jwt.sign(
      { email: newUser.email, user_id: newUser.id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    await AuthHandler.updateUser({
      ...newUser,
      token,
    });

    return {
      ...newUser,
      token,
    };
  }

  static async checkIfExistInSystem(email) {
    let userExists = await AuthHandler.findbyEmail(email);

    if (userExists.length) {
      throw {
        code: 401,
        message: "User with this email is already registered.",
      };
    }

    userExists = await AuthHandler.findAdminbyEmail(email);

    if (userExists.length) {
      throw {
        code: 401,
        message: "User with this email is already registered.",
      };
    }
  }

  static async createAdmin(user) {
    await this.checkIfExistInSystem(user.email);

    const encryptedPassword = await BCrypt.convertPasswordToHash(user.password);

    const createdUser = await AuthHandler.createNewAdminUser({
      ...user,
      password: encryptedPassword,
    });

    let newUser = createdUser.find((u) => u);

    const token = jwt.sign(
      { email: newUser.email, user_id: newUser.id, isAdmin: true },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    await AuthHandler.updateAdminUser({
      ...newUser,
      token,
    });

    return {
      ...newUser,
      token,
    };
  }
}

module.exports = AuthService;
