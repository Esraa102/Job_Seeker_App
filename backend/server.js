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

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/job", jobRouter);

app.use(errorHanlder);
app.listen(port, () => {
  console.log("Server Is Running On", port);
});
