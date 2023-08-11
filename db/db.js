const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "cococoro1",
    database: "proyecto_final",
  },
});

module.exports = { knex };
