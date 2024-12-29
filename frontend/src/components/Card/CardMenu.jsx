import React from "react";

const CardMenu = ({ title, number, icon }) => {
  return (
    <div className="flex items-center justify-between bg-green-500 h-32 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-2 px-2">
        <div className="text-3xl text-white">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold truncate text-white text-wrap">
            {title}
          </h3>
          <p className="text-sm text-gray-100">Total: {number}</p>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
