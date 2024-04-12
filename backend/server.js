import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
dotenv.config();
const app = express();
connectToDB();
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server Is Running On", port);
});
