import mongoose from "mongoose";
import moment from "moment-timezone";
import { type } from "os";

// Define the Request schema
const requestSchema = new mongoose.Schema(
  {
    generatedRequestNo: {
      type: String,
      required: true,
      unique: true,
    },
    requesterid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    requesterName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Chick Request",
    },
    reviewedby: {
      type: String,
      default: "Not yet reviewed",
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      index: true,
    },
    chicksType: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    numberofrequester: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    adminFeedback: {
      type: String,
      default: null,
    },
    deliveryDate: {
      type: Date,
      default: null,
    },
    reviewedDate: {
      type: Date,
      default: null,
    },
    outForDeliveryDate: {
      type: Date,
      default: null,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    rejectedDate: {
      type: Date,
      default: null,
    },
    filename: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = moment.tz(Date.now(), "Asia/Manila").toDate();
  }
  next();
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
