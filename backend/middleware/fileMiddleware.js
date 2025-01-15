import multer from "multer";
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid conflicts
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

export default upload;
