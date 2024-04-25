/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetJobByIdMutation } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { DeleteJob, Loader } from "../../components";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillThunderbolt } from "react-icons/ai";

const JobPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [applied, setApplied] = useState(false);
  const { id } = useParams();
  const [getJobById, { data, isError, isLoading, isSuccess, error }] =
    useGetJobByIdMutation();
  const [job, setJob] = useState(null);
  useEffect(() => {
    getJobById(id);
  }, [id]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      setJob(data.job);
    }
  }, [isError, isSuccess, id]);
  useEffect(() => {
    if (currentUser.role === "Job Seeker") {
      if (job) {
        const isApplied = job.applications.filter((e) => {
          return e.jobSeekerId === currentUser._id;
        });
        if (isApplied[0]) {
          setApplied(true);
        }
      }
    }
  }, [job]);
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[150px]">
        {isLoading && <Loader />}
        {isSuccess && data && (
          <div className="relative">
            <div className="flex gap-4 my-8 items-center justify-between flex-wrap">
              <h1 className="text-4xl  font-bold">{job?.title}</h1>
              <div className="flex items-center gap-4">
                {job?.expired ? (
                  <p className="bg-red-600/90 text-white text-lg font-semibold px-3 py-1 w-fit my-2 rounded-md">
                    Closed
                  </p>
                ) : (
                  <p className="bg-green/40 text-lg font-semibold px-3 py-1 w-fit my-2 rounded-md">
                    {job?.applicationsCount} Applications
                  </p>
                )}
                {applied && (
                  <p className="bg-green/60 text-lg font-semibold px-3 py-1 w-fit rounded-md">
                    Applied
                  </p>
                )}
                {currentUser.role === "Job Seeker" && (
                  <FaRegBookmark size={22} />
                )}
              </div>
            </div>
            <p className="text-black font-semibold capitalize">
              Employer Name: {job?.employer.employerName}
            </p>
            <p className="text-black font-semibold ">{job?.company}</p>
            <p className="text-black font-semibold flex items-center gap-1">
              <FaLocationDot size={18} className="text-gray-400" />{" "}
              <span>{job?.location}</span>
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
                ${job?.fixedSalary.toLocaleString()}
              </p>
              <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
                ${Number(job?.rangeSalary[0]).toLocaleString()} - $
                {Number(job?.rangeSalary[1]).toLocaleString()}
              </p>
              <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
                {job?.jobType}
              </p>
              {job?.isRemote && (
                <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
                  Remote
                </p>
              )}
            </div>
            <div
              className="text-black font-semibold mt-3  job-content"
              dangerouslySetInnerHTML={{
                __html: job?.description,
              }}
            ></div>
            <p className="text-lg font-semibold text-black">
              City: {job?.city}
            </p>
            <p className="text-lg font-semibold text-black">
              Country: {job?.country}
            </p>
            <div className="flex items-center gap-4 mt-8">
              {currentUser.role === "Employer" &&
                currentUser.username === job?.employer.employerName && (
                  <div className="flex items-center gap-4 mt-8">
                    <Link to={`/update-job/${job?._id}`} className="main-btn ">
                      Update Job
                    </Link>
                    <DeleteJob jobId={job?._id} table={false} />
                  </div>
                )}
              {currentUser.role === "Job Seeker" && !applied && (
                <Link
                  to={`/apply/${job?._id}`}
                  className="main-btn flex items-center gap-1"
                >
                  <span>Apply Now</span> <AiFillThunderbolt size={22} />
                </Link>
              )}
            </div>
            {currentUser.role === "Employer" &&
              currentUser.username === job?.employer.employerName && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6">Applications</h2>
                  {job?.applicationsCount === 0 && (
                    <p className="text-center text-gray-600">
                      No One Applied Yet!
                    </p>
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobPage;
