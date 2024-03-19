var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET compositors listing. */
router.get("/", (req, res, next) => {
  axios
    .get("http://localhost:3000/compositores")
    .then((response) => {
      res.status(200).render("composersListPage", {
        compositores: response.data,
      });
    })
    .catch((error) => {
      res.status(510).render("error", {
        message: "Failed to fetch compositors.",
        error: { status: 510, stack: error },
      });
    });
});

/* GET Composer Form Page */
router.get("/registo", (req, res, next) => {
  res.status(200).render("composerFormPage");
});

router.get("/editar/:idComposer", (req, res, next) => {
  axios
    .get("http://localhost:3000/compositores/" + req.params.idComposer)
    .then((response) => {
      res.status(200).render("composerFormEditPage", {
        compositor: response.data,
      });
    })
    .catch((error) => {
      res.status(511).render("error", {
        message: "Failed to fetch composer data.",
        error: { status: 511, stack: error },
      });
    });
});

/* GET Composer Page */
router.get("/:idComposer", (req, res, next) => {
  axios
    .get("http://localhost:3000/compositores/" + req.params.idComposer)
    .then((response) => {
      res.status(200).render("composerPage", { composer: response.data });
    })
    .catch((error) => {
      res.status(511).render("error", {
        message: "Failed to fetch composer data.",
        error: { status: 511, stack: error },
      });
    });
});

/* POST Composer */
router.post("/registo", (req, res, next) => {
  axios
    .post("http://localhost:3000/compositores", req.body)
    .then((response) => {
      res.redirect("/compositores");
    })
    .catch((error) => {
      res.status(512).render("error", {
        message: "Failed to save composer.",
        error: { status: 512, stack: error },
      });
    });
});

/* POST Composer Edit */
router.post("/editar/:idComposer", (req, res, next) => {
  axios
    .put(
      "http://localhost:3000/compositores/" + req.params.idComposer,
      req.body
    )
    .then((response) => {
      res.redirect("/compositores");
    })
    .catch((error) => {
      res.status(513).render("error", {
        message: "Failed to save composer.",
        error: { status: 513, stack: error },
      });
    });
});

/* GET Composer Delete */
router.get("/apagar/:idComposer", (req, res, next) => {
  axios
    .delete("http://localhost:3000/compositores/" + req.params.idComposer)
    .then((response) => {
      res.redirect("/compositores");
    })
    .catch((error) => {
      res.status(514).render("error", {
        message: "Failed to delete composer.",
        error: { status: 514, stack: error },
      });
    });
});

module.exports = router;
