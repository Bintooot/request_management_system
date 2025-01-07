import express from "express";

import { postContactUs } from "../controller/postContactUs.js";

const router = express.Router();

//submit message from ContactUs
router.post("/", postContactUs);

export default router;
