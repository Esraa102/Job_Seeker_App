import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHanlder } from "./middleware/errorHanlder.js";
import { userRouter } from "./routes/user.route.js";
import { applicationRouter } from "./routes/application.route.js";
import { jobRouter } from "./routes/job.router.js";
import path from "path";
const app = express();
connectToDB();

const port = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://job-seeker-app-1.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/jobs", jobRouter);
app.use(errorHanlder);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log("Server Is Running On", port);
});
