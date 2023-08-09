const express = require("express");
const routes = express.Router();
const knex = require("../db/db");
const { songs } = require("../controllers/songs");
const { createUser } = require("../controllers/createUser");

routes.get("/songs", songs);

routes.post("/createuser", createUser);

// routes.get("/songartist", songsArtist);
module.exports = routes;
