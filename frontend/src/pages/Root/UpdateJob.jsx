/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { JobForm, Loader } from "../../components";
import {
  useUpdateJobMutation,
  useGetJobByIdMutation,
} from "../../features/jobs/api/jobsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getJobById, { data, isError, isLoading, isSuccess }] =
    useGetJobByIdMutation();
  useEffect(() => {
    getJobById(id);
  }, [id]);

  const [
    updateJob,
    {
      data: updatedJob,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: isUpdating,
    },
  ] = useUpdateJobMutation();
  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateError.data?.message || updateError.error);
    }
    if (isUpdateSuccess) {
      if (updatedJob.message) {
        toast.error(updatedJob.message);
      } else {
        navigate(`/job/${id}`);
      }
    }
  }, [id, isUpdateError, isUpdateSuccess]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-center text-green text-3xl font-bold">
          Update Your Job
        </h1>
        {isLoading && <Loader />}
        {isSuccess && !isLoading && data && !isError && (
          <JobForm
            defaultValues={data.job}
            isUpdate={true}
            sendData={updateJob}
            jobId={id}
            isLoading={isUpdating}
          />
        )}
      </div>
    </section>
  );
};

export default UpdateJob;
