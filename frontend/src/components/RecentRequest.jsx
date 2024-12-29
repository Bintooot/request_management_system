import React from "react";
import userphoto from "../assets/userphoto.jpg";

const RecentRequest = () => {
  return (
    <>
      <div className="absulote h-[200px] overflow-y-scroll ">
        {user_request.map((user_list) => (
          <div className="flex p-3 gap-2 justify-between items-center border-b-2">
            <div>
              <h1>
                <strong>{user_list.name}</strong>
              </h1>
              <p>
                <small>No. of Chiks: {user_list.number_of_chicks}</small>
              </p>
            </div>
            <div className="text-center">
              <h4>
                <strong>Status</strong>
              </h4>
              <p className="bg-orange-500 rounded">
                <small className="p-2 text-white">Pending</small>
              </p>
            </div>
            <div>
              <p>{user_list.req_date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const user_request = [
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
  {
    id: 1,
    photo: { userphoto },
    name: "Ben Aniasco",
    number_of_chicks: 30,
    req_date: "08/18/03",
  },
];
export default RecentRequest;
