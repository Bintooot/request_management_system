import React from "react";
import { format } from "date-fns";

const StatusTracking = ({ data }) => {
  const safeFormatDate = (date) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "MMMM dd, yyyy hh:mm a");
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="border border-gray-200 w-full my-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <h1 className="text-center p-4 font-semibold text-xl bg-gray-200 border-b rounded-t-xl">
        Request Status Tracking
      </h1>

      <div className="p-6 bg-white space-y-8">
        {/* Status Tracking Section */}
        <div>
          <div className="text-lg font-semibold text-gray-800 flex justify-between gap-2 mb-2 border-b ">
            <h2>Tracking Status</h2>
            <h2>{data.generatedRequestNo}</h2>
          </div>

          <div className="space-y-4">
            {/* Status Steps */}
            <div className="flex items-center">
              <div className="w-1/5 text-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Pending
                </div>
                <p className="text-sm text-gray-500">
                  {safeFormatDate(data.createdAt)}
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-1/5 text-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.status === "Approved"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Approved
                </div>
                <p className="text-sm text-gray-500">
                  {safeFormatDate(data.reviewedDate)}
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-1/5 text-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.status === "Out for Delivery"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Out for Delivery
                </div>
                <p className="text-sm text-gray-500">
                  {safeFormatDate(data.outForDeliveryDate)}
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-1/5 text-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Completed
                </div>
                <p className="text-sm text-gray-500">
                  {safeFormatDate(data.completedDate)}
                </p>
              </div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-1/5 text-center">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Rejected
                </div>
                <p className="text-sm text-gray-500">
                  {safeFormatDate(data.rejectedDate)}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-800">
                    Approved
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-orange-100 text-orange-800">
                    Out for Delivery
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-red-100 text-red-800">
                    Rejected
                  </span>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-1/5 text-center">
                    <div
                      className={`w-10 h-1 rounded-full ${
                        data.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/5 text-center">
                    <div
                      className={`w-10 h-1 rounded-full ${
                        data.status === "Approved"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/5 text-center">
                    <div
                      className={`w-10 h-1 rounded-full ${
                        data.status === "Out for Delivery"
                          ? "bg-orange-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/5 text-center">
                    <div
                      className={`w-10 h-1 rounded-full ${
                        data.status === "Completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="w-1/5 text-center">
                    <div
                      className={`w-10 h-1 rounded-full ${
                        data.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Feedback Section */}
        <div className="mt-8">
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
              <p className="text-gray-500 text-sm">Admin Feedback</p>
              <p className="font-medium text-gray-800">
                {data.adminFeedback || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTracking;
