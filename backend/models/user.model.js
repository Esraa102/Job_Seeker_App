import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Please Provide Your role"],
      enum: ["Job Seeker", "Employer"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
    },
    email: {
      type: String,
      required: [true, "Please Provide your email"],
      unique: [true, "User of this email is already exist"],
      validate: [validator.isEmail, "Please provide valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    savedJobs: {
      type: [
        {
          jobId: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
