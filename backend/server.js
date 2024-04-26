import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
dotenv.config();
import cors from "cors";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorHanlder } from "./middleware/errorHanlder.js";
import { userRouter } from "./routes/user.route.js";
import { applicationRouter } from "./routes/application.route.js";
import { jobRouter } from "./routes/job.router.js";

const app = express();
connectToDB();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/jobs", jobRouter);

app.use(errorHanlder);
app.listen(port, () => {
  console.log("Server Is Running On", port);
});
