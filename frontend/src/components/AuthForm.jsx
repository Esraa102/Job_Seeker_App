import { FaUserAlt, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserGear } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { countryCodes } from "../data";
import { useState } from "react";
const AuthForm = ({ isRegister, sendData, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (isRegister) {
      sendData({
        username: data.username,
        email: data.email,
        role: data.role,
        password: data.password,
        phone: data.code.toString() + data.phone.toString(),
      });
    } else {
      sendData({
        email: data.email,
        password: data.password,
        role: data.role,
      });
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <label htmlFor="role" className="label h-full rounded-s-md">
          <FaUserGear size={22} />
        </label>
        <select
          name="role"
          id="role"
          className="input h-full py-[7px] cursor-pointer border-black"
          {...register("role")}
        >
          <option value="Employer">Employer</option>
          <option value="Job Seeker">Job Seeker</option>
        </select>
      </div>
      {isRegister && (
        <div>
          <div className="flex items-center ">
            <label htmlFor="username" className="label h-full rounded-s-md">
              <FaUserAlt size={22} />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className={`input ${
                errors.username &&
                "border-2 border-red-600 focus:border-red-600"
              }`}
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
            />
          </div>
          {errors.username?.type === "required" && (
            <p className="error">Username is required</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="error">Username must be at least 3 characters</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="error">
              Username can&apos;t be greater than 30 characters
            </p>
          )}
        </div>
      )}
      <div>
        <div className="flex items-center ">
          <label htmlFor="email" className="label h-full rounded-s-md">
            <MdEmail size={22} />
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={`input ${
              errors.email && "border-2 border-red-600 focus:border-red-600"
            }`}
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9_!#$%&*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/,
            })}
          />
        </div>
        {errors.email?.type === "required" && (
          <p className="error">Email Is Required</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="error">Please Enter Invalid Email</p>
        )}
      </div>
      {isRegister && (
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3 items-center ">
              <div className="flex w-full md:w-fit">
                <p htmlFor="phone" className="label h-full rounded-s-md">
                  <FaPhoneAlt size={22} />
                </p>
                <select
                  className="input flex-1 font-semibold  cursor-pointer   px-3"
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
                      ({e.dial_code})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Eg: 1000148332"
                className={`input flex-1 border-l rounded-md px-3 ${
                  errors.phone && "border-2 border-red-600 focus:border-red-600"
                }`}
                {...register("phone", {
                  required: "Phone Number is required",
                  min: {
                    value: 9,
                    message: "Phone Number should be at least 9 digits",
                  },
                  maxLength: {
                    value: 20,
                    message: "Phone number can't be greater than 20 digits",
                  },
                })}
              />
            </div>
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center ">
          <label htmlFor="password" className="label h-full rounded-s-md">
            <RiLockPasswordFill size={22} />
          </label>
          <div className="relative w-full">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`input w-full ${
                errors.password &&
                "border-2 border-red-600 focus:border-red-600"
              }`}
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 30,
              })}
            />
            <button
              type="button"
              className="absolute text-gray-500 top-1/2 -translate-y-1/2 right-2 hover:text-green transition"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? (
                <FaEye size={22} className="text-green" />
              ) : (
                <FaEyeSlash size={22} />
              )}
            </button>
          </div>
        </div>
        {errors.password?.type === "required" && (
          <p className="error">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="error">Password must be at least 8 characters</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p className="error">
            Password can&apos;t be greater than 30 characters
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`main-btn ${isLoading && "load-btn"}`}
      >
        {isRegister && !isLoading && "Sign Up"}
        {isRegister && isLoading && "Wait a second ..."}
        {!isRegister && !isLoading && "Sign In"}
        {!isRegister && isLoading && "Wait a second ..."}
      </button>
    </form>
  );
};

export default AuthForm;
