/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useGetUserByIdMutation } from "../../features/user/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader, NotFound, UserJobCard } from "../../components";

const AppliedJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [getUserById, { data, isError, isSuccess, error, isLoading }] =
    useGetUserByIdMutation();
  useEffect(() => {
    getUserById(currentUser._id);
  }, [currentUser._id]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
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
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-3xl my-6 text-green font-bold">
          Your Applied Jobs
        </h1>
        {isLoading && <Loader />}
        {!isLoading && data?.userData?.appliedJobs.length === 0 && <NotFound />}
        {isSuccess && data.userData?.appliedJobs.length > 0 && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {appliedJobs?.map((job) => (
              <UserJobCard
                key={job._id}
                isSave={false}
                job={job}
                appliedJobs={appliedJobs}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppliedJobs;
