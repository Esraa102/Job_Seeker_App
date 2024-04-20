import { Application } from "../models/application.model.js";
import { customError } from "../utils/customError.js";
import { Job } from "../models/job.model.js";

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
        const newApplication = await Application.create({
          jobId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          state: req.body.state,
          resume: req.body.resume,
        });
        const appliedJob = await Job.findById(req.params.jobId);
        appliedJob.applications.push(req.user._id);
        appliedJob.applicationsCount += 1;
        appliedJob.save();
        res.status(200).json({ job: appliedJob, application: newApplication });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Job Seekers can apply for jobs"));
  }
};

export { applyJob };
