const knex = require("../databases/db");

class UserHandler {
  static findById(id) {
    return knex("user").where("id", id);
  }

  static insertUser(name) {
    return knex("user").insert({ name }).returning("*");
  }

  static getAllUser() {
    return knex("user");
  }
}

module.exports = UserHandler;
