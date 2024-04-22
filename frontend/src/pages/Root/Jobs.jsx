/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAllJobsQuery } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { JobCard, Loader } from "../../components";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { data, isError, isSuccess, error, isLoading } = useGetAllJobsQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      setJobs(data.jobs);
      console.log(data.jobs);
    }
  }, [isError, isSuccess, data]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        {isLoading && <Loader />}
        {isSuccess && data && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
