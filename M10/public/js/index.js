import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = "localhost";
const port = 3000;
const app = express();

app.use(express.static(join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../about.html"));
});

const myLog = (req, res, next) => {
  console.log("Params : ", req.params.username, new Date().toLocaleString());
  next();
};

const list_username = ["bunny", "lola"];

app.get(
  "/:username",
  myLog,
  function (req, res, next) {
    if (!list_username.includes(req.params.username.toLowerCase())) next("route");
    else next();
  },
  function (req, res) {
    res.sendFile(join(__dirname, "../user.html"));
  }
);

app.get("/:username", function (req, res) {
  res.sendFile(join(__dirname, "../unknown.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
