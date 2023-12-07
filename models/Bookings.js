const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookedBy: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
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
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Define possible values for status
    required: true,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
