import React from "react";
import Logos from "../../assets/Logo.png";
const Logo = () => {
  return (
    <div className="flex items-center gap-3 ">
      <img src={Logos} alt="Logo.png" width={60} />
      <p>Chick's Request Management System</p>
    </div>
  );
};

export default Logo;
