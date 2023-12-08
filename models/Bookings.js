const mongoose = require("mongoose");
const sms = require("../utils/sms");

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
  mobile: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Define possible values for status
    default: "active"
  }
});

BookingSchema.pre("save", async function (next) {
  try {
    const restaurant = await Restaurant.findById(this.restaurantId);
    if (!restaurant) {
      return next(new Error("Resource not found"));
    }
    next();
  } catch (err) {
    next(err);
  }
});

BookingSchema.post("save", async function (doc, next) {
  const { tableType, restaurantId, mobile } = doc;
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    let totalTables = 0;
    let bookedTables = 0;

    for (const table of restaurant.tables) {
      // Decrement available by 1 and increment booked by 1 for the specified table type
      if (table.type === tableType) {
        if (table.available === 0) {
          throw new Error("Table not available");
        }
        table.booked += 1;
        table.available -= 1;
      }

      // Update totalTables with the sum of available and booked for all tables
      totalTables += table.available + table.booked;
      bookedTables += table.booked;
    }

    // Update the document with the new values
    restaurant.totalTables = totalTables;

    if (bookedTables >= totalTables) {
      restaurant.bookingStatus = false;
    }

    // Save the updated document
    await restaurant.save();
    // Send sms
    sms(`This is your booking_id ${this.id}`, mobile);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
