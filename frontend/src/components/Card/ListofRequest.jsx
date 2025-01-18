import React from "react";
import Button from "../Button";
import { format } from "date-fns";

const ListofRequest = ({ onClick, request }) => {
  return (
    <div className="h-[70vh] overflow-y-auto p-2">
      {request.map((user_list) => (
        <div
          key={user_list._id}
          className="grid grid-cols-12 gap-4 p-4 border-b-2 border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg"
        >
          {/* Requester Information */}
          <div className="col-span-7 flex flex-col justify-center">
            <h1 className="text-lg font-semibold">{user_list.requesterName}</h1>
            <p className="text-gray-500 text-sm">
              {format(new Date(user_list.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>

          {/* Status Information */}
          <div className="col-span-3 flex flex-col items-center justify-center">
            <h4 className="font-semibold text-sm">Status</h4>
            <p
              className={`px-3 py-1 rounded-full text-white text-sm ${
                user_list.status === "Approved"
                  ? "bg-green-500"
                  : user_list.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-blue-400"
              }`}
            >
              {user_list.status}
            </p>
          </div>

          {/* Details Button */}
          <div className="col-span-2 flex items-center justify-center">
            <Button
              name="Details"
              onClick={() => onClick(user_list)}
              hoverbgcolor="hover:bg-orange-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListofRequest;
