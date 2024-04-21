import { Link } from "react-router-dom";
import { LogOut } from ".";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-green shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container flex items-center gap-4 justify-between p-4 md:px-0 mx-auto">
        <Link to={"/"}>
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[100px] h-[50px]"
          />
        </Link>
        <div className="flex items-center gap-4">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <LogOut />
          <Link to={`/profile/${currentUser?._id}`}>
            <img
              src="/assets/profile.png"
              alt="profile"
              className="w-[40px] h-[40px]"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
