/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SaveJob from "./SaveJob";
import UnSaveJob from "./UnSaveJob";
import { useGetUserByIdMutation } from "../features/user/api/userApi";

const JobCard = ({ job }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [getUserById, { data }] = useGetUserByIdMutation();
  const [applied, setApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (currentUser) {
      getUserById(currentUser._id);
    }
  }, [currentUser?._id]);
  useEffect(() => {
    if (currentUser && currentUser.role === "Job Seeker") {
      if (job.applications) {
        const isApplied = job.applications.filter((e) => {
          return e.jobSeekerId === currentUser._id;
        });
        if (isApplied[0]) {
          setApplied(true);
        }
      }
      if (data) {
        const isJobSaved = data.userData?.savedJobs.filter((ele) => {
          return ele.jobId === job._id;
        });
        if (isJobSaved[0]) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  }, [job, data]);
  return (
    <div className="p-6 relative flex flex-col gap-4 justify-between rounded-md shadow-lg border-2 hover:scale-105 transition border-green">
      <div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <Link
            to={`/job/${job?._id}`}
            className="text-2xl  hover:underline font-bold w-[80%]"
          >
            {job?.title}
          </Link>
          <div className=" flex items-center gap-2">
            {applied && (
              <p className="bg-green/60 mb-2 font-semibold px-3 py-1 w-fit rounded-md">
                Applied
              </p>
            )}
            {job?.expired && (
              <p className="bg-[#f00]/90 text-sm  text-white  font-normal px-3 py-1 w-fit my-2 rounded-md">
                Closed
              </p>
            )}
            {isSaved && currentUser && currentUser.role === "Job Seeker" && (
              <UnSaveJob jobId={job?._id} />
            )}
            {!isSaved && currentUser && currentUser.role === "Job Seeker" && (
              <SaveJob jobId={job?._id} />
            )}
          </div>
        </div>
        <p className="text-black font-semibold flex items-center gap-1">
          <FaLocationDot size={18} className="text-gray-400" />{" "}
          <span>{job?.location}</span>
        </p>
        <div className="flex items-center gap-2">
          {job?.jobType && (
            <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
              {job?.jobType}
            </p>
          )}
          <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
            {job?.applicationsCount} Applications
          </p>

          {job?.isRemote && (
            <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
              Remote
            </p>
          )}
        </div>
      </div>
      <p
        className="text-gray-600 mt-3 line-clamp-4 job-content"
        dangerouslySetInnerHTML={{
          __html: job?.description,
        }}
      ></p>
    </div>
  );
};

export default JobCard;
