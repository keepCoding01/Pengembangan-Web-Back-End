// CREATE TABLE categories ( id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(255) NOT NULL, color VARCHAR(7) DEFAULT NULL, icon VARCHAR(255) DEFAULT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

// CREATE TABLE notes ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, note TEXT NOT NULL, category_id INT DEFAULT NULL, -- Foreign key createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES categories(id) );

// CREATE TABLE accounts ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL , createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

import express from "express";
import bodyParser from "body-parser";
import db from "./models/index.js";
import session from "express-session";
import accountController from "./controllers/account.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const hostname = "127.0.0.1";
const port = 3001;
const { Category, Note, Account } = db;

const sessionSecret = process.env.SESSION_SECRET;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (!req.session.account && !["/login", "/logout"].includes(req.originalUrl)) {
  }
  next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced with alterations.");
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header
  if (token) {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

app.get("/register", (req, res) => {
  res.render("register", { message: "" }); // Kirim pesan kosong untuk awal
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Account.findOne({ where: { email } });
    if (existingUser) {
      return res.render("register", { message: "Email already registered" });
    }
    await Account.create({ username, email, password });
    res.redirect("/login");
  } catch (error) {
    res.status(500).render("register", { message: "Registration failed" });
  }
});

app.get("/login", accountController.login);

app.post("/login", accountController.auth);

app.get("/logout", accountController.logout);

app.get("/", async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    const account = req.session.account || null;

    res.render("index", { note: notes, account: account });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.get("/create", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("create", { categories });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id, { include: Category });
    const categories = await Category.findAll();
    if (!note) return res.status(404).send("Note not found");
    res.render("edit", { note, categories });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, note, category_id } = req.body;
  const accId = req.session.account.id;

  try {
    const newNote = await Note.create({ title, note, category_id, account_id: accId });
    res.status(200).json({ status: 200, data: newNote });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, note, category_id, icon, color } = req.body;
  const accId = req.session.account.id;
  try {
    const updatedNote = await Note.update({ title, note, category_id, account_id: accId }, { where: { id } });
    await Category.update({ icon, color }, { where: { id: category_id } });

    if (!updatedNote[0]) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ status: 200, message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.destroy({ where: { id } });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ status: 200, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
