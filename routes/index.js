const express = require("express");
const routes = express.Router();
const knex = require("../db/db");
const { songs, playListUser, createPlayList, getPlayListByUser } = require("../controllers/controllers.songs");
const { createUser, getUsers } = require("../controllers/controllers.users");

routes.get("/songs", songs);

routes.get("/users", getUsers);

routes.post("/create-user", createUser);

routes.post("/create-user-playlist", playListUser);

routes.post("/create-playlist", createPlayList);

routes.get("/play-list-byuser", getPlayListByUser);



// routa de login

module.exports = routes;
