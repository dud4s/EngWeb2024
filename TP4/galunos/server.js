// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require("http");
var axios = require("axios");
var fs = require("fs");
const { parse } = require("querystring");

var templates = require("./templates"); // Necessario criar e colocar na mesma pasta
var static = require("./static.js"); // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16);
  console.log(req.method + " " + req.url + " " + d);

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res);
  } else {
    switch (req.method) {
      case "GET":
        // GET /alunos --------------------------------------------------------------------
        if (req.url == "/" || req.url == "/alunos") {
          axios
            .get("http://localhost:3000/alunos?_sort=nome")
            .then((response) => {
              res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.studentsListPage(response.data, d));
              res.end();
            })
            .catch((erro) => {
              res.writeHead(503, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.errorPage("Failed to fetch students.", 503));
              res.end();
            });
        }
        // GET /alunos/:id --------------------------------------------------------------------
        else if (/^\/alunos\/(A|PG)[0-9]+$/i.test(req.url)) {
          id = req.url.split("/")[2];
          axios
            .get("http://localhost:3000/alunos/" + id)
            .then((response) => {
              res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.studentPage(response.data, d));
              res.end();
            })
            .catch((erro) => {
              res.writeHead(504, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(
                templates.errorPage("Failed to fetch student data.", 504)
              );
              res.end();
            });
        }

        // GET /alunos/registo --------------------------------------------------------------------
        else if (req.url == "/alunos/registo") {
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          res.write(templates.studentFormPage(d));
          res.end();
        }
        // GET /alunos/edit/:id --------------------------------------------------------------------
        else if (/^\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)) {
          id = req.url.split("/")[3];
          axios
            .get("http://localhost:3000/alunos/" + id)
            .then((response) => {
              res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.studentFormEditPage(response.data, d));
              res.end();
            })
            .catch((erro) => {
              res.writeHead(505, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(
                templates.errorPage("Failed to fetch student data.", 505)
              );
              res.end();
            });
        }
        // GET /alunos/delete/:id --------------------------------------------------------------------
        // GET ? -> Lancar um erro
        else {
          res.writeHead(502, { "Content-Type": "text/html; charset=utf-8" });
          res.write(templates.errorPage("GET Method not supported.", 502));
          res.end();
        }
        break;
      case "POST":
        // POST /alunos/registo --------------------------------------------------------------------
        if (req.url == "/alunos/registo") {
          collectRequestBodyData(req, (result) => {
            if (result) {
              console.log(result);
              axios
                .post("http://localhost:3000/alunos", result)
                .then((response) => {
                  res.writeHead(303, { Location: "/alunos/" + result.id });
                  res.end();
                })
                .catch((error) => {
                  res.writeHead(508, {
                    "Content-Type": "text/html; charset=utf-8",
                  });
                  res.write(
                    templates.errorPage("Failed to create student.", 508)
                  );
                  res.end();
                });
            } else {
              res.writeHead(506, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.errorPage("Failed to parse POST data.", 506));
              res.end();
            }
          });
        }
        // POST /alunos/edit/:id --------------------------------------------------------------------
        else if (/^\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)) {
          collectRequestBodyData(req, (result) => {
            if (result) {
              axios
                .put("http://localhost:3000/alunos/" + result.id, result)
                .then((resposne) => {
                  res.writeHead(303, { Location: "/alunos/" + result.id });
                  res.end();
                })
                .catch((erro) => {
                  res.writeHead(507, {
                    "Content-Type": "text/html; charset=utf-8",
                  });
                  res.write(
                    templates.errorPage("Failed to update student data.", 507)
                  );
                  res.end();
                });
            } else {
              res.writeHead(506, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.write(templates.errorPage("Failed to parse POST data.", 506));
              res.end();
            }
          });
        }
        // POST ? -> Lancar um erro
        else {
          res.writeHead(501, { "Content-Type": "text/html; charset=utf-8" });
          res.write(templates.errorPage("POST Method not supported.", 501));
          res.end();
        }
        break;
      default:
        // Outros metodos nao sao suportados
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.write(templates.errorPage("Method Request not supported.", 500));
        res.end();
        break;
    }
  }
});

alunosServer.listen(7777, () => {
  console.log("Servidor à escuta na porta 7777...");
});
