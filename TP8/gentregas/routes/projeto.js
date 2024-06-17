/* Operações CRUD sobre Projeto 
   2024-04-21 @jcr
   ----------------------- */
var express = require("express");
var router = express.Router();
var Projeto = require("../controllers/equipa");
const entrega = require("../models/entrega");

/* Listar as Projeto (R) */
router.get("/", function (req, res) {
  if (req.query.uc) {
    Projeto.listByUC(req.query.uc)
      .then((data) => res.jsonp(data))
      .catch((erro) => res.jsonp(erro));
  } else {
    Projeto.list()
      .then((data) => res.jsonp(data))
      .catch((erro) => res.jsonp(erro));
  }
});

/* Consultar uma Projeto (R) */
router.get("/:id", function (req, res) {
  Projeto.findById(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Criar uma Projeto (C) */
router.post("/", function (req, res) {
  Projeto.insert(req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Alterar uma Projeto (U) */
router.put("/:id", function (req, res) {
  Projeto.update(req.params.id, req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Remover uma Projeto (D ) */
router.delete("/:id", function (req, res) {
  Projeto.remove(req.params.id)
    .then(console.log("Deleted " + req.params.id))
    .catch((erro) => res.jsonp(erro));
});

module.exports = router;
