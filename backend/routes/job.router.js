import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
  getMyJobs,
  searchJobs,
} from "../controllers/job.controller.js";
const router = express.Router();

router.post("/create-job", verfiyToken, createJob);
router.put("/update-job/:jobId", verfiyToken, updateJob);
router.delete("/delete-job/:jobId", verfiyToken, deleteJob);
router.get("/my-jobs", verfiyToken, getMyJobs);

router.get("/all-jobs", getAllJobs);
router.get("/job/:jobId", getJobById);
router.get("/search-job", searchJobs);

export { router as jobRouter };
