import React, { useEffect, useState } from "react";
import ListofRequest from "../../components/Card/ListofRequest"; // Assuming this component exists for listing requests
import Button from "../../components/Button"; // Assuming this component exists for buttons
import Dropdown from "../../components/Dropdown"; // Assuming this component exists for dropdowns
import axios from "axios";
import { format } from "date-fns";

const RequestPending = () => {
  const [updateStatus, setUpdateStatus] = useState("Pending");
  const [adminFeedback, setAdminFeedback] = useState("");
  const [viewRequest, setViewRequest] = useState(null);
  const [listPendingRequest, setListPendingRequest] = useState([]);

  // Handle status change (Approved, Reject)
  const statusHandler = (newStatus) => setUpdateStatus(newStatus);

  // Handle viewing request details
  const handlerViewRequest = (request) => {
    setViewRequest(request);
    setUpdateStatus(request.status);
  };

  // Handle file download
  const handleFileDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchListOfPendingRequest = async () => {
      try {
        const response = await axios.get(`/api/admin/list-pending-request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListPendingRequest(response.data.response);
      } catch (error) {
        console.error("Error fetching list of pending request data:", error);
      }
    };
    fetchListOfPendingRequest();
  }, []);

  return (
    <div className="md:flex p-2 gap-2">
      {/* Pending Requests List */}
      <div className="border-2 text-sm p-5 shadow-lg rounded-lg md:w-1/3 w-full">
        <h1>
          <strong>List of Pendings</strong>
        </h1>
        <div className="my-3">
          <ListofRequest
            onClick={handlerViewRequest}
            request={listPendingRequest}
          />
        </div>
      </div>

      {/* Request Details */}
      <div className="md:flex-col flex-grow md:my-0 my-3 gap-2">
        <h1 className="font-semibold text-xl my-2 uppercase">
          Request Details
        </h1>
        {viewRequest && (
          <div className="border-2 shadow-lg rounded-lg p-5 h-[80vh] sm:h-[70vh] overflow-hidden">
            <div className="h-[69vh] p-2 overflow-y-auto">
              {/* User Info */}
              <div className="flex justify-between items-center gap-1 w-full overflow-y-hidden">
                <div className="flex flex-col gap-1">
                  <h1>
                    <strong>Name:</strong> {viewRequest.requesterName}
                  </h1>
                  <h2>
                    <strong>ID:</strong> {viewRequest.generatedRequestNo}
                  </h2>
                </div>
                <div>
                  <p>
                    <strong>Status:</strong>
                    <small
                      className={`rounded px-1 text-white ${
                        updateStatus === "Approved"
                          ? "bg-green-500"
                          : updateStatus === "Reject"
                          ? "bg-red-500"
                          : "bg-blue-400"
                      }`}
                    >
                      {updateStatus}
                    </small>
                  </p>
                </div>
              </div>
              {/* Request Info */}
              <div className="flex flex-col gap-1">
                <h2>
                  <strong>Type of Chicks:</strong> {viewRequest.chicksType}
                </h2>
                <h2>
                  <strong>Quantity:</strong> {viewRequest.quantity}
                </h2>
                <h2>
                  <strong>Date Requested:</strong>{" "}
                  {format(new Date(viewRequest.createdAt), "MMMM dd, yyyy")}
                </h2>
              </div>

              <div className="flex-grow my-3">
                <h2>
                  <strong>Attached File:</strong>
                </h2>
                <div className="my-2">
                  <p>{viewRequest.filename}</p>
                  <Button
                    name="Download File"
                    hoverbgcolor="hover:bg-blue-500"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/${viewRequest.file}`,
                        "_blank",
                        "noreferrer"
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex-grow my-3">
                <h2>
                  <strong>Description:</strong>
                </h2>
                <textarea
                  className="w-full my-2 border-2 h-[20vh] resize-none overflow-y-auto p-2 text-sm"
                  value={viewRequest.description}
                  readOnly
                ></textarea>
              </div>
              {/* Admin Feedback */}
              <div className="py-2">
                <hr className="border-black my-2" />
                <h2>
                  <strong>Admin Feedback:</strong>
                </h2>
                <textarea
                  className="w-full my-2 border-2 h-[20vh] resize-none overflow-y-auto p-2 text-sm"
                  value={adminFeedback}
                  onChange={(e) => setAdminFeedback(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end my-1 gap-2">
              <Dropdown
                statusdata={["Approved", "Reject"]}
                placeholder="Status"
                onChange={statusHandler}
                value={updateStatus}
              />
              <Button name="Submit" hoverbgcolor="hover:bg-green-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPending;
