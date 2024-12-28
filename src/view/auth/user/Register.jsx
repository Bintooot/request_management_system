import React from "react";
import logo from "../../../assets/Logo.png";
import SignUp from "../../../components/Form/SignUp";

const Register = () => {
  return (
    <>
      <div className="grid place-items-center p-10 ">
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
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default Register;
