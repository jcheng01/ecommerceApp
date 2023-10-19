import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwtHandler from "../../handlers/jwtHandler.js";

const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, username, password, confirmPW } = req.body;
  //Validations

  if (!email) throw "No email";
  if (!username) throw "No username";
  if (!password) throw "No password";
  if (password !== confirmPW) throw "Passwords dont match";
  if (password.length < 5) throw "Password too short";

  const getDupEmail = await userModel.findOne({
    email,
  });
  if (getDupEmail) throw "This Email Exists";

  const hashedPW = await bcrypt.hash(password, 6);

  const createdUser = await userModel.create({
    username,
    email,
    password: hashedPW,
  });

  const accessToken = jwtHandler(createdUser); //centralizing process of accesss token

  res.status(200).json({
    status: "success on register",
    accessToken,
    // createdUser,
  });
};

export default register;
