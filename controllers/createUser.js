const { knex } = require("../db/db");

exports.createUser = async (req, res) => {
  const createUser = await knex("users").insert(req.body);
  res.status(200);
  res.json({ mensaje: `gracias por registrarte  ` });
};
