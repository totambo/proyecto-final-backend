const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "proyecto_final",
  },
});

module.exports = { knex };
