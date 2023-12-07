const Restaurants = require("../models/Restaurants");

// @desc   Create restaurants
// @route  POST /api/v1/restaurant
// @access Public
exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurants.create(req.body);
    res.status(201).json({ success: true, data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

// @desc   get restaurants
// @route  GET /api/v1/restaurant/:city
// @access Public
exports.getRestaurantsByCity = async (req, res, next) => {
  try {
    const restaurant = await Restaurants.find({
      $and: [
        { "location.city": { $regex: req.query.city, $options: "i" } },
        { bookingStatus: true }
      ]
    });
    res
      .status(201)
      .json({ count: restaurant.length, success: true, data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

// @desc   get restaurants
// @route  GET /api/v1/restaurant/:id
// @access Public
exports.getRestaurantsById = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).json({ msg: "data not found" });
    }
    res.status(201).json({ success: true, data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
