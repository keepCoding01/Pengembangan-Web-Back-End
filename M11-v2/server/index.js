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

app.get("/api/users", (req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: result }));
  });
});

app.get("/api/users/:id", (req, res) => {
  let sql = "SELECT * FROM user WHERE user_id = " + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: result }));
  });
});

app.post("/api/users", (req, res) => {
  let data = { user_name: req.body.user_name, user_email: req.body.user_email, user_address: req.body.user_address, user_phone: req.body.user_phone };
  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Insert data success" }));
  });
});

app.put("/api/users/:id", (req, res) => {
  let sql = "UPDATE user SET user_name='" + req.body.user_name + "', user_email='" + req.body.user_email + "', user_address='" + req.body.user_address + "', user_phone='" + req.body.user_phone + "' WHERE user_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Update data success" }));
  });
});

app.delete("/api/users/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE user_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: "Delete data success" }));
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
