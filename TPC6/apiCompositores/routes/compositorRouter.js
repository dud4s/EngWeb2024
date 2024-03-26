const express = require("express");
const router = express.Router();
const CompositorController = require("../controllers/compositorController");

/* GET compositores. */
router.get("/", function (req, res, next) {
  CompositorController.list()
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* GET compositor by id. */
router.get("/:id", function (req, res, next) {
  CompositorController.get(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* POST compositor */
router.post("/", function (req, res, next) {
  CompositorController.insert(req.body)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* PUT compositor by id */
router.put("/:id", function (req, res, next) {
  CompositorController.update(req.params.id, req.body)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

/* DELETE compositor by id */
router.delete("/:id", function (req, res, next) {
  CompositorController.delete(req.params.id)
    .then((data) => res.jsonp(data))
    .catch((error) => res.status(500).jsonp(error));
});

module.exports = router;
