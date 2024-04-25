/* eslint-disable react-hooks/exhaustive-deps */
import { IoLocation } from "react-icons/io5";
import { jobCategories } from "../data";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
const SearchJobs = ({ sendData }) => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    category: "",
    location: "",
    type: "",
    remote: "",
    published: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const handleSearch = () => {
    const urlParams = new URLSearchParams(location.search);
    if (searchData.searchTerm) {
      urlParams.set("searchTerm", searchData.searchTerm);
    }
    if (searchData.location) {
      urlParams.set("location", searchData.location);
    }
    if (searchData.category) {
      urlParams.set("category", searchData.category);
    }
    if (searchData.type) {
      urlParams.set("type", searchData.type);
    }
    if (searchData.remote) {
      urlParams.set("remote", searchData.remote);
    }
    if (searchData.published) {
      urlParams.set("published", searchData.published && searchData.published);
    }
    const searchQuery = urlParams.toString();
    if (searchQuery.length > 0) {
      sendData(searchQuery);
      navigate(`/jobs?${searchQuery}`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  useEffect(() => {
    handleSearch();
  }, [searchData]);

  const handleClearFilter = () => {
    setSearchData({
      searchTerm: "",
      category: "",
      location: "",
      type: "",
      remote: "",
      published: "",
    });
    sendData();
    navigate("/jobs");
  };
  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit}>
        <div className="border-2 pt-2  flex-col md:flex-row flex gap-3 shadow-md md:items-center rounded-md md:rounded-full border-green px-2 py-[6px] w-full md:w-[80%] mx-auto">
          <input
            type="search"
            id="searchTerm"
            name="searchTerm"
            value={searchData.searchTerm}
            onChange={handleOnChange}
            placeholder="Search jobs here...."
            className="flex-1 focus:outline-none px-3"
          />
          <div className="flex-1 flex-col md:flex-row   border-t-2 border-green md:border-none flex md:items-center gap-2">
            <div className="flex-1 flex py-2 md:py-0 items-center gap-2 b md:border-l-2 md:border-l-green">
              <IoLocation size={24} className="text-green" />
              <input
                type="text"
                id="text"
                value={searchData.location}
                onChange={handleOnChange}
                name="location"
                placeholder="Enter a location..."
                className="flex-1 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="main-btn font-normal px-6 text-white mt-0 rounded-md md:rounded-full"
            >
              Search
            </button>
          </div>
        </div>
        <div className="my-8 flex items-center gap-3 justify-center flex-wrap">
          <select
            name="category"
            value={searchData.category}
            onChange={handleOnChange}
            className="input border-l-2 border-2 shadow-md rounded-full w-fit cursor-pointer border-green"
            id="category"
          >
            {jobCategories.map((item) => (
              <option className="cursor-pointer" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={searchData.type}
            onChange={handleOnChange}
            className="input border-l-2 border-2 shadow-md rounded-full w-fit cursor-pointer border-green"
            id="type"
          >
            <option className="cursor-pointer" value={"Full-time"}>
              Full-time
            </option>
            <option className="cursor-pointer" value={"Part-time"}>
              Part-time
            </option>
          </select>
          <select
            name="remote"
            value={searchData.remote}
            onChange={handleOnChange}
            className="input border-l-2 border-2 shadow-md rounded-full w-fit cursor-pointer border-green"
            id="remote"
          >
            <option className="cursor-pointer" value={"remote"}>
              Remote
            </option>
            <option className="cursor-pointer" value={"normal"}>
              Normal
            </option>
          </select>
          <select
            name="published"
            value={searchData.published}
            onChange={handleOnChange}
            className="input border-l-2 border-2 shadow-md rounded-full w-fit cursor-pointer border-green"
            id="published"
          >
            <option className="cursor-pointer" value={"day"}>
              Last 24 hours
            </option>
            <option className="cursor-pointer" value={"week"}>
              Last week
            </option>
            <option className="cursor-pointer" value={"month"}>
              Last month
            </option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleClearFilter}
          className="main-btn mb-8 flex items-center gap-1 mx-auto -mt-3 w-fit rounded-full py-1 px-6 text-white"
        >
          <IoFilter size={20} /> <span>Clear Filters</span>
        </button>
      </form>
    </div>
  );
};

export default SearchJobs;
