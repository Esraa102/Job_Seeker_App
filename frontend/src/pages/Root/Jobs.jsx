/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  useGetAllJobsMutation,
  useSearchJobMutation,
} from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { JobCard, Loader, NotFound, SearchJobs } from "../../components";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [getAllJobs, { data, isError, isSuccess, error, isLoading }] =
    useGetAllJobsMutation();
  const [
    searchJob,
    {
      data: results,
      isError: isResultsError,
      error: resultsErr,
      isSuccess: isResultsSuccess,
      isLoading: isResultsLoading,
    },
  ] = useSearchJobMutation();
  useEffect(() => {
    getAllJobs();
  }, []);
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setJobs(data.jobs);
      }
    }
  }, [isError, isSuccess, data]);
  useEffect(() => {
    if (isResultsError) {
      toast.error(resultsErr.data?.message || resultsErr.error);
    }
    if (isResultsSuccess) {
      if (results.message) {
        toast.error(results.message);
      } else {
        setJobs(results.jobs);
      }
    }
  }, [isResultsError, isResultsSuccess, results]);
  useEffect(() => {
    if (isLoading || isResultsLoading) {
      setJobs([]);
    }
  }, [isLoading, isResultsLoading]);
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[150px]">
        <SearchJobs sendData={searchJob} />
        {(isLoading || isResultsLoading || !jobs) && <Loader />}
        {isResultsSuccess && results.jobs?.length === 0 && <NotFound />}
        {isResultsSuccess && results && !isResultsLoading && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {jobs?.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
        {isSuccess && !isLoading && data && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
