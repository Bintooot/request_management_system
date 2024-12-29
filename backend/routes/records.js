import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let result = await collection.find({}).toArray();
  res.send(result).status(200);
});

export default router;
