var http = require("http");
var url = require("url");
var meta = require("./aux");

http
  .createServer(function (req, res) {
    console.log(req.method, req.url);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

    var q = url.parse(req.url, true);
    if (q.pathname == "/add") {
      var n1 = parseInt(q.query.n1) || 0;
      var n2 = parseInt(q.query.n2) || 0;
      res.write(`<pre> ${n1} + ${n2} = ${n1 + n2} </pre>`);
    } else if (q.pathname == "/sub") {
    } else {
      res.write("Operação não suportada");
    }
  })
  .listen(8080);

console.log("Server running...");
