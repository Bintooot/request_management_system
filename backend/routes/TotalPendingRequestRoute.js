import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import Request from "../models/Request.js";

const routes = express.Router();

routes.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user's ID from the authenticated token

    // Count the number of requests for this user
    const requestCount = await Request.countDocuments({ requesterid: userId });

    console.log(requestCount);

    // Send the count back in the response
    res.status(200).json({ requestCount });
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default routes;
