import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hostname = "127.0.0.1";
const port = 8000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/assets/logo.png`);
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  res.send(`Ini routing GET /mahasiswa/${nim} dengan nim : ${nim}`);
});

app.post("/mahasiswa", (req, res) => {
  res.send("Ini routing POST /mahasiswa untuk membuat mahasiswa baru");
});

app.put("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  res.send(`Ini routing PUT /mahasiswa/${nim} untuk membuat mengedit data mahasiswa dengan NIM : ${nim}`);
});

app.delete("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  res.send(`Ini routing DELETE /mahasiswa/${nim} untuk menghapus data mahasiswa dengan NIM : ${nim}`);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
