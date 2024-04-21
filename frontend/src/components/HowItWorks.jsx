import { HowItWorksData } from "../data";

const HowItWorks = () => {
  return (
    <div className="bg-gray-200 py-12 my-20">
      <h2 className="text-center mb-6 text-3xl font-bold">
        How <span className="text-green">JobZee</span> Works?
      </h2>
      <div className="flex flex-col gap-6 md:flex-row container mx-auto p-4 md:px-0">
        {HowItWorksData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center flex-col gap-3 p-4 bg-white h-[350px] hover:bg-black hover:text-white transition"
          >
            {item.icon}
            <p className="font-bold text-xl text-center">{item.title}</p>
            <p className="text-center text-gray-500">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
