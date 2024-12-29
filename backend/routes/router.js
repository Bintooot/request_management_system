import express from "express";
import { postContact, postRegister } from "../controller/httpController.js";

const router = express.Router();

router.post("/submitcontactform", postContact);
router.post("/submitregister", postRegister);

export default router;
