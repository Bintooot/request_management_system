import express from "express";
import {
  register,
  login,
  forgotpassword,
  resetpassword,
} from "../controller/authController.js";

const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password/:token", resetpassword);

export default router;
