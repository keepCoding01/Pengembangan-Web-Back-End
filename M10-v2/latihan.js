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

app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Method: ${req.method}`);
  next();
});

const validateProduct = (req, res, next) => {
  const { product_price } = req.body;
  if (req.method === "POST" || req.method === "PUT") {
    if (!product_price || isNaN(product_price) || product_price <= 0) {
      return res.status(400).json({
        error: "product_price wajib berupa angka > 0",
      });
    }
  }
  next();
};

const commentRouter = express.Router();

commentRouter.get("/", (req, res) => {
  const sql = "SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ response: result });
  });
});

commentRouter.get("/:id", (req, res) => {
  const sql = "SELECT * FROM comment WHERE comment_id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ response: result });
  });
});

commentRouter.get("/customer/:id", (req, res) => {
  const sql = "SELECT * FROM comment WHERE cust_id = ? ORDER BY comment_created DESC";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ response: result });
  });
});

commentRouter.post("/", (req, res) => {
  const data = {
    cust_id: req.body.cust_id,
    product_id: req.body.product_id,
    customer_text: req.body.customer_text,
  };
  const sql = "INSERT INTO comment SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json({ response: "Insert data success" });
  });
});

commentRouter.delete("/:id", (req, res) => {
  const sql = "DELETE FROM comment WHERE comment_id = ?";
  conn.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ response: "Delete data success" });
  });
});

app.use("/api/comments", commentRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
