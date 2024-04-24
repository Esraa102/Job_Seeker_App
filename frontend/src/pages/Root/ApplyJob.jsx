/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ApplicationForm } from "../../components";
import { useApplyJobMutation } from "../../features/applications/api/applicationsApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const ApplyJob = () => {
  const [applyJob, { data, isError, isSuccess, error, isLoading }] =
    useApplyJobMutation();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      console.log(data);
      toast.success("Application has been submitted Successfully");
      navigate(`/job/${id}`);
    }
  }, [isError, isSuccess]);
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[150px]">
        <h1 className="text-3xl text-green font-bold my-6">
          Add Your Contact Information
        </h1>
        <ApplicationForm id={id} sendData={applyJob} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ApplyJob;
