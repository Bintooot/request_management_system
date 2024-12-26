import React from "react";
import logo from "../../../assets/Logo.png";
import SignIn from "../../../components/Form/SignIn";
import HorizontalNavbar from "../../../components/Navigation/HorizontalNavbar";

const Login = () => {
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
    <div>
      <HorizontalNavbar
        logo={logo}
        name="Chicks Request Management System"
        navlinks={navlinks}
      />
      <div className="grid place-items-center">
        <div className="flex justify-center items-center p-5 h-full w-full gap-14 md:flex-row flex-col">
          <div className="md:w-1/2 w-full text-center">
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-36 w-auto"
            />
            <h1 className="mt-5 text-center  md:text-4xl text-3xl  font-bold tracking-tight uppercase text-green-600">
              Chicks Request Management System
            </h1>
            <p className="my-2">City Veterinarian Office Tagum City</p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
