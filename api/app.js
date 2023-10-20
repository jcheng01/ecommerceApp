import "express-async-errors";

import errorHandler from "./handlers/errorHandler.js";
import userRoutes from "./users/user.routes.js";
import mongoose from "mongoose"; //import the database
import express from "express";
import dotenv from "dotenv"; // imported so we can use .env file to safley store mongo token
dotenv.config();

import cors from "cors";

// import stripe from ("stripe")(process.env.stripekey);

import usersModel from "./models/users.models.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((error) => console.log(error)); //chain promises to see if db is connected

const app = express();

app.use(express.json()); //use the json middleware to parse incoming payloads

app.use("/api/user", userRoutes);
app.use(cors());

//end of all routes

app.use(errorHandler); // middleware handler

app.listen(5174, () => {
  console.log("Server 5174 started success!");
});
