import { Link, NavLink } from "react-router-dom";
import { LogOut } from ".";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenue, setShowMenue] = useState(false);
  return (
    <>
      <header className="bg-green shadow-md fixed top-0 left-0 w-full z-10">
        <div className="container flex items-center gap-4 justify-between p-4 md:px-0 mx-auto">
          <Link to={"/"}>
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-[100px] h-[50px]"
            />
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <ul className="flex gap-3 font-semibold items-center text-black text-lg ">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `hover:text-[#000] transition ${
                      isActive && "text-[#000] font-bold"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/jobs"}
                  className={({ isActive }) =>
                    `hover:text-[#000] transition ${
                      isActive && "text-[#000] font-bold"
                    }`
                  }
                >
                  All Jobs
                </NavLink>
              </li>
              {currentUser && currentUser.role === "Employer" && (
                <li>
                  <NavLink
                    to={"/post-job"}
                    className={({ isActive }) =>
                      `hover:text-[#000] transition ${
                        isActive && "text-[#000] font-bold"
                      }`
                    }
                  >
                    Post Job
                  </NavLink>
                </li>
              )}
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

          <button
            type="button"
            className="block md:hidden"
            onClick={() => setShowMenue((prev) => !prev)}
          >
            {showMenue ? <FaWindowClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>
      {showMenue && (
        <div className="flex fixed top-[90px] rounded-md p-4 backdrop-blur-lg right-4 w-[70%]  flex-col md:hidden  gap-3">
          <ul className="flex gap-3 flex-col text-black text-lg font-semibold">
            <li>
              <NavLink
                to={"/"}
                onClick={() => setShowMenue(false)}
                className={({ isActive }) =>
                  `hover:text-[#000] transition ${isActive && "text-[#000]"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/jobs"}
                onClick={() => setShowMenue(false)}
                className={({ isActive }) =>
                  `hover:text-[#000] transition ${isActive && "text-[#000]"}`
                }
              >
                All Jobs
              </NavLink>
            </li>
            {currentUser && currentUser.role === "Employer" && (
              <li>
                <NavLink
                  to={"/post-job"}
                  onClick={() => setShowMenue(false)}
                  className={({ isActive }) =>
                    `hover:text-[#000] transition ${isActive && "text-[#000]"}`
                  }
                >
                  Post Job
                </NavLink>
              </li>
            )}
          </ul>
          <LogOut />
          <Link
            to={`/profile/${currentUser?._id}`}
            onClick={() => setShowMenue(false)}
          >
            <img
              src="/assets/profile.png"
              alt="profile"
              className="w-[40px] h-[40px]"
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
