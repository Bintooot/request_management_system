import React, { useEffect, useState } from "react"; // Import useState
import { FaUser } from "react-icons/fa";
import Banner from "../Banner/Logo";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ toggleHandler, username, handleLogout }) => {
  const [showLogout, setShowLogout] = useState(false); // Manage visibility of logout button

  // Toggle the visibility of the logout button
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="flex justify-between px-5 items-center border-b shadow-lg bg-slate-300 h-20 ">
      {/* Left side: Hamburger menu and Banner */}
      <div className="flex items-center gap-3">
        <GiHamburgerMenu
          fontSize={30}
          cursor="pointer"
          onClick={toggleHandler} // Toggle sidebar or menu visibility
          className="md:hidden"
        />
        <Banner />
      </div>

      {/* Right side: Notification and User profile */}
      <div className="flex gap-2 items-center">
        <div
          className="p-2 cursor-pointer flex gap-3 items-center md:text-sm sm:text-sm"
          onClick={toggleLogout} // Toggle the logout button visibility
        >
          <FaUser fontSize={20} />
          <p className="md:block hidden">{username}</p>
        </div>

        {/* Logout Button */}
        {showLogout && (
          <div className="mt-2">
            <button
              onClick={handleLogout} // Call the handleLogout function
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
