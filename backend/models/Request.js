import mongoose from "mongoose";
import moment from "moment-timezone";

const requestSchema = new mongoose.Schema(
  {
    generatedRequestNo: {
      type: String,
      required: true,
      unique: true,
    },
    requesterid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requesterName: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, default: "Chick Request" },
    reviewedby: { type: String, default: "Not yet reviewed" },
    status: { type: String, default: "Pending" },
    chicksType: { type: String, required: true },
    quantity: { type: Number, required: true },
    numberofrequester: { type: Number, required: true },
    description: { type: String, required: true },
    adminFeedback: { type: String, default: "" },
    createdAt: { type: Date },
    filename: { type: String, required: true },
    file: { type: String }, // New field for storing file path
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to set `createdAt` to local time
requestSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = moment.tz(Date.now(), "Asia/Manila").toDate();
  }
  next();
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
