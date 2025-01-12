import Request from "../models/Request.js";

export const getRequestbyUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log(userId);

    const userRequests = await Request.find({ requesterid: userId });

    if (!userRequests) {
      return res
        .status(404)
        .json({ message: "No requests found for this user" });
    }
    res.json(userRequests); // Send the found requests
  } catch (error) {
    console.error("Fetching error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
