import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwtHandler from "../../handlers/jwtHandler.js";
import User from "../../models/users.models.js";

const register = async (req, res, next) => {
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

  const hashedPW = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPW });

  const accessToken = jwtHandler(newUser); //centralizing process of accesss token

  try {
    await newUser.save();
    res.status(200).json({
      status: "success on register",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export default register;
