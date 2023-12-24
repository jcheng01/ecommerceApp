const express = require("express"); //how you import express to file
const signUp = require("./controllers/signUp.js");
const signIn = require("./controllers/signIn.js");
const signOut = require("./controllers/signOut.js");
const pay = require("./controllers/pay.js");
// import userDashboard from "./controllers/userDashboard";

const userRoutes = express.Router();

//Routess..

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);
userRoutes.post("/create-checkout-session", pay);
userRoutes.get("/signout", signOut);

// userRoutes.use(auth); /// every route after this middleware willbe controller by the auth

// userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
