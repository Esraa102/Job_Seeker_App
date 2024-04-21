import { AuthForm } from "../../components";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="h-screen bg-white px-6 py-10 md:py-6 flex flex-col md:flex-row md:items-center gap-6 justify-between">
      <div className="flex-1 text-center">
        <h1 className="text-4xl mt-4 mb-3 font-extrabold text-green">
          Sign In
        </h1>
        <p className="text-sm mb-4 text-gray-500">
          Please enter your details to log in
        </p>
        <AuthForm isRegister={false} />
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
        className="w-full md:w-1/2"
      />
    </section>
  );
};

export default SignIn;
