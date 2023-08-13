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

exports.getUser = async (req, res) => {
  const getUser = await knex.select("*").from("users").where({id : req.params.id});
    if (getUser.length === 0) {
      res.status(404);
      res.json({ response: "not found"})
    } else { 
      res.status(200);
      res.json({ getUser });}
 }

 exports.deleteUser = async (req, res) => {
  const deleteUser = await knex("users").where({id : req.params.id}).del();
      res.status(200);
      res.json({ response: "User deleted"})
 }




// login queda pendiente

