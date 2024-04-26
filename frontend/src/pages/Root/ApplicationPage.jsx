/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useGetApplicationMutation } from "../../features/applications/api/applicationsApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
const ApplicationPage = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [getApplication, { data, isError, isSuccess, error, isLoading }] =
    useGetApplicationMutation();
  useEffect(() => {
    getApplication(id);
  }, [id]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data?.message || error.error);
    }
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setApplication(data.application);
      }
    }
  }, [isError, isSuccess]);
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <div>
            <h1 className="text-3xl text-center my-4 font-bold text-green">
              {application?.firstName} {application?.lastName}
            </h1>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                className="justify-center text-gray-500 font-semibold hover:underline my-2 flex items-center gap-1"
                href={`mailTo:${application?.email}`}
              >
                <MdEmail size={22} className="text-green" />
                <span>{application?.email}</span>
              </a>

              <a
                className="justify-center text-gray-500 font-semibold hover:underline my-2 flex items-center gap-1"
                href={`tel:${application?.phoneNumber}`}
              >
                <FaPhoneAlt size={20} className="text-green" />
                <span>{application?.phoneNumber}</span>
              </a>
            </div>
            <p className="justify-center capitalize text-gray-500 font-semibold my-2 flex items-center gap-1">
              <IoLocation size={22} className="text-green" />
              <span>{application?.state}</span>
            </p>
            <img
              src={application?.resumeFile}
              alt="resume-file"
              className="w-full md:w-1/2 object-cover mx-auto rounded-lg my-8"
            />
            <p className="text-xl font-semibold mb-3 text-green">
              Cover Letter
            </p>
            <p className="mb-8 bg-gray-200 w-full  shadow rounded-md p-3">
              {application?.coverLetter}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationPage;
