import { useRef, useEffect } from "react";
import { jobCategories } from "../data";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const JobForm = ({ isUpdate, sendData, isLoading, defaultValues, jobId }) => {
  const quillRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      category: defaultValues?.category || "Front End Development",
      company: defaultValues?.company || "",
      location: defaultValues?.location || "",
      country: defaultValues?.country || "",
      city: defaultValues?.city || "",
      jobType: defaultValues?.jobType || "Full-time",
      fixedSalary: defaultValues?.fixedSalary || "",
      from: defaultValues?.rangeSalary[0] || "",
      to: defaultValues?.rangeSalary[1] || "",
      isRemote: defaultValues?.isRemote || false,
      isExpired: defaultValues?.expired || false,
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    sendData({
      jobId,
      title: data.title,
      category: data.category,
      company: data.company,
      location: data.location,
      country: data.country,
      city: data.city,
      description: data.details,
      jobType: data.jobType,
      rangeSalary: [data.from, data.to],
      fixedSalary: Number(data.fixedSalary),
      isRemote: data.isRemote === "true" ? true : false,
      expired: data.isExpired === "true" ? true : false,
    });
  };
  useEffect(() => {
    register("details", {
      required: "Job Details is required",
      minLength: {
        value: 30,
        message: "Job Details must be at least 30 characters long",
      },
      maxLength: {
        value: 10000,
        message: "Job Details can't  be greater than 10000 characters long",
      },
    });
  }, [register]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form my-8 border-2 border-green shadow-lg"
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="text-lg font-semibold">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="MERN Stack Developer"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.title && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("title", {
            required: "Job Title is Required",
            minLength: {
              value: 4,
              message: "Job Title Should be at least 4 characters",
            },
            maxLength: {
              value: 100,
              message: "Job Title can't be greater than 100 characters",
            },
          })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="category" className="text-lg font-semibold">
          Job Category
        </label>
        <select
          name="category"
          className="input border-l rounded-md px-3 py-2"
          id="category"
          {...register("category")}
        >
          {jobCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="company" className="text-lg font-semibold">
          Company Name
        </label>
        <input
          type="text"
          name="company"
          id="company"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.company && "border-2 border-red-600 focus:border-red-600"
          }`}
          placeholder="Facebook"
          {...register("company", {
            required: "Campnay Input is Required",
            minLength: {
              value: 2,
              message: "Company Should be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Company can't be greater than 50 characters",
            },
          })}
        />
        {errors.company && <p className="error">{errors.company.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="location" className="text-lg font-semibold">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="El-Qalubia El-Khanka"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.location && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("location", {
            required: "Location Input is Required",
            minLength: {
              value: 3,
              message: "Location Should be at least 3 characters",
            },
            maxLength: {
              value: 30,
              message: "Location can't be greater than 30 characters",
            },
          })}
        />
        {errors.location && <p className="error">{errors.location.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="fixed" className="text-lg font-semibold">
          Fixed Salary
        </label>
        <input
          type="number"
          name="fixedSalary"
          id="fixed"
          defaultValue={defaultValues?.fixedSalary}
          placeholder="10K"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.fixedSalary && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("fixedSalary", {
            required: "Fixed Salary is Required",
            min: {
              value: 500,
              message: "Fixed Salary Should be at least $500",
            },
            max: {
              value: 1000000,
              message: "Fixed Salary can't be greater than $1M",
            },
          })}
        />
        {errors.fixedSalary && (
          <p className="error">{errors.fixedSalary.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="range" className="text-lg font-semibold">
          Range Salary
        </label>
        <div className="flex items-center gap-3">
          <div className="w-full flex flex-col gap-1">
            <input
              type="number"
              name="from"
              id="from"
              defaultValue={defaultValues?.rangeSalary[0]}
              placeholder="10K"
              className={`input border-l rounded-md px-3 py-2 ${
                errors.from && "border-2 border-red-600 focus:border-red-600"
              }`}
              {...register("from", {
                required: "This Field is Required",
                min: {
                  value: 500,
                  message: "This is field should be at least $500",
                },
                max: {
                  value: 1000000,
                  message: "This field can't be greater than $1M",
                },
              })}
            />
            {errors.from && <p className="error">{errors.from.message}</p>}
          </div>
          <span className="text-lg font-semibold">To</span>
          <div className="w-full flex flex-col gap-1">
            <input
              type="number"
              name="to"
              id="to"
              placeholder="20K"
              className={`input border-l rounded-md px-3 py-2 ${
                errors.to && "border-2 border-red-600 focus:border-red-600"
              }`}
              {...register("to", {
                required: "This Field is Required",
                min: {
                  value: 500,
                  message: "This is field should be at least $500",
                },
                max: {
                  value: 1000000,
                  message: "This field can't be greater than $1M",
                },
              })}
            />
            {errors.to && <p className="error">{errors.to.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="city" className="text-lg font-semibold">
          City
        </label>
        <input
          type="text"
          name="city"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.city && "border-2 border-red-600 focus:border-red-600"
          }`}
          id="city"
          placeholder="El-Khanka"
          {...register("city", {
            required: "City is Required",
            minLength: {
              value: 4,
              message: "City Should be at least 4 characters",
            },
            maxLength: {
              value: 50,
              message: "City can't be greater than 50 characters",
            },
          })}
        />
        {errors.city && <p className="error">{errors.city.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="type" className="text-lg font-semibold">
          Job Type
        </label>
        <select
          name="type"
          id="type"
          className="input border-l rounded-md px-3 py-2"
          {...register("jobType")}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="isRemote" className="text-lg font-semibold">
          Is The Job Remote{" "}
        </label>
        <select
          name="type"
          id="type"
          className="input border-l rounded-md px-3 py-2"
          {...register("isRemote")}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      {isUpdate && (
        <div className="flex flex-col gap-3">
          <label htmlFor="expired" className="text-lg font-semibold">
            Is The Position Taken?{" "}
          </label>
          <select
            name="expired"
            id="expired"
            className="input border-l rounded-md px-3 py-2"
            {...register("isExpired")}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <label htmlFor="country" className="text-lg font-semibold">
          Country
        </label>
        <input
          type="text"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.country && "border-2 border-red-600 focus:border-red-600"
          }`}
          name="country"
          id="country"
          placeholder="Egypt"
          {...register("country", {
            required: "country is Required",
            minLength: {
              value: 2,
              message: "coutry Should be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "country can't be greater than 50 characters",
            },
          })}
        />
        {errors.country && <p className="error">{errors.country.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="desc" className="text-lg font-semibold">
          Job Details
        </label>
        <ReactQuill
          id="desc"
          ref={(el) => {
            quillRef.current = el;
          }}
          defaultValue={defaultValues?.description}
          onChange={(content) => setValue("details", content)}
          placeholder="Write Something..."
        />
        {errors.details && <p className="error">{errors.details.message}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={isLoading}
          type="submit"
          className={`main-btn ${isLoading && "load-btn"}`}
        >
          {isLoading ? "Wait a second..." : "Post Job"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/my-jobs")}
          className="main-btn bg-gray-500 border-gray-500 hover:bg-gray-600
          hover:border-gray-600 text-white hover:text-white font-normal"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
