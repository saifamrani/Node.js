const http = require('http');
const fs = require("fs");


let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile("./index.html", (err, content) => {
      if (!err) {
        res.writeHead(200, { "content-Type": "text/html" });
        res.end(content);
      }
    });
  }
  if (req.url === "/script.js") {
    fs.readFile("./index.html", (err, content) => {
      if (!err) {
        res.writeHead(200, { "content-Type": "text/html" });
        res.end(content);
      }
    });
  }
  if (req.url === "/style.css") {
    fs.readFile("./style.css", (err, content) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(content);
      }
    });
  }
});

server.listen(3000);