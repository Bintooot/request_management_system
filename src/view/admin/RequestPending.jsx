import React, { useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import ListofRequest from "../../components/Card/ListofRequest";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";

const RequestPending = () => {
  const user_request = [
    {
      id: 1,
      username: "Ben Aniasco",
      reqDate: "08/18/03",
      typeOfChicks: "Manok",
      quantityOfChicks: 30,
      status: "Pending",
      fileAttached: "",
      note: "Hello Dear",
    },
    {
      id: 2,
      username: "Maria Lopez",
      reqDate: "09/12/03",
      typeOfChicks: "Ducks",
      quantityOfChicks: 15,
      status: "Pending",
      fileAttached: "",
      note: "Looking forward to the delivery.",
    },
    {
      id: 3,
      username: "John Smith",
      reqDate: "10/05/03",
      typeOfChicks: "Quail",
      quantityOfChicks: 50,
      status: "Pending",
      fileAttached: "",
      note: "Please expedite the process.",
    },
    {
      id: 4,
      username: "Sara Johnson",
      reqDate: "11/22/03",
      typeOfChicks: "Manok",
      quantityOfChicks: 20,
      status: "Pending",
      fileAttached: "",
      note: "Need more information.",
    },
    {
      id: 5,
      username: "David Brown",
      reqDate: "12/01/03",
      typeOfChicks: "Turkey",
      quantityOfChicks: 10,
      status: "Pending",
      fileAttached: "",
      note: "",
    },
    {
      id: 6,
      username: "Emily Davis",
      reqDate: "01/15/04",
      typeOfChicks: "Manok",
      quantityOfChicks: 25,
      status: "Pending",
      fileAttached: "",
      note: "",
    },
    {
      id: 7,
      username: "Michael Wilson",
      reqDate: "02/20/04",
      typeOfChicks: "Ducks",
      quantityOfChicks: 40,
      status: "Pending",
      fileAttached: "",
      note: "",
    },
    {
      id: 8,
      username: "Jessica Taylor",
      reqDate: "03/10/04",
      typeOfChicks: "Dino",
      quantityOfChicks: 0,
      status: "Pending",
      fileAttached: "",
      note: "",
    },
    {
      id: 9,
      username: "Mabyy",
      reqDate: "10/10/24",
      typeOfChicks: "Manok",
      quantityOfChicks: 15,
      status: "Pending",
      fileAttached: "",
      note: "Please confirm the order.",
    },
    {
      id: 10,
      username: "Linda Green",
      reqDate: "04/25/04",
      typeOfChicks: "Quail",
      quantityOfChicks: 35,
      status: "Pending",
      fileAttached: "",
      note: "",
    },
  ];

  // Initial status set to "Pending"
  const [updateStatus, setUpdateStatus] = useState("Pending");

  // Handle status change from Dropdown
  const statusHandler = (newStatus) => {
    setUpdateStatus(newStatus);
  };

  //view Request Details
  const [viewRequest, setViewRequest] = useState(" ");

  const handlerViewRequest = (request) => {
    setViewRequest(request);
    setUpdateStatus(request);
    console.log(request);
  };

  return (
    <>
      <Navbar />
      <div className="md:mt-16  md:mx-16 p-5 gap-5 md:flex md:text-[1rem] text-sm">
        <div className=" border-2 text-sm p-5 shadow-lg rounded-lg md:w-1/3 w-full">
          <h1>
            <strong>List of Pendings</strong>
          </h1>
          <div className="my-3">
            <ListofRequest
              onClick={handlerViewRequest}
              request={user_request}
            />
          </div>
        </div>
        <div className="md:flex-col flex-grow md:my-0 my-3 gap-2 ">
          <h1 className="font-semibold text-xl my-2 uppercase">
            Request Details
          </h1>
          {viewRequest && (
            <div className="border-2 shadow-lg rounded-lg p-5 h-[80vh]">
              <div className="h-[69vh] p-2 overflow-y-auto">
                <div className="flex justify-between  items-center gap-1  w-full  overflow-y-hidden">
                  <div className="flex flex-col gap-1">
                    <h1>
                      <strong>Name:</strong> {viewRequest.username}
                    </h1>
                    <h2>
                      <strong>ID: </strong> {viewRequest.id}
                    </h2>
                  </div>
                  <div>
                    <p>
                      <strong>Status: </strong>
                      <small
                        className={`rounded px-1 text-white ${
                          updateStatus === "Approved"
                            ? "bg-green-500"
                            : updateStatus === "Reject"
                            ? "bg-red-500"
                            : "bg-blue-400" // Default for "Pending"
                        }`}
                      >
                        {viewRequest.status}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2>
                    <strong>Type of Chicks: </strong>
                    {viewRequest.typeOfChicks}
                  </h2>
                  <h2>
                    <strong> Quantity: </strong>
                    {viewRequest.quantityOfChicks}
                  </h2>
                  <h2>
                    <strong> Date Requested: </strong>
                    {viewRequest.reqDate}
                  </h2>
                </div>

                <h1 className="my-3">
                  <strong>Uploaded Files:</strong>
                </h1>
                <div className="border">
                  <ul>
                    <li className="text-end">
                      <Button
                        name="Download"
                        hoverbgcolor="hover:bg-green-500"
                      />
                    </li>
                  </ul>
                </div>
                <div className="flex-grow my-3">
                  <h2>
                    <strong>Note:</strong>
                  </h2>
                  <textarea
                    name="body"
                    id="feedback"
                    className="w-full my-2 border-2 h-[20vh] resize-none overflow-y-auto p-2 text-sm"
                    value={viewRequest.note}
                  ></textarea>
                </div>
                <div className="py-2">
                  <hr className="border-black my-2" />
                  <h2>
                    <strong>Admin Feedback:</strong>
                  </h2>
                  <div className="flex-grow">
                    <textarea
                      name="body"
                      id="body"
                      className="w-full my-2 border-2 h-[20vh] resize-none overflow-y-auto p-2 text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end my-1 gap-2">
                <Dropdown
                  statusdata={["Approved", "Reject"]}
                  placeholder="Status"
                  onChange={statusHandler}
                />
                <Button name="Submit" hoverbgcolor="hover:bg-green-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestPending;
