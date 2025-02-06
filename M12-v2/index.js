// npm init -y
// npm i express
// npm i bulma
// npm i --save mysql2
// npm i --save sequelize
// npm i --save ejs

// CREATE TABLE suppliers (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   company_name VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
//   contact_name VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
//   email VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
//   phone VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
//   active TINYINT(4) DEFAULT 0,
//   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

// INSERT INTO suppliers (company_name, contact_name, email, phone, active)
// VALUES
// ('PT A', 'person 1', 'contact@a.com', '0811111111', 0),
// ('PT B', 'person 2', 'contact@b.com', '0811111112', 1);

import express from "express";
import Supplier from "./models/supplier.js";

const app = express();
const hostname = "127.0.0.1";
const port = 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Supplier.findAll().then((results) => {
    res.render("index", { suppliers: results });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/edit/:id", (req, res) => {
  Supplier.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("edit", { supplier: results });
  });
});

app.post("/api/suppliers", (req, res) => {
  Supplier.create({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.put("/api/supplier/:id", (req, res) => {
  Supplier.update({ company_name: req.body.company_name, contact_name: req.body.contact_name, email: req.body.email, phone: req.body.phone, active: req.body.active }, { where: { id: req.params.id } })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.delete("/api/supplier/:id", (req, res) => {
  Supplier.destroy({ where: { id: req.params.id } })
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
