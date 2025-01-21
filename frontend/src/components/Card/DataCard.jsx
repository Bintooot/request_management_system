import React from "react";
import { format } from "date-fns";

const DataCard = ({ data, onClick }) => {
  const formattedDate = format(
    new Date(data.createdAt),
    "MMMM dd, yyyy hh:mm a"
  );

  return (
    <div className="border border-gray-200  w-full my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <h1 className="text-center p-4 font-semibold text-xl bg-gray-200 border-b rounded-t-xl">
        REQUEST DETAILS
      </h1>

      <div className="p-4 bg-white">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <p className="text-gray-500 text-sm">Request No</p>
            <p className="font-medium text-gray-800">
              {data.generatedRequestNo}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Requester Name</p>
            <p className="font-medium text-gray-800">{data.requesterName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Drop Location</p>
            <p className="font-medium text-gray-800">{data.location}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Type of Chicks</p>
            <p className="font-medium text-gray-800">{data.chicksType}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Number of Requesters</p>
            <p className="font-medium text-gray-800">
              {data.numberofrequester} persons
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Quantity</p>
            <p className="font-medium text-gray-800">{data.quantity} chicks</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Requested Date</p>
            <p className="font-medium text-gray-800">{formattedDate}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span
              className={`inline-flex px-3 py-1 text-sm rounded-full ${
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

          <div>
            <p className="text-gray-500 text-sm">Attached File</p>
            {data.file.endsWith(".pdf") ? (
              <iframe
                src={`http://localhost:5000/${data.file}`}
                title="PDF Preview"
                className="w-full h-[200px] border"
              ></iframe>
            ) : data.file.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <img
                src={`http://localhost:5000/${data.file}`}
                alt={data.filename}
                className="w-full h-auto border"
              />
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
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm">Description</p>
          <p className="font-medium text-gray-800">{data.description}</p>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div>
            <p className="text-gray-500 text-sm">Reviewed By</p>
            <p className="font-medium text-gray-800">
              {data.reviewedby || "Not yet reviewed"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Admin Feedback</p>
            <p className="font-medium text-gray-800">
              {data.adminFeedback || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-end p-4 flex justify-between font-semibold text-xl bg-gray-200 border-t">
        <button
          type="button"
          onClick={() => onClick(data._id)}
          className="bg-red-600 text-sm text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Cancel Reqeust
        </button>
      </h1>
    </div>
  );
};

export default DataCard;
