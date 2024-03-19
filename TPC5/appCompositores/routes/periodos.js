const axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET Periods */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3000/periodos")
    .then((response) => {
      res.status(200).render("periodsListPage", {
        periodos: response.data,
      });
    })
    .catch((error) => {
      res.status(514).render("error", {
        message: "Failed to fetch periods.",
        error: { status: 514, stack: error },
      });
    });
});

/* GET Period Form Page */
router.get("/registo", (req, res, next) => {
  res.status(200).render("periodFormPage");
});

router.get("/editar/:idPeriodo", (req, res, next) => {
  axios
    .get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then((response) => {
      res.status(200).render("periodFormEditPage", {
        periodo: response.data,
      });
    })
    .catch((error) => {
      res.status(515).render("error", {
        message: "Failed to fetch period data.",
        error: { status: 515, stack: error },
      });
    });
});

/* GET Period Page */
router.get("/:idPeriodo", (req, res, next) => {
  axios
    .get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then((response) => {
      res.status(200).render("periodPage", { periodo: response.data });
    })
    .catch((error) => {
      res.status(515).render("error", {
        message: "Failed to fetch period data.",
        error: { status: 515, stack: error },
      });
    });
});

/* POST Period */
router.post("/registo", (req, res, next) => {
  axios
    .post("http://localhost:3000/periodos", req.body)
    .then((response) => {
      res.redirect("/periodos");
    })
    .catch((error) => {
      res.status(516).render("error", {
        message: "Failed to save period.",
        error: { status: 516, stack: error },
      });
    });
});

/* DELETE Period */
router.get("/delete/:idPeriodo", (req, res, next) => {
  axios
    .delete("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then((response) => {
      res.redirect("/periodos");
    })
    .catch((error) => {
      res.status(517).render("error", {
        message: "Failed to delete period.",
        error: { status: 517, stack: error },
      });
    });
});

module.exports = router;
