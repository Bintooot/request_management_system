import React, { useEffect, useState } from "react";
import ListofRequest from "../../components/Card/ListofRequest";
import Button from "../../components/Button";
import Notification from "../../components/Notification/Notification";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";

const RequestPending = () => {
  const { adminData } = useOutletContext() || { adminData: null };
  const [updateStatus, setUpdateStatus] = useState("");
  const [adminFeedback, setAdminFeedback] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [viewRequest, setViewRequest] = useState(null);
  const [listPendingRequest, setListPendingRequest] = useState([]);

  // For notifcation
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  const statusHandler = (newStatus) => {
    if (newStatus === updateStatus) {
      setUpdateStatus("");
      setTimeout(() => setUpdateStatus(newStatus), 0);

      if (viewRequest) {
        setViewRequest({ ...viewRequest, status: newStatus });
      }
    } else {
      setUpdateStatus(newStatus);
    }
  };

  const handlerViewRequest = (request) => {
    setViewRequest(request);
    setUpdateStatus(request.status);
  };

  const submitStatusUpdate = async () => {
    if (!viewRequest) return;

    const currentDate = new Date();
    const selectedDeliveryDate = new Date(deliveryDate);

    if (selectedDeliveryDate < currentDate) {
      showNotification("Delivery date cannot be in the past.", "error");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `/api/admin/update-request-status/${viewRequest._id}`,
        {
          status: updateStatus,
          adminFeedback,
          reviewedby: adminData.username,
          deliveryDate,
          approvedRequest: currentDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdminFeedback("");
      setDeliveryDate(null);
      setViewRequest(null);
      showNotification(response.data.message, "success");
      setListPendingRequest((prevRequests) =>
        prevRequests.filter((req) => req._id !== viewRequest._id)
      );
    } catch (error) {
      console.error("Error updating status:", error);

      const errorMessage =
        error.response?.data?.error || "Failed to update request status.";
      showNotification(errorMessage, "error");
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

      {notificationVisible && (
        <Notification
          message={statusMessage} // Pass the message to display
          type={statusType} // Pass the type of notification (success or error)
        />
      )}

      {/* Request Details */}
      <div className="md:w-2/3 w-full md:pl-6 pl-0">
        {viewRequest ? (
          <div className="border-2 shadow-lg rounded-lg p-6">
            <h1 className="font-semibold text-2xl text-center uppercase mb-4">
              Request Details
            </h1>
            <hr className="my-2" />
            {/* User Info Section */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">User Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Requester Name:</h3>
                  <p className="text-sm">{viewRequest.requesterName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email:</h3>
                  <p className="text-sm">{viewRequest.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Contact Number:</h3>
                  <p className="text-sm">{viewRequest.contactnumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Position:</h3>
                  <p className="text-sm">{viewRequest.position}</p>
                </div>
              </div>
            </div>

            {/* Request Details Section */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Request Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Request ID:</h3>
                  <p className="text-sm">{viewRequest.generatedRequestNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Type of Chicks:</h3>
                  <p className="text-sm">{viewRequest.chicksType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Number of Person:</h3>
                  <p className="text-sm">{viewRequest.numberofrequester}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Quantity:</h3>
                  <p className="text-sm">{viewRequest.quantity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Date Requested:</h3>
                  <p className="text-sm">
                    {format(
                      new Date(viewRequest.createdAt),
                      "MMMM dd, yyyy hh:mm a"
                    )}
                  </p>
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
                    {updateStatus || "Pending"}
                  </small>
                  {updateStatus !== viewRequest.status && (
                    <p className="text-xs text-gray-500 mt-2">
                      Status has been updated but not yet submitted.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Attached File Section */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Attached File</h2>
              <div>
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

            {/* Admin Feedback Form Section */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Admin Feedback</h2>
              <textarea
                className="w-full border-2 h-[20vh] resize-none p-2 text-sm"
                value={adminFeedback}
                required
                onChange={(e) => setAdminFeedback(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-6 flex gap-2 items-center justify-between">
              <div>
                <label className="font-medium text-sm">
                  Expected Delivery Date:
                </label>
                <input
                  type="datetime-local"
                  className="w-full border-2 p-2 text-sm"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Dropdown
                  statusdata={["Approved", "Rejected"]}
                  onChange={statusHandler}
                />
              </div>
            </div>

            {updateStatus !== viewRequest.status && (
              <p className="text-green-500 text-xs mt-2">
                Status updated to "{updateStatus}", but not yet submitted.
              </p>
            )}

            <div className="text-end">
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
