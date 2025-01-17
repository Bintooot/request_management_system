import mongoose from "mongoose";

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
    createdAt: { type: Date, default: Date.now },
    filename: { type: String, required: true },
    file: { type: String }, // New field for storing file path
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("request", requestSchema);

export default Request;
