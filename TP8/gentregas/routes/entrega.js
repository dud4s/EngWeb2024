/* Operações CRUD sobre Entrega 
   2024-04-21 @jcr
   ----------------------- */
var express = require("express");
var router = express.Router();
var Entrega = require("../controllers/equipa");

/* Listar as Entrega (R) */
router.get("/", function (req, res) {
  if (req.query.projeto) {
    Entrega.listByProjeto(req.query.projeto)
      .then((data) => res.jsonp(data))
      .catch((erro) => res.jsonp(erro));
  } else {
    Entrega.list()
      .then((data) => res.jsonp(data))
      .catch((erro) => res.jsonp(erro));
  }
});

/* Consultar uma Entrega (R) */
router.get("/:id", function (req, res) {
  Entrega.findById(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Criar uma Entrega (C) */
router.post("/", function (req, res) {
  Entrega.insert(req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Alterar uma Entrega (U) */
router.put("/:id", function (req, res) {
  Entrega.update(req.params.id, req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Remover uma Entrega (D ) */
router.delete("/:id", function (req, res) {
  Entrega.remove(req.params.id)
    .then(console.log("Deleted " + req.params.id))
    .catch((erro) => res.jsonp(erro));
});

module.exports = router;
