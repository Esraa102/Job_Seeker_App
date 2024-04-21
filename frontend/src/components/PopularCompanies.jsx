import { companies } from "../data";

const PopularCompanies = () => {
  return (
    <div className="bg-gray-200 py-16 mt-20">
      <div className="container mx-auto p-4 md:px-0">
        <h2 className="text-4xl font-bold text-black">
          Top <span className="text-green">Companies</span>
        </h2>
        <div className="flex items-center justify-between flex-wrap  gap-10 my-10 ">
          {companies.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:shadow-lg flex-1 transition  rounded-md  bg-white"
            >
              <div className={"flex items-center gap-4 mb-4"}>
                <span className="text-green text-4xl"> {item.icon}</span>
                <div>
                  <p className="text-xl font-bold text-black">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.location}</p>
                </div>
              </div>
              <button
                type="button"
                className="main-btn block w-full text-center pointer-events-none"
              >
                Open Positions {item.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
