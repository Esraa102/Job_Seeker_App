import { useForm } from "react-hook-form";

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
          placeholder="Eg: esraa1925@gmail.com"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.email && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9_!#$%&*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/,
              message: "Please enter invalid email",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="number" className="text-lg font-semibold">
          Phone Number
        </label>
        <input
          type="text"
          name="number"
          id="number"
          placeholder="Eg: +201000148332"
          className={`input border-l rounded-md px-3 py-2 ${
            errors.last && "border-2 border-red-600 focus:border-red-600"
          }`}
          {...register("number", {
            required: "Phone Number required",
            pattern: {
              value: /^\+?\d{6}[- ]?\d{3}[- ]?\d{3}$/,
              message: "Please enter invalid phone number",
            },
          })}
        />
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
          className="input border-l resize-none rounded-md px-3 py-2"
          placeholder="Provide your cover letter (optional)"
          {...register("letter")}
        ></textarea>
      </div>
      <button type="submit" className="main-btn block w-fit mb-6 text-white">
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
