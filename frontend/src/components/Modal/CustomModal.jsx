import React from "react";

const CustomModal = ({ open, handleClose, selectedRequest }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Request Details</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {selectedRequest && (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Request ID:</span>{" "}
              {selectedRequest.requestId}
            </p>
            <p>
              <span className="font-semibold">User:</span>{" "}
              {selectedRequest.userName}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {selectedRequest.reviewedby}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {selectedRequest.quantityOfChicks}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {selectedRequest.status}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {selectedRequest.requestDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
