/* Operações CRUD sobre Equipa 
   2024-04-21 @jcr
   ----------------------- */
var express = require("express");
var router = express.Router();
var UC = require("../controllers/uc");
var Entrega = require("../controllers/entrega");

/* Listar as UC (R) */
router.get("/", function (req, res) {
  UC.list()
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Consultar uma UC (R) */
router.get("/:id", function (req, res) {
  UC.findById(req.params.id)
    .then((ucData) => {
      Entrega.listByUC(ucData._id)
        .then((listaEntregas) => {
          ucData["entregas"] = listaEntregas;
          res.jsonp(ucData);
        })
        .catch((erro) => res.jsonp(erro));
    })
    .catch((erro) => res.jsonp(erro));
});

/* Criar uma UC (C) */
router.post("/", function (req, res) {
  UC.insert(req.body)
    .then((data) => res.status(201).jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Alterar uma UC (U) */
router.put("/:id", function (req, res) {
  UC.update(req.params.id, req.body)
    .then((data) => res.jsonp(data))
    .catch((erro) => res.jsonp(erro));
});

/* Remover uma UC (D ) */
router.delete("/:id", function (req, res) {
  Entrega.listByUC(req.params.id)
    .then((listaEntregas) => {
      if (listaEntregas.length == 0) {
        UC.remove(req.params.id)
          .then(console.log("Deleted " + req.params.id))
          .catch((erro) => res.jsonp(erro));
      }
    })
    .catch((erro) => res.jsonp(erro));
});

module.exports = router;
