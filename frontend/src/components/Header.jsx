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
      <header className="bg-green/70 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-10">
        <div className="container flex items-center gap-4 justify-between p-4 md:px-0 mx-auto">
          <Link to={"/"} className="flex items-center gap-1">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-[40px] h-[40px]"
            />
            <span className="text-2xl font-bold hidden md:inline">JobZee</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <ul className="flex gap-3 font-semibold items-center text-gray-700 text-lg ">
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
              {currentUser && currentUser.role === "Job Seeker" && (
                <div className="flex gap-3 items-center">
                  <li>
                    <NavLink
                      to={"/saved"}
                      className={({ isActive }) =>
                        `hover:text-[#000] transition ${
                          isActive && "text-[#000] font-bold"
                        }`
                      }
                    >
                      Saved Jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/applied"}
                      className={({ isActive }) =>
                        `hover:text-[#000] transition ${
                          isActive && "text-[#000] font-bold"
                        }`
                      }
                    >
                      Applied Jobs
                    </NavLink>
                  </li>
                </div>
              )}
              {currentUser && currentUser.role === "Employer" && (
                <div className="flex gap-3 items-center">
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
                  <li>
                    <NavLink
                      to={"/my-jobs"}
                      className={({ isActive }) =>
                        `hover:text-[#000] transition ${
                          isActive && "text-[#000] font-bold"
                        }`
                      }
                    >
                      My Jobs
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
            {currentUser && (
              <div className="flex items-center gap-3">
                <LogOut />
                <img
                  src="/assets/profile.png"
                  alt="profile"
                  className="w-[40px] h-[40px]"
                />
              </div>
            )}
            {!currentUser && (
              <div className="flex items-center gap-3">
                <Link
                  className="font-semibold text-lg text-gray-500 hover:text-[#000] transition"
                  to={"/sign-in"}
                >
                  Sign In
                </Link>
                <Link
                  className="main-btn my-0 bg-black border-black hover:text-black"
                  to={"/sign-up"}
                >
                  Sign Up
                </Link>
              </div>
            )}
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
        <div className="flex z-10 fixed top-[90px] rounded-md p-4 border-2 border-green backdrop-blur-lg right-4 w-[70%]  flex-col md:hidden  gap-3">
          <ul className="flex gap-3 flex-col text-gray-700 text-lg font-semibold">
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
            {currentUser && currentUser.role === "Job Seeker" && (
              <div className="flex flex-col gap-3">
                <li>
                  <NavLink
                    to={"/saved"}
                    className={({ isActive }) =>
                      `hover:text-[#000] transition ${
                        isActive && "text-[#000] font-bold"
                      }`
                    }
                  >
                    Saved Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/applied"}
                    className={({ isActive }) =>
                      `hover:text-[#000] transition ${
                        isActive && "text-[#000] font-bold"
                      }`
                    }
                  >
                    Applied Jobs
                  </NavLink>
                </li>
              </div>
            )}
            {currentUser && currentUser.role === "Employer" && (
              <div className="flex flex-col gap-3">
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
                <li>
                  <NavLink
                    to={"/my-jobs"}
                    className={({ isActive }) =>
                      `hover:text-[#000] transition ${
                        isActive && "text-[#000] font-bold"
                      }`
                    }
                  >
                    My Jobs
                  </NavLink>
                </li>
              </div>
            )}
            {!currentUser && (
              <div className="flex flex-col gap-3">
                <Link
                  className="font-semibold text-lg text-gray-500 hover:text-[#000] transition"
                  to={"/sign-in"}
                >
                  Sign In
                </Link>
                <Link
                  className="main-btn my-0 bg-black border-black hover:text-black"
                  to={"/sign-up"}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
          {currentUser && (
            <div className="flex flex-col gap-3">
              <LogOut />
              <img
                src="/assets/profile.png"
                alt="profile"
                onClick={() => setShowMenue(false)}
                className="w-[40px] h-[40px]"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
