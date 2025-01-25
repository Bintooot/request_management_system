import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import CustomModal from "../../components/Modal/CustomModal";
import { format } from "date-fns";
import axios from "axios";

const History = () => {
  const [approvedList, setApprovedList] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // Declare error state

  // Open Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // View Specific Request
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/admin/all-request-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setApprovedList(response.data);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch all requests.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSelectedRequest = (items) => {
    setSelectedRequest(items);
  };

  return (
    <>
      <div className="p-5 border-2 shadow-lg h-full rounded-lg">
        <header className="font-semibold">
          <h1 className="text-xl">HISTORY</h1>
          <p className="text-gray-500 font-normal">
            List of all request records
          </p>
        </header>
        <div className="my-5">
          <form action="" method="get" className="flex justify-between">
            <Button name="PDF" hoverbgcolor="hover:bg-green-500" />
            <div className="flex items-center gap-2">
              <label htmlFor="Search" className="font-medium">
                Search:
              </label>
              <input
                type="text"
                id="Search"
                name="Search"
                placeholder="Search by Name or ID"
                className="border p-2 rounded shadow-lg"
              />
              <Dropdown
                statusdata={["Completed", "Cancelled"]}
                placeholder="Record Status"
              />
            </div>
          </form>
        </div>
        <main>
          <div className="overflow-y-scroll md:text-sm text-xs h-96">
            <table className="w-full text-center bg-gray-100 border-collapse">
              <thead className="bg-white">
                <tr>
                  <th>Request ID</th>
                  <th>Type</th>
                  <th>User Name</th>
                  <th>Reviewd By</th>
                  <th>Requested Date </th>
                  <th>Approval Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center text-red-500 py-4">
                      {error}
                    </td>
                  </tr>
                ) : approvedList.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-red-500">
                      No request history available.
                    </td>
                  </tr>
                ) : (
                  approvedList.map((items) => (
                    <tr key={items.id} className="hover:bg-slate-200">
                      <td>{items.generatedNo}</td>
                      <td>{items.type}</td>
                      <td>{items.requesterName}</td>
                      <td>{items.reviewedby}</td>
                      <td>
                        {items.createdAt &&
                        new Date(items.createdAt) !== "Invalid Date"
                          ? format(
                              new Date(items.createdAt),
                              "MMMM dd, yyyy hh:mm a"
                            )
                          : "Invalid Date"}
                      </td>
                      <td>
                        <span className="bg-green-500 p-1 text-white rounded-lg">
                          {items.status}
                        </span>
                      </td>
                      <td>1</td>
                      <td className="flex justify-evenly py-2">
                        <Button
                          name="Full Details"
                          onClick={() => {
                            handleOpen();
                            handleSelectedRequest(items); // Set selected request correctly
                          }}
                          hoverbgcolor="hover:bg-orange-400"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {selectedRequest && (
            <CustomModal
              open={openModal}
              handleClose={handleClose}
              request={selectedRequest}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default History;
