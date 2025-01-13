import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import Request from "../models/Request.js";

const routes = express.Router();

routes.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const requestId = req.params.id; // Request ID to be deleted
    const userId = req.user.id; // ID of the current authenticated user

    console.log("Request ID:", requestId);
    console.log("User ID:", userId);

    // Find the specific request by its ID
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if the requesterid matches the current user ID
    if (request.requesterid !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this request" });
    }

    // Delete the request
    await Request.findByIdAndDelete(requestId);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deleting request error" });
  }
});

export default routes;
