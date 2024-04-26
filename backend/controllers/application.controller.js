import { Application } from "../models/application.model.js";
import { customError } from "../utils/customError.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

const applyJob = async (req, res, next) => {
  const { jobId } = req.params;
  if (req.user.role === "Job Seeker") {
    try {
      // check if the user has applied before
      const job = await Job.findOne({
        applications: { $elemMatch: { jobSeekerId: req.user._id } },
      });
      if (job) {
        next(
          customError(res.status(403), "You have already applied for this job")
        );
      } else {
        if (!req.body.resumeFile) {
          return next(customError(res.status(400), "Resume File is required"));
        }
        const applied = await Job.findById(req.params.jobId);
        // create the application
        const newApplication = await Application.create({
          jobId,
          jobTitle: applied.title,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          state: req.body.state,
          resumeFile: req.body.resumeFile,
          coverLetter: req.body.coverLetter,
          jobSeekerId: req.user._id,
          employerID: applied.employer.employerId,
        });

        // add the user application to the job
        applied.applications.push(newApplication);
        applied.applicationsCount += 1;
        await applied.save();

        // add the applied job to the user
        const user = await User.findById(req.user._id);
        const isExist = user.appliedJobs.filter((e) => {
          return e.jobId === jobId;
        });
        if (isExist[0]) {
          next(
            customError(
              res.status(403),
              "You have already applied for this job"
            )
          );
        } else {
          user.appliedJobs.push({
            jobId,
            title: applied.title,
            location: applied.location,
          });
          await user.save();
        }

        res.status(200).json({
          newApplication,
          message: "Application Submitted Successfully",
        });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Job Seekers can apply for jobs"));
  }
};

const getApplication = async (req, res, next) => {
  const { applicationId } = req.params;
  if (req.user.role !== "Employer") {
    next(
      customError(
        res.status(403),
        "Only Employers have access to this resource"
      )
    );
  } else {
    try {
      const application = await Application.findById(applicationId);
      if (!application) {
        next(customError(res.status(404), "Application Not Found"));
      } else {
        if (req.user._id !== application.employerID.toString()) {
          next(
            customError(
              res.status(403),
              "Only The Job Owner has access to this resource"
            )
          );
        } else {
          res.status(200).json({ application });
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  }
};

export { applyJob, getApplication };
