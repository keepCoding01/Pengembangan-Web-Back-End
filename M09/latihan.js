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
  console.log("MySQL Connected");
});

app.get("/api/comments", (req, res) => {
  let sql = "SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ status: 200, error: null, response: result });
  });
});

app.get("/api/comment/:id", (req, res) => {
  let sql = "SELECT * FROM comment WHERE comment_id =" + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
  });
});

app.get("/api/comments/customer/:id", (req, res) => {
  let sql = "SELECT * FROM comment WHERE cust_id =" + req.params.id + " ORDER BY comment_created DESC";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
  });
});

app.post("/api/comment", (req, res) => {
  let data = { cust_id: req.body.cust_id, product_id: req.body.product_id, customer_text: req.body.customer_text };
  let sql = "INSERT INTO comment SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: "Insert data success" }));
  });
});

app.delete("/api/comment/:id", (req, res) => {
  let sql = "DELETE FROM comment WHERE comment_id =" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: "Delete data success" }));
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
