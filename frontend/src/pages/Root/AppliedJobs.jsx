/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../features/user/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader, NotFound, UserJobCard } from "../../components";

const AppliedJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { data, isError, isSuccess, error, isLoading } = useGetUserByIdQuery(
    currentUser._id
  );
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setAppliedJobs(data.userData.appliedJobs);
      }
    }
  }, [isError, isSuccess]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-3xl my-6 text-green font-bold">
          Your Applied Jobs
        </h1>
        {isLoading && <Loader />}
        {!isLoading && data.userData?.appliedJobs.length === 0 && <NotFound />}
        {isSuccess && data.userData?.appliedJobs.length > 0 && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {appliedJobs?.map((job) => (
              <UserJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppliedJobs;
