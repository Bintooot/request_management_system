import React from "react";
import HorizontalNavbar from "../../components/Navigation/HorizontalNavbar";
import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";

const index = () => {
  const navlinks = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Contact Us",
      path: "/contact-us",
    },
    {
      id: 3,
      name: "About Us",
      path: "/about-us",
    },
  ];

  return (
    <>
      <HorizontalNavbar
        logo={logo}
        name="Chicks Request Management System"
        navlinks={navlinks}
      />
      <main className="flex flex-col gap-2">
        <div className="md:flex h-[70vh] shadow-lg bg-green-200">
          <div className="md:w-1/2 flex justify-center  items-center">
            Content 2
          </div>
          <div className="md:w-1/2 flex justify-center items-center  flex-col p-3 gap-5">
            <div className="my-2 text-2xl font-semibold">TITLE</div>
            <div className="my-2 text-xl text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              vero ullam dolor dicta eius dolorem suscipit culpa quo nisi vitae.
              Dolorem, a! Provident similique iste, aut amet placeat vero
              reprehenderit!
            </div>
            <div className="flex gap-6 justify-evenly">
              <NavLink
                to="/login"
                className="p-2 hover:bg-green-500 hover:text-white w-48 text-center hover:shadow-lg border"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="p-2 hover:bg-green-500 hover:text-white w-48 text-center hover:shadow-lg border"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
        <div className="h-[70vh] p-5">
          <h1 className="text-7xl text-center font-serif my-5">
            How We Operate?
          </h1>
          <hr className="border border-gray-400" />
        </div>
      </main>
    </>
  );
};

export default index;
