/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetJobByIdMutation } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { DeleteJob, Loader, SaveJob, UnSaveJob } from "../../components";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillThunderbolt } from "react-icons/ai";
import { useGetUserByIdMutation } from "../../features/user/api/userApi";
import { MdEmail } from "react-icons/md";
const JobPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [getUserById, { data: user }] = useGetUserByIdMutation();
  const [applied, setApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();
  const [getJobById, { data, isError, isLoading, isSuccess, error }] =
    useGetJobByIdMutation();
  const [job, setJob] = useState(null);
  useEffect(() => {
    if (currentUser) {
      getUserById(currentUser._id);
    }
    getJobById(id);
  }, [id, currentUser?._id]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message);
    }
    if (isSuccess) {
      setJob(data.job);
    }
  }, [isError, isSuccess, id]);
  useEffect(() => {
    if (currentUser && currentUser.role === "Job Seeker") {
      if (job) {
        const isApplied = job.applications.filter((e) => {
          return e.jobSeekerId === currentUser._id;
        });
        if (isApplied[0]) {
          setApplied(true);
        }
      }
      if (user) {
        const isJobSaved = user.userData?.savedJobs.filter((ele) => {
          return ele.jobId === job?._id;
        });
        if (isJobSaved[0]) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    }
  }, [job, user]);
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
                  <p className="bg-[#f00]/90 text-white text-lg font-normal px-3 py-1 w-fit my-2 rounded-md">
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
                {isSaved &&
                  currentUser &&
                  currentUser.role === "Job Seeker" && (
                    <UnSaveJob jobId={job?._id} />
                  )}
                {!isSaved &&
                  currentUser &&
                  currentUser.role === "Job Seeker" && (
                    <SaveJob jobId={job?._id} />
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
              {currentUser &&
                currentUser.role === "Employer" &&
                currentUser.username === job?.employer.employerName && (
                  <div className="flex items-center gap-4 mt-8">
                    <Link to={`/update-job/${job?._id}`} className="main-btn ">
                      Update Job
                    </Link>
                    <DeleteJob jobId={job?._id} table={false} />
                  </div>
                )}
              {currentUser && currentUser.role === "Job Seeker" && !applied && (
                <Link
                  to={`/apply/${job?._id}`}
                  className={`main-btn flex items-center gap-1 ${
                    job?.expired && "pointer-events-none opacity-55"
                  }`}
                >
                  <span>Apply Now</span> <AiFillThunderbolt size={22} />
                </Link>
              )}
            </div>
            {currentUser &&
              currentUser.role === "Employer" &&
              currentUser.username === job?.employer.employerName && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6">Applications</h2>
                  {job?.applicationsCount === 0 ? (
                    <p className="text-center text-gray-600">
                      No One Applied Yet!
                    </p>
                  ) : (
                    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
                      {job?.applications.map((item) => (
                        <div
                          key={item._id}
                          className="px-6 py-3   rounded-md shadow-lg border-2 hover:scale-105 transition border-green"
                        >
                          <Link
                            to={`/application/${item._id}`}
                            className="text-xl hover:underline transition capitalize font-bold"
                          >
                            {item.firstName} {item.lastName}
                          </Link>
                          <a
                            href={`mailTo:${item.email}`}
                            className="flex text-gray-500 font-semibold hover:text-green transition hover:underline mb-4 items-center gap-1"
                          >
                            <MdEmail size={18} />
                            <span>{item.email}</span>
                          </a>
                          <p className="flex items-center gap-1">
                            {item.coverLetter
                              ? item.coverLetter
                              : "No Cover Letter Provided"}
                          </p>
                        </div>
                      ))}
                    </div>
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
