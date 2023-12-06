const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please Add Name Field`],
  },
  mobile: {
    type: String,
    required: [true, `Please Add Mobile Field`],
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
