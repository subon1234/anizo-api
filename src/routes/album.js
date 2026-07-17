const express = require("express");
const router = express.Router();

const {
  search,
  details
} = require("../controllers/albumController");

router.get("/", search);

router.get("/:id", details);

module.exports = router;
