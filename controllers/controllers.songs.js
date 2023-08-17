const { knex } = require("../db/db");
const jwt = require("jsonwebtoken");

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

// exports.createPlayList = async (req, res) => {
//   const createPlaylist = await knex("playlist_songs").insert(req.body, "*");
//   res.status(200);
//   res.json(createPlaylist);
// };

exports.createPlayList = async (req, res) => {
  const songs = await knex("songs")
    .where("weather", "=", req.body.weather)
    .andWhere("mood", "=", req.body.mood)
    .andWhere("occasion", "=", req.body.occasion)
    .andWhere("genre", "=", req.body.genre);

  const insertID = await knex("playlist")
    .insert({ user_id: req.userInformation.userid, name: req.body.name })
    .returning("id");
  console.log(insertID);
  const playlistID = insertID[0].id;

  const newPlaylist = await songs.map((song) => ({
    song_id: song.id,
    playlist_id: playlistID,
  }));

  const insertingSongs = await knex("playlist_songs").insert(newPlaylist);

  res.status(200).json(songs);
};

exports.getPlayListByUser = async (req, res) => {
  // const secretKey = "secret-key";
  // const authorization_header = req.headers["authorization"];
  // const token = authorization_header.split(" ")[1];

  const getPlaylistByUser = await knex
    .select("*")
    .from("playlist")
    .where("user_id", "=", decodedToken.userid);
  // .innerJoin("playlist_songs", "playlist_songs.playlist_id", "playlist.id");
  res.status(200);
  res.json(getPlaylistByUser);
};

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
