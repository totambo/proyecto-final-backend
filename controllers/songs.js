const { knex } = require("../db/db");

exports.songs = async (req, res) => {
  const songs = await knex.select("*").from("song");
  res.status(200);
  res.json(songs);
};
