import React, { useEffect, useState } from "react";
import MyChart from "../../components/Chart/MyChart";
import CardMenu from "../../components/Card/CardMenu";
import RequestChart from "../../components/Chart/RequestChart";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions, MdCancelPresentation } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [totalPendingInquiry, setTotalPendingInquiry] = useState(0);
  const [totalPendingRequest, setTotalPendingRequest] = useState(0);
  const [totalResolvedRequest, setTotalResolvedRequest] = useState(0);
  const [totalResolvedIqnuiries, setTotalResolvedIqnuiries] = useState(0);
  const [totalRequestData, setTotalRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalChicksData, setTotalChicksData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const token = localStorage.getItem("authToken");

  // Fetch total pending inquiries
  const fetchTotalPendingInquiry = async () => {
    try {
      const response = await axios.get("/api/admin/total-pending-inquiry", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalPendingInquiry(response.data.response);
    } catch (error) {
      console.error("Error fetching pending inquiries data:", error);
    }
  };

  // Fetch total pending requests
  const fetchTotalPendingRequest = async () => {
    try {
      const response = await axios.get("/api/admin/total-pending-request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalPendingRequest(response.data.response);
    } catch (error) {
      console.error("Error fetching pending request data:", error);
    }
  };

  // Fetch total resolved requests
  const fetchTotalResolvedRequest = async () => {
    try {
      const response = await axios.get("/api/admin/resolved-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalResolvedRequest(response.data.response);
    } catch (error) {
      console.error("Error fetching resolved requests data:", error);
    }
  };

  // Fetch total resolved inquiries
  const fetchTotalResolvedInquiries = async () => {
    try {
      const response = await axios.get("/api/admin/resolved-inquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalResolvedIqnuiries(response.data.response);
    } catch (error) {
      console.error("Error fetching resolved inquiries data:", error);
    }
  };

  // Fetch request data for the selected year
  const fetchTotalRequestData = async (year) => {
    try {
      const response = await axios.get(
        `/api/admin/monthly-request-count?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalRequestData(response.data);
      setFilteredData(response.data); // Set filtered data for Request chart
    } catch (error) {
      console.error("Error fetching received request data:", error);
    }
  };

  // Fetch chicks data for the selected year
  const fetchChicksData = async (year) => {
    try {
      const response = await axios.get(
        `/api/admin/monthly-chicks-data?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalChicksData(response.data); // Set chicks data for Chicks chart
    } catch (error) {
      console.error("Error fetching chicks data:", error);
    }
  };

  // Fetch all required data on initial load
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    fetchTotalRequestData(currentYear);
    fetchChicksData(currentYear);
    fetchTotalResolvedInquiries();
    fetchTotalResolvedRequest();
    fetchTotalPendingRequest();
    fetchTotalPendingInquiry();
  }, []);

  // Handle year change for Request Summary (only affects Request chart)
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    fetchTotalRequestData(year); // Fetch data only for the Request chart
  };

  // Handle year change for Delivered Chicks Summary (only affects Chicks chart)
  const handleSelectYear = (e) => {
    const year = e.target.value;
    setSelectYear(year);
    fetchChicksData(year); // Fetch data only for the Chicks chart
  };

  // Create a list of the last 10 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="p-4 space-y-8">
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardMenu
          title="Inquiry Awaiting Viewed"
          number={totalPendingInquiry}
          icon={<RiUserReceived2Fill />}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4"
        />
        <CardMenu
          title="Requests Awaiting Approval"
          number={totalPendingRequest}
          icon={<MdOutlinePendingActions />}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-4"
        />
        <CardMenu
          title="Total Resolved Requests"
          number={totalResolvedRequest}
          icon={<MdCancelPresentation />}
          className="bg-red-100 hover:bg-red-200 text-red-800 p-4"
        />
        <CardMenu
          title="Total Resolved Inquiries"
          number={totalResolvedIqnuiries}
          icon={<AiOutlineFileDone />}
          className="bg-green-100 hover:bg-green-200 text-green-800 p-4"
        />
      </div>

      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Request Summary */}
        <div className="flex-1 bg-white border shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Yearly Request Summary
            </h2>
            <div className="w-36">
              <select
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange} // Different handler for this dropdown
                className="border-2 p-2 rounded-lg mb-4 w-full"
              >
                <option value="" disabled>
                  Select a Year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full h-[300px]">
            {filteredData.length === 0 ? (
              <p className="text-center text-gray-500">
                No data available for the selected year.
              </p>
            ) : (
              <RequestChart data={filteredData} />
            )}
          </div>
        </div>

        {/* Delivered Summary */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Delivered Chicks Summary
            </h2>
            <div className="w-36">
              <select
                id="year-select"
                value={selectYear}
                onChange={handleSelectYear} // Different handler for this dropdown
                className="border-2 p-2 rounded-lg mb-4 w-full"
              >
                <option value="" disabled>
                  Select a Year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            {totalChicksData.length === 0 ? (
              <p className="text-center text-gray-500">
                No data available for the selected year.
              </p>
            ) : (
              <MyChart data={totalChicksData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
