import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  console.log();
  console.log("Token received:", token);
  console.log(process.env.JWT_SECRET_KEY);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error during token verification:", err);
    res.status(403).json({ message: "Invalid token." });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user.userId);
    const admin = await Admin.findById(req.user.userId);
    if (!admin || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

export const isUser = async (req, res, next) => {
  try {
    console.log(req.user.userId);
    const user = await User.findById(req.user.userId);
    if (!user || req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied. Not an user." });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
