const NotFound = () => {
  return (
    <div className="w-full h-full">
      <img
        src="/assets/no-content.png"
        alt="not-found"
        className="w-[200px] mx-auto"
      />
      <p className="text-center text-gray-500">Oops! No Results Found!</p>
    </div>
  );
};

export default NotFound;
