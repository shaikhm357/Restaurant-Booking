const Restaurants = require("../models/Restaurants");

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurants.create(req.body);
    res.status(201).json({ success: true, data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
