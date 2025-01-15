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
  fileMiddleware.single("file"), // Make sure this is set up correctly in the middleware
  async (req, res) => {
    const {
      requesterid,
      requesterName,
      chicksType,
      location,
      numberofrequester,
      description,
      quantity,
    } = req.body;

    console.log(req.body); // Log the received body

    try {
      // Handle file upload if exists
      const file = req.file ? req.file.path : null;
      const generatedRequestNo = generateRequestNo(); // Call the f

      const newRequest = new Request({
        generatedRequestNo,
        requesterid,
        requesterName,
        chicksType,
        location,
        numberofrequester,
        description,
        quantity,
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

export default router;
