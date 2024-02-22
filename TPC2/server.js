const http = require("http");
const url = require("url");
const pathHandler = require("./pathHandler");

const server = http.createServer(function (req, res) {
  console.log("\x1b[35m", req.method, req.url, "\x1b[37m");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

  const q = url.parse(req.url, true);

  pathHandler.handle(q, res);
});

const port = 8081;
server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}...`);
});
