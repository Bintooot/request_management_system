import { format } from "date-fns";
import * as React from "react";

const AdminProfileCard = ({
  namelabel,
  id,
  username,
  email,
  address,
  contactnumber,
  createdAt,
}) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 sm:p-6 border border-gray-300">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Admin Profile
        </h1>
      </div>

      <hr className="border-gray-400 mb-6" />

      <div className="space-y-6 text-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-medium text-gray-700">
            {namelabel}
          </span>
          <span className="text-base sm:text-lg font-semibold text-blue-600">
            {id}
          </span>
        </div>

        <div>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            User Name:
          </span>
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {username}
          </p>
        </div>

        <div>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Email:
          </span>
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {email}
          </p>
        </div>

        <div>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Address:
          </span>
          <p className="text-base sm:text-lg text-gray-800">
            {address || "No address provided"}
          </p>
        </div>

        <div>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Contact No:
          </span>
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {contactnumber}
          </p>
        </div>

        <div>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Account Created:
          </span>
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {createdAt || "No creation date available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;
