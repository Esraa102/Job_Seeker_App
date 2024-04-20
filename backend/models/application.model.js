import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your Phone Number"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validator: [validator.isEmail, "Please provdie valid email"],
  },
  coverLetter: {
    type: String,
  },
  state: {
    type: String,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  employerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  jobSeekerId: {
    type: String,
    required: true,
  },
});

export const Application = mongoose.model("applications", applicationSchema);
