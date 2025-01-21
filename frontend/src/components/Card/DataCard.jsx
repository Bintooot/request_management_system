import React from "react";

const DataCard = ({ data, onClick }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Request Details</h2>
        <span
          className={`px-4 py-1 text-sm font-medium rounded-full ${
            data.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : data.status === "Approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Request No</p>
            <p className="text-lg font-medium text-gray-700">
              {data.generatedRequestNo}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Requester Name</p>
            <p className="text-lg font-medium text-gray-700">
              {data.requesterName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-medium text-gray-700">{data.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type of Chicks</p>
            <p className="text-lg font-medium text-gray-700">
              {data.chicksType}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Number of Requesters</p>
            <p className="text-lg font-medium text-gray-700">
              {data.numberofrequester}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-lg font-medium text-gray-700">{data.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Requested Date</p>
            <p className="text-lg font-medium text-gray-700">
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">File</p>
        {data.file.endsWith(".pdf") ? (
          <iframe
            src={`http://localhost:5000/${data.file}`}
            title="PDF Preview"
            className="w-full h-[100vh] border"
          ></iframe>
        ) : data.file.match(/\.(jpeg|jpg|gif|png)$/i) ? (
          <img
            src={`http://localhost:5000/${data.file}`}
            alt={data.filename}
            className="w-full h-auto border"
          />
        ) : data.file.match(/\.(docx|doc)$/i) ? (
          <a
            href={`http://localhost:5000/${data.file}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {data.filename}
          </a>
        ) : (
          <a
            href={`http://localhost:5000/${data.file}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {data.filename}
          </a>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-lg font-medium text-gray-700">
            {data.description}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Reviewed By</p>
          <p className="text-lg font-medium text-gray-700">
            {data.reviewedby || "Not yet reviewed"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Admin Feedback</p>
          <p className="text-lg font-medium text-gray-700">
            {data.adminFeedback || "N/A"}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onClick(data._id);
            }}
            className="bg-red-600 text-sm text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
