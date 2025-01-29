import express, { request } from "express";
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

// List all pending inquiry
router.get("/list-pending-inquiry", verifyToken, isAdmin, async (req, res) => {
  try {
    const pendingInquiries = await Inquiry.find({
      status: { $in: ["Pending", "Viewed"] },
    })
      .lean()
      .sort({ createdAt: -1 });

    console.log(pendingInquiries);

    res.status(200).json({ response: pendingInquiries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/list-aprroved-request", verifyToken, isAdmin, async (req, res) => {
  try {
    const approvedlist = await Request.find({
      status: { $in: ["Approved", "Out for Delivery"] },
    }).sort({ createdAt: -1 });

    res.status(200).json({ approvedlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/history-data", verifyToken, isAdmin, async (req, res) => {
  try {
    const userRequestData = await Request.find({
      status: { $in: ["Rejected", "Completed"] },
    }).sort({ createdAt: -1 });

    const userInquiryData = await Inquiry.find({
      status: { $in: ["Viewed", "Resolved"] },
    }).sort({
      createdAt: -1,
    });

    const totalRequests = await Request.countDocuments({
      status: { $in: ["Rejected", "Completed"] },
    });
    const totalInquiries = await Inquiry.countDocuments({
      status: { $in: ["Viewed", "Resolved"] },
    });

    const response = {
      request: userRequestData,
      inquiry: userInquiryData,
      meta: {
        totalRequests,
        totalInquiries,
      },
    };

    console.log(response);
    res.status(200).json(response);
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

  if (status === "Rejected" && deliveryDate) {
    return res.status(400).json({
      error: "Delivery Date should not be provided for rejected requests.",
    });
  }

  if (status !== "Rejected" && !deliveryDate) {
    return res.status(400).json({
      error: "Delivery Date is required for approved requests.",
    });
  }

  const formattedDeliveryDate = deliveryDate
    ? new Date(deliveryDate).toISOString()
    : null;

  // gi kuha ang current date.
  const statusChangedAt = new Date().toISOString();

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }

    request.status = status;
    request.adminFeedback = adminFeedback;
    request.reviewedby = reviewedby;

    if (formattedDeliveryDate) {
      request.deliveryDate = formattedDeliveryDate;
    }

    // either approved or rejected ang request, e save ang date.
    if (status === "Approved") {
      request.reviewedDate = statusChangedAt;
    }

    if (status === "Rejected") {
      request.rejectedDate = statusChangedAt;
    }

    await request.save();

    res.status(200).json({
      message: `Request status updated successfully to '${status}'!`,
      updatedRequest: request,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res
      .status(500)
      .json({ error: "Server error, failed to update request status." });
  }
});

router.put("/update-inquiry-status/:id", async (req, res) => {
  const { status, adminFeedback, reviewedby } = req.body;
  const inquiryId = req.params.id;

  if (!status) {
    return res.status(400).json({
      error: "Status is required.",
    });
  }

  if (status === "Resolved" && !adminFeedback) {
    return res.status(400).json({
      error: "Admin feedback is required.",
    });
  }

  // gi kuha ang current date.
  const statusChangedAt = new Date().toISOString();

  try {
    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    inquiry.status = status;
    inquiry.adminFeedback = adminFeedback;
    inquiry.reviewedby = reviewedby;

    // check kong ang status kay resolved or viewed then save the date.
    if (status === "Resolved") {
      inquiry.resolvedAt = statusChangedAt;
    }

    if (status === "Viewed") {
      inquiry.viewedAt = statusChangedAt;
    }

    await inquiry.save();

    res.status(200).json({
      message: `Inquiry status updated successfully to '${status}'!`,
      updatedRequest: inquiry,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res
      .status(500)
      .json({ error: "Server error, failed to update request status." });
  }
});

router.put(
  "/update-approved-request/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const { updateStatus } = req.body;
      const requestId = req.params.id;
      console.log(updateStatus);
      console.log(requestId);

      if (!updateStatus) {
        return res.status(400).json({
          error: "Status is required.",
        });
      }

      const selectedRequest = await Request.findById(requestId);

      console.log(selectedRequest);

      if (!selectedRequest) {
        return res.status(404).json({ error: "Request not found." });
      }

      const currentDate = new Date();
      if (updateStatus === "Out for Delivery") {
        selectedRequest.status = updateStatus;
        selectedRequest.outForDeliveryDate = currentDate;
      } else if (updateStatus === "Completed") {
        selectedRequest.status = updateStatus;
        selectedRequest.completedDate = currentDate;
      }

      // Save the updated request
      await selectedRequest.save();

      res.status(200).json({
        message: `Request status updated successfully to '${updateStatus}'!`,
        updatedRequest: selectedRequest,
      });
    } catch (error) {
      console.error("Error updating request:", error);
      res
        .status(500)
        .json({ error: "Server error, failed to update request status." });
    }
  }
);

export default router;
