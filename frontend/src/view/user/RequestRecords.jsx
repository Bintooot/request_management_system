import React, { useEffect, useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import RequestCard from "../../components/Card/RequestCard";
import axios from "axios";
import Notification from "../../components/Notification/Notification";

const RequestRecords = () => {
  const [userRequests, setUserRequests] = useState([]);
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

      console.log(token);

      if (!token) {
        // Redirect to login page or show an error
        console.error("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get("/api/getuser-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRequests(response.data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRequests();
  }, []); // Empty array ensures this only runs on component mount

  // deleting item
  const deleteRequest = async (requestId) => {
    try {
      console.log(requestId);
      await axios.delete(`/api/cancel-request/${requestId}`, {
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

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex justify-center flex-col p-4 sm:p-8">
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}
      <div className="flex flex-col items-center h-96 border-b-2 overflow-auto">
        {loading ? (
          <div className="text-center p-4">Loading requests...</div>
        ) : userRequests?.length > 0 ? (
          userRequests.map((item) => (
            <RequestCard key={item._id} items={item} onClick={deleteRequest} />
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">No requests found</div>
        )}
      </div>

      <div className="my-4">
        <h1 className="text-xl font-semibold sm:text-2xl">Request History</h1>
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
        <div className="max-h-56 my-2 overflow-auto border-2 rounded-md">
          <div className="h-full">
            <table className="w-full text-center">
              <thead className="sticky top-0 bg-slate-200">
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
                    <td className="border-b p-3">{items.reviewedBy}</td>
                    <td className="border-b p-3">{items.typeOfChicks}</td>
                    <td className="border-b p-3">{items.numberOfPerson}</td>
                    <td className="border-b p-3">{items.quantityOfChicks}</td>
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
                    <td className="border-b p-3">{items.requestedDate}</td>
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
      </div>

      {/* Modal Section */}
      <div>
        {selectedRequest && (
          <CustomModal open={openModal} handleClose={handleClose}></CustomModal>
        )}
      </div>
    </main>
  );
};

export default RequestRecords;
