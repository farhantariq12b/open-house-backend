const bcrypt = require("bcrypt");

class BCrypt {
  static convertPasswordToHash(password) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err)
          reject({
            code: 500,
            message: "Something went wrong while encoding password",
          });

        resolve(hash);
      });
    });
  }

  static comparePassword(enteredPassword, userPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(enteredPassword, userPassword, (err, result) => {
        if (result) {
          resolve(result);
        }

        reject({
          code: 401,
          message: "Invalid password provided.",
        });
      });
    });
  }
}

module.exports = BCrypt;
