const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const data = fs.readFileSync("1.html");
    res.end(data);
  } else if (req.url === "/1.js") {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    const data = fs.readFileSync("1.js");
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
