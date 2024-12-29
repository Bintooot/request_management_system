import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to MongoDB Atlas"))
      .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
