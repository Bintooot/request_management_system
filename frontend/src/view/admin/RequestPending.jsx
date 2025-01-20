import React, { useEffect, useState } from "react";
import ListofRequest from "../../components/Card/ListofRequest";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";

const RequestPending = () => {
  const { adminData } = useOutletContext() || { adminData: null };
  const [updateStatus, setUpdateStatus] = useState("");
  const [adminFeedback, setAdminFeedback] = useState("");
  const [viewRequest, setViewRequest] = useState(null);
  const [listPendingRequest, setListPendingRequest] = useState([]);

  const statusHandler = (newStatus) => {
    setUpdateStatus(newStatus);

    if (viewRequest) {
      setViewRequest({ ...viewRequest, status: newStatus });
    }
  };

  const handlerViewRequest = (request) => {
    setViewRequest(request);
    setUpdateStatus(request.status);
  };

  const submitStatusUpdate = async () => {
    if (!viewRequest) return;

    const token = localStorage.getItem("authToken");

    console.log(
      updateStatus,
      adminFeedback,
      viewRequest._id,
      adminData.username
    );

    try {
      const response = await axios.put(
        `/api/admin/update-request-status/${viewRequest._id}`,
        {
          status: updateStatus,
          adminFeedback,
          reviewedby: adminData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setListPendingRequest((prevRequests) =>
        prevRequests.filter((req) => req._id !== viewRequest._id)
      );

      setViewRequest((prevViewRequest) => ({
        ...prevViewRequest,
        status: updateStatus,
        adminFeedback: adminFeedback,
      }));

      alert("Request status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update request status.");
    }
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
    <div className="md:flex p-4 gap-6">
      {/* Pending Requests List */}
      <div className="border-2 text-sm p-6 shadow-lg rounded-lg md:w-1/3 w-full">
        <h1 className="font-bold text-lg mb-4">List of Pending Requests</h1>
        <div className="my-3">
          {listPendingRequest.length > 0 ? (
            <ListofRequest
              onClick={handlerViewRequest}
              request={listPendingRequest}
            />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No pending requests found.
            </p>
          )}
        </div>
      </div>

      {/* Request Details */}
      <div className="md:w-2/3 w-full md:pl-6 pl-0">
        {viewRequest ? (
          <div className="border-2 shadow-lg rounded-lg p-6 ">
            <h1 className="font-semibold text-2xl mb-4">Request Details</h1>

            {/* User Info */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium">Requester Name:</h2>
                <p className="text-sm">{viewRequest.requesterName}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Request ID:</h2>
                <p className="text-sm">{viewRequest.generatedRequestNo}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <small
                  className={`rounded px-2 text-white ${
                    updateStatus === "Approved"
                      ? "bg-green-500"
                      : updateStatus === "Rejected"
                      ? "bg-red-500"
                      : "bg-blue-400"
                  }`}
                >
                  {updateStatus || "Select a Status to update"}
                </small>
              </div>
            </div>

            {/* Request Info */}
            <div className="flex flex-col mb-4">
              <h2 className="font-medium">Type of Chicks:</h2>
              <p>{viewRequest.chicksType}</p>
              <h2 className="font-medium">Quantity:</h2>
              <p>{viewRequest.quantity}</p>
              <h2 className="font-medium">Date Requested:</h2>
              <p>
                {format(
                  new Date(viewRequest.createdAt),
                  "MMMM dd, yyyy hh:mm a"
                )}
              </p>
            </div>

            {/* Attached File */}
            <div className="my-4">
              <h2 className="font-medium mb-2">Attached File:</h2>
              <div className="my-2">
                {viewRequest.file ? (
                  <>
                    {viewRequest.filename.endsWith(".pdf") ? (
                      <iframe
                        src={`http://localhost:5000/${viewRequest.file}`}
                        style={{
                          width: "100%",
                          height: "60vh",
                          border: "1px solid #ccc",
                        }}
                        title="File Preview"
                      />
                    ) : viewRequest.filename.match(/\.(jpg|jpeg|png)$/) ? (
                      <div className="flex justify-center">
                        <img
                          src={`http://localhost:5000/${viewRequest.file}`}
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
                          href={`http://localhost:5000/${viewRequest.file}`}
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

            {/* Description */}
            <div className="my-4">
              <h2 className="font-medium mb-2">Description:</h2>
              <textarea
                className="w-full border-2 h-[20vh] resize-none p-2 text-sm"
                value={viewRequest.description}
                readOnly
              ></textarea>
            </div>

            {/* Admin Feedback */}
            <div className="my-4">
              <hr className="border-black mb-4" />
              <h2 className="font-medium">Admin Feedback:</h2>
              <textarea
                className="w-full border-2 h-[20vh] resize-none p-2 text-sm"
                value={adminFeedback}
                required
                onChange={(e) => setAdminFeedback(e.target.value)}
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-4 mt-6">
              <Dropdown
                statusdata={[
                  "Select a Status to update",
                  "Approved",
                  "Rejected",
                ]}
                onChange={statusHandler}
                value={updateStatus || ""}
              />
              <Button
                name="Submit"
                hoverbgcolor="hover:bg-green-500"
                onClick={submitStatusUpdate}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">No request selected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPending;
