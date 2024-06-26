import { customError } from "../utils/customError.js";
import { Job } from "../models/job.model.js";

const createJob = async (req, res, next) => {
  if (req.user.role === "Employer") {
    try {
      const newJob = await Job.create({
        title: req.body.title,
        category: req.body.category,
        company: req.body.company,
        location: req.body.location,
        country: req.body.country,
        city: req.body.city,
        jobType: req.body.jobType,
        description: req.body.description,
        rangeSalary: req.body.rangeSalary,
        fixedSalary: Number(req.body.fixedSalary),
        isRemote: req.body.isRemote,
        employer: {
          employerName: req.user.username,
          employerId: req.user._id,
        },
      });
      if (!newJob) {
        next(customError(res.status(400), "Please enter invalid inputs"));
      } else {
        res.status(201).json({ job: newJob });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Employers can post jobs"));
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    next(customError(500), error.message);
  }
};

const searchJobs = async (req, res, next) => {
  try {
    let publishedDate;
    const now = new Date();
    if (req.query.published && req.query.published === "day") {
      publishedDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      );
    }
    if (req.query.published && req.query.published === "week") {
      publishedDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    if (req.query.published && req.query.published === "month") {
      publishedDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
    }
    const jobs = await Job.find({
      ...(req.query.searchTerm && {
        title: { $regex: req.query.searchTerm, $options: "i" },
      }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.location && {
        location: { $regex: req.query.location, $options: "i" },
      }),
      ...(req.query.type && { jobType: req.query.type }),
      ...(req.query.remote && {
        isRemote: req.query.remote === "remote" ? true : false,
      }),
      ...(req.query.published && { createdAt: { $gte: publishedDate } }),
    }).sort({ updatedAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    next(customError(500), error.message);
  }
};

const getJobById = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      next(customError(404), "Job Not Found");
    } else {
      res.status(200).json({ job });
    }
  } catch (error) {
    next(customError(500), error.message);
  }
};

const updateJob = async (req, res, next) => {
  if (req.user.role === "Employer") {
    try {
      const selectedJob = await Job.findById(req.params.jobId);
      if (!selectedJob) {
        next(customError(res.status(404), "Job Not Found"));
      } else {
        if (req.user._id === selectedJob.employer.employerId) {
          const job = await Job.findByIdAndUpdate(
            req.params.jobId,
            {
              ...req.body,
            },
            { new: true }
          );
          res.status(200).json({ job });
        } else {
          next(
            customError(
              res.status(403),
              "You're not allowed to update this job"
            )
          );
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Employers can update thier jobs"));
  }
};

const deleteJob = async (req, res, next) => {
  if (req.user.role === "Employer") {
    try {
      const job = await Job.findById(req.params.jobId);
      if (!job) {
        next(customError(res.status(404), "Job Not Found"));
      } else {
        if (req.user._id === job.employer.employerId) {
          await Job.findByIdAndDelete(req.params.jobId);
          res.status(200).json("Job Deleted Successfully");
        } else {
          next(
            customError(
              res.status(403),
              "You're not allowed to delete this job"
            )
          );
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Employers can delete thier jobs"));
  }
};

const getMyJobs = async (req, res, next) => {
  if (req.user.role === "Employer") {
    try {
      const myJobs = await Job.find({
        "employer.employerId": req.user._id,
      }).sort({ createdAt: -1 });
      res.status(200).json({ jobs: myJobs });
    } catch (error) {
      customError(res.status(500), error.message);
    }
  } else {
    next(
      customError(
        res.status(403),
        "Job Seeker are not allowed to these resources"
      )
    );
  }
};

export {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  searchJobs,
};
