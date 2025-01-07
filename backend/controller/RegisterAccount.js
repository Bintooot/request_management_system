import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, email, contactnumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "The email you entered is already registered." });

    const newUser = new User({ username, email, contactnumber, password });
    await newUser.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
