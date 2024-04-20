import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import { applyJob } from "../controllers/application.controller.js";
const router = express.Router();

router.post("/apply/:jobId", verfiyToken, applyJob);

export { router as applicationRouter };
