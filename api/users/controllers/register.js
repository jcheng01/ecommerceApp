import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwtHandler from "../../handlers/jwtHandler.js";

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, username, password, confirmedPW } = req.body;
  //Validations

  if (!email) throw "No email";
  if (!username) throw "No username";
  if (!password) throw "No password";
  if (password !== confirmedPW) throw "Passwords dont match";
  if (password.length < 5) throw "Password too short";

  const getDupEmail = await usersModel.findOne({
    email,
  });

  if (getDupEmail) throw "This Email Exists";

  const hashedPW = await bcrypt.hash(password, 6);

  const createdUser = await usersModel.create({
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
