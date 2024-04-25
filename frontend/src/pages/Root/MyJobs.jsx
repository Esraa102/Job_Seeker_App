/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NotFound, Loader, DeleteJob } from "../../components";
import { useGetMyJobsMutation } from "../../features/jobs/api/jobsApi";
import toast from "react-hot-toast";
import { MdEditDocument } from "react-icons/md";
import { formateDate } from "../../utils/formateDate";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [getMyJobs, { data, isError, isSuccess, isLoading, error }] =
    useGetMyJobsMutation();
  useEffect(() => {
    getMyJobs();
  }, []);
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setMyJobs(data.jobs);
      }
    }
  }, [isError, isSuccess]);
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-3xl my-6 text-green font-bold">My Jobs</h1>
        {isLoading && <Loader />}
        {!isLoading && isSuccess && data.jobs?.length === 0 && <NotFound />}
        {isSuccess && isSuccess && data.jobs?.length > 0 && (
          <div className="relative border-2 border-green overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-sm text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[16%]">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 w-[26%]">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 w-[26%]">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-[16%]">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3 w-[16%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-t-2  font-medium cursor-pointer hover:border-gray-300 hover:bg-gray-300 transition  border-green text-gray-900"
                  >
                    <th scope="row" className="px-6 py-4">
                      {formateDate(job.createdAt)}
                    </th>
                    <td className="px-6 py-4">
                      <Link
                        className="hover:text-green line-clamp-1 hover:underline transition"
                        to={`/job/${job._id}`}
                      >
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{job.category}</td>
                    <td className="px-6 py-4">
                      ${job.fixedSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3 flex-wrap">
                      <Link
                        to={`/update-job/${job._id}`}
                        className="hover:text-green transition"
                      >
                        <MdEditDocument size={24} />
                      </Link>
                      <DeleteJob
                        jobId={job._id}
                        table={true}
                        jobs={myJobs}
                        setJobs={setMyJobs}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
