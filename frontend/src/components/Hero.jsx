import { Link } from "react-router-dom";
import { details } from "../data";
const Hero = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 my-10 items-center justify-between">
        <div className="text-center md:text-start mb-8 md:mb-0">
          <h1 className="text-4xl text-black font-bold my-6">
            Find a job that suits <br /> your{" "}
            <span className="text-green">Interests</span> and{" "}
            <span className="text-green">Skills</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            maxime vitae optio commodi, amet at eum consequatur sequi totam
            deserunt pariatur ab minus officiis quas sit quis. Beatae, accusamus
            ea.
          </p>
          <Link to={"/jobs"} className="main-btn  px-4 text-lg">
            Explore Jobs
          </Link>
        </div>
        <img
          src="/assets/hero.jpg"
          alt="hero-img"
          className="w-full md:w-1/2"
        />
      </div>
      <div className="flex gap-6 my-20 items-center justify-between flex-wrap">
        {details.map((item) => (
          <div
            key={item.id}
            className="p-4 w-[200px] rounded-md  bg-gray-200 flex gap-6 items-center"
          >
            <span className="text-4xl text-green">{item.icon}</span>
            <div>
              <p className="text-2xl font-bold mb-1 text-black">{item.title}</p>
              <p className="text-gray-600 text-sm">{item.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hero;
