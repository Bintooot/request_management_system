import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (!userEmail) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, userEmail.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: userEmail._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ success: true, token });
};
