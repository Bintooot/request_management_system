import React, { useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import RequestCard from "../../components/Card/RequestCard";
const RequestRecords = () => {
  const requestData = [
    {
      id: 1,
      requestId: "REQ-2024-001",
      userName: "John Doe",
      reviewedBy: "Jane Doe",
      typeOfChicks: "Broiler",
      numberOfPerson: 5,
      quantityOfChicks: 100,
      requestDescription: "Requesting for broiler chicks for farm",
      requestedDate: "2023-10-01",
      reviewedDate: "2023-10-05",
      status: "Approved",
      fileAttached: "file1.pdf",
    },
    {
      id: 1,
      requestId: "123s#s",
      userName: "John Doe",
      reviewedBy: "Jane Doe",
      typeOfChicks: "Broiler",
      numberOfPerson: 5,
      quantityOfChicks: 100,
      requestDescription: "Requesting for broiler chicks for farm",
      requestedDate: "2023-10-01",
      reviewedDate: "2023-10-05",
      status: "Approved",
      fileAttached: "file1.pdf",
    },
    {
      id: 1,
      requestId: "asda2sd4",
      userName: "John Doe",
      reviewedBy: "Jane Doe",
      typeOfChicks: "Broiler",
      numberOfPerson: 5,
      quantityOfChicks: 100,
      requestDescription: "Requesting for broiler chicks for farm",
      requestedDate: "2023-10-01",
      reviewedDate: "2023-10-05",
      status: "Pending",
      fileAttached: "file1.pdf",
    },
    {
      id: 1,
      requestId: "asda2sd4",
      userName: "John Doe",
      reviewedBy: "Jane Doe",
      typeOfChicks: "Broiler",
      numberOfPerson: 5,
      quantityOfChicks: 100,
      requestDescription: "Requesting for broiler chicks for farm",
      requestedDate: "2023-10-01",
      reviewedDate: "2023-10-05",
      status: "Pending",
      fileAttached: "file1.pdf",
    },
    {
      id: 1,
      requestId: "asda2sd4ss",
      userName: "John Doe",
      reviewedBy: "Jane Doe",
      typeOfChicks: "Broiler",
      numberOfPerson: 5,
      quantityOfChicks: 100,
      requestDescription: "Requesting for broiler chicks for farm",
      requestedDate: "2023-10-01",
      reviewedDate: "2023-10-05",
      status: "Pending",
      fileAttached: "file1.pdf",
    },
  ];

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true); // Open modal on button click
  const handleClose = () => setOpenModal(false); // Close modal

  //View Specific Request
  const [selectedRequest, setSelectedReqest] = useState(null);

  const handleSelectedRequest = (items) => {
    setSelectedReqest(items);
  };

  return (
    <main className="flex jsustify-center flex-col ">
      <div className="flex flex-col items-center h-96 border-b-2 overflow-auto">
        {requestData?.length > 0 ? (
          requestData.map((item) => (
            <RequestCard key={`${item.id}-${item.requestId}`} items={item} />
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">No requests found</div>
        )}
      </div>
      <div className="my-4">
        <h1 className="text-2xl font-semibold">Request History</h1>
        <div className="flex  gap-2 justify-end ">
          <select className=" w-48 p-2 border shadow-sm">
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
            className="w-64 p-2 border shadow-sm"
          />
        </div>
        <div className="max-h-56 my-2 overflow-auto border-2">
          <div className="h-full">
            <table className="w-full text-center">
              <thead className="sticky top-0 bg-slate-200">
                <tr className="font-semibold ">
                  <th className="border-b p-2">ID</th>
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
                {requestData.map((items) => (
                  <tr key={items.id} className="text-xs">
                    <td className="border-b p-3">{items.id}</td>
                    <td className="border-b p-3">{items.requestId}</td>
                    <td className="border-b p-3">{items.userName}</td>
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
                        className="bg-green-900 text-sx text-white p-1 rounded"
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

      <div>
        {selectedRequest && (
          <CustomModal open={openModal} handleClose={handleClose}></CustomModal>
        )}
      </div>
    </main>
  );
};

export default RequestRecords;
