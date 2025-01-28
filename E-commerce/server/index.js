// buat database :
// CREATE TABLE stores (     id INT AUTO_INCREMENT PRIMARY KEY,     name VARCHAR(255) NOT NULL,     avatar_url TEXT NOT NULL ); CREATE TABLE products (     id INT AUTO_INCREMENT PRIMARY KEY,     store_id INT NOT NULL,     name VARCHAR(255) NOT NULL,     price DECIMAL(15, 2) NOT NULL,     category VARCHAR(100),     discount_percent INT DEFAULT 0,     image_url TEXT,     description TEXT,     FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ); CREATE TABLE carts (     id INT AUTO_INCREMENT PRIMARY KEY,     user_id INT NOT NULL,     product_id INT NOT NULL,     quantity INT NOT NULL DEFAULT 1,     note TEXT,     is_checked BOOLEAN DEFAULT FALSE,     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ); CREATE TABLE users (     id INT AUTO_INCREMENT PRIMARY KEY,     name VARCHAR(255),     email VARCHAR(255) );

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "market",
});

db.connect((err) => {
  if (err) {
    console.error("Kesalahan saat menyambung ke database:", err.message);
    return;
  }
  console.log("Basis data terhubung.");
});

app.get("/api/cart", (req, res) => {
  const userEmail = req.query.user_email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email pengguna diperlukan." });
  }

  const query = `
    SELECT
      products.*,
      stores.name AS store_name,
      stores.avatar_url,
      carts.quantity AS cart_quantity,
      carts.note AS cart_note,
      carts.is_checked AS cart_is_checked
    FROM products
    LEFT JOIN carts ON carts.product_id = products.id AND carts.user_id = (SELECT id FROM users WHERE email = ?)
    LEFT JOIN stores ON products.store_id = stores.id
  `;

  db.query(query, [userEmail], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Kueri basis data gagal." });
    }
    res.json(results);
  });
});

app.get("/api/users", (req, res) => {
  const { name, email } = req.query;
  const checkUserQuery = `SELECT * FROM users WHERE email = ? AND name = ?`;
  db.query(checkUserQuery, [email, name], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Kueri basis data gagal." });
    }

    if (results.length > 0) {
      return res.status(200).json({ exists: true, user: results[0] });
    } else {
      return res.status(200).json({ exists: false });
    }
  });
});

app.put("/api/cart/note/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { note } = req.body;
  const userEmail = req.body.user_email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email pengguna diperlukan." });
  }

  if (!product_id || note === undefined) {
    return res.status(400).json({ message: "ID keranjang dan catatan diperlukan." });
  }

  const updateQuery = `UPDATE carts SET note = ? WHERE product_id = ? AND user_id = (SELECT id FROM users WHERE email = ?)`;

  db.query(updateQuery, [note, product_id, userEmail], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Gagal menyimpan catatan." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan di keranjang." });
    }

    res.json({ message: "Catatan berhasil disimpan." });
  });
});

app.put("/api/cart/quantity/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;
  const userEmail = req.body.user_email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email pengguna diperlukan." });
  }

  if (!product_id || quantity === undefined) {
    return res.status(400).json({ message: "ID keranjang dan kuantitas diperlukan." });
  }

  const updateQuery = `UPDATE carts SET quantity = ? WHERE product_id = ? AND user_id = (SELECT id FROM users WHERE email = ?)`;

  db.query(updateQuery, [quantity, product_id, userEmail], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Gagal memperbarui kuantitas." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan di keranjang." });
    }

    res.json({ message: "Kuantitas berhasil diperbarui." });
  });
});

app.put("/api/cart/status/:id", (req, res) => {
  const { id } = req.params;
  const { is_checked } = req.body;
  const userEmail = req.body.user_email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email pengguna diperlukan." });
  }

  const query = `
    UPDATE carts
    SET is_checked = ?
    WHERE product_id = ? AND user_id = (SELECT id FROM users WHERE email = ?)
  `;

  db.query(query, [is_checked ? 1 : 0, id, userEmail], (err, result) => {
    if (err) {
      console.error("Kesalahan saat memperbarui is_checked:", err);
      return res.status(500).json({ message: "Gagal memperbarui status ceklis." });
    }
    res.status(200).json({ message: "Status ceklis berhasil diperbarui." });
  });
});

app.put("/api/cart/status/toko/:storeId", (req, res) => {
  const storeId = req.params.storeId;
  const { is_checked } = req.body;
  const userEmail = req.body.user_email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email pengguna diperlukan." });
  }

  const query = `
    UPDATE carts
    SET is_checked = ?
    WHERE product_id IN (SELECT id FROM products WHERE store_id = ?) AND user_id = (SELECT id FROM users WHERE email = ?)
  `;
  db.query(query, [is_checked, storeId, userEmail], (err) => {
    if (err) {
      console.error("Gagal memperbarui pilihan toko:", err);
      return res.status(500).json({ message: "Gagal memperbarui pilihan." });
    }
    res.status(200).json({ message: "Pilihan berhasil diperbarui." });
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  const checkUserQuery = `SELECT * FROM users WHERE email = ? AND name = ?`;
  db.query(checkUserQuery, [email, name], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Kueri basis data gagal." });
    }

    if (results.length > 0) {
      return res.status(200).json({
        message: "Pengguna sudah ada.",
        user: results[0],
      });
    } else {
      const insertQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;
      db.query(insertQuery, [name, email], (err, result) => {
        if (err) {
          console.error("Kesalahan saat menambahkan pengguna:", err);
          return res.status(500).json({ message: "Gagal menambahkan pengguna." });
        }
        return res.status(201).json({
          message: "Pengguna berhasil ditambahkan.",
          user: { id: result.insertId, name, email },
        });
      });
    }
  });
});

app.post("/api/cart", async (req, res) => {
  try {
    const { user_email, product_id, quantity, note, is_checked } = req.body;

    if (!user_email || !product_id || quantity === undefined || note === undefined || is_checked === undefined) {
      return res.status(400).json({ message: "Semua parameter diperlukan." });
    }

    const [userResult] = await db.promise().query("SELECT id FROM users WHERE email = ?", [user_email]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user_id = userResult[0].id;

    const [cartResult] = await db.promise().query("SELECT * FROM carts WHERE user_id = ? AND product_id = ?", [user_id, product_id]);

    if (cartResult.length > 0) {
      await db.promise().query(
        `UPDATE carts
          SET quantity = ?, note = ?, is_checked = ?
          WHERE user_id = ? AND product_id = ?`,
        [quantity, note, is_checked ? 1 : 0, user_id, product_id]
      );
    } else {
      await db.promise().query(
        `INSERT INTO carts (user_id, product_id, quantity, note, is_checked)
          VALUES (?, ?, ?, ?, ?)`,
        [user_id, product_id, quantity, note, is_checked ? 1 : 0]
      );
    }

    res.status(200).json({ message: "Cart berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.delete("/api/cart/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { user_email } = req.body;

  if (!user_email || !product_id) {
    return res.status(400).json({ message: "ID produk dan email pengguna diperlukan." });
  }

  const deleteQuery = "DELETE FROM carts WHERE product_id = ? AND user_id = (SELECT id FROM users WHERE email = ?)";
  db.query(deleteQuery, [product_id, user_email], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Gagal menghapus produk." });
    }

    if (result.affectedRows === 0) {
      return res.json({ message: "Produk tidak ditemukan di keranjang, namun tetap dianggap terhapus." });
    }

    res.json({ message: "Produk berhasil dihapus dari keranjang." });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
