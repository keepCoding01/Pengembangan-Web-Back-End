const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Konfigurasi database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory",
});

const methodOverride = require("method-override");

// Middleware untuk menangani PUT dan DELETE dalam form
app.use(methodOverride("_method"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS sebagai templating engine
app.set("view engine", "ejs");

// Routes (GET, POST, PUT, DELETE)

app.get("/", (req, res) => {
  pool.query("SELECT * FROM products", (err, rows) => {
    if (err) throw err;
    res.render("index", { products: rows });
  });
});

// Add a product (POST)
app.post("/add", (req, res) => {
  const { name, description, price, quantity } = req.body;
  pool.query("INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)", [name, description, price, quantity], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Update a product (PUT)
app.put("/update", (req, res) => {
  const { id, name, description, price, quantity } = req.body;
  pool.query("UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?", [name, description, price, quantity, id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Delete a product (DELETE)
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  pool.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
