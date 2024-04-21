import { Link } from "react-router-dom";
import { AuthForm } from "../../components";

const SignUp = () => {
  return (
    <section className="h-screen bg-white px-6 py-10 md:py-6 flex flex-col md:flex-row md:items-center gap-6 justify-between">
      <div className="flex-1 text-center">
        <h1 className="text-4xl mt-4 mb-3 font-extrabold text-green">
          Sign Up
        </h1>
        <p className="text-sm mb-4 text-gray-500">
          Please enter your details to create a new account
        </p>
        <AuthForm isRegister />
        <p className="mt-3 text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/sign-in"}
            className="font-semibold hover:text-green hover:underline transition"
          >
            Log In
          </Link>
        </p>
      </div>
      <img
        src="/assets/register.png"
        alt="resiter-img"
        className="w-full md:w-1/2"
      />
    </section>
  );
};

export default SignUp;
