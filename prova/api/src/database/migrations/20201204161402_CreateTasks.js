exports.up = function (knex) {
  // name: tasks
  // fields: id, name, description

  return knex.schema.createTable("tasks", (table) => {
    table.string("id").primary(); // uuid
    table.string("name");
    table.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
