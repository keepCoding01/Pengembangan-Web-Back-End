// CREATE TABLE products (
//     id INT(11) AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) COLLATE latin1_swedish_ci DEFAULT NULL,
//     price INT(11) DEFAULT NULL,
//     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

// INSERT INTO products (name, price, createdAt, updatedAt)
// VALUES
//     ('Product A', 10000, NOW(), NOW()),
//     ('Product B', 20000, NOW(), NOW()),
//     ('Product C', 30000, NOW(), NOW());

import express from "express";
import Product from "./models/product.js";
import account_controller from "./controllers/account.js";
import session from "express-session";

const app = express();
const hostname = "127.0.0.1";
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "ini adalah kode secret###",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 minute
  })
);

app.set("view engine", "ejs");

app.get("/login", account_controller.login);
app.get("/logout", account_controller.logout);
app.post("/login", account_controller.auth);

app.get("/", (req, res) => {
  Product.findAll().then((results) => {
    res.render("index", { products: results, account: req.session.account || "" });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/edit/:id", (req, res) => {
  Product.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("edit", { product: results });
  });
});

app.post("/api/products", (req, res) => {
  Product.create({ name: req.body.name, price: req.body.price })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.put("/api/product/:id", (req, res) => {
  Product.update({ name: req.body.name, price: req.body.price }, { where: { id: req.params.id } })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

app.delete("/api/product/:id", (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
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
