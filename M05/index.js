// const http = require("http");
// const fs = require("fs");
// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");

//   const data = fs.readFileSync("index.html");

//   res.write("<p>Simple Text</p>");
//   res.end(data);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const http = require("http");
// const fs = require("fs");
// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");

//   fs.readFile("index.html", (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.end("Error loading the file.");
//       return;
//     }

//     res.end(data + "<p>Simple Text</p>");
//   });
// });

import http from "http";
import fs from "fs";
import AuthorData from "./author_data.js";
import fetch from "node-fetch";
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let data = fs.readFileSync("index.html", "utf-8");
  let authordata = new AuthorData();
  let profiles;

  try {
    profiles = await authordata.getProfile();
  } catch (e) {
    console.error(e);
    profiles = [];
  }

  let profilesHTML = profiles
    .map(
      (result) => `
    <tr>
      <td>
        <img src="${result.download_url}" width=50 height=50>
      </td>
      <td>${result.author}</td>
    </tr>
  `
    )
    .join("");

  data = data.replace('<tbody id="data"></tbody>', `<tbody id="data">${profilesHTML}</tbody>`);

  res.write(data);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
