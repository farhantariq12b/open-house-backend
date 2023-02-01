const knex = require("../databases/db");

class PropertyHandler {
  static fetchAllProperties(limit = 10, offset = 1) {
    return knex
      .select([
        "property.id",
        "property.address",
        knex.raw("json_agg(open_house.*) as open_houses"),
      ])
      .from("property")
      .leftJoin("open_house", "property.id", "open_house.property_id")
      .groupBy("property.id")
      .orderBy("property.id")
      .paginate({ perPage: limit, currentPage: offset, isLengthAware: true });
  }

  static fetchById(id) {
    return knex.raw(`select property.id, property.address, json_agg(open_houses.*) as open_houses from property left join (Select open_house.*, json_agg(uh.name) as user_names from open_house left join 
    (select public.user.name, user_house.open_house_id from user_house inner join public.user on user_house.user_id = public.user.id) as uh
    on open_house.id = uh.open_house_id
    group by open_house.id) as open_houses on open_houses.property_id = property.id  where property.id = ${id} group by property.id;
  `);
  }

  static addNewProperty(address) {
    return knex("property").insert({ address }).returning("id");
  }

  static deleteProperty(id) {
    return knex("property").where("id", id).del();
  }

  static findById(id) {
    return knex("property").where("id", id);
  }

  static updateProperty(id, address) {
    return knex("property").where("id", id).update({ address });
  }
}

module.exports = PropertyHandler;
