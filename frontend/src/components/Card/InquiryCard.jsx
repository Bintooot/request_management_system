import React from "react";
import { format } from "date-fns";

const InquiryCard = ({ inquiry, open, handleClose }) => {
  if (!open) return null;

  const formattedDate = format(new Date(inquiry.createdAt), "MMMM dd, yyyy");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-lg md:max-w-2xl h-[90vh] md:h-auto rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-3 border-b text-center">
          <h1 className="text-lg font-semibold">Inquiry Details</h1>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-grow space-y-4">
          {/* User Info Section */}
          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-2">
              User Info
            </h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p className="p-2 my-2">
                <strong>Inquiry ID:</strong> {inquiry.inquiryId}
              </p>
              <p className="p-2 my-2">
                <strong>Subject:</strong> {inquiry.subject}
              </p>
              <p className="p-2 my-2">
                <strong>User:</strong> {inquiry.name}
              </p>
              <p className="p-2 my-2">
                <strong>Date Created:</strong> {formattedDate}
              </p>
              <p className="p-2 my-2">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    inquiry.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {inquiry.status}
                </span>
              </p>
            </div>
          </div>

          {/* File Section */}
          {inquiry.filename && (
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2">
                Attached File
              </h2>
              <a
                href={inquiry.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline break-words"
              >
                {inquiry.filename}
              </a>
            </div>
          )}

          {/* Message Section */}
          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-2">
              Message
            </h2>
            <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded-md">
              {inquiry.message}
            </p>
          </div>

          {/* Admin Feedback Section */}
          {inquiry.adminFeedback && (
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2">
                Admin Feedback
              </h2>
              <div className="space-y-2 text-gray-700 text-sm">
                <p className="p-2 my-2">
                  <strong>Reviewed By:</strong> {inquiry.reviewedby}
                </p>
                <p className="p-2 my-2">
                  <strong>Reviewed Date:</strong>{" "}
                  {inquiry.viewedAt
                    ? format(
                        new Date(inquiry.viewedAt),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
                <p className="p-2 my-2">
                  <strong>Resolved Date:</strong>{" "}
                  {inquiry.resolvedAt
                    ? format(
                        new Date(inquiry.resolvedAt),
                        "MMMM dd, yyyy hh:mm a"
                      )
                    : "Not set"}
                </p>
                <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded-md">
                  {inquiry.adminFeedback}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-200 border-t flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
