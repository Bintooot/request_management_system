import express from "express";
import { createRequest } from "../controller/CreateRequest.js";

const router = express.Router();

// Protect the route with the authenticate middleware
router.post("/", createRequest);

export default router;
