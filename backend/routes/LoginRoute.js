import express from "express";
import { loginAccount } from "../controller/LoginAccount.js";

const router = express.Router();

router.post("/", loginAccount);

export default router;
