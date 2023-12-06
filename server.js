const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const app = express();

//configure env file
dotenv.config({ path: "config/config.env" });

//connect to db
connectDB();

//middlewares
app.use(express.json());

//first route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/v1/user", async (req, res) => {
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
});

// set port no.
const PORT = process.env.PORT || 6000;

//start servet
app.listen(PORT, () =>
  console.log(`Server running in development mode on port ${PORT}`)
);
