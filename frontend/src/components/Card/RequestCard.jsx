import React from "react";
import { format } from "date-fns";

const RequestCard = ({ items, onClick, open, handleClose }) => {
  if (!open) return null;
  const formattedDate = format(new Date(items.createdAt), "MMMM dd, yyyy");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="border border-gray-200 md:w-2/3 w-full my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h1 className="text-center p-4 font-semibold text-xl bg-gray-200 border-b rounded-t-xl">
          REQUEST DETAILS
        </h1>

        <div className="p-4 bg-white">
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <p className="text-gray-500 text-sm">Request No</p>
              <p className="font-medium text-gray-800">
                {items.generatedRequestNo}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Requester Name</p>
              <p className="font-medium text-gray-800">{items.requesterName}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Drop Location</p>
              <p className="font-medium text-gray-800">{items.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Type of Chicks</p>
              <p className="font-medium text-gray-800">{items.chicksType}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Number of Requesters</p>
              <p className="font-medium text-gray-800">
                {items.numberofrequester} persons
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Quantity</p>
              <p className="font-medium text-gray-800">
                {items.quantity} chicks
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Requested Date</p>
              <p className="font-medium text-gray-800">{formattedDate}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <span
                className={`inline-flex px-3 py-1 text-sm rounded-full ${
                  items.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : items.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {items.status}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Attached File</p>
              <p className="font-medium text-gray-800">{items.filename}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 text-sm">Description</p>
            <p className="font-medium text-gray-800">{items.description}</p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div>
              <p className="text-gray-500 text-sm">Reviewed By</p>
              <p className="font-medium text-gray-800">{items.reviewedby}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Admin Feedback</p>
              <p className="font-medium text-gray-800">{items.adminFeedback}</p>
            </div>
          </div>
        </div>

        <h1 className="text-end p-4 flex justify-between font-semibold text-xl bg-gray-200 border-t">
          {items.status === "Pending" && (
            <button
              type="button"
              onClick={() => {
                onClick(items._id);
                handleClose();
              }}
              className="bg-red-600 text-sm text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Cancel Request
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="bg-blue-600 text-sm text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back
          </button>
        </h1>
      </div>
    </div>
  );
};

export default RequestCard;
