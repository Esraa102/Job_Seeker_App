import { ApplicationForm } from "../../components";

const ApplyJob = () => {
  return (
    <section>
      <div className="container mb-20 mx-auto p-4 md:px-0 pt-[150px]">
        <h1 className="text-3xl font-bold my-6">
          Add your contact information
        </h1>
        <ApplicationForm />
      </div>
    </section>
  );
};

export default ApplyJob;
