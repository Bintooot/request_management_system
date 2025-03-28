import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import InquiryCard from "../../components/Card/InquiryCard";
import { format } from "date-fns";
import axios from "axios";
import { Tab } from "@headlessui/react";
import RequestCard from "../../components/Card/RequestCard";

const History = () => {
  const [approvedList, setApprovedList] = useState({
    request: [],
    inquiry: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal state for Request
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  // Modal state for Inquiry
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const handleOpenInquiry = () => setOpenInquiryModal(true);
  const handleCloseInquiry = () => setOpenInquiryModal(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

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

  const handleSelectedInquiry = (items) => {
    console.log("Inquiry");
    setSelectedInquiry(items);
  };

  const filterRecords = (records) => {
    return records.filter((record) => {
      const matchesSearch =
        searchTerm === "" ||
        record.requesterName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.generatedRequestNo
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.inquiryId?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || record.status === filterStatus;
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
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded-lg "
        >
          <optgroup label="Requests">
            <option value="All">All Request</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </optgroup>
          <optgroup label="Inquiries">
            <option value="All">All Inquiries</option>
            <option value="Viewed">Viewed</option>
            <option value="Resolved">Resolved</option>
          </optgroup>
        </select>
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
                          name="View Request"
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
                            item.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Viewed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          name="View Inquiry"
                          onClick={() => {
                            handleOpenInquiry();
                            handleSelectedInquiry(item);
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
        <RequestCard
          handleClose={handleClose}
          open={openModal}
          items={selectedRequest}
        />
      )}

      {selectedInquiry && (
        <InquiryCard
          handleClose={handleCloseInquiry}
          open={openInquiryModal}
          inquiry={selectedInquiry}
        />
      )}
    </div>
  );
};

export default History;
