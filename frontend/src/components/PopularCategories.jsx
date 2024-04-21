import { categories } from "../data";

const PopularCategories = () => {
  return (
    <div className="mb-20">
      <div className="container mx-auto p-4 md:px-0">
        <h2 className="text-4xl font-bold text-black">
          Popular <span className="text-green">Categories</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 ">
          {categories.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:shadow-lg transition  rounded-md  bg-gray-200 flex gap-6 items-center"
            >
              <span className="text-3xl text-green">{item.icon}</span>
              <div>
                <p className=" font-bold text-xl mb-1 text-black">
                  {item.title}
                </p>
                <p className="text-gray-600 text-sm">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
