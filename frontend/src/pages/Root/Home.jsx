import {
  Hero,
  HowItWorks,
  PopularCategories,
  PopularCompanies,
} from "../../components";

const Home = () => {
  return (
    <section>
      <div className="container mx-auto p-4 md:px-0 pt-[100px]">
        <Hero />
      </div>
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
