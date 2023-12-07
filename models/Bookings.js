const mongoose = require("mongoose");

const Restaurant = require("./Restaurants");

const BookingSchema = new mongoose.Schema({
  bookedBy: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  tableType: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Define possible values for status
    default: "active"
  }
});

BookingSchema.post("save", async function (doc) {
  const { tableType, restaurantId } = doc;
  try {
    const body = {};
    const restaurant = await Restaurant.findById(restaurantId);
    await Restaurant.updateOne(
      {
        _id: new mongoose.Types.ObjectId(restaurantId),
        "tables.type": tableType
      },
      { $inc: { "tables.$.booked": 1, "tables.$.available": -1 } }
    );

    body.totalTables = restaurant.tables.reduce(
      (acc, curr) => acc + (curr.available + curr.booked),
      0
    );
    const totalBooked = restaurant.tables.reduce(
      (acc, curr) => acc + curr.booked,
      0
    );
    body.bookingStatus = totalBooked === body.totalTables ? false : true;

    await Restaurant.findByIdAndUpdate(restaurantId, body, {
      new: true,
      lean: true
    });
    // console.log("restaurant ----------->", body.totalTables, totalBooked);
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
