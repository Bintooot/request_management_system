import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requesterid: { type: String, required: true },
    requesterName: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    file: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("inquiry", inquirySchema);

export default Inquiry;
