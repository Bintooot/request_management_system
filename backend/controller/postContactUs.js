import ContactUs from "../models/ContactUs.js";

// Post a message for ContactUs
export const postContactUs = async (req, res) => {
  try {
    const newContactUs = new ContactUs(req.body);
    await newContactUs.save();
    res.status(201).json(newContactUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
