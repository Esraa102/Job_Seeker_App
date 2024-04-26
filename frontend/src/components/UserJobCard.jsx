import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import UnSaveJob from "./UnSaveJob";

const UserJobCard = ({ job, appliedJobs, isSave }) => {
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    if (appliedJobs) {
      const applied = appliedJobs.filter((e) => {
        return e.jobId === job.jobId;
      });
      if (applied[0]) {
        setIsApplied(true);
      } else {
        setIsApplied(false);
      }
    }
  }, [job, appliedJobs]);
  return (
    <div className="p-6 relative flex flex-col gap-4 justify-between rounded-md shadow-lg border-2 hover:scale-105 transition border-green">
      <div className="flex items-center gap-4 flex-wrap justify-between">
        <Link
          to={`/job/${job.jobId}`}
          className="text-2xl capitalize hover:underline font-bold"
        >
          {job.title}
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          {isApplied && (
            <p className="bg-green/60 font-semibold px-3 py-1 w-fit rounded-md">
              Applied
            </p>
          )}
          {isSave && <UnSaveJob jobId={job?.jobId} />}
        </div>
      </div>
      <p className="text-black -mt-2 font-semibold flex items-center gap-1">
        <FaLocationDot size={18} className="text-gray-400" />{" "}
        <span>{job.location}</span>
      </p>
    </div>
  );
};

export default UserJobCard;
