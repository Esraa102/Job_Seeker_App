/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { JobForm } from "../../components";
import { usePostNewJobMutation } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PostJob = () => {
  const [postNewJob, { data, isError, isSuccess, isLoading, error }] =
    usePostNewJobMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      console.log(data);
      toast.success("Job has been posted successfully");
      navigate("/jobs");
    }
  }, [isSuccess, isError]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-center text-green text-3xl font-bold">
          Post Your Job
        </h1>
        <JobForm sendData={postNewJob} isLoading={isLoading} isUpdate={false} />
      </div>
    </section>
  );
};

export default PostJob;
