import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const hostname = "127.0.0.1";
const port = 8000;

app.use(express.static(join(__dirname, "../")));
app.use("/assets", express.static(join(__dirname, "../assets")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.get("/page/about", (req, res) => {
  res.sendFile(join(__dirname, "../about.html"));
});

app.get("/page/contact", (req, res) => {
  res.sendFile(join(__dirname, "../contact.html"));
});

app.get("/page/shop", (req, res) => {
  res.sendFile(join(__dirname, "../shop.html"));
});

app.get("/shop/:product", (req, res) => {
  res.sendFile(join(__dirname, "../shop-single.html"));
});

app.use((req, res) => {
  res.status(404).send("404 | Not Found");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
