import express from "express";
import { createRequest } from "../controller/CreateRequest.js";

const router = express.Router();

router.post("/", createRequest);

export default router;
