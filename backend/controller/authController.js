import User from "../models/User.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/SendEmail.js";

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

export const forgotpassword = async (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "If this email is registered, you will receive a reset link.",
    });
  }

  // Create a password reset token (for 1 hour expiry)
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetExpire = Date.now() + 3600000; // Token expires in 1 hour

  // Save the token and expiration date in the database
  user.passwordResetToken = resetToken;
  user.passwordResetExpire = resetExpire;

  console.log(email);
  console.log(user);
  console.log(resetToken);
  console.log(resetExpire);

  console.log(user.passwordResetToken);
  console.log(user.passwordResetExpire);

  try {
    await user.save(); // Make sure to save the changes to the user document

    // Generate a password reset URL with the token
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log(resetLink);

    // Send the email with the reset link
    await sendEmail(
      user.email,
      "Password Reset",
      `Click here to reset your password: ${resetLink}`
    );

    return res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error sending email. Please try again later.",
    });
  }
};

// Reset Password Route
export const resetpassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the user with the reset token and check expiration
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpire: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Update the password and clear the reset token fields
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred. Please try again later." });
  }
};
