// routes/admin.js
import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";

const router = express.Router();

router.get("/profile", verifyToken, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.userId;
    console.log(adminId);
    const admin = await Admin.findById(adminId).select("-password"); // Exclude password from the response

    console.log(admin);

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

export default router;
