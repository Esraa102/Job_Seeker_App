import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
dotenv.config();
import cors from "cors";
import { errorHanlder } from "./middleware/errorHanlder.js";
import { userRouter } from "./routes/user.route.js";
const app = express();
connectToDB();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use("/api/user", userRouter);
app.use(errorHanlder);
app.listen(port, () => {
  console.log("Server Is Running On", port);
});
