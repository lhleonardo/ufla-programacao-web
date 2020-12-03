exports.up = (knex) => {
  return knex.schema.createTable("contacts", (table) => {
    table.string("id").primary();
    table.string("name");
    table.string("nickname");
    table.string("phone");

    table.string("cep");
    table.string("address");
    table.string("neighborhood");
    table.string("number");
    table.string("city");
    table.string("state");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("contacts");
};
