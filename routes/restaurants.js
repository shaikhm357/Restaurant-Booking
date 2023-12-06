const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurantsByCity,
  getRestaurantsById,
} = require("../controllers/restaurants");

router.route("/byId/:id").get(getRestaurantsById);
router.route("/:city").get(getRestaurantsByCity);
router.route("/").post(createRestaurant);

module.exports = router;
