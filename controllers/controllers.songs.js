const { response } = require("express");
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

exports.createPlayList = async (req, res) => {
  const songs = await knex("songs")
    .where("weather", "=", req.body.weather)
    .andWhere("mood", "=", req.body.mood)
    .andWhere("occasion", "=", req.body.occasion)
    .andWhere("genre", "=", req.body.genre);

  const insertID = await knex("playlist")
    .insert({ user_id: req.userInformation.userid, name: req.body.name })
    .returning("id");
  const playlistID = insertID[0].id;

  const newPlaylist = await songs.map((song) => ({
    song_id: song.id,
    playlist_id: playlistID,
  }));

  const insertingSongs = await knex("playlist_songs").insert(newPlaylist);

  console.log(newPlaylist)

  res.status(200).json(songs);
};

exports.createPlayListByArtist = async (req, res) => {

    const { userid } = req.userInformation;
    const { name, artist } = req.body;

    const [playlistID] = await knex("playlist").insert({ user_id: userid, name }).returning("id");

    const songsPromises = artist.map(async (artistName) => {
      const songs = await knex("songs").where("artist", "=", artistName);
      return songs;
    });

    const songsArrays = await Promise.all(songsPromises);
    const songs = songsArrays.flat();

    const newPlaylist = songs.map((song) => ({
      song_id: song.id,
      playlist_id: playlistID.id,
    }))
    
    const insertingSongs = await knex("playlist_songs").insert(newPlaylist);
    res.status(200).json({ message: "Playlist created successfully." });
  };


exports.getPlayListByUser = async (req, res) => {

  // const getPlaylistByUser = await knex("playlist_songs")
  // .orderBy("playlist.id", "desc")
  // .select("songs.*", "playlist.name")
  // .join("playlist", "playlist_songs.playlist_id", "=", "playlist.id")
  // .join("songs", "playlist_songs.song_id", "=", "songs.id")
  // .where("playlist.user_id", req.userInformation.userid);
  // res.json(getPlaylistByUser);
  // console.log(getPlaylistByUser)

  const playlistSongs = await knex("playlist_songs")
  .orderBy("playlist.id", "desc")
  .first("playlist.id")
  .select("songs.*", "playlist.name as playlist_name")
  .innerJoin("playlist", "playlist_songs.playlist_id", "playlist.id")
  .innerJoin("songs", "playlist_songs.song_id", "songs.id")
  .where("playlist.user_id", req.userInformation.userid);
  console.log(playlistSongs)

  res.status(200);
  res.json(playlistSongs);

  //esta mal, no me dio para terminar son las 4 de la matina :(
};