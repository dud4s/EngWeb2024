/* Operações CRUD sobre Equipa 
   2024-04-21 @jcr
   ----------------------- */
var express = require("express");
var router = express.Router();
var Equipa = require("../controllers/equipa");
var Entega = require("../controllers/entrega");

/* Listar as Equipa (R) */
router.get("/", function (req, res) {
  Equipa.list()
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Consultar uma Equipa (R) */
router.get("/:id", function (req, res) {
  Equipa.findById(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Criar uma Equipa (C) */
router.post("/", function (req, res) {
  Equipa.insert(req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Alterar uma Equipa (U) */
router.put("/:id", function (req, res) {
  entrega
    .listByEquipa(req.params.id)
    .then((entregas) => {
      if (entregas.length == 0) {
        Equipa.update(req.params.id, req.body)
          .then((data) => res.jsonp(data))
          .catch((erro) => res.jsonp(erro));
      }
    })
    .catch((erro) => res.jsonp(erro));
});

/* Remover uma Equipa (D ) */
router.delete("/:id", function (req, res) {
  Equipa.remove(req.params.id)
    .then(console.log("Deleted " + req.params.id))
    .catch((erro) => res.jsonp(erro));
});

module.exports = router;
