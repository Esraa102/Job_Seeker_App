/* eslint-disable react-hooks/exhaustive-deps */
import { MdDelete } from "react-icons/md";
import { useDeleteJobMutation } from "../features/jobs/api/jobsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const DeleteJob = ({ jobId, table, setJobs, jobs }) => {
  const [deleteJob, { isError, isSuccess, isLoading, data, error }] =
    useDeleteJobMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        if (jobs && setJobs) {
          const newJobs = jobs.filter((e) => {
            return e._id !== jobId;
          });
          setJobs(newJobs);
        }
        if (!table) {
          navigate("/jobs");
        }
        toast.success(data);
      }
    }
  }, [jobId, isError, isSuccess]);
  return (
    <button
      type="button"
      onClick={() => deleteJob(jobId)}
      className={`${
        table
          ? "hover:text-red-600 transition"
          : "main-btn flex items-center hover:bg-red-800 hover:text-white gap-2 bg-red-700 border-red-700"
      } ${isLoading && "load-btn"}`}
    >
      <MdDelete size={24} />
      {!table && <span>Delete Job</span>}
    </button>
  );
};

export default DeleteJob;
