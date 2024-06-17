var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/alunos");
});

router.get("/alunos", function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios
    .get("http://localhost:3000/alunos?_sort=nome")
    .then((response) => {
      alunos = response.data;
      res.status(200).render("studentsListPage", { lAlunos: alunos, date: d });
    })
    .catch((erro) => {
      res.status(501).render("error", {
        message: "Failed to fetch students.",
        error: { status: 503 },
      });
    });
});

module.exports = router;
