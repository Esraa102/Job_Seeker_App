import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";
const router = express.Router();

router.post("/create-job", verfiyToken, createJob);
router.put("/update-job/:jobId", verfiyToken, updateJob);
router.delete("/delete-job/:jobId", verfiyToken, deleteJob);

router.get("/all-jobs", getAllJobs);
router.get("/job/:jobId", getJobById);

export { router as jobRouter };
