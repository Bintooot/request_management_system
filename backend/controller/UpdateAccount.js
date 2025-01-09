import User from "../models/User.js";

export const updateAccount = async (req, res) => {
  const { email, contactnumber, address } = req.body;
  const { id } = req.params;

  console.log("Received ID:", id); // Debug log
  console.log("Update Fields:", { email, contactnumber, address }); // Debug log

  try {
    // Check if user exists
    const user = await User.findOne({ accountid: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate email format if provided
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (email) updateFields.email = email;
    if (contactnumber) updateFields.contactnumber = contactnumber;
    if (address) updateFields.address = address;

    const updatedUser = await User.findOneAndUpdate(
      { accountid: id },
      updateFields,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
