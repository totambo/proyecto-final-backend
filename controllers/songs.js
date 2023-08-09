const { knex } = require("../db/db");

exports.songs = async (req, res) => {
  const songs = await knex.select("*").from("songs");
  res.status(200);
  res.json(songs);
};

// exports.songsArtist = async (req, res) => {
//   const songsArtist = await knex.distinct("artist").from("songs");
//   res.status(200);
//   res.json(songsArtist);
// };
