import React from "react";

const NumberCard = ({ title, header, count, quantity, startDate, endDate }) => {
  return (
    <div className=" shadow-lg rounded-xl p-6 w-full bg-green-500 text-white mx-auto">
      {/* Stats Section */}
      <div className="flex justify-evenly items-center bg-gray-200 p-4 rounded-lg mt-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
          <p className="text-4xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div className="text-center ">
          <h2 className="text-lg font-semibold text-gray-700">{header}</h2>
          <p className="text-4xl font-bold text-gray-900 mt-2">{quantity}</p>
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col">
          <label htmlFor="date-start" className="text-sm ">
            Start Date:
          </label>
          <input
            type="date"
            onChange={(e) => startDate(e.target.value)}
            id="date-start"
            className="bg-white border border-gray-300 p-2 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date-end" className="text-sm">
            End Date:
          </label>
          <input
            type="date"
            onChange={(e) => endDate(e.target.value)}
            id="date-end"
            className="bg-white border border-gray-300 p-2 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
