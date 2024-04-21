import { Header, Footer } from "../../components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default RootLayout;
