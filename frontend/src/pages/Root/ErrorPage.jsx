import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen p-6 ">
      <img src="/assets/notfound.png" alt="not-found" className="mx-auto" />
      <Link to="/" className="main-btn w-fit block mx-auto mt-3 text-white">
        Go To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
