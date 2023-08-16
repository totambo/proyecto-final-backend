const { knex } = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// para crear usuarios con pass hasheada
exports.createUser = async (req, res) => {
  try {
    const userCheck = await knex("users")
      .where({
        email: req.body.email,
      })
      .first();

    if (userCheck) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
      };

      const createUser = await knex("users").insert(newUser);
      return res
        .status(201)
        .json({ message: "User created successfully", created: true });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", created: false });
  }
};

exports.getUsers = async (req, res) => {
  const getUsers = await knex.select("*").from("users");
  res.status(200);
  res.json(getUsers);
};

exports.getUser = async (req, res) => {
  const getUser = await knex
    .select("*")
    .from("users")
    .where({ id: req.params.id });
  if (getUser.length === 0) {
    res.status(404);
    res.json({ response: "not found" });
  } else {
    res.status(200);
    res.json({ getUser });
  }
};

exports.deleteUser = async (req, res) => {
  const deleteUser = await knex("users").where({ id: req.params.id }).del();
  res.status(200);
  res.json({ response: "User deleted" });
};

exports.login = async (req, res) => {
  try {
    const loginuser = await knex("users")
      .where({ username: req.body.username })
      .first();

    if (loginuser) {
      if (bcrypt.compareSync(req.body.password, loginuser.password)) {
        jwt.sign(
          {
            username: loginuser.username,
            userid: loginuser.id,
            email: loginuser.email,
          },
          "secret-key",
          (err, token) => {
            res.status(200).json({ token: token });
          }
        );
      } else {
        res.status(200).json({ message: "wrong password" });
      }
    } else {
      res.status(404).json({
        message: "there is not user register under those credentials",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
  }
};

exports.getAdmin = (req, res) => {
  jwt.verify(req.token, "secret-key", (err, userData) => {
    if (err) {
      res.status(400).json({ message: "there is an error" });
    } else {
      res.status(200).json({ message: "correct data.", userData: userData });
    }
  });
};
// login queda pendiente
