import React from "react";
import Logos from "../../assets/Logo.png";
const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img src={Logos} alt="Logo.png" className="w-12 sm:w-16" />
      <p className="hidden sm:block text-sm sm:text-base md:text-lg font-semibold">
        Chick's Request Management System
      </p>
    </div>
  );
};

export default Logo;
