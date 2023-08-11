const knex = require("knex")({
  client: "pg",
  connection: {
    host: "ep-summer-breeze-77183421.us-east-2.aws.neon.tech",
    port: 5432,
    user: "JestyUY",
    password: "sC0yKEh3HVnq",
    database: "neondb",
    ssl: true,
    sslmode: "verify-full",
  },
});

module.exports = { knex };
