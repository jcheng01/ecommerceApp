import "express-async-errors";

import express from "express";
import dotenv from "dotenv"; // imported so we can use .env file to safley store mongo token
dotenv.config();

const app = express();

app.use(express.json());

app.listen(8000, () => {
  console.log("Server 8000 started success!");
});
