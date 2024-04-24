import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { countryCodes } from "../data";

const ApplicationForm = ({ sendData, id, isLoading }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    sendData({
      jobId: id,
      firstName: data.first,
      lastName: data.last,
      email: data.email,
      state: data.state,
      phoneNumber: data.code.toString() + data.number.toString(),
      coverLetter: data.letter,
    });
  };
  return (
    <form className="form mx-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <label htmlFor="first" className="text-lg font-semibold">
          First Name
        </label>
        <input
          type="text"
          name="first"
          id="first"
          placeholder="Eg: Esraa"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.first && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("first", {
            required: "First Name is required",
            minLength: {
              value: 3,
              message: "First Name should be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "First Name should greater than 20 characters",
            },
          })}
        />
        {errors.first && <p className="error">{errors.first.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="last" className="text-lg font-semibold">
          Last Name
        </label>
        <input
          type="text"
          name="last"
          id="last"
          placeholder="Eg: Gmmmmm"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.last && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("last", {
            required: "Last Name is required",
            minLength: {
              value: 3,
              message: "Last Name should be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Last Name should greater than 20 characters",
            },
          })}
        />
        {errors.last && <p className="error">{errors.last.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-lg font-semibold">
          Your Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          readOnly={true}
          value={currentUser.email}
          placeholder="Eg: esraa1925@gmail.com"
          className={
            "input border-l rounded-md focus:border-black px-3 text-lg  py-2"
          }
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="number" className="text-lg font-semibold">
          Phone Number
        </label>
        <div className="flex gap-3 items-center flex-wrap">
          <select
            className="input font-semibold w-fit cursor-pointer border-l rounded-md px-3 py-2"
            name="code"
            id="code"
            {...register("code")}
          >
            {countryCodes.map((e) => (
              <option
                className="cursor-pointer font-semibold"
                key={e.code}
                value={e.dial_code}
              >
                {e.name} ({e.dial_code})
              </option>
            ))}
          </select>
          <input
            type="number"
            name="number"
            id="number"
            placeholder="Eg: 01000148332"
            className={`input flex-1 border-l rounded-md px-3 py-2 ${
              errors.last && "border-2 border-red-600 focus:border-red-600"
            }`}
            {...register("number", {
              required: "Phone Number required",
              min: {
                value: 9,
                message: "Phone Number should be at least 9 digits",
              },
              max: {
                value: 20,
                message: "Phone number can't be greater than 20 digits",
              },
            })}
          />
        </div>
        {errors.number && <p className="error">{errors.number.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="state" className="text-lg font-semibold">
          State or City
        </label>
        <input
          type="text"
          name="state"
          id="state"
          placeholder="Eg: Cario"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.state && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("state", {
            required: "State input is required",
            minLength: {
              value: 2,
              message: "State should be at least 2 characters",
            },
            maxLength: {
              value: 30,
              message: "State should greater than 30 characters",
            },
          })}
        />
        {errors.state && <p className="error">{errors.state.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="letter" className="text-lg font-semibold">
          Cover Letter
        </label>
        <textarea
          name="state"
          id="state"
          cols="30"
          rows="10"
          className={`input border-l resize-none rounded-md px-3 py-2 ${
            errors.letter && "border-2 border-red-600 focus:border-red-600"
          }`}
          placeholder="Provide your cover letter (optional)"
          {...register("letter", {
            maxLength: {
              value: 3000,
              message: "Cover letter can't be greater than 3000 character",
            },
          })}
        ></textarea>
        {errors.letter && <p className="error">{errors.letter.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`main-btn block w-full mb-6 mx-auto text-white ${
          isLoading && "load-btn "
        }`}
      >
        {isLoading ? "Wait a second..." : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplicationForm;
