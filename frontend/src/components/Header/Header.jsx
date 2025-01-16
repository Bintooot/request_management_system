import React, { useState } from "react"; // Import useState
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Banner from "../Banner/Logo";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ togglehandler, username, handleLogout }) => {
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button visibility

  const toggleLogout = () => {
    setShowLogout(!showLogout); // Toggle the logout button
  };

  return (
    <div className="flex justify-between px-5 items-center border-b shadow-lg bg-slate-300 grow h-20 sticky top-0">
      <div className="flex items-center gap-3">
        <GiHamburgerMenu
          fontSize={30}
          cursor="pointer"
          onClick={togglehandler}
          className="md:hidden"
        />
        <Banner />
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <IoIosNotifications fontSize={20} />
        </div>
        <div
          className="p-2 cursor-pointer flex gap-3 items-center md:text-sm sm:text-sm"
          onClick={toggleLogout} // Toggle the logout button visibility
        >
          <FaUser fontSize={20} />
          <p className="md:block hidden">{username}</p>
        </div>

        {showLogout && (
          <div className="mt-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
