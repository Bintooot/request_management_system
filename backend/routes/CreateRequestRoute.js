import express from "express";
import { createRequest } from "../controller/CreateRequest.js";

import { upload } from "../middleware/authenticate.js";

const router = express.Router();

// Protect the route with the authenticate middleware
router.post("/", createRequest);

export default router;
