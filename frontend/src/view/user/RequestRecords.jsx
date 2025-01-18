import React, { useEffect, useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import RequestCard from "../../components/Card/RequestCard";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";

const RequestRecords = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [userInquiry, setUserInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true); // Open modal on button click
  const handleClose = () => setOpenModal(false); // Close modal

  //View Specific Request
  const [selectedRequest, setSelectedReqest] = useState(null);

  console.log(selectedRequest);

  const handleSelectedRequest = (items) => {
    setSelectedReqest(items);
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message); // Set the notification message
    setStatusType(type); // Set the notification type ("success" or "error")
    setNotificationVisible(true); // Make the notification visible

    setTimeout(() => {
      setNotificationVisible(false); // Hide the notification after 5 seconds
    }, 5000);
  };

  useEffect(() => {
    const fetchUserRequests = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get(`/api/user/all-pending-request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.requestresponse);
        setUserRequests(response.data.requestresponse || []); // Fallback to an empty array
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInquiry = async () => {
      try {
        const token = localStorage.getItem("authToken");

        console.log(token);

        if (!token) {
          // Redirect to login page or show an error
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
        console.log(inquiryresponse);
        setUserInquiry(inquiryresponse.data.inquiryresponse);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInquiry();
    fetchUserRequests();
  }, []);

  const deleteRequest = async (requestId) => {
    try {
      console.log(requestId);
      await axios.delete(`/api/user/cancel-request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setUserRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      showNotification("Request successfully cancel!", "success");
    } catch (error) {
      showNotification("Request failed to cancel!", "failed");
      console.error("Error deleting request:", error);
    }
  };

  const deleteInquiry = async (requestId) => {
    try {
      console.log(requestId);
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
      showNotification("Inquiry failed to removed!", "failed");
      console.error("Error deleting request:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex justify-center flex-col p-4 sm:p-8">
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
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
                {userRequests.map((items) => (
                  <tr key={items._id} className="text-xs sm:text-sm">
                    <td className="border-b p-3">{items.generatedRequestNo}</td>
                    <td className="border-b p-3">{items.requesterName}</td>
                    <td className="border-b p-3 ">{items.reviewedby}</td>
                    <td className="border-b p-3">{items.chicksType}</td>
                    <td className="border-b p-3">{items.numberofrequester}</td>
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
                ))}
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
            {userInquiry.map((items) => (
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
            ))}
          </div>
        </div>
      </div>

      <div>
        {selectedRequest && (
          <RequestCard
            handleClose={handleClose}
            open={openModal}
            items={selectedRequest}
            onClick={deleteRequest}
          />
        )}
      </div>
    </main>
  );
};

export default RequestRecords;
