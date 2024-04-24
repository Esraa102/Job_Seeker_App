import express from "express";
import {
  deleteFromSaved,
  getUser,
  logInUser,
  logOutUser,
  registerUser,
  saveOrUnsaveJob,
} from "../controllers/user.controller.js";
import { verfiyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/logout", logOutUser);
router.post("/save-unsave/:jobId", verfiyToken, saveOrUnsaveJob);
router.delete("/delete-saved/:jobId", verfiyToken, deleteFromSaved);
router.get("/get-user/:userId", getUser);
export { router as userRouter };
