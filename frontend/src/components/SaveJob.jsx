/* eslint-disable react-hooks/exhaustive-deps */
import { FaRegBookmark } from "react-icons/fa";

import { useSaveJobMutation } from "../features/user/api/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SaveJob = ({ jobId }) => {
  const [saveJob, { data, isError, isSuccess, isLoading, error }] =
    useSaveJobMutation();
  const navigate = useNavigate();
  const handleSave = () => {
    saveJob(jobId);
  };
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        if (data.isJobSaved) {
          toast.success("Job Saved Successfully");
        }
        navigate("/saved");
        console.log(data);
      }
    }
  }, [isError, isSuccess, jobId]);
  return (
    <button
      type="button"
      className={`${isLoading && "load-btn"}`}
      disabled={isLoading}
      onClick={handleSave}
    >
      <FaRegBookmark size={20} />
    </button>
  );
};

export default SaveJob;
