const User = require("../models/User");

// @desc   Create user
// @route  POST /api/v1/user
// @access Public
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Duplicate field value`" });
    }
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = { createUser };
