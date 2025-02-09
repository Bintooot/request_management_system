import React from "react";
import Button from "../Button";
import { format } from "date-fns";

const ListofInquiries = ({ onClick, inquiries }) => {
  return (
    <div className="h-[70vh] overflow-y-auto p-2">
      {inquiries.map((inquiry) => (
        <div
          key={inquiry._id}
          className="grid grid-cols-12 gap-4 p-4 border-b-2 border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg"
        >
          {/* Inquiry Information */}
          <div className="col-span-7 flex flex-col justify-center">
            <h1 className="text-lg font-semibold">{inquiry.name}</h1>
            <p className="text-gray-500 text-sm">
              Date:{" "}
              {format(
                new Date(inquiry.createdAt),
                "MMMM dd, yyyy" + " , " + "hh:mm a"
              )}
            </p>
          </div>

          {/* Status Information */}
          <div className="col-span-3 flex flex-col items-center justify-center">
            <h4 className="font-semibold text-sm">Status</h4>
            <p
              className={`px-3 py-1 rounded-md text-white text-sm ${
                inquiry.status === "Resolved"
                  ? "bg-green-500"
                  : inquiry.status === "Pending"
                  ? "bg-orange-400"
                  : inquiry.status === "Viewed"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
            >
              {inquiry.status}
            </p>
          </div>

          {/* Details Button */}
          <div className="col-span-2 flex items-center justify-center">
            <Button
              name="Details"
              onClick={() => onClick(inquiry)}
              hoverbgcolor="hover:bg-orange-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListofInquiries;
