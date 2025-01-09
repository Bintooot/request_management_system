import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const {
    accountid,
    username,
    email,
    contactnumber,
    password,
    position,
    address,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "The email you entered is already registered." });

    const newUser = new User({
      accountid,
      username,
      email,
      contactnumber,
      password,
      position,
      address,
    });
    await newUser.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
