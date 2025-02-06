// CREATE TABLE categories ( id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(255) NOT NULL, color VARCHAR(7) DEFAULT NULL, icon VARCHAR(255) DEFAULT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

// CREATE TABLE notes ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, note TEXT NOT NULL, category_id INT DEFAULT NULL, -- Foreign key createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES categories(id) );

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index.js";
import Category from "./models/category.js";
import Note from "./models/note.js";

const app = express();
const hostname = "127.0.0.1";
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Sinkronisasi database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced.");
});

// Home Route
app.get("/", async (req, res) => {
  try {
    const notes = await Note.findAll({ include: Category });
    res.render("index", { note: notes });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// Route untuk menampilkan form create.ejs
app.get("/create", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("create", { categories });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// Route untuk menampilkan form edit.ejs
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

// API Routes
app.post("/api/notes", async (req, res) => {
  const { title, note, category_id } = req.body;
  try {
    const newNote = await Note.create({ title, note, category_id });
    res.status(200).json({ status: 200, data: newNote });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, note, category_id, icon, color } = req.body;
  try {
    const updatedNote = await Note.update({ title, note, category_id }, { where: { id } });
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
