import express from "express";
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import fileMiddleware from "../middleware/fileMiddleware.js";
import User from "../models/User.js";
import Request from "../models/Request.js";
import generateRequestNo from "../utils/RandomNumber.js";

const router = express.Router();

// User-specific routes
router.get("/profile", verifyToken, isUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
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

router.get("/total-pending-request/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log(userId);

    const response = await Request.find({
      requesterid: userId,
      status: "Pending",
    });

    console.log(response);
    res.status(200).json({ response });
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

    console.log(id, updatedData);

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
    console.log(req.body);

    const userId = req.user?.userId;
    console.log(userId);

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

router.delete("/cancel-request/:id", verifyToken, isUser, async (req, res) => {
  try {
    const { id } = req.params; // data to delete
    const userId = req.user?.userId; //requester ID

    console.log(id);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "No token provided or user not authorized" });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log();
    console.log("User ID:", id);
    console.log("Requester ID: ", userId);
    console.log(request);

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

export default router;
