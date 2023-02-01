exports.up = function (knex) {
  return knex.schema
    .createTable("admin", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("token", 255);
    })
    .createTable("user", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("token", 255);
    })
    .createTable("property", function (table) {
      table.increments("id");
      table.string("address", 1000).notNullable();
    })
    .createTable("open_house", function (table) {
      table.increments("id");
      table.integer("visitor_amount").notNullable();
      table
        .integer("property_id")
        .notNullable()
        .references("property.id")
        .onDelete("CASCADE");
      table.date("start_date");
    })
    .createTable("user_house", function (table) {
      table.increments("id");
      table.integer("user_id").references("user.id").notNullable();
      table.integer("open_house_id").references("open_house.id").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("user_house")
    .dropTable("admin")
    .dropTable("user")
    .dropTable("open_house")
    .dropTable("property")
};
