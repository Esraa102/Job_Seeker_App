import express from "express";
import {
  logInUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verfiyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/logout", verfiyToken, logOutUser);
export { router as userRouter };
