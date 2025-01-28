import express from "express";
import bodyParser from "body-parser";
const app = express();
import mysql2 from "mysql2";
import cors from "cors";
app.use(cors());

app.use(bodyParser.json());

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Capekalibah00*",
  database: "crud_db",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");
});

app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
  });
});

app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id = " + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
  });
});

app.post("/api/products", (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: "Insert data success" }));
  });
});

app.put("/api/products/:id", (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price=" + req.body.product_price + " WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: "Update data success" }));
  });
});

app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: "Delete data success" }));
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
