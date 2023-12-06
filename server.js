const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

//configure env file
dotenv.config({ path: "config/config.env" });

//connect to db
connectDB();

//first route
app.get("/", (req, res) => {
  res.send("hello world");
});

// set port no.
const PORT = process.env.PORT || 6000;

//start servet
app.listen(PORT, () =>
  console.log(`Server running in development mode on port ${PORT}`)
);
