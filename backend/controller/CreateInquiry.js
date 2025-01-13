import Inquiry from "../models/Inquiry.js";
import multer from "multer";

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Assign a unique name to the file
  },
});

const upload = multer({ storage: storage });

export const createInquiry = async (req, res) => {
  try {
    // Use multer middleware to handle file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading file", error: err.message });
      }

      // Check for missing required fields
      const { requesterid, requesterName, subject, message } = req.body;

      console.log(req.body);

      if (!requesterid || !requesterName || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get the file information from the request
      const file = req.file;

      // Prepare the new inquiry object
      const newInquiry = new Inquiry({
        requesterid,
        requesterName,
        subject,
        message,
        file: file ? file.path : null, // Save file path if file exists
      });

      // Save the new inquiry to the database
      const savedInquiry = await newInquiry.save();

      // Respond with success message
      res.status(201).json({
        message: "Inquiry created successfully",
        request: savedInquiry,
        filePath: file ? file.path : null, // Include file path in response if file exists
      });
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({
      message: "Error creating inquiry",
      error: error.message,
    });
  }
};
