import React from "react";
import userphoto from "../assets/userphoto.jpg";

const Avatar = () => {
  return (
    <>
      <div>
        <img
          alt=""
          src={userphoto}
          className="h-14 w-14 rounded-full ring-1 ring-black"
        />
      </div>
    </>
  );
};

export default Avatar;
