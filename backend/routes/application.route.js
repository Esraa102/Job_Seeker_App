import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import {
  applyJob,
  getApplication,
} from "../controllers/application.controller.js";
const router = express.Router();

router.post("/apply/:jobId", verfiyToken, applyJob);
router.get("/get-application/:applicationId", verfiyToken, getApplication);

export { router as applicationRouter };
