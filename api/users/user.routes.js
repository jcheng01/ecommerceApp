import Router from "express"; //how you import express to file
import register from "./controllers/register.js";
import login from "./controllers/login.js";
import signout from "./controllers/signout.js";
import pay from "./controllers/pay.js";
// import userDashboard from "./controllers/userDashboard";

const userRoutes = Router();

//Routess..

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/signout", signout);
userRoutes.post("/create-checkout-session", pay);

// userRoutes.use(auth); /// every route after this middleware willbe controller by the auth

// userRoutes.get("/dashboard", userDashboard);

export default userRoutes;
