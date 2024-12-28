import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="text-6xl font-medium text-gray-600 mt-4">Oops!</div>
        <p className="text-xl text-gray-600 mt-4">
          The page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
