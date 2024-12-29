import React from "react";
import { NavLink } from "react-router-dom";

const HorizontalNavbar = ({ logo, name, navlinks }) => {
  return (
    <>
      <div className="md:flex justify-between items-center p-2">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={75} />
          <h1>{name}</h1>
        </div>
        <nav className="py-2 px-2">
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
    </>
  );
};

export default HorizontalNavbar;
