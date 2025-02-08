import express, { request } from "express";
import bcrypt from "bcryptjs";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import Inquiry from "../models/Inquiry.js";
import { io } from "../server.js";

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
      createdAt: admin.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/count-request-inquiries",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const countApprovedRequest = await Request.countDocuments({
        status: { $in: ["Approved", "Out for Delivery"] },
      });
      const countRequest = await Request.countDocuments({ status: "Pending" });
      const countInquiries = await Inquiry.countDocuments({
        status: { $in: ["Pending", "Viewed"] },
      });

      const response = countRequest + countInquiries;

      console.log("Total Response", response);
      console.log("Total Response", countApprovedRequest);
      res.status(200).json({ response, countApprovedRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/request-range-data", verifyToken, async (req, res) => {
  try {
    const { startdate, enddate } = req.query;
    if (!startdate || !enddate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    // Convert startdate and enddate to JavaScript Date objects
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);

    // Ensure startDate and endDate are in UTC for consistency
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    console.log("Range Start Date (UTC):", startDate.toISOString());
    console.log("Range End Date (UTC):", endDate.toISOString());

    const totalDataCount = await Request.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ["Completed", "Rejected"] },
    });

    res
      .status(200)
      .json({ totalDataCount, message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching request range data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/chicks-quantity-range-data", verifyToken, async (req, res) => {
  try {
    const { startdate, enddate } = req.query;
    if (!startdate || !enddate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required" });
    }

    const startDate = new Date(startdate);
    const endDate = new Date(enddate);

    // Ensure UTC consistency
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    console.log("Start Date (UTC):", startDate.toISOString());
    console.log("End Date (UTC):", endDate.toISOString());

    // Aggregate total quantity within date range
    const totalQuantityResult = await Request.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ["Completed", "Rejected"] },
        },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" }, // Sum the quantity field
        },
      },
    ]);

    // Extract the total quantity or return 0 if no matching records
    const totalQuantity =
      totalQuantityResult.length > 0 ? totalQuantityResult[0].totalQuantity : 0;

    console.log(totalQuantity);

    res
      .status(200)
      .json({ totalQuantity, message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching total quantity data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-profile", verifyToken, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { email, contactNumber, address, password } = req.body;

    console.log(req.body);
    console.log(password);

    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Update fields
    admin.set({ email, contactnumber: contactNumber, address });

    let passwordChanged = false;

    if (password) {
      admin.password = password;
      passwordChanged = true;
    }

    await admin.save();

    res.json({
      accountid: admin.accountid,
      username: admin.username,
      email: admin.email,
      contactnumber: admin.contactnumber,
      position: admin.position,
      address: admin.address,
      role: admin.role,
      createdAt: admin.createdAt,
      logout: passwordChanged, // Inform frontend if logout is needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/total-users-request/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const userId = req.params.id;

      console.log("User ID: ", userId);

      const totalUsers = await Request.countDocuments({ requesterid: userId });

      console.log("Total Requests:", totalUsers);

      res.status(200).json({ totalUsers });
    } catch (error) {
      console.error("Error fetching total users request:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get(
  "/total-users-inquiry/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const userId = req.params.id;

      console.log("User ID: ", userId);

      const totalInquiry = await Inquiry.countDocuments({ userId: userId });

      console.log("Total Inquiry:", totalInquiry);

      res.status(200).json({ totalInquiry });
    } catch (error) {
      console.error("Error fetching total users inquiry:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/resolved-requests", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalResolvedRequests = await Request.countDocuments({
      status: { $in: ["Completed", "Rejected"] },
    });

    if (!totalResolvedRequests) {
      return res.status(404).json({ message: "No received requests found." });
    }

    console.log(totalResolvedRequests);
    res.status(200).json({ response: totalResolvedRequests });
  } catch (error) {
    console.error("Error fetching total received requests:", error);
    res
      .status(500)
      .json({ message: "Error fetching total received requests." });
  }
});

router.get("/yearly-request-count", async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    // Start of the year (January 1, 00:00:00)
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    // End of the year (December 31, 23:59:59)
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));

    console.log("Yearly Start Date:", startDate.toISOString());
    console.log("Yearly End Date:", endDate.toISOString());

    const requestData = await Request.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
          status: { $in: ["Completed", "Rejected"] },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedData = monthNames.map((month, index) => {
      const monthData = requestData.find((item) => item._id === index + 1);
      return {
        month,
        Request_Quantity: monthData ? monthData.count : 0,
      };
    });

    console.log("Formatted Yearly Data:", formattedData);
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching yearly request data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/yearly-chicks-data", verifyToken, isAdmin, async (req, res) => {
  const { year } = req.query;

  if (!year || isNaN(year)) {
    return res.status(400).json({ message: "Valid year is required" });
  }

  try {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
    endDate.setUTCHours(23, 59, 59, 999);

    // MongoDB aggregation query
    const chicksData = await Request.aggregate([
      {
        $match: {
          status: { $in: ["Completed", "Rejected"] },
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalQuantity: { $sum: { $ifNull: ["$quantity", 0] } },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: "$_id",
          total_quantity: "$totalQuantity",
          _id: 0,
        },
      },
    ]);

    // Map month numbers to month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format data
    const formattedChicksData = Array.from({ length: 12 }, (_, i) => {
      const monthData = chicksData.find((item) => item.month === i + 1);
      return {
        month: months[i],
        total_quantity: monthData ? monthData.total_quantity : 0, // Ensure all months are represented
      };
    });

    console.log(formattedChicksData);
    return res.json(formattedChicksData);
  } catch (error) {
    console.error("Error fetching chicks data:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/resolved-inquiries", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalResolvedInquiries = await Inquiry.countDocuments({
      status: { $in: ["Viewed", "Resolved"] },
    });

    if (!totalResolvedInquiries) {
      return res.status(404).json({ message: "No received requests found." });
    }

    console.log(totalResolvedInquiries);
    res.status(200).json({ response: totalResolvedInquiries });
  } catch (error) {
    console.error("Error fetching total received requests:", error);
    res
      .status(500)
      .json({ message: "Error fetching total received requests." });
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
    io.emit("updateRequest", { message: "Request has been updated" });

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
  const { currentstatus, status, adminFeedback, reviewedby } = req.body;
  const inquiryId = req.params.id;

  if (!status) {
    return res.status(400).json({
      error: "Status is required.",
    });
  }

  if (currentstatus === status) {
    return res.status(400).json({
      error: `Status is already ${currentstatus}`,
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

    io.emit("updateInquiry", { message: "Inquiry has been updated" });

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
      const { currentstatus, updateStatus } = req.body;
      const requestId = req.params.id;

      if (!updateStatus) {
        return res.status(400).json({
          error: "Select status to update!",
        });
      }

      if (currentstatus == updateStatus) {
        return res.status(400).json({
          error: `Request is already ${currentstatus}`,
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
      io.emit("updateApprovedRequest", {
        message: "Approved Request has been updated.",
      });
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
