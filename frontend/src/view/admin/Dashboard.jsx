import React, { useEffect, useState, useCallback } from "react";
import MyChart from "../../components/Chart/MyChart";
import CardMenu from "../../components/Card/CardMenu";
import RequestChart from "../../components/Chart/RequestChart";
import NumberCard from "../../components/Card/NumberCard";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions, MdCancelPresentation } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPendingInquiry: 0,
    totalPendingRequest: 0,
    totalResolvedRequest: 0,
    totalResolvedInquiries: 0,
    totalRequestData: [],
    totalChicksData: [],
  });

  const [filteredData, setFilteredData] = useState([]);
  const [selectedInquiriesYear, setSelectedInquiriesYear] = useState(
    new Date().getFullYear()
  );
  const [selectedRequestYear, setSelectedRequestYear] = useState(
    new Date().getFullYear()
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(0);
  const [quantityData, setQuantityData] = useState(0);

  const token = localStorage.getItem("authToken");

  const fetchDashboardData = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [
        pendingInquiryRes,
        pendingRequestRes,
        resolvedRequestRes,
        resolvedInquiriesRes,
        requestDataRes,
        chicksDataRes,
      ] = await Promise.all([
        axios.get("/api/admin/total-pending-inquiry", { headers }),
        axios.get("/api/admin/total-pending-request", { headers }),
        axios.get("/api/admin/resolved-requests", { headers }),
        axios.get("/api/admin/resolved-inquiries", { headers }),
        axios.get(
          `/api/admin/yearly-request-count?year=${selectedRequestYear}`,
          { headers }
        ),
        axios.get(
          `/api/admin/yearly-chicks-data?year=${selectedInquiriesYear}`,
          { headers }
        ),
      ]);

      setDashboardData({
        totalPendingInquiry: pendingInquiryRes.data.response || 0,
        totalPendingRequest: pendingRequestRes.data.response || 0,
        totalResolvedRequest: resolvedRequestRes.data.response || 0,
        totalResolvedInquiries: resolvedInquiriesRes.data.response || 0,
        totalRequestData: requestDataRes.data || [],
        totalChicksData: chicksDataRes.data || [],
      });
      setFilteredData(requestDataRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [selectedInquiriesYear, selectedRequestYear, token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (startDate && endDate) {
      (async () => {
        try {
          const response = await axios.get(
            `/api/admin/request-range-data?startdate=${startDate}&enddate=${endDate}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const totalQuantityResponse = await axios.get(
            `/api/admin/chicks-quantity-range-data?startdate=${startDate}&enddate=${endDate}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setQuantityData(totalQuantityResponse.data.totalQuantity || 0);
          setData(response.data.totalDataCount || 0);
        } catch (error) {
          console.error("Error fetching date-based data:", error);
        }
      })();
    }
  }, [startDate, endDate]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <CardMenu
          title="Resolved Requests"
          number={dashboardData.totalResolvedRequest}
          icon={<MdCancelPresentation />}
        />
        <CardMenu
          title="Resolved Inquiries"
          number={dashboardData.totalResolvedInquiries}
          icon={<AiOutlineFileDone />}
        />
      </div>

      <NumberCard
        title="Total Requests & Delivered Chicks"
        header="Chicks Summary"
        quantity={quantityData}
        count={data}
        startDate={setStartDate}
        endDate={setEndDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Yearly Request Summary
            </h2>
            <select
              value={selectedRequestYear}
              onChange={(e) => setSelectedRequestYear(e.target.value)}
              className="border-2 p-2 rounded-lg"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {filteredData.length ? (
            <RequestChart data={filteredData} />
          ) : (
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>

        <div className="bg-white border shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Yearly Delivered Chicks
            </h2>
            <select
              value={selectedInquiriesYear}
              onChange={(e) => setSelectedInquiriesYear(e.target.value)}
              className="border-2 p-2 rounded-lg"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {dashboardData.totalChicksData.length ? (
            <MyChart data={dashboardData.totalChicksData} />
          ) : (
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
