import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import jwtHandler from "../../handlers/jwtHandler.js";

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    //method to find the email from payload in the db
    email,
  });

  if (!getUser) throw "Email does not exist"; //validates

  const comparePW = await bycrypt.compare(password, getUser.password); //returns boolean

  if (!comparePW) throw "password does not match";

  const accessToken = jwtHandler(getUser);

  //success response
  res.status(200).json({
    status: "success",
    message: "User logged in",
    accessToken: accessToken, //passing the access token as a response
  });
};

export default login;