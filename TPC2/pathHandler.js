const axios = require("axios");

const DB_URI = "http://localhost:3000";

const handle = (q, res) => {
  const path = q.path;

  if (path === "/") {
    res.write("<h1>Escola de Música</h1>");
    res.write("<ul>");
    res.write("<li> <a href='/alunos'>Lista de Alunos</a></li>");
    res.write("<li> <a href='/cursos'>Lista de Cursos</a></li>");
    res.write("<li> <a href='/instrumentos'>Lista de Instrumentos</a></li>");
    res.write("</ul>");
    res.end();
  } else if (path.match("^/alunos")) {
    const fullpath = DB_URI + path;
    axios
      .get(DB_URI + path)
      .then((resp) => {
        const data = resp.data;
        res.write("<h1>Lista de Alunos</h1>");
        for (const i in data) {
          res.write("<h3>" + data[i].nome + "</h3>");
          res.write("<p> ID: " + data[i].id + "</p>");
          res.write("<p> Data de Nascimento: " + data[i].dataNasc + "</p>");
          res.write(
            "<p> Curso: <a href='/cursos?id=" +
              data[i].curso +
              "'>" +
              data[i].curso +
              "</a></p>"
          );
          res.write("<p> Ano do Curso: " + data[i].anoCurso + "</p>");
          res.write("<p> Instrumento: " + data[i].instrumento + "</p>");
        }
        res.write("<hr width='80%'/><center><a href='/'>Voltar</a></center>");
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.write("<p>" + erro + "</p>");
      });
  } else if (path.match("^/cursos")) {
    axios
      .get(DB_URI + path)
      .then((resp) => {
        const data = resp.data;
        res.write("<h1>Lista de Cursos</h1>");
        for (const i in data) {
          res.write("<h3>" + data[i].designacao + "</h3>");
          res.write("<p> ID: " + data[i].id + "</p>");
          res.write("<p> Duração: " + data[i].duracao + "</p>");
          res.write(
            "<p> Instrumento: <a href='/instrumentos?id=" +
              data[i].instrumento.id +
              "'>" +
              data[i].instrumento["#text"] +
              "</a></p>"
          );
        }
        res.write(
          "<hr width='80%'/><center><a href='/'>Voltar para a página incial</a></center>"
        );
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.write("<p>" + erro + "</p>");
      });
  } else if (path.match("^/instrumentos")) {
    axios
      .get(DB_URI + path)
      .then((resp) => {
        const data = resp.data;
        res.write("<h1>Lista de Instrumentos</h1>");
        for (const i in data) {
          res.write("<h3>" + data[i]["#text"] + "</h3>");
          res.write("<p> ID: " + data[i].id + "</p>");
        }
        res.write(
          "<hr width='80%'/><center><a href='/'>Voltar para a página incial</a></center>"
        );
      })
      .catch((erro) => {
        console.log("Erro: " + erro);
        res.write("<p>" + erro + "</p>");
      });
  } else {
    res.write("Operação não suportada");
    res.end();
  }
};

module.exports = { handle };
