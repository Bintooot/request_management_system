import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ListofRequest from "../../components/Card/ListofRequest";
import ListofInquiries from "../../components/Card/ListofInquiry";
import Button from "../../components/Button";
import Notification from "../../components/Notification/Notification";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";

const RequestPending = () => {
  const { adminData } = useOutletContext() || { adminData: null };

  // Shared state
  const [isLoading, setIsLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");

  // Request state
  const [listPendingRequest, setListPendingRequest] = useState([]);
  const [viewRequest, setViewRequest] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");

  // Inquiry state
  const [listPendingInquiry, setListPendingInquiry] = useState([]);
  const [viewInquiry, setViewInquiry] = useState(null);

  // Common state
  const [updateStatus, setUpdateStatus] = useState("");
  const [adminFeedback, setAdminFeedback] = useState("");

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 5000);
  };

  const handleViewRequest = (request) => {
    setViewRequest(request);
    setViewInquiry(null);
    setUpdateStatus(request.status);
    setAdminFeedback("");
  };

  const handleViewInquiry = (inquiry) => {
    setViewInquiry(inquiry);
    setViewRequest(null);
    setUpdateStatus(inquiry.status);
    setAdminFeedback("");
  };

  const handleRequestUpdate = async () => {
    if (!viewRequest) return;

    const currentDate = new Date();
    const selectedDeliveryDate = new Date(deliveryDate);

    if (selectedDeliveryDate < currentDate) {
      showNotification("Delivery date cannot be in the past.", "error");
      return;
    }

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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      showNotification(response.data.message, "success");
      setListPendingRequest((prev) =>
        prev.filter((req) => req._id !== viewRequest._id)
      );
      resetForm();
    } catch (error) {
      showNotification(error.response?.data?.error || "Update failed", "error");
    }
  };

  const handleInquiryUpdate = async () => {
    if (!viewInquiry) return;

    try {
      const response = await axios.put(
        `/api/admin/update-inquiry-status/${viewInquiry._id}`,
        {
          status: updateStatus,
          adminFeedback,
          reviewedby: adminData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      showNotification(response.data.message, "success");
      setListPendingInquiry((prev) =>
        prev.filter((inq) => inq._id !== viewInquiry._id)
      );
      fetchData();
      resetForm();
    } catch (error) {
      showNotification(error.response?.data?.error || "Update failed", "error");
    }
  };

  const resetForm = () => {
    setAdminFeedback("");
    setDeliveryDate("");
    setUpdateStatus("");
    setViewRequest(null);
    setViewInquiry(null);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const [requestResponse, inquiryResponse] = await Promise.all([
        axios.get("/api/admin/list-pending-request", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/admin/list-pending-inquiry", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setListPendingRequest(requestResponse.data.response);
      setListPendingInquiry(inquiryResponse.data.response);
    } catch (error) {
      showNotification("Failed to fetch data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1 mb-4">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white text-green-700 shadow"
                : "text-gray-600 hover:bg-white/[0.12] hover:text-green-600"
            }`
            }
          >
            Pending Requests
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ${
              selected
                ? "bg-white text-green-700 shadow"
                : "text-gray-600 hover:bg-white/[0.12] hover:text-green-600"
            }`
            }
          >
            Pending Inquiries
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Requests Panel */}
          <Tab.Panel>
            <div className="md:flex gap-6">
              <div className="md:w-1/3">
                <div className="border-2 p-6 shadow-lg rounded-lg">
                  <h2 className="font-bold text-lg mb-4">Pending Requests</h2>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : listPendingRequest.length > 0 ? (
                    <ListofRequest
                      onClick={handleViewRequest}
                      request={listPendingRequest}
                    />
                  ) : (
                    <p className="text-gray-500 text-center">
                      No pending requests
                    </p>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                {viewRequest ? (
                  <div className="border-2 p-6 shadow-lg rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Request Details</h2>
                    {/* Request Details Form */}
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Request ID:
                          </label>
                          <p>{viewRequest.generatedRequestNo}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Requester:
                          </label>
                          <p>{viewRequest.requesterName}</p>
                        </div>
                      </div>

                      {/* Request Details */}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Email:</label>
                          <p>{viewRequest.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Contact Number:
                          </label>
                          <p>{viewRequest.contactnumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Location:
                          </label>
                          <p>{viewRequest.location}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Type of Chicks:
                          </label>
                          <p>{viewRequest.chicksType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Status:</label>
                          <p>{viewRequest.status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Quantity:
                          </label>
                          <p>{viewRequest.quantity}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Number of Reqeuster:
                          </label>
                          <p>{viewRequest.numberofrequester}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm font-medium">
                            Descripton:
                          </label>
                          <p>{viewRequest.description}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Attached File</p>
                          <p className="font-medium text-gray-800">
                            {viewRequest.filename}
                          </p>
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
                                ) : viewRequest.filename.match(
                                    /\.(jpg|jpeg|png)$/
                                  ) ? (
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
                      </div>

                      {/* Admin Actions */}
                      <div>
                        <label className="text-sm font-medium">
                          Admin Feedback:
                        </label>
                        <textarea
                          className="w-full border-2 rounded-lg p-2 h-32"
                          value={adminFeedback}
                          onChange={(e) => setAdminFeedback(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <label className="text-sm font-medium">
                            Delivery Date:
                          </label>
                          <input
                            type="datetime-local"
                            className="w-full border-2 rounded-lg p-2"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                          />
                        </div>
                        <Dropdown
                          statusdata={["Approved", "Rejected"]}
                          onChange={(value) => setUpdateStatus(value)}
                        />
                      </div>

                      <div className="text-right">
                        <Button
                          name="Update Request"
                          onClick={handleRequestUpdate}
                          hoverbgcolor="hover:bg-green-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">
                      Select a request to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>

          {/* Inquiries Panel */}
          <Tab.Panel>
            <div className="md:flex gap-6">
              <div className="md:w-1/3">
                <div className="border-2 p-6 shadow-lg rounded-lg">
                  <h2 className="font-bold text-lg mb-4">Pending Inquiries</h2>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : listPendingInquiry.length > 0 ? (
                    <ListofInquiries
                      onClick={handleViewInquiry}
                      inquiries={listPendingInquiry}
                    />
                  ) : (
                    <p className="text-gray-500 text-center">
                      No pending inquiries
                    </p>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                {viewInquiry ? (
                  <div className="border-2 p-6 shadow-lg rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Inquiry Details</h2>
                    <div className="space-y-4">
                      {/* Inquiry Info */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">From:</label>
                          <p>{viewInquiry.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Status:</label>
                          <p>{viewInquiry.status}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Inquiry Created:
                          </label>
                          <p>
                            {format(
                              new Date(viewInquiry.createdAt),
                              "MMMM dd, yyyy" + " , " + "hh:mm a"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Inquiry Content */}
                      <div>
                        <label className="text-sm font-medium">Subject:</label>
                        <p>{viewInquiry.subject}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message:</label>
                        <p className="whitespace-pre-wrap">
                          {viewInquiry.message}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Attached File</p>
                        <p className="font-medium text-gray-800">
                          {viewInquiry.filename}
                        </p>
                        <div>
                          {viewInquiry.file ? (
                            <>
                              {viewInquiry.filename.endsWith(".pdf") ? (
                                <iframe
                                  src={`http://localhost:5000/${viewInquiry.file}`}
                                  style={{
                                    width: "100%",
                                    height: "60vh",
                                    border: "1px solid #ccc",
                                  }}
                                  title="File Preview"
                                />
                              ) : viewInquiry.filename.match(
                                  /\.(jpg|jpeg|png)$/
                                ) ? (
                                <div className="flex justify-center">
                                  <img
                                    src={`http://localhost:5000/${viewInquiry.file}`}
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
                                    href={`http://localhost:5000/${viewInquiry.file}`}
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

                      {/* Admin Response */}
                      <div>
                        <label className="text-sm font-medium">
                          Admin Response:
                        </label>
                        <textarea
                          className="w-full border-2 rounded-lg p-2 h-32"
                          value={adminFeedback}
                          onChange={(e) => setAdminFeedback(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <Dropdown
                          statusdata={["Viewed", "Resolved"]}
                          onChange={(value) => setUpdateStatus(value)}
                        />
                        <Button
                          name="Submit Response"
                          onClick={handleInquiryUpdate}
                          hoverbgcolor="hover:bg-green-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">
                      Select an inquiry to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}
    </div>
  );
};

export default RequestPending;
