const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const app = express();

//configure env file
dotenv.config({ path: "config/config.env" });

//connect to db
connectDB();

//middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


// routes
const user = require("./routes/users");
const restaurant = require("./routes/restaurants");
const booking = require("./routes/bookings");

//first route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/user", user);
app.use("/api/v1/restaurant", restaurant);
app.use("/api/v1/booking", booking);

// set port no.
const PORT = process.env.PORT || 6000;

//start servet
app.listen(PORT, () =>
  console.log(`Server running in development mode on port ${PORT}`)
);
