import express from "express";
import {
  logInUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
export { router as userRouter };
