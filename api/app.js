require("express-async-errors"); //express has no middleware to handle errors, typically done all errors handled in each controller

const express = require("express"); //import the express framwork for node
const app = express(); //creates the instance of the obj
const mongoose = require("mongoose"); //import the db
const errorHandler = require("./handlers/errorHandler"); //import the error middleware to catch errors from any routes
require("dotenv").config(); //make env variables availible

mongoose
  .connect(process.env.MONGO, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

//Models
require("./models/users.models");

app.use(express.json()); //use the json middleware to parse incoming payloads, need it for post requests

const cors = require("cors");
app.use(cors()); // Use this before your routes are set up

//Routes
const usersRoutes = require("./users/user.routes");
app.use("/api/users", usersRoutes);

//end of all routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "page not found",
  });
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});
