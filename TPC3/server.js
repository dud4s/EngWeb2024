const http = require("http");
const url = require("url");
const axios = require("axios");
const fs = require("fs");
const { genAtores, genFilmes, genGeneros } = require("./genTable");

const getMethodColour = (method) => {
  switch (method) {
    case "GET":
      return "\x1b[92m";
    case "POST":
      return "\x1b[34m";
    case "PUT":
      return "\x1b[33m";
    case "DELETE":
      return "\x1b[31m";
    default:
      return "\x1b[37m";
  }
};

const server = http.createServer(function (req, res) {
  console.log(getMethodColour(req.method), req.method, "\x1b[37m", req.url);

  if (req.url == "/") {
    fs.readFile("index.html", (err, data) => {
      console.log("Sending index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
      res.write(data);
      res.end();
    });
  } else if (req.url.match("^/filmes")) {
    axios
      .get("http://localhost:3000" + req.url)
      .then((resp) => {
        const data = resp.data;
        console.log("Sending filmes data");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write(genFilmes(data));
        res.end();
      })
      .catch((err) => {
        console.log("Error while fetching filmes data:", err);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
        res.write("<p>Error: " + err + "</p>");
        res.end();
      });
  } else if (req.url.match("^/generos")) {
    axios
      .get("http://localhost:3000" + req.url)
      .then((resp) => {
        const data = resp.data;
        console.log("Sending generos data");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write(genGeneros(data));
        res.end();
      })
      .catch((err) => {
        console.log("Error while fetching generos data:", err);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
        res.write("<p>Error: " + err + "</p>");
        res.end();
      });
  } else if (req.url.match("^/atores")) {
    axios
      .get("http://localhost:3000" + req.url)
      .then((resp) => {
        const data = resp.data;
        console.log("Sending atores data");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.write(genAtores(data));
        res.end();
      })
      .catch((err) => {
        console.log("Error while fetching atores data:", err);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf8" });
        res.write("<p>Error: " + err + "</p>");
        res.end();
      });
  } else {
    fs.readFile("404.html", (err, data) => {
      console.log("Sending 404.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
      res.write(data);
      res.end();
    });
  }
});

const port = 8081;
server.listen(port, () => {
  console.log("Server listening on port " + port);
});
