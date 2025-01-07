import express from "express";
import { registerUser } from "../controller/RegisterAccount.js";

const router = express.Router();

router.post("/", registerUser);

export default router;
