const express = require("express");
const router = express.Router();

const {
  recommendations
} = require("../controllers/recommendationController");

router.get("/", recommendations);

module.exports = router;
