var express = require("express");
var router = express.Router();
var AlunoController = require("../controllers/alunosController");

/* GET alunos. */
router.get("/", function (req, res, next) {
  AlunoController.list()
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

module.exports = router;
