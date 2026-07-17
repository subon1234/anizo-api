const express = require("express");
const router = express.Router();

const {
  list,
  details
} = require("../controllers/genreController");

router.get("/", list);

router.get("/:name", details);

module.exports = router;
