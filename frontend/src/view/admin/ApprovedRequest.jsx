import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { format } from "date-fns";
import RequestCard from "../../components/Card/RequestCard";
import Notification from "../../components/Notification/Notification";

const ApprovedRequest = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvedList, setApprovedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalApprovedRequest, setTotalApprovedRequest] = useState(0);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

  const fetchApprovedRequests = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("/api/admin/list-approved-request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.approvedlist);
      setApprovedList(response.data.approvedlist);
      setTotalQuantity(response.data.totalQuantity);
      setTotalApprovedRequest(response.data.totalApprovedRequest);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch approved requests.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const handleSubmit = async (request) => {
    try {
      if (!request) {
        showNotification("No request selected.", "error");
        return;
      }

      const response = await axios.put(
        `/api/admin/update-approved-request/${request._id}`,
        {
          currentstatus: request.status,
          updateStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      showNotification(
        `Request ID: ${request.generatedRequestNo} updated successfully.`,
        "success"
      );

      fetchApprovedRequests();
    } catch (error) {
      console.error("Error updating:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update request.";
      showNotification(errorMessage, "error");
    }
  };

  return (
    <div className="border-2 shadow-lg rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 bg-white  p-4 rounded-lg">
        <h1 className="font-bold text-lg md:text-xl uppercase text-center md:text-left text-gray-700">
          Approved Requests
        </h1>
        <div className="flex gap-5">
          <p className="text-gray-600 text-md md:text-lg  font-semibold">
            Total Request:{" "}
            <span className="text-blue-500 font-bold">
              {totalApprovedRequest}
            </span>
          </p>
          <p className="text-gray-600 text-md md:text-lg  font-semibold">
            Total Quantity:{" "}
            <span className="text-blue-500 font-bold">{totalQuantity}</span>
          </p>
        </div>
      </div>

      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}

      {/* Table */}
      <div className="overflow-x-auto h-96">
        {isLoading ? (
          <div className="text-center py-2">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <table className="w-full text-center bg-gray-100 border-collapse">
            <thead className="bg-white sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviewed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type of Chicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvedList.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-2 text-center text-gray-500">
                    No approved requests available.
                  </td>
                </tr>
              ) : (
                approvedList.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-200">
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.generatedRequestNo}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.requesterName}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.reviewedby}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.chicksType}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.quantity}
                    </td>

                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {item.deliveryDate &&
                      new Date(item.deliveryDate) !== "Invalid Date"
                        ? format(
                            new Date(item.deliveryDate),
                            "MMMM dd, yyyy hh:mm a"
                          )
                        : "Invalid Date"}
                    </td>

                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`p-1 rounded-lg text-xs md:text-sm ${
                          item.status === "Approved"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="block">
                      <div>
                        <Dropdown
                          statusdata={["Out for Delivery", "Completed"]}
                          onChange={(value) => setUpdateStatus(value)}
                        />
                      </div>
                      <div className="flex gap-2 py-2 justify-center">
                        <Button
                          name="Full Details"
                          onClick={() => {
                            handleOpen();
                            setSelectedRequest(item);
                          }}
                          hoverbgcolor="hover:bg-orange-400"
                        />
                        <Button
                          name="Submit"
                          onClick={() => handleSubmit(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <RequestCard
          handleClose={handleClose}
          open={openModal}
          items={selectedRequest}
        />
      )}
    </div>
  );
};
export default ApprovedRequest;
