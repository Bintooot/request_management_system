// routes/admin.js
import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Inquiry from "../models/Inquiry.js";
import Request from "../models/Request.js";

const router = express.Router();

router.get("/profile", verifyToken, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.userId;

    const admin = await Admin.findById(adminId).select("-password"); // Exclude password from the response

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      accountid: admin.accountid,
      username: admin.username,
      email: admin.email,
      contactnumber: admin.contactnumber,
      position: admin.position,
      address: admin.address,
      role: admin.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Total count of user
router.get("/total-user", verifyToken, isAdmin, async (req, res) => {
  try {
    const response = await User.countDocuments();

    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Total count of admin
router.get("/total-admin", verifyToken, isAdmin, async (req, res) => {
  try {
    const response = await Admin.countDocuments();

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Users List
router.get("/list-of-user", verifyToken, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.userId;

    const response = await User.find(
      {},
      "accountid username email contactnumber position address createdAt"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      users: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin List
router.get("/list-of-admin", verifyToken, isAdmin, async (req, res) => {
  try {
    const response = await Admin.find(
      {},
      "accountid username email contactnumber position address createdAt"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      users: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-pending-inquiry", verifyToken, isAdmin, async (req, res) => {
  try {
    const response = await Inquiry.countDocuments({
      status: "Pending",
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-pending-request", verifyToken, isAdmin, async (req, res) => {
  try {
    const response = await Request.countDocuments({
      status: "Pending",
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
