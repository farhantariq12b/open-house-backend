const knex = require("../databases/db");

class AuthHandler {
  static find(email, id) {
    return knex("user").where({ email, id })
  }

  static findAdmin(email, id) {
    return knex("admin").where({ email, id })
  }

  static findByName(name) {
    return knex("user").where("name", name);
  }

  static findbyEmail(email) {
    return knex("user").where("email", email);
  }

  static createNewUser(user) {
    return knex("user").insert(user).returning("*");
  }

  static updateUser(user) {
    return knex("user").update(user).where('id', user.id);
  }

  static findAdminbyEmail(email) {
    return knex("admin").where("email", email);
  }

  static createNewAdminUser(admin) {
    return knex("admin").insert(admin).returning("*");
  }

  static updateAdminUser(admin) {
    return knex("admin").update(admin).where('id', admin.id).returning("*");
  }
}

module.exports = AuthHandler;
