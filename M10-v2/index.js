import express from "express";
import bodyParser from "body-parser";
import mysql2 from "mysql2";

const app = express();
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

app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Type: ${req.method}`);
  next();
});

const validateProduct = (req, res, next) => {
  const { product_price } = req.body;
  if (req.method === "POST" || req.method === "PUT") {
    if (product_price <= 0) {
      return res.status(400).json({ error: "product_price tidak boleh <=0" });
    } else if (isNaN(product_price) || !product_price) {
      return res.status(400).json({ error: "product_price wajib diisi dengan angka" });
    }
  }
  next();
};

app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM product";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: result }));
  });
});

app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: result }));
  });
});

app.post("/api/products", validateProduct, (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let sql = "INSERT INTO product SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Insert data success" }));
  });
});

app.put("/api/products/:id", validateProduct, (req, res) => {
  let sql = "UPDATE product SET product_name=?, product_price=? WHERE product_id=?";
  conn.query(sql, [req.body.product_name, req.body.product_price, req.params.id], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Update data success" }));
  });
});

app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=?";
  conn.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Delete data success" }));
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
