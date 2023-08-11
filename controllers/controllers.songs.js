const { knex } = require("../db/db");

exports.songs = async (req, res) => {
  const songs = await knex.select("*").from("songs");
  res.status(200);
  res.json(songs);
};

exports.playListUser = async (req, res) => {
  const playListUser = await knex("playlist").insert(req.body, "*");
  res.status(200);
  res.json(playListUser);
};

exports.createPlayList = async (req, res) => {
  const createPlaylist = await knex("playlist_songs").insert(req.body, "*")
  res.status(200)
  res.json(createPlaylist)
};

exports.getPlayListByUser = async (req, res) => {
  const getPlaylistByUser = await knex.select('*').from("playlist").innerJoin("playlist_songs", 'playlist_songs.playlist_id', 'playlist.id');
  res.status(200)
  res.json(getPlaylistByUser)
}



/*exports.createPlaylist = async (req, res) => {
  //leo animo clima etc
  //busco las canciones que encajan
  //creo nueva playlist con nombre y obtengo su id
  //para ese id inserto todas las canciones que encontre en la tabla playlist_songs
  //devuelvo el el objeto de la playlist para el usuario
  const createPlaylistName = await knex("playlist").insert(req.body, "name");
  const createPlaylist = await knex("playlist_songs").insert()
  res.status(200);
  res.json();
};*/

