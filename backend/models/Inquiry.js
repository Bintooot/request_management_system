import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    inquiryId: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: "Inquiry" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    adminFeedback: { type: String },
    status: { type: String, default: "Pending" },
    filename: { type: String },
    reviewedby: { type: String },
    viewedAt: { type: Date },
    resolvedAt: { type: Date },
    file: { type: String },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("inquiry", inquirySchema);

export default Inquiry;
