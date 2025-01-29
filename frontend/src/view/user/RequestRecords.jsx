import React, { useEffect, useState } from "react";
import RequestCard from "../../components/Card/RequestCard";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import { format } from "date-fns";
import DataCard from "../../components/Card/DataCard";

const RequestRecords = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [latestRequest, setLatestRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchLatestData();
    fetchUserRequests();
  }, []);

  const fetchLatestData = async () => {
    if (!token) return console.error("No token found, please log in.");

    try {
      const response = await axios.get(`/api/user/current-request`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLatestRequest(response.data.data || null);
    } catch (error) {
      console.error("Error fetching latest request:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRequests = async () => {
    if (!token) return console.error("No token found, please log in.");

    try {
      const response = await axios.get(`/api/user/all-request`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserRequests(response.data.requestresponse || []);
    } catch (error) {
      console.error("Error fetching user requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = (records) => {
    return records.filter((record) => {
      const recordDate = record.createdAt
        ? new Date(record.createdAt).getTime()
        : null;
      const startTimestamp = startDate ? new Date(startDate).getTime() : null;
      const endTimestamp = endDate ? new Date(endDate).getTime() : null;

      const matchesSearch =
        searchTerm === "" ||
        record.requesterName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.generatedRequestNo
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.reviewedby?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "" || record.status === filterStatus;

      const matchesDate =
        (!startTimestamp || (recordDate && recordDate >= startTimestamp)) &&
        (!endTimestamp || (recordDate && recordDate <= endTimestamp));

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const cancelRequest = async (requestId) => {
    try {
      await axios.put(
        `/api/user/cancel-request/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLatestRequest(null);
      fetchLatestData();
      fetchUserRequests();
      showNotification("Request successfully canceled!", "success");
    } catch (error) {
      showNotification("Request failed to cancel!", "error");
      console.error("Error canceling request:", error);
    }
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 5000);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex justify-center flex-col p-4 sm:p-8">
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}

      {latestRequest ? (
        <DataCard data={latestRequest} onClick={cancelRequest} />
      ) : (
        <p className="text-center">No data available.</p>
      )}

      <div className="my-4">
        <h1 className="text-3xl font-semibold mb-6">Request Records</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4 my-2">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-sm font-medium">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className="w-full sm:w-48 p-2 border shadow-sm"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              aria-label="Start Date"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-sm font-medium">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              className="w-full sm:w-48 p-2 border shadow-sm"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              aria-label="End Date"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="filterStatus" className="text-sm font-medium">
              Status Filter
            </label>
            <select
              id="filterStatus"
              className="w-full sm:w-48 p-2 border shadow-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="searchTerm" className="text-sm font-medium">
              Search
            </label>
            <input
              id="searchTerm"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name or ID"
              className="w-full sm:w-64 p-2 border shadow-sm"
              aria-label="Search Requests"
            />
          </div>
        </div>

        {/* History Table */}
        <div className="max-h-80 my-2 overflow-auto border-2 rounded-md">
          <table className="w-full text-center">
            <thead className="bg-slate-200">
              <tr className="font-semibold text-xs sm:text-sm">
                <th className="border-b p-2">Request ID</th>
                <th className="border-b p-2">User</th>
                <th className="border-b p-2">Reviewed By</th>
                <th className="border-b p-2">Type</th>
                <th className="border-b p-2">Persons</th>
                <th className="border-b p-2">Qty</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Request Date</th>
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
                filterRecords(userRequests).map((items) => (
                  <tr key={items._id} className="text-xs sm:text-sm">
                    <td className="border-b p-3">{items.generatedRequestNo}</td>
                    <td className="border-b p-3">{items.requesterName}</td>
                    <td className="border-b p-3">{items.reviewedby}</td>
                    <td className="border-b p-3">{items.chicksType}</td>
                    <td className="border-b p-3">{items.numberofrequester}</td>
                    <td className="border-b p-3">{items.quantity}</td>
                    <td className="border-b p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          items.status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : items.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : items.status === "Out for Delivery"
                            ? "bg-orange-100 text-orange-800"
                            : items.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {items.status}
                      </span>
                    </td>
                    <td className="border-b p-3">
                      {format(
                        new Date(items.createdAt),
                        "MMMM dd, yyyy hh:mm a"
                      )}
                    </td>
                    <td className="border-b p-3">
                      <button
                        onClick={() => {
                          setSelectedRequest(items);
                          setOpenModal(true);
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

      {selectedRequest && (
        <RequestCard
          handleClose={() => setOpenModal(false)}
          open={openModal}
          items={selectedRequest}
        />
      )}
    </main>
  );
};

export default RequestRecords;
