import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// Get admin profile
router.get("/profile", verifyToken, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.userId;
    const admin = await Admin.findById(adminId).select("-password");

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

// Get total count of users
router.get("/total-user", verifyToken, isAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();

    res.status(200).json({ response: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get total count of admins
router.get("/total-admin", verifyToken, isAdmin, async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.status(200).json({ response: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// List all users
router.get("/list-of-user", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// List all admin
router.get("/list-of-admin", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-pending-inquiry", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingInquiriesCount = await Inquiry.countDocuments({
      status: "Pending",
    });
    res.status(200).json({ response: pendingInquiriesCount });
  } catch (error) {
    console.error("Error fetching total pending inquiries:", error);
    res
      .status(500)
      .json({ message: "Error fetching total pending inquiries." });
  }
});

router.get("/total-pending-request", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingRequestsCount = await Request.countDocuments({
      status: "Pending",
    });
    res.status(200).json({ response: pendingRequestsCount });
  } catch (error) {
    console.error("Error fetching total pending requests:", error);
    res.status(500).json({ message: "Error fetching total pending requests." });
  }
});

// List all pending requests
router.get("/list-pending-request", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: "Pending" }).lean();

    console.log(pendingRequests);

    res.status(200).json({ response: pendingRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/list-aprroved-request", verifyToken, isAdmin, async (req, res) => {
  try {
    const approvedlist = await Request.find({
      status: "Approved",
    });

    res.status(200).json({ approvedlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-request-status/:id", async (req, res) => {
  const { status, adminFeedback, reviewedby, deliveryDate } = req.body;
  const requestId = req.params.id;

  if (!status) {
    return res.status(400).json({
      error: "Status is required.",
    });
  }

  if (!adminFeedback) {
    return res.status(400).json({
      error: "Admin feedback is required.",
    });
  }

  // If the status is "Rejected", we don't require a delivery date
  if (status === "Rejected" && deliveryDate) {
    return res.status(400).json({
      error: "Delivery Date should not be provided for rejected requests.",
    });
  }

  // If the status is not "Rejected", the delivery date is required
  if (status !== "Rejected" && !deliveryDate) {
    return res.status(400).json({
      error: "Delivery Date is required.",
    });
  }

  // Format the delivery date only if it's provided
  const formattedDeliveryDate = deliveryDate
    ? new Date(deliveryDate).toISOString()
    : null;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }

    // Update the request
    request.status = status;
    request.adminFeedback = adminFeedback;
    request.reviewedby = reviewedby;

    // Only update deliveryDate if it's provided
    if (formattedDeliveryDate) {
      request.deliveryDate = formattedDeliveryDate;
    }

    await request.save();

    res.status(200).json({
      message: "Request status updated successfully!",
      updatedRequest: request,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res
      .status(500)
      .json({ error: "Server error, failed to update request status." });
  }
});

export default router;
