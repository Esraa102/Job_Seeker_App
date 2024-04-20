import { customError } from "../utils/customError.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
  const { role, username, email, password, phone } = req.body;
  if (role && username && email && password && phone) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        next(customError(res.status(400), "User is already exist"));
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          role,
          email,
          username,
          phone,
          password: hashedPassword,
        });
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            username: newUser.username,
            savedJobs: newUser.savedJobs,
          },
          process.env.ACCESS_SECRET_TOKEN,
          { expiresIn: "1h" }
        );
        const { password: encryptedPass, ...rest } = newUser._doc;
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 3600000,
          })
          .status(201)
          .json({ userData: rest });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(400), "All Inputs Are Essential"));
  }
};

const logInUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (email && password && role) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(customError(res.status(401), "User Is Unathorized"));
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          const accessToken = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              role: user.role,
              phone: user.phone,
              username: user.username,
              savedJobs: user.savedJobs,
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          const { password: encryptedPass, ...rest } = user._doc;
          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
              maxAge: 3600000,
            })
            .status(200)
            .json({ userData: rest });
        } else {
          next(customError(res.status(400), "Wrong Credentails"));
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(400), "All Inputs Are Essential"));
  }
};

const logOutUser = async (req, res, next) => {
  res.clearCookie("access_token").status(200).json("Logged Out Successfully");
};

const saveJob = async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    try {
      const job = await Job.findById(req.params.jobId);
      if (!job) {
        next(customError(res.status(404), "Job Not Found"));
      } else {
        const user = await User.findById(req.user._id);
        const isSaved = user.savedJobs.filter((e) => {
          return e.jobId === req.params.jobId;
        });
        if (isSaved[0]) {
          next(customError(res.status(403), "This job is already saved"));
        } else {
          user.savedJobs.push({
            jobId: req.params.jobId,
            title: job.title,
            location: job.location,
          });
          await user.save();
          res.status(200).json({ user });
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Job seekers can do this action"));
  }
};

const deleteFromSaved = async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    try {
      const user = await User.findById(req.user._id);
      const isExist = user.savedJobs.filter((e) => {
        return e.jobId === req.params.jobId;
      });
      if (isExist[0]) {
        user.savedJobs = user.savedJobs.filter((e) => {
          return e.jobId !== req.params.jobId;
        });
        await user.save();
        res
          .status(200)
          .json({ user, message: "Job Removed From Saved Successfully" });
      } else {
        next(customError(res.status(404), "Job Not Found"));
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(403), "Only Job seekers can do this action"));
  }
};

export { registerUser, logInUser, logOutUser, saveJob, deleteFromSaved };
