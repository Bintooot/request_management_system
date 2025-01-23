import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import CustomModal from "../../components/Modal/CustomModal";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import { format } from "date-fns";

const ApprovedRequest = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvedList, setApprovedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchApprovedRequests = async () => {
      try {
        const response = await axios.get("/api/admin/list-aprroved-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApprovedList(response.data.approvedlist);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch approved requests.");
        setIsLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);

  return (
    <div className="border-2 shadow-lg rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="font-bold text-lg md:text-xl uppercase text-center md:text-left">
          Approved Requests
        </h1>
        <form className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Name or ID"
            className="border p-2 rounded text-sm w-full md:w-auto"
          />
          <Dropdown
            statusdata={["On-Processed", "Completed", "Approved"]}
            placeholder="Filter by Status"
          />
          <input
            type="date"
            className="border p-2 rounded text-sm w-full md:w-auto"
          />
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-96">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <table className="w-full text-center bg-gray-100 border-collapse">
            <thead className="bg-white sticky top-0">
              <tr>
                <th className="p-2 text-xs md:text-sm">Request ID</th>
                <th className="p-2 text-xs md:text-sm">User Name</th>
                <th className="p-2 text-xs md:text-sm">Type of Chicks</th>
                <th className="p-2 text-xs md:text-sm">Requested Date</th>
                <th className="p-2 text-xs md:text-sm">Approval Date</th>
                <th className="p-2 text-xs md:text-sm">Status</th>
                <th className="p-2 text-xs md:text-sm">File</th>
                <th className="p-2 text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-200">
                  <td className="p-2 text-xs md:text-sm">
                    {item.generatedRequestNo}
                  </td>
                  <td className="p-2 text-xs md:text-sm">
                    {item.requesterName}
                  </td>
                  <td className="p-2 text-xs md:text-sm">{item.chicksType}</td>
                  <td className="p-2 text-xs md:text-sm">
                    {item.createdAt &&
                    new Date(item.createdAt) !== "Invalid Date"
                      ? format(
                          new Date(item.createdAt),
                          "MMMM dd, yyyy hh:mm a"
                        )
                      : "Invalid Date"}
                  </td>
                  <td className="p-2 text-xs md:text-sm">
                    {item.updatedAt &&
                    new Date(item.updatedAt) !== "Invalid Date"
                      ? format(
                          new Date(item.updatedAt),
                          "MMMM dd, yyyy hh:mm a"
                        )
                      : "Invalid Date"}
                  </td>

                  <td className="p-2 text-xs md:text-sm">
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
                  <td className="p-2 text-xs md:text-sm">
                    {item.filename || "-"}
                  </td>
                  <td className="flex flex-col md:flex-row gap-2 py-2">
                    <Dropdown
                      placeholder="Update Status"
                      statusdata={["On-Processed", "Completed", "Cancel"]}
                    />
                    <Button
                      name="View File"
                      onClick={() => {
                        handleOpen();
                        setSelectedRequest(item);
                      }}
                      hoverbgcolor="hover:bg-orange-400"
                    />
                    <Button name="Submit" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <CustomModal open={openModal} handleClose={handleClose} />
      )}
    </div>
  );
};

export default ApprovedRequest;
