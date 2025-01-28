import React from "react";

const Button = ({ name, hoverbgcolor, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`p-1 border-2 bg-gray-200  ${hoverbgcolor} hover:text-white rounded-lg shadow-md `}
      >
        <small>{name}</small>
      </button>
    </>
  );
};

export default Button;
