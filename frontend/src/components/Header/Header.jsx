import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Banner from "../Banner/Logo";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ toggleHandler, username }) => {
  return (
    <>
      <div className="flex justify-between px-5 items-center border-b shadow-lg bg-slate-300 grow h-20 sticky top-0">
        <div className="flex items-center gap-3">
          <GiHamburgerMenu
            fontSize={30}
            cursor="pointer"
            onClick={toggleHandler}
            className="md:hidden"
          />
          <Banner />
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <IoIosNotifications fontSize={20} />
          </div>
          <div className="p-2 cursor-pointer flex gap-3 items-center md:text-sm sm:text-sm">
            <FaUser fontSize={20} />
            <p className="md:block hidden">{username} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
