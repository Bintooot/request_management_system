import express from "express";
import Request from "../models/Request.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const userRequests = await Request.find({ requesterid: userId });

    if (!userRequests) {
      return res
        .status(404)
        .json({ message: "No requests found for this user" });
    }
    res.json(userRequests);
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
