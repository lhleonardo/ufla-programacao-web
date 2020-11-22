module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "knex_test",
      user: "postgres",
      password: "docker",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
