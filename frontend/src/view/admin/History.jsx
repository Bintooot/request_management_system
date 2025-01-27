import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import CustomModal from "../../components/Modal/CustomModal";
import { format } from "date-fns";
import axios from "axios";
import { Tab } from "@headlessui/react";

const History = () => {
  const [approvedList, setApprovedList] = useState({
    request: [],
    inquiry: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch data function remains the same
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/history-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const { request, inquiry } = response.data;
      setApprovedList({ request, inquiry });
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
      setError("Failed to fetch all requests.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSelectedRequest = (item) => {
    setSelectedRequest(item);
  };

  const filterRecords = (records) => {
    return records.filter((record) => {
      const matchesSearch =
        searchTerm === "" ||
        record.requesterName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.generatedNo?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "" || record.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="p-5 border-2 shadow-lg h-full rounded-lg">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">History Records</h1>
        <p className="text-gray-600">
          View all completed and cancelled records
        </p>
      </header>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Name or ID"
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dropdown
          statusdata={["Completed", "Cancelled"]}
          placeholder="Filter Status"
          onChange={(value) => setFilterStatus(value)}
          className="w-full md:w-48"
        />
      </div>

      {/* Tabs Section */}
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1 mb-4">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-green-600"
              }`
            }
          >
            Requests
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-green-600"
              }`
            }
          >
            Inquiries
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Requests Panel */}
          <Tab.Panel>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviewed By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filterRecords(approvedList.request).map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.generatedRequestNo || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.requesterName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.reviewedby}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {format(new Date(item.createdAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium
                          ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          name="View Details"
                          onClick={() => {
                            handleOpen();
                            handleSelectedRequest(item);
                          }}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          {/* Inquiries Panel */}
          <Tab.Panel>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inquiry ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filterRecords(approvedList.inquiry).map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.inquiryId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {format(new Date(item.createdAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium
                          ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          name="View Details"
                          onClick={() => {
                            handleOpen();
                            handleSelectedRequest(item);
                          }}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {selectedRequest && (
        <CustomModal
          open={openModal}
          handleClose={handleClose}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default History;
