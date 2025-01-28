// import http from "http";
// import fs from "fs";
import mysql2 from "mysql2";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.static("public"));

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store_db",
});

const hostname = "127.0.0.1";
const port = 3301;

conn.connect((err) => {
  if (err) {
    console.log("database is disconnect");
  } else {
    console.log("database is connected");
  }
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/Public/main.html`);
});

app.get("/tasya/:id", (req, res) => {
  const id = req.params.id;
  res.send("ini id tasya : " + id);
});

app.get("/api/products", (req, res) => {
  let sql = `SELECT * FROM product;`;
  conn.query(sql, (err, results) => {
    if (err) res.json(err);
    res.json({
      status: 200,
      error: null,
      response: results,
    });
  });
});

app.get("/api/products/:id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id = " + req.params.id + ";";
  conn.query(sql, (err, results) => {
    res.json(results);
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// cara ribet :
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     let data = fs.readFileSync("./Public/main.html", "utf-8");
//     res.end(data);
//   } else if (req.url === "./Public/style.css") {
//     res.writeHead(200, { "Content-Type": "text/css" });
//     let data = fs.readFileSync("./Public/style.css", "utf-8");
//     res.end(data);
//   } else if (req.url === "./Public/script.js") {
//     res.writeHead(200, { "Content-Type": "application/javascript" });
//     let data = fs.readFileSync("./Public/script.js", "utf-8");
//     res.end(data);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 Not Found");
//   }
// });
