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
import CreateRequestRoute from "./routes/CreateRequestRoute.js";
import GetUserRequest from "./routes/GetUserRequest.js";
import CancelRequestRoute from "./routes/CancelRequestRoute.js";
import TotalPendingRequestRoute from "./routes/TotalPendingRequestRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// landing page endpoint
app.use("/api/contactUs", contactRoute);
app.use("/api/registerAccount", RegisterRoute);
app.use("/api/loginAccount", LoginRoute);

//user-dashboard endpoint
app.use("/api/user-dashboard", ProfileRoute); // authenticated user login
app.use("/api/updateAccount", UpdateAccoutRoute); // Update the Profile
app.use("/api/submit-request", CreateRequestRoute); // submit request
app.use("/api/getuser-request", GetUserRequest); // fetching the data of a specific user that whos been currently login
app.use("/api/cancel-request", CancelRequestRoute); //cancel the current request
app.use("/api/total-pending-request", TotalPendingRequestRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
