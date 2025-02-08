import React from "react";
import { format } from "date-fns";

const RequestCard = ({ items, open, handleClose }) => {
  if (!open) return null;
  const formattedDate = format(new Date(items.createdAt), "MMMM dd, yyyy");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div
        className="bg-white w-full max-w-md h-[90vh] md:h-auto rounded-xl shadow-sm overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <h1 className="text-center p-4 font-semibold text-lg bg-gray-200 border-b rounded-t-xl">
          REQUEST DETAILS
        </h1>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* User Info Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              User Info
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-gray-500 text-sm">Requester Name</p>
                <p className="font-medium text-gray-800">
                  {items.requesterName}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Drop Location</p>
                <p className="font-medium text-gray-800">{items.location}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Contact Number</p>
                <p className="font-medium text-gray-800">
                  {items.contactnumber}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium text-gray-800">{items.email}</p>
              </div>
            </div>
          </div>

          <hr className="border-1 border-black my-2" />

          {/* Request Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Request Details
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-gray-500 text-sm">Request No</p>
                <p className="font-medium text-gray-800">
                  {items.generatedRequestNo}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Requested Date</p>
                <p className="font-medium text-gray-800">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Type of Chicks</p>
                <p className="font-medium text-gray-800">{items.chicksType}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Quantity</p>
                <p className="font-medium text-gray-800">
                  {items.quantity} chicks
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Number of Requesters</p>
                <p className="font-medium text-gray-800">
                  {items.numberofrequester} persons
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <span
                  className={`inline-flex px-3 py-1 text-sm rounded-full ${
                    items.status === "Approved"
                      ? "bg-blue-100 text-blue-800"
                      : items.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : items.status === "Out for Delivery"
                      ? "bg-orange-100 text-orange-800"
                      : items.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : items.status == "Rejected"
                      ? "bg-red-100 text-red-800"
                      : ""
                  }`}
                >
                  {items.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Expected Delivery Date:</p>
                <p className="font-medium text-gray-800">
                  {items.deliveryDate
                    ? format(
                        new Date(items.deliveryDate),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Attached File</p>
                <p className="font-medium text-gray-800">{items.filename}</p>
                <div>
                  {items.file ? (
                    <>
                      {items.filename.endsWith(".pdf") ? (
                        <iframe
                          src={`http://localhost:5000/${items.file}`}
                          style={{
                            width: "100%",
                            height: "60vh",
                            border: "1px solid #ccc",
                          }}
                          title="File Preview"
                        />
                      ) : items.filename.match(/\.(jpg|jpeg|png)$/) ? (
                        <div className="flex justify-center">
                          <img
                            src={`http://localhost:5000/${items.file}`}
                            alt="Uploaded"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "60vh",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p>File preview not supported.</p>
                          <a
                            href={`http://localhost:5000/${items.file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-gray-200 hover:bg-green-500 px-3 py-1 rounded-md"
                          >
                            Download File
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>No file attached</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-500 text-sm">Description</p>
              <p className="font-medium text-gray-800">{items.description}</p>
            </div>
          </div>
          <hr className="border-1 border-black my-2" />
          {/* Admin Feedback Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Admin Feedback
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-gray-500 text-sm">Reviewed By</p>
                <p className="font-medium text-gray-800">{items.reviewedby}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Admin Feedback</p>
                <p className="font-medium text-gray-800">
                  {items.adminFeedback}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Approved Date:</p>
                <p className="font-medium text-gray-800">
                  {items.reviewedDate
                    ? format(
                        new Date(items.reviewedDate),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Out for Delivery Date:</p>
                <p className="font-medium text-gray-800">
                  {items.outForDeliveryDate
                    ? format(
                        new Date(items.outForDeliveryDate),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed Date:</p>
                <p className="font-medium text-gray-800">
                  {items.completedDate
                    ? format(
                        new Date(items.completedDate),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rejected Date:</p>
                <p className="font-medium text-gray-800">
                  {items.rejectedDate
                    ? format(
                        new Date(items.rejectedDate),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-200 border-t flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="bg-blue-600 text-sm text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
