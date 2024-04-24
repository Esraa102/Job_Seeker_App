/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../features/user/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader, NotFound, UserJobCard } from "../../components";

const SavedJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [saved, setSaved] = useState([]);
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
        setSaved(data.userData.savedJobs);
      }
    }
  }, [isError, isSuccess, data]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-3xl my-6 text-green font-bold">Your Saved Jobs</h1>
        {isLoading && <Loader />}
        {!isLoading && data.userData?.savedJobs.length === 0 && <NotFound />}
        {isSuccess && data.userData?.savedJobs.length > 0 && (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {saved?.map((job) => (
              <UserJobCard
                key={job._id}
                job={job}
                appliedJobs={data.userData?.appliedJobs}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedJobs;
