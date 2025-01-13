import express from "express";
import { createInquiry } from "../controller/CreateInquiry.js";
const routes = express.Router();

routes.post("/", createInquiry);

export default routes;
