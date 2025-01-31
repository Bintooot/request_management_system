import User from "../models/User.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";

// Register handler (for both user and admin)
export const register = async (req, res) => {
  const { email, password, username, contactnumber, position, address, role } =
    req.body;

  try {
    let user;

    // Check if the user or admin already exists
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = role === "admin" ? new Admin(req.body) : new User(req.body);

    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(req.body);

    let user = await Admin.findOne({ email });

    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "User or Admin not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
