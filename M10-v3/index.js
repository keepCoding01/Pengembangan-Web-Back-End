// CREATE TABLE categories ( id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(255) NOT NULL, color VARCHAR(7) DEFAULT NULL, icon VARCHAR(255) DEFAULT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ); 

// CREATE TABLE notes ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, note TEXT NOT NULL, category_id INT DEFAULT NULL, -- Foreign key createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES categories(id) );



// npm init -y
// npm i express
// npm i --save mysql2
// npm i body-parser


import express from "express";
import bodyParser from "body-parser";
import mysql2 from "mysql2";

const app = express();
app.use(bodyParser.json());

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_app",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1, sort = "desc" } = req.query;
    const limitNum = parseInt(limit, 10) || 10;
    const pageNum = parseInt(page, 10) || 1;

    const [notes] = await conn.promise().query(`SELECT * FROM notes WHERE title LIKE ? ORDER BY createdAt ${sort} LIMIT ? OFFSET ?`, [`%${search}%`, limitNum, (pageNum - 1) * limitNum]);
    res.status(200).json({
      status: 200,
      data: notes,
      totalNote: notes.length,
      page: pageNum,
      sortBy: sort,
      totalPage: Math.ceil(notes.length / limitNum),
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

notesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [note] = await conn.promise().query("SELECT * FROM notes WHERE id = ?", [id]);
    if (note.length === 0) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ status: 200, error: false, data: note });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

notesRouter.post("/", async (req, res) => {
  const { title, note, category_id } = req.body;
  try {
    const [result] = await conn.promise().query("INSERT INTO notes (title, note, category_id) VALUES (?, ?, ?)", [title, note, category_id]);
    res.status(200).json({
      status: 200,
      error: false,
      data: [{ id: result.insertId, title, note, category_id }],
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

notesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, note, category_id } = req.body;
  try {
    const [result] = await conn.promise().query("UPDATE notes SET title = ?, note = ?, category_id = ? WHERE id = ?", [title, note, category_id, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ status: 200, error: false, message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

notesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.promise().query("DELETE FROM notes WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ status: 200, error: false, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const [categories] = await conn.promise().query("SELECT * FROM categories");
    res.status(200).json({ status: 200, error: false, data: categories });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

categoriesRouter.get("/:category_id", async (req, res) => {
  const { category_id } = req.params;
  try {
    const [category] = await conn.promise().query("SELECT * FROM categories WHERE id = ?", [category_id]);
    if (category.length === 0) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ status: 200, error: false, data: category });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

categoriesRouter.post("/", async (req, res) => {
  const { category_name, color, icon } = req.body;
  try {
    const [result] = await conn.promise().query("INSERT INTO categories (category_name, color, icon) VALUES (?, ?, ?)", [category_name, color, icon]);
    res.status(200).json({
      status: 200,
      error: false,
      data: { id: result.insertId, category_name, color, icon },
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

categoriesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { category_name, color, icon } = req.body;
  try {
    const [result] = await conn.promise().query("UPDATE categories SET category_name = ?, color = ?, icon = ? WHERE id = ?", [category_name, color, icon, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ status: 200, error: false, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

categoriesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.promise().query("DELETE FROM categories WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ status: 200, error: false, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

app.use("/notes", notesRouter);
app.use("/categories", categoriesRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
