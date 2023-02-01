const knex = require("../databases/db");

class OpenHouseHandler {
  static bulkInsertHouses(openHouses) {
    return knex.batchInsert("open_house", openHouses).returning("*");
  }

  static update(openHouse) {
    return knex('open_house').update(openHouse).where('id', openHouse.id).returning("*");
  }

  static insert(openHouse) {
    return knex('open_house').insert(openHouse).returning("*");
  }


  static findById(id) {
    return knex("open_house").where("id", id).first();
  }

  static updateOpenHouse(houseId, user_id) {
    return knex("user_house").insert({ open_house_id: houseId, user_id });
  }

  static deleteByProperty(propertyId) {
    return knex("open_house").where("property_id", propertyId).del();
  }

  static findUserEnrolled(houseId, userId) {
    return knex("user_house").where({
      open_house_id: houseId,
      user_id: userId,
    });
  }

  static unEnrollUser(houseId) {
    return knex("user_house")
      .where({
        open_house_id: houseId
      })
      .del();
  }
}

module.exports = OpenHouseHandler;
