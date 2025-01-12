import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    generatedRequestNo: {
      type: String,
      required: true,
      unique: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requesterid: { type: String, required: true },
    requesterName: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: "Pending" },
    chicksType: { type: String, required: true },
    quantity: { type: Number, required: true },
    numberofrequester: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    file: { type: String }, // New field for storing file path
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("request", requestSchema);

export default Request;
