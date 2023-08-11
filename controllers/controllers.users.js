const { knex } = require("../db/db");

exports.createUser = async (req, res) => {
  const createUser = await knex("users").insert(req.body, "*");
  res.status(200);
  res.json(createUser);
};

exports.getUsers = async (rec, res) => {
 const getUsers = await knex.select("*").from("users");
  res.status(200);
  res.json(getUsers)
}



// login queda pendiente

