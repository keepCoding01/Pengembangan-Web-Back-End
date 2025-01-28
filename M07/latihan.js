import express from "express";
import mysql2 from "mysql2";

const app = express();
const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_db",
});
const hostname = "127.0.0.1";
const port = 3000;

conn.connect((err) => {
  if (err) {
    console.error("database is disconnect");
  } else {
    console.log("database is connected");
  }
});

app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM `product` WHERE 1;";
  let query = conn.query(sql, (err, results) => {
    res.json(results);
  });
});

app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM `product` WHERE product_id = '" + req.params.id + "';";
  let query = conn.query(sql, (err, results) => {
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
