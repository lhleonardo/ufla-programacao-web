module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "docker",
    database: "tasks_example",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/src/database/migrations/`,
  },
};
