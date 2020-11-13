exports.up = (knex) => {
  return knex.schema.createTable("contacts", (table) => {
    table.string("id").primary();
    table.string("name");
    table.string("nickname");
    table.string("phone");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("contacts");
};
