var http = require("http");
var axios = require("axios");
var static = require("./static.js");
var templates = require("./templates.js");
const { parse } = require("querystring");

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

function onSuccess(res, page) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.write(page);
  res.end();
}

function onError(res, error, status) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.write(templates.errorPage(error, status));
  res.end();
}

http
  .createServer(function (req, res) {
    console.log(getMethodColour(req.method), req.method, "\x1b[37m", req.url);
    d = new Date().toISOString().substring(0, 16);

    if (static.staticResource(req)) {
      static.serveStaticResource(req, res);
    } else {
      switch (req.method) {
        case "GET":
          // GET /compositores ou /periodos --------------------------------------------------------------------
          if (req.url == "/" || req.url == "/compositores") {
            axios
              .get("http://localhost:3000/compositores?_sort=nome")
              .then((response) => {
                var template = templates.composerListPage(response.data);
                onSuccess(res, template);
              })
              .catch((erro) => {
                onError(res, "Failed to fetch composers.", 503);
              });
          }
          // GET /periodos --------------------------------------------------------------------
          else if (req.url == "/periodos") {
            axios
              .get("http://localhost:3000/periodos?_sort=nome")
              .then((response) => {
                var template = templates.periodListPage(response.data, d);
                onSuccess(res, template);
              })
              .catch((erro) => {
                onError(res, "Failed to fetch periods.", 507);
              });
          }
          // GET /compositores/:id --------------------------------------------------------------------
          else if (/^\/compositores\/[a-zA-Z0-9]+$/.test(req.url)) {
            id = req.url.split("/")[2];
            console.log(id);
            axios
              .get("http://localhost:3000/compositores/" + id)
              .then((response) => {
                var template = templates.composerPage(response.data, d);
                onSuccess(res, template);
              })
              .catch((erro) => {
                onError(res, "Failed to fetch composer data.", 506);
              });
          }
          // GET /compositores/registo --------------------------------------------------------------------
          else if (req.url == "/compositores/registo") {
            res.writeHead(200, {
              "Content-Type": "text/html; charset=utf-8",
            });
            res.write(templates.composerFormPage(d));
            res.end();
          }
          // GET /compositores/edit/:id --------------------------------------------------------------------
          else if (/^\/compositores\/edit\/[a-zA-Z0-9]+$/.test(req.url)) {
            id = req.url.split("/")[3];
            axios
              .get("http://localhost:3000/compositores/" + id)
              .then((response) => {
                var template = templates.composerEditPage(response.data, d);
                onSuccess(res, template);
              })
              .catch((erro) => {
                onError(res, "Failed to fetch composer data.", 505);
              });
          }
          // GET /periodos/registo --------------------------------------------------------------------
          else if (req.url == "/periodos/registo") {
            res.writeHead(200, {
              "Content-Type": "text/html; charset=utf-8",
            });
            res.write(templates.periodFormPage(d));
            res.end();
          }
          // GET /periodos/edit/:id --------------------------------------------------------------------
          else if (/^\/periodos\/edit\/[a-zA-Z0-9]+$/i.test(req.url)) {
            id = req.url.split("/")[3];
            axios
              .get("http://localhost:3000/periodos/" + id)
              .then((response) => {
                var template = templates.periodEditPage(response.data, d);
                onSuccess(res, template);
              })
              .catch((erro) => {
                onError(res, "Failed to fetch period data.", 504);
              });
          }
          // GET /compositores/delete/:id --------------------------------------------------------------------
          else if (/^\/compositores\/delete\/[a-zA-Z0-9]+$/.test(req.url)) {
            id = req.url.split("/")[3];
            axios
              .delete("http://localhost:3000/compositores/" + id)
              .then((response) => {
                res.writeHead(302, {
                  Location: "/compositores",
                });
                res.end();
              })
              .catch((erro) => {
                onError(res, "Failed to delete composer data.", 504);
              });
          }
          // GET /periodos/delete/:id --------------------------------------------------------------------
          else if (/^\/periodos\/delete\/[a-zA-Z0-9]+$/.test(req.url)) {
            id = req.url.split("/")[3];
            axios
              .delete("http://localhost:3000/periodos/" + id)
              .then((response) => {
                res.writeHead(302, {
                  Location: "/periodos",
                });
                res.end();
              })
              .catch((erro) => {
                onError(res, "Failed to delete period data.", 504);
              });
          } else {
            res.writeHead(404, {
              "Content-Type": "text/html; charset=utf-8",
            });
            res.write(
              templates.errorPage("GET Method not supported." + req.url, 502)
            );
            res.end();
          }
          break;

        case "POST":
          // POST /compositores/registo --------------------------------------------------------------------
          if (req.url == "/compositores/registo") {
            collectRequestBodyData(req, (data) => {
              if (data) {
                axios
                  .post("http://localhost:3000/compositores", data)
                  .then((response) => {
                    res.writeHead(302, {
                      Location: "/compositores",
                    });
                    res.end();
                  })
                  .catch((erro) => {
                    onError(res, "Failed to submit composer data.", 508);
                  });
              } else {
                res.writeHead(506, {
                  "Content-Type": "text/html; charset=utf-8",
                });
                res.write(
                  templates.errorPage("Failed to parse POST data.", 509)
                );
                res.end();
              }
            });
          }
          // POST /compositores/edit/:id --------------------------------------------------------------------
          else if (/^\/compositores\/edit\/[a-zA-Z0-9]+$/.test(req.url)) {
            id = req.url.split("/")[3];
            collectRequestBodyData(req, (data) => {
              if (data) {
                axios
                  .put("http://localhost:3000/compositores/" + id, data)
                  .then((response) => {
                    res.writeHead(302, {
                      Location: "/compositores",
                    });
                    res.end();
                  })
                  .catch((erro) => {
                    onError(res, "Failed to submit composer data.", 509);
                  });
              } else {
                res.writeHead(506, {
                  "Content-Type": "text/html; charset=utf-8",
                });
                res.write(
                  templates.errorPage("Failed to parse POST data.", 510)
                );
                res.end();
              }
            });
          }
          // POST /periodos/registo --------------------------------------------------------------------
          else if (req.url == "/periodos/registo") {
            collectRequestBodyData(req, (data) => {
              if (data) {
                axios
                  .post("http://localhost:3000/periodos", data)
                  .then((response) => {
                    res.writeHead(302, {
                      Location: "/periodos",
                    });
                    res.end();
                  })
                  .catch((erro) => {
                    onError(res, "Failed to submit period data.", 510);
                  });
              } else {
                res.writeHead(506, {
                  "Content-Type": "text/html; charset=utf-8",
                });
                res.write(
                  templates.errorPage("Failed to parse POST data.", 514)
                );
                res.end();
              }
            });
          }
          // POST /periodos/edit/:id --------------------------------------------------------------------
          else if (/^\/periodos\/edit\/[a-zA-Z0-9]+$/i.test(req.url)) {
            id = req.url.split("/")[3];
            collectRequestBodyData(req, (data) => {
              if (data) {
                axios
                  .put("http://localhost:3000/periodos/" + id, data)
                  .then((response) => {
                    res.writeHead(302, {
                      Location: "/periodos",
                    });
                    res.end();
                  })
                  .catch((erro) => {
                    onError(res, "Failed to submit period data.", 511);
                  });
              } else {
                res.writeHead(506, {
                  "Content-Type": "text/html; charset=utf-8",
                });
                res.write(
                  templates.errorPage("Failed to parse POST data.", 513)
                );
                res.end();
              }
            });
          } else {
            res.writeHead(404, {
              "Content-Type": "text/html; charset=utf-8",
            });
            res.write(
              templates.errorPage("POST Method not supported." + req.url, 512)
            );
            res.end();
          }
          break;
        default:
          res.writeHead(501, { "Content-Type": "text/html; charset=utf8" });
          res.write(templates.errorPage("Method not supported.", 501));
          res.end();
          break;
      }
    }
  })
  .listen(8080);
