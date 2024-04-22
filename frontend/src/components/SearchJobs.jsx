import { IoLocation } from "react-icons/io5";

const SearchJobs = () => {
  return (
    <div className="mb-10">
      <form className="border-2 flex gap-3 shadow-md items-center rounded-full border-green px-2 py-[6px] w-full md:w-[80%] mx-auto">
        <input
          type="search"
          id="search"
          name="search"
          required
          placeholder="Search jobs here...."
          className="flex-1 focus:outline-none px-3"
        />
        <div className="flex-1 border-l-2 border-l-green flex items-center gap-2">
          <IoLocation size={24} className="text-green" />
          <input
            type="text"
            id="text"
            name="location"
            placeholder="Enter a location..."
            className="flex-1 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="main-btn font-normal px-6 text-white mt-0 rounded-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchJobs;
