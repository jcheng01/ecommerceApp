const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtHandler = require("../../handlers/jwtHandler");

const signIn = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email,
  }); //method to find the user object with the email from req
  if (!getUser) throw "Email does not exist"; //validates

  const comparePW = await bcrypt.compare(password, getUser.password); //returns boolean
  if (!comparePW) throw "Password does not match";

  const accessToken = jwtHandler(getUser);
  // console.log(getUser);

  //success response
  res.status(200).json({
    status: "success",
    message: "User logged in",
    accessToken, //passing the access token as a response
  });
};

module.exports = signIn;
