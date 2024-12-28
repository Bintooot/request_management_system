import React from "react";
import HorizontalNavbar from "../../components/Navigation/HorizontalNavbar";
import logo from "../../assets/Logo.png";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
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
      <main>
        <Outlet />
      </main>
      ;
    </>
  );
};

export default LandingPageLayout;
