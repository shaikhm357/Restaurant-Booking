const express = require("express");
const router = express.Router();
const { createRestaurant } = require("../controllers/restaurants");

router.route("/").post(createRestaurant);

module.exports = router;
