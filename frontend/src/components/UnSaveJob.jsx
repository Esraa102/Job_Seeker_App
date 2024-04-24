/* eslint-disable react-hooks/exhaustive-deps */
import { FaBookmark } from "react-icons/fa6";
import { useSaveJobMutation } from "../features/user/api/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
const UnSaveJob = ({ jobId }) => {
  const [saveJob, { data, isError, isSuccess, isLoading, error }] =
    useSaveJobMutation();
  const handleSave = () => {
    saveJob(jobId);
  };
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        if (!data.isJobSaved) {
          toast.success("Job Unsaved Successfully");
        }
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
      <FaBookmark size={20} className="text-green" />
    </button>
  );
};

export default UnSaveJob;
