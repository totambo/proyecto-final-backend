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
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
      };

      const createUser = await knex("users").insert(newUser);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  const getUsers = await knex.select("*").from("users");
  res.status(200);
  res.json(getUsers);
};

// para login

exports.login = async (req, res) => {
  try {
    const loginuser = await knex("users")
      .where({ username: req.body.username })
      .first();

    if (loginuser) {
      if (bcrypt.compareSync(req.body.password, loginuser.password)) {
        jwt.sign(
          { username: loginuser.username },
          "secret-key",
          (err, token) => {
            res.status(200).json({ token: token });
          }
        );
      } else {
        res.status(200).json({ message: "wrong password" });
      }
    } else {
      res
        .status(404)
        .json({
          message: "there is not user register under those credentials",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getAdmin = (req, res) => {
  res.json({ message: "bienvenido" });
};
// login queda pendiente
