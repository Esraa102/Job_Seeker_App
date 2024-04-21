/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdLogOut } from "react-icons/io";
import { useLogOutUserMutation } from "../features/user/api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { logOutUserAction } from "../features/user/slices/userSlice";

const LogOut = () => {
  const [logOutUser, { data, isError, isSuccess, error, isLoading }] =
    useLogOutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser();
  };
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      dispatch(logOutUserAction());
      toast.success(data);
      navigate("/sign-in");
    }
  }, [isError, isSuccess]);

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleLogOut}
      className={`bg-[#000]/85 block w-fit hover:scale-105 transition py-[6px] px-2 rounded-md text-white ${
        isLoading && "opacity-40 cursor-not-allowed hover:scale-100"
      }`}
    >
      <IoMdLogOut size={22} />
    </button>
  );
};

export default LogOut;
