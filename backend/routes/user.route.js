import express from "express";
import {
  deleteFromSaved,
  logInUser,
  logOutUser,
  registerUser,
  saveJob,
} from "../controllers/user.controller.js";
import { verfiyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/logout", verfiyToken, logOutUser);
router.post("/save/:jobId", verfiyToken, saveJob);
router.delete("/delete-saved/:jobId", verfiyToken, deleteFromSaved);

export { router as userRouter };
