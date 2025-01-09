import express from "express";
import { updateAccount } from "../controller/UpdateAccount.js";
const router = express.Router();

router.put("/:id", updateAccount);

export default router;
