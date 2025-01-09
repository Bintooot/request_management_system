import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import contactRoute from "./routes/contactRoute.js";
import RegisterRoute from "./routes/RegisterRoute.js";
import LoginRoute from "./routes/LoginRoute.js";
import ProfileRoute from "./routes/profileRoute.js";
import UpdateAccoutRoute from "./routes/UpdateAccountRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/contactUs", contactRoute);
app.use("/api/registerAccount", RegisterRoute);
app.use("/api/loginAccount", LoginRoute);
app.use("/api/user-dashboard", ProfileRoute);
app.use("/api/updateAccount", UpdateAccoutRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
