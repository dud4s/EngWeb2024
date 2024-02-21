var http = require("http");
var meta = require("./aux");

http
  .createServer(function (req, res) {
    console.log(req.method, req.url);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>TP2</h1>");
    res.write(
      `<p> Página criada com node.js por ${meta.myName()} em ${meta.myDateTime()} na turma ${
        meta.turma
      }</p>`
    );
    res.end("Hello World! olá");
  })
  .listen(8080);

console.log("Server running...");
