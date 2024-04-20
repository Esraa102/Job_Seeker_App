import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the job title"],
    },
    category: {
      type: String,
      required: [true, "Please provide the job category"],
    },
    company: {
      type: String,
      required: [true, "Please provide the company name"],
    },
    location: {
      type: String,
      required: [true, "Please provide the job location"],
    },
    country: {
      type: String,
      required: [true, "Please provide the job country"],
    },
    city: {
      type: String,
      required: [true, "Please provide the job city"],
    },
    jobType: {
      type: String,
      required: [true, "Please provide the job type"],
      enume: ["Full-time", "Part-time"],
    },
    description: {
      type: String,
      required: [true, "Please provide the job description"],
    },
    rangeSalary: {
      type: [String],
      required: [true, "Please provide the job range Salary"],
    },
    fixedSalary: {
      type: Number,
      required: [true, "Please provide the job fixed Salary"],
    },
    isRemote: {
      type: Boolean,
      default: false,
      required: true,
    },
    applications: {
      type: [String],
      default: [],
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    employer: {
      employerName: {
        type: String,
        required: [true, "Please provide employer name"],
      },
      employerId: {
        type: String,
        required: [true],
      },
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("jobs", jobSchema);
