import React, { useState } from "react";
import Button from "../../components/Button";
import CustomModal from "../../components/Modal/CustomModal";
import Dropdown from "../../components/Dropdown";

const ApprovedRequest = () => {
  const approved_list = [
    {
      id: 1,
      name: "Ben",
      requestType: "Chicks",
      date_submited: "12/11/23",
      date_approved: "12/08/24",
      status: "Approved",
    },

    {
      id: 1,
      name: "Ben",
      requestType: "Chicks",
      date_submited: "12/11/23",
      date_approved: "12/08/24",
      status: "Approved",
    },
    {
      id: 2,
      name: "Alice",
      requestType: "Ducklings",
      date_submited: "12/10/23",
      date_approved: "12/09/24",
      status: "Approved",
    },
    {
      id: 3,
      name: "Charlie",
      requestType: "Puppies",
      date_submited: "12/09/23",
      date_approved: "12/07/24",
      status: "Approved",
    },
    {
      id: 4,
      name: "Diana",
      requestType: "Kittens",
      date_submited: "12/08/23",
      date_approved: "12/06/24",
      status: "Approved",
    },
    {
      id: 5,
      name: "Ethan",
      requestType: "Goats",
      date_submited: "12/07/23",
      date_approved: "12/05/24",
      status: "Approved",
    },
    {
      id: 6,
      name: "Fiona",
      requestType: "Rabbits",
      date_submited: "12/06/23",
      date_approved: "12/04/24",
      status: "Approved",
    },
    {
      id: 7,
      name: "George",
      requestType: "Lambs",
      date_submited: "12/05/23",
      date_approved: "12/03/24",
      status: "Approved",
    },
    {
      id: 8,
      name: "Hannah",
      requestType: "Chicks",
      date_submited: "12/04/23",
      date_approved: "12/08/25",
      status: "Pending",
    },
    {
      id: 9,
      name: "Ian",
      requestType: "Turkeys",
      date_submited: "12/03/23",
      date_approved: "12/01/24",
      status: "Approved",
    },
    {
      id: 10,
      name: "Julia",
      requestType: "Cows",
      date_submited: "12/02/23",
      date_approved: "11/30/24",
      status: "Approved",
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
    <>
      <div className="border-2 grow shadow-lg rounded-lg p-5">
        <div className="flex justify-between my-2">
          <h1 className="font-semibold text-xl my-2 uppercase">
            Approved Request
          </h1>
          <div className="flex space-x-4">
            <form action="" className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Name or ID"
                className="border p-2 rounded shadow-lg"
              />

              <Dropdown
                statusdata={["On-Processed", "Completed", "Approved"]}
                placeholder="Filter by Status"
              />

              <input type="date" className="border p-2 rounded shadow-lg" />
            </form>
          </div>
        </div>
        <div className="overflow-y-scroll md:text-sm text-xs h-96">
          <table className="w-full text-center bg-gray-100 border-collapse">
            <thead className="bg-white">
              <tr>
                <th>Request ID</th>
                <th>User Name</th>
                <th>Type of Chicks</th>
                <th>Requested Date </th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>File Attached</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approved_list.map((items) => {
                return (
                  <tr key={items.id} className="hover:bg-slate-200">
                    <td>{items.id}</td>
                    <td>{items.name}</td>
                    <td>{items.requestType}</td>
                    <td>{items.date_submited}</td>
                    <td>{items.date_approved}</td>
                    <td>
                      <span className="bg-green-500 p-1 text-white rounded-lg">
                        {items.status}
                      </span>
                    </td>
                    <td>1</td>
                    <td className="flex justify-evenly py-2">
                      <Dropdown
                        placeholder="Update Status"
                        statusdata={["On-Processed", "Completed", "Cancel"]}
                      />
                      <Button
                        name="View File"
                        onClick={() => {
                          handleOpen(), handleSelectedRequest(items);
                          s;
                        }}
                        hoverbgcolor="hover:bg-orange-400"
                      />

                      <Button name="Submit" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          {selectedRequest && (
            <CustomModal
              open={openModal}
              handleClose={handleClose}
            ></CustomModal>
          )}
        </div>
      </div>
    </>
  );
};

export default ApprovedRequest;
