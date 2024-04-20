import mongoose from "mongoose";

const applicationSchema = new mongoose({
  jobId: {
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
    unique: true,
  },
  State: {
    type: String,
  },
  resume: {
    type: File,
    required: [true, "Please provide your resume"],
  },
});
