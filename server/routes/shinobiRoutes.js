const express = require("express");
const {
  createShinobi,
  getAllShinobi,
} = require("../controllers/shinobiController");

const router = express.Router();

router.route("/").get(getAllShinobi).post(createShinobi);

module.exports = router;
