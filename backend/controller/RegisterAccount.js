import User from "../models/User.js";
import bcrypt from "bcryptjs"; // for password hashing

export const registerUser = async (req, res) => {
  const {
    accountid,
    username,
    email,
    contactnumber,
    password,
    position,
    address,
  } = req.body;

  try {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The email you entered is already registered." });
    }

    // Create a new user object
    const newUser = new User({
      accountid,
      username,
      email,
      contactnumber,
      password, // Use hashed password
      position,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
