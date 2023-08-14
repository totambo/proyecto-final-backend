const express = require("express");
const routes = express.Router();
const knex = require("../db/db");
const {
  songs,
  playListUser,
  createPlayList,
  getPlayListByUser,
} = require("../controllers/controllers.songs");
const {
  createUser,
  getUsers,
  login,
  getAdmin,
} = require("../controllers/controllers.users");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  songs,
  playListUser,
  createPlayList,
  getPlayListByUser,
} = require("../controllers/controllers.songs");
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/controllers.users");

routes.get("/songs", songs);

routes.get("/users", getUsers);

routes.get("/user/:id", getUser);

routes.post("/create-user", createUser);

routes.post("/create-user-playlist", playListUser);

routes.post("/create-playlist", createPlayList);

routes.get("/play-list-byuser", getPlayListByUser);

routes.post("/register", createUser);

routes.delete("/delete-user/:id", deleteUser);

routes.post("/login", login);

routes.get("/admin", verifyToken, getAdmin);
// routa de login

// routes.get("/songartist", songsArtist);
module.exports = routes;
