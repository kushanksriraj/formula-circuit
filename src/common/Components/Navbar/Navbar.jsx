import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getLoginStatus, getUserData } from "../../../features/user/userSlice";
import { Menu } from "./Menu";

export const Navbar = () => {
  const { name, profileURL } = useSelector(getUserData);
  const isUserLoggedIn = useSelector(getLoginStatus);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed top-0 z-30 h-16 bg-gradient-to-r from-gray-50 to-gray-100 w-screen flex justify-between items-center p-2 shadow-sm md:px-48">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/feed")}
      >
        <div className="material-icons-sharp text-5xl text-blue-400">forum</div>
        <div className="font-semibold text-2xl ml-4 text-blue-400">
          Formula Circuit
        </div>
      </div>
      {isUserLoggedIn && (
        <div className="p-2">
          <img
            className="rounded-full w-10 h-10 overflow-hidden cursor-pointer"
            src={profileURL}
            alt={name}
            onClick={() => setShowMenu(true)}
          />
        </div>
      )}
      {showMenu && <Menu setShowMenu={setShowMenu} />}
    </div>
  );
};
