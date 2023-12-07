const Booking = require("../models/Bookings");

exports.booking = async (req, res, nex) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({count: booking.length,success:true,data:booking})
  } catch (err) {
    console.log(err);
    res.status(500).json({success:false,error:err})
  }
};
