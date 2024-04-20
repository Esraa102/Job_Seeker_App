import { Application } from "../models/application.model.js";
import { customError } from "../utils/customError.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

const applyJob = async (req, res, next) => {
  const { jobId } = req.params;
  if (req.user.role === "Job Seeker") {
    try {
      // check if the user applied before
      const job = await Job.findOne({
        applications: { $in: [req.user._id] },
      });
      if (job) {
        next(
          customError(res.status(403), "You have already applied for this job")
        );
      } else {
        // add the user application to the job
        const applied = await Job.findById(req.params.jobId);
        applied.applications.push(req.user._id);
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
            title: job.title,
            location: job.location,
          });
          await user.save();
        }
        const newApplication = await Application.create({
          jobId,
          jobTitle: applied.title,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          state: req.body.state,
          resume: req.body.resume,
        });
        res.status(200).json({ job: applied, application: newApplication });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Job Seekers can apply for jobs"));
  }
};

export { applyJob };
