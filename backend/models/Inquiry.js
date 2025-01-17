import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    type: { type: String, default: "Inquiry" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
    status: { type: String, default: "Pending" },
    file: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("inquiry", inquirySchema);

export default Inquiry;
