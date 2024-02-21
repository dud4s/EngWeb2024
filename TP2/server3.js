var http = require("http");
var url = require("url");
var meta = require("./aux");
var axios = require("axios");

http
  .createServer(function (req, res) {
    console.log(req.method, req.url);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    var q = url.parse(req.url, true);
    if (q.pathname == "/cidades") {
      axios
        .get("http://localhost:3000/cidades")
        .then((resp) => {
          var data = resp.data;
          res.write("<h1>Lista de Cidades</h1>");
          res.write("<ul>");
          for (var i in data) {
            res.write(
              `<li> <a href='/cidades/${data[i].id}'> ${data[i].nome} </a></li>`
            );
          }
          res.write("</ul>");
          res.end();
        })
        .catch((erro) => {
          console.log("Erro: " + erro);
          res.write("<p>" + erro + "</p>");
        });
    } else if (req.url.match(/\/cidades\/c[0-9]+/)) {
      res.write("Cidade");
      res.end();
    } else {
      res.write("Operação não suportada");
      res.end();
    }
  })
  .listen(8081);

console.log("Server running...");
