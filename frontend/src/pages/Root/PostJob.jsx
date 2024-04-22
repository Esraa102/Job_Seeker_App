import { JobForm } from "../../components";

const PostJob = () => {
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <h1 className="text-center text-green text-3xl font-bold">
          Post Your Job
        </h1>
        <JobForm />
      </div>
    </section>
  );
};

export default PostJob;
