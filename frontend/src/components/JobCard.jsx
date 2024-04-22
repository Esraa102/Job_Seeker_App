import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/jobs/${job?._id}`} className="p-4 rounded-md shadow-lg block">
      <h4 className="text-3xl mb-3 font-bold">{job?.title}</h4>
      <p className="text-gray-400">{job?.location}</p>
      <div className="flex items-center gap-2">
        <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
          {job?.jobType}
        </p>
        {job?.isRemote && (
          <p className="bg-green/40 font-semibold px-3 py-1 w-fit my-2 rounded-md">
            Remote
          </p>
        )}
      </div>
      <p className="text-gray-400 line-clamp-4">{job?.description}</p>
    </Link>
  );
};

export default JobCard;
