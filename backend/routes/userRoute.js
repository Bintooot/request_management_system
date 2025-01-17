import express, { response } from "express";
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import fileMiddleware from "../middleware/fileMiddleware.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import generateRequestNo from "../utils/RandomNumber.js";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// User-specific routes
router.get("/profile", verifyToken, isUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      accountid: user.accountid,
      username: user.username,
      email: user.email,
      contactnumber: user.contactnumber,
      position: user.position,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all-pending-request", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const response = await Request.find({
      requesterid: userId,
      status: "Pending",
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-inquiry", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const response = await Inquiry.countDocuments({
      userId: userId,
      status: "Pending",
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all-pending-inquiry", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const inquiryresponse = await Inquiry.find({
      userId: userId,
      status: "Pending",
    });

    res.status(200).json({ inquiryresponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/request-data", async (req, res) => {
  try {
    const requests = await Request.aggregate([
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedRequests = requests.map((request) => ({
      date: request._id,
      count: request.count,
    }));

    console.log("Request Data: ", requests);

    // Send the formatted request data as the response
    res.json(formattedRequests);
  } catch (error) {
    console.error("Error fetching request data:", error);
    res.status(500).json({ message: "Error fetching request data" });
  }
});

router.get("/recent-activity", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const request = await Request.find({ requesterid: userId })
      .select("type status createdAt")
      .lean();
    const inquiry = await Inquiry.find({ userId: userId })
      .select("type status createdAt")
      .lean();

    const formattedRequests = request.map((item) => ({
      ...item,
      source: "Request",
    }));

    const formattedInquiries = inquiry.map((item) => ({
      ...item,
      source: "Inquiry",
    }));

    const combinedActivities = [
      ...formattedInquiries,
      ...formattedRequests,
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, activities: combinedActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/total-pending-request", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status } = req.query;

    const filter = {
      requesterid: userId,
      ...(status && { status }),
    };

    const count = await Request.countDocuments(filter);
    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile of the user
router.put("/update-profile/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await User.findOneAndUpdate({ accountid: id }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/submit-request",
  verifyToken,
  fileMiddleware.single("file"), // Make sure this is set up correctly in the middleware
  async (req, res) => {
    const {
      requesterName,
      chicksType,
      location,
      numberofrequester,
      description,
      quantity,
      filename,
    } = req.body;

    const userId = req.user?.userId;

    try {
      // Handle file upload if exists
      const file = req.file ? req.file.path : null;
      const generatedRequestNo = generateRequestNo(); // Call the f

      const newRequest = new Request({
        generatedRequestNo,
        requesterid: userId,
        requesterName,
        chicksType,
        location,
        numberofrequester,
        description,
        quantity,
        filename,
        file,
      });

      await newRequest.save();
      res
        .status(200)
        .json({ message: "Request submitted successfully", data: newRequest });
    } catch (error) {
      console.error("Error submitting request:", error);
      res
        .status(500)
        .json({ message: "Error submitting request", error: error.message });
    }
  }
);

router.post(
  "/submit-inquiry",
  verifyToken,
  isUser,
  fileMiddleware.single("file"),
  async (req, res) => {
    try {
      const userId = req.user.userId;

      const { requesterName, subject, message } = req.body;
      const file = req.file ? req.file.path : null;

      const inquiry = new Inquiry({
        userId: userId,
        name: requesterName,
        subject,
        message,
        file,
      });

      await inquiry.save();
      res
        .status(200)
        .json({ message: "Inquiry submitted successfully", data: inquiry });
    } catch (error) {
      console.error("Error submitting request:", error);
      res
        .status(500)
        .json({ message: "Error submitting request", error: error.message });
    }
  }
);

router.delete("/cancel-request/:id", verifyToken, isUser, async (req, res) => {
  try {
    const { id } = req.params; // data to delete
    const userId = req.user?.userId; //requester ID

    if (!userId) {
      return res
        .status(401)
        .json({ message: "No token provided or user not authorized" });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.requesterid.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this request" });
    }

    await Request.findByIdAndDelete(id);

    return res.status(200).json({ message: "Request successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/remove-inquiry/:id", verifyToken, isUser, async (req, res) => {
  try {
    const { id } = req.params; // data to delete
    const userId = req.user?.userId; //requester ID

    if (!userId) {
      return res
        .status(401)
        .json({ message: "No token provided or user not authorized" });
    }

    const request = await Inquiry.findById(id);

    console.log("remove Inquiry ID", request);

    if (!request) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    if (request.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to remove this inquiry" });
    }

    await Inquiry.findByIdAndDelete(id);

    return res.status(200).json({ message: "Request successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
