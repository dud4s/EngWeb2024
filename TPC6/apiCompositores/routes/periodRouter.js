const express = require("express");
const router = express.Router();
const PeriodController = require("../controllers/periodController");

/* GET periods. */
router.get("/", function (req, res, next) {
  PeriodController.list()
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* GET period by id. */
router.get("/:id", function (req, res, next) {
  PeriodController.get(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* POST period */
router.post("/", function (req, res, next) {
  PeriodController.insert(req.body)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* PUT period by id */
router.put("/:id", function (req, res, next) {
  PeriodController.update(req.params.id, req.body)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* DELETE period by id */
router.delete("/:id", function (req, res, next) {
  PeriodController.delete(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

module.exports = router;
