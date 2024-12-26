import React from "react";
import { NavLink } from "react-router-dom";

const HorizontalNavbar = ({ logo, name, navlinks }) => {
  return (
    <div className="border-b-2 px-4 py-2 md:flex justify-between items-center sticky top-0 bg-white ">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" width={75} />
        <h1>{name}</h1>
      </div>
      <div>
        <div className="p-3 my-2 ">
          <nav>
            <ul className="flex md:justify-end  justify-evenly gap-8 font-semibold">
              {navlinks.map((links) => (
                <li key={links.id}>
                  <NavLink
                    to={links.path}
                    className="hover:text-green-300 hover:border-green-500 hover:border-b-2 "
                  >
                    {links.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HorizontalNavbar;
