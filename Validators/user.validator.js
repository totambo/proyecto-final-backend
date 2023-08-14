const { checkSchema } = require("express-validator");
const knex = require("../db/db");



module.exports = checkSchema({
  name: {
    in: ["body"],
    errorMessage: "name required",
    optional: false,
    isLength: {
      options: {min: 2, max: 50},
    },
  },
  password: {
    in: ["body"],
    errorMessage: "password required, minimum 8 characters",
    optional: false,
    isLength: {
      options: {min: 8, max: 50},
    },
  },
  username: {
    in: ["body"],
    errorMessage: "username required, must be between 6 and 50 characters",
    optional: false,
    isLength: {
      options: {min: 6, max: 50},
      custom: {
        options: async (value) => {
          const queryResponse = await knex("users").where({
            username: value,
          });
          const user = queryResponse[0];
          if (user) {
            throw new Error("username already taken");
          }
          return true;
        },
      },
    },
  },
  email: {
    in: ["body"],
    errorMessage:
      "email required (user@example.com)",
    isEmail: true,
    optional: false,
    custom: {
      options: async (value) => {
        const queryResponse = await knex("users").where({
          email: value,
        });
        const user = queryResponse[0];
        if (user) {
          throw new Error("email already exist");
        }
        return true;
      },
    },
  },
});