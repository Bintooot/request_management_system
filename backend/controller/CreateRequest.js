import Request from "../models/Request.js";
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

export const createRequest = async (req, res) => {
  try {
    // Use multer middleware to handle file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading file", error: err.message });
      }

      // Check for missing required fields
      const {
        requesterid,
        requesterName,
        chicksType,
        location,
        numberofrequester,
        description,
        quantity,
      } = req.body;

      if (
        !requesterid ||
        !requesterName ||
        !chicksType ||
        !location ||
        !numberofrequester ||
        !description ||
        !quantity
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Generate unique request number
      const lastRequest = await Request.findOne().sort({ createdAt: -1 });
      const newRequestNo = lastRequest
        ? `REQ-${
            parseInt(lastRequest.generatedRequestNo.split("-")[1], 10) + 1
          }`
        : "REQ-1"; // Fallback for the first request

      // Get the file information from the request
      const file = req.file;

      // Prepare the new request object
      const newRequest = new Request({
        generatedRequestNo: newRequestNo,
        requesterid,
        requesterName,
        chicksType,
        location,
        status: "Pending",
        numberofrequester,
        description,
        quantity,
        file: file ? file.path : null, // Save file path if file exists
      });

      // Save the new request to the database
      const savedRequest = await newRequest.save();

      // Respond with success message
      res.status(201).json({
        message: "Request created successfully",
        request: savedRequest,
        generatedRequestNo: newRequestNo,
        filePath: file ? file.path : null, // Include file path in response if file exists
      });
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({
      message: "Error creating request",
      error: error.message,
    });
  }
};
