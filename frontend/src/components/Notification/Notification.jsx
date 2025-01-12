import React from "react";

const Notification = ({ message, type }) => {
  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Notification;
