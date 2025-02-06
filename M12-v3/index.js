// npm init -y
// npm i express
// npm i bulma
// npm i --save mysql2
// npm i --save sequelize
// npm i --save ejs

import express from "express";
import User from "./models/user.js";

const app = express();
const hostname = "127.0.0.1";
const port = 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  User.findAll().then((results) => {
    res.render("index", { users: results });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/edit/:user_id", (req, res) => {
  User.findOne({ where: { user_id: req.params.user_id } }).then((results) => {
    res.render("edit", { user: results });
  });
});

app.post("/api/users", (req, res) => {
  User.create({ user_name: req.body.user_name, user_email: req.body.user_email, user_address: req.body.user_address, user_phone: req.body.user_phone })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.put("/api/user/:user_id", (req, res) => {
  User.update({ user_name: req.body.user_name, user_email: req.body.user_email, user_address: req.body.user_address, user_phone: req.body.user_phone }, { where: { user_id: req.params.user_id } })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.delete("/api/user/:user_id", (req, res) => {
  User.destroy({ where: { user_id: req.params.user_id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
