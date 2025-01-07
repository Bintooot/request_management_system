import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verify the token with your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user information in request object for later use
    req.user = decoded; // decoded user info is typically the user ID
    next(); // Continue to the next middleware or route
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authenticate;
