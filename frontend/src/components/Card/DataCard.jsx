import React from "react";
import { format } from "date-fns";

const DataCard = ({ data, onClick }) => {
  const formattedDate = format(
    new Date(data.createdAt),
    "MMMM dd, yyyy hh:mm a"
  );

  const ExpectedDate = (deliveryDate) => {
    if (deliveryDate === null) {
      return "N/A";
    }

    const formattedDate = format(deliveryDate, "MMMM dd, yyyy hh:mm a");

    return formattedDate;
  };

  return (
    <div className="border border-gray-200 w-full my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <h1 className="text-center p-4 font-semibold text-xl bg-gray-200 border-b rounded-t-xl">
        CURRENT REQUEST
      </h1>

      <div className="p-6 bg-white space-y-8">
        {/* User Details Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            User Details
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Requester Name</p>
              <p className="font-medium text-gray-800">{data.requesterName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium text-gray-800">{data.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Contact Number</p>
              <p className="font-medium text-gray-800">{data.contactnumber}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">PVO Position</p>
              <p className="font-medium text-gray-800">{data.position}</p>
            </div>
          </div>
        </div>

        {/* Request Details Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Request Details
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Request No</p>
              <p className="font-medium text-gray-800">
                {data.generatedRequestNo}
              </p>
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
              <p className="font-medium text-gray-800">
                {data.quantity} chicks
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
                  data.status === "Approved"
                    ? "bg-blue-100 text-blue-800"
                    : data.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : data.status === "Out for Delivery"
                    ? "bg-orange-100 text-orange-800"
                    : data.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : ""
                }`}
              >
                {data.status}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Expected Delivery Date</p>
              <p className="font-medium text-gray-800">
                {ExpectedDate(data.deliveryDate)}
              </p>
            </div>
            <div className="col-span-3">
              <p className="text-gray-500 text-sm">Description</p>
              <p className="font-medium text-gray-800">{data.description}</p>
            </div>
            <div className="col-span-3">
              <p className="text-gray-500 text-sm">Attached File</p>
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
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Admin Feedback
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Reviewed By</p>
              <p className="font-medium text-gray-800">
                {data.reviewedby || "Not yet reviewed"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Reviewed Date:</p>
              <p className="font-medium text-gray-800">
                {ExpectedDate(data.reviewedDate)}
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
      </div>

      <div className="text-end p-4 flex justify-between font-semibold text-xl bg-gray-200 border-t">
        {data.status === "Pending" && (
          <button
            type="button"
            onClick={() => onClick(data._id)}
            className="bg-red-600 text-sm text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
};

export default DataCard;
