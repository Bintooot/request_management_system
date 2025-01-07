import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Protected route: View user profile
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Use userId from JWT payload
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
