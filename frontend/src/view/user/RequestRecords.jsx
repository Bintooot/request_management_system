import React, { useEffect, useState } from "react";
import RequestCard from "../../components/Card/RequestCard";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import { format } from "date-fns";
import DataCard from "../../components/Card/DataCard";

const RequestRecords = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [userInquiry, setUserInquiry] = useState([]);
  const [latesRequest, setLatestRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  // Open Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // View Specific Request
  const [selectedRequest, setSelectedReqest] = useState(null);

  const handleSelectedRequest = (items) => {
    setSelectedReqest(items);
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUserRequests = async () => {
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get(`/api/user/all-request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRequests(response.data.requestresponse || []);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInquiry = async () => {
      try {
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const inquiryresponse = await axios.get(
          `/api/user/all-pending-inquiry`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserInquiry(inquiryresponse.data.inquiryresponse);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestData = async () => {
      try {
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get(`/api/user/current-request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setLatestRequest(response.data);
      } catch (error) {
        console.error("Error fetching user requests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestData();
    fetchUserInquiry();
    fetchUserRequests();
  }, []);

  const cancelRequest = async (requestId) => {
    try {
      await axios.put(
        `/api/user/cancel-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      showNotification("Request successfully canceled!", "success");
    } catch (error) {
      showNotification("Request failed to cancel!", "failed");
      console.error("Error canceling request:", error);
    }
  };
  const deleteInquiry = async (requestId) => {
    try {
      await axios.delete(`/api/user/remove-inquiry/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setUserInquiry((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      showNotification("Inquiry successfully removed!", "success");
    } catch (error) {
      showNotification("Inquiry failed to be removed!", "failed");
      console.error("Error deleting inquiry:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex justify-center flex-col p-4 sm:p-8">
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}

      {latesRequest.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <DataCard data={latesRequest} onClick={cancelRequest} />
      )}

      <div className="my-4">
        <h1 className="text-3xl font-semibold mb-6">Request Records</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4 my-2">
          <select className="w-full sm:w-48 p-2 border shadow-sm">
            <option value="" disabled selected>
              Filter Status
            </option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name or ID"
            className="w-full sm:w-64 p-2 border shadow-sm"
          />
        </div>

        {/* History Table */}
        <div className="max-h-80  my-2 overflow-auto border-2 rounded-md">
          <div className="h-full">
            <table className="w-full text-center">
              <thead className=" bg-slate-200">
                <tr className="font-semibold text-xs sm:text-sm">
                  <th className="border-b p-2">Request ID</th>
                  <th className="border-b p-2">User</th>
                  <th className="border-b p-2">Reviewed By</th>
                  <th className="border-b p-2">Type</th>
                  <th className="border-b p-2">Persons</th>
                  <th className="border-b p-2">Qty</th>
                  <th className="border-b p-2">Status</th>
                  <th className="border-b p-2">Date</th>
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-3 text-center">
                      No requests available.
                    </td>
                  </tr>
                ) : (
                  userRequests.map((items) => (
                    <tr key={items._id} className="text-xs sm:text-sm">
                      <td className="border-b p-3">
                        {items.generatedRequestNo}
                      </td>
                      <td className="border-b p-3">{items.requesterName}</td>
                      <td className="border-b p-3 ">{items.reviewedby}</td>
                      <td className="border-b p-3">{items.chicksType}</td>
                      <td className="border-b p-3">
                        {items.numberofrequester}
                      </td>
                      <td className="border-b p-3">{items.quantity}</td>
                      <td className="border-b p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            items.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : items.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {items.status}
                        </span>
                      </td>
                      <td className="border-b p-3">
                        {format(new Date(items.createdAt), "MMMM dd, yyyy")}
                      </td>
                      <td className="border-b p-3">
                        <button
                          onClick={() => {
                            handleSelectedRequest(items);
                            handleOpen();
                          }}
                          className="bg-green-900 text-xs text-white p-1 rounded hover:bg-green-700"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-semibold mb-6">Previous Inquiries</h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4 my-2">
            <select className="w-full sm:w-48 p-2 border shadow-sm">
              <option value="" disabled selected>
                Filter Status
              </option>
              <option value="Approved">Viewed</option>
              <option value="Pending">Pending</option>
            </select>
            <input
              type="text"
              placeholder="Search by Name or ID"
              className="w-full sm:w-64 p-2 border shadow-sm"
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {userInquiry.length === 0 ? (
              <p>No inquiries available.</p>
            ) : (
              userInquiry.map((items) => (
                <div className="border rounded-md p-4" key={items._id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {items.subject || "No Subject"}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {items.message || "No inquiry message available."}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        items.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : items.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {items.status || "Unknown"}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    Submitted on:{" "}
                    {items.createdAt
                      ? format(new Date(items.createdAt), "MMMM dd, yyyy")
                      : "Unknown date"}
                  </div>

                  {/* Admin Reply Section */}
                  {items.adminReply ? (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700">Admin Reply</h4>
                      <div className="border-l-4 pl-4 mt-2 text-sm text-gray-700">
                        {items.adminReply || "No reply yet."}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-gray-600">
                      No reply yet from the admin.
                    </div>
                  )}

                  <div className="mt-2 text-sm text-end">
                    <button
                      type="button"
                      onClick={() => deleteInquiry(items._id)}
                      className="bg-red-600 text-sm text-white px-2 py-1 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div>
        {selectedRequest && (
          <RequestCard
            handleClose={handleClose}
            open={openModal}
            items={selectedRequest}
          />
        )}
      </div>
    </main>
  );
};

export default RequestRecords;
