/* eslint-disable react-hooks/exhaustive-deps */
import { AuthForm } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogInUserMutation } from "../../features/user/api/userApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logInUserAction } from "../../features/user/slices/userSlice";

const SignIn = () => {
  const [logInUser, { data, isError, error, isLoading, isSuccess }] =
    useLogInUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      dispatch(logInUserAction(null));
      toast.error(error.data.message);
    }
    if (isSuccess) {
      dispatch(logInUserAction(data.userData));
      toast.success("User Logged In Successfully");
      navigate("/");
    }
  }, [isError, isSuccess]);
  return (
    <section className="h-screen bg-white px-6 py-10 md:py-6 flex flex-col md:flex-row md:items-center justify-center gap-6 md:justify-between">
      <div className="md:flex-1 text-center ">
        <div className="flex items-center gap-1 mb-4 justify-center">
          <img
            src="/assets/logo-2.png"
            alt="logo"
            className="w-[70px] h-[70px]"
          />
          <span className="text-4xl font-bold text-green">JobZee</span>
        </div>
        <p className="text-sm mb-4 text-gray-500">
          Please enter your details to log in
        </p>
        <AuthForm
          isRegister={false}
          sendData={logInUser}
          isLoading={isLoading}
        />
        <p className="mt-3 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold hover:text-green hover:underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>
      <img
        src="/assets/login.png"
        alt="resiter-img"
        className="w-full md:w-1/2 hidden md:block"
      />
    </section>
  );
};

export default SignIn;
