import React from "react";

const NumberCard = ({ title, header, count, quantity, startDate, endDate }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-evenly items-center bg-green-500 rounded-lg text-white p-4 sm:p-6 shadow-lg w-full">
      {/* Text Section */}
      <div className="md:flex text-center grow justify-evenly">
        <div className="md:text-left">
          <h1 className="font-bold text-lg sm:text-xl">{title}</h1>
          <h2 className="text-3xl sm:text-4xl font-semibold">{count}</h2>
        </div>
        <div className="md:text-left">
          <h1 className="font-bold text-lg sm:text-xl">{header}</h1>
          <h2 className="text-3xl sm:text-4xl font-semibold">{quantity}</h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <div className="w-full sm:w-auto">
          <label htmlFor="date-start" className="block text-sm sm:text-base">
            Start Date:
          </label>
          <input
            onChange={(e) => startDate(e.target.value)}
            type="date"
            id="date-start"
            name="date-start"
            className="text-black p-2 rounded-md w-full sm:w-auto"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="date-end" className="block text-sm sm:text-base">
            End Date:
          </label>
          <input
            type="date"
            onChange={(e) => endDate(e.target.value)}
            id="date-end"
            name="date-end"
            className="text-black p-2 rounded-md w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
