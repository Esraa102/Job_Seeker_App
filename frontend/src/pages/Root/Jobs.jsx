/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAllJobsQuery } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { JobCard, Loader, SearchJobs } from "../../components";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { data, isError, isSuccess, error, isLoading } = useGetAllJobsQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      setJobs(data.jobs);
    }
  }, [isError, isSuccess, data]);
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[150px]">
        <SearchJobs />
        {isLoading && <Loader />}
        {isSuccess && data && (
          <div className="grid gap-10 grid-cols-2 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {jobs?.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
