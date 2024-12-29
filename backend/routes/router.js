import express from "express";
import { postContact } from "../controller/httpController.js";

const router = express.Router();

router.post("/", postContact);

export default router;
