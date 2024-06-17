var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/registo", function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render("studentFormPage", { date: d });
});

router.post("/registo", function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios
    .post("http://localhost:3000/alunos", req.body)
    .then((response) => {
      res.redirect("/alunos");
    })
    .catch((erro) => {
      res.status(501).render("error", {
        message: "Failed to save student.",
        error: { status: 502, stack: erro },
      });
    });
});

router.get("/:idAluno", function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios
    .get("http://localhost:3000/alunos/" + req.params.idAluno)
    .then((response) => {
      res.status(200).render("studentPage", {
        aluno: response.data,
        date: d,
      });
    })
    .catch((erro) => {
      res.status(504).render("error", {
        message: "Failed to fetch student data.",
        error: { status: 504, stack: erro },
      });
    });
});

// router.post("/edit/:idAluno", function (req, res, next) {
//   var d = new Date().toISOString().substring(0, 16);
//   axios
//     .put("http://localhost:3000/alunos/" + req.params.idAluno, req.body)
//     .then((response) => {
//       res.status(200).render("studentFormEditPage", {
//         aluno: req.body,
//         date: d,
//       });
//     })
//     .catch((erro) => {
//       res.status(505).render("error", {
//         message: "Failed to save student.",
//         error: { status: 502, stack: erro },
//       });
//     });
// });

// router.get("/delete/:idAluno", function (req, res, next) {
//   var d = new Date().toISOString().substring(0, 16);
//   axios
//     .delete("http://localhost:3000/alunos/" + req.params.idAluno)
//     .then((response) => {
//       res.redirect("/");
//     })
//     .catch((erro) => {
//       res.status(506).render("error", {
//         message: "Failed to delete student.",
//         error: { status: 502, stack: erro },
//       });
//     });
// });

module.exports = router;
