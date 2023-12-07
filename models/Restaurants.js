const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  tables: [
    {
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: true,
      },
      booked: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalTables: {
    type: Number,
  },
  bookingStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
