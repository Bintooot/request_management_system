import React from "react";
import Button from "../Button";

const ListofRequest = ({ onClick, request }) => {
  return (
    <>
      <div className="h-[70vh] overflow-y-scroll p-2 ">
        {request.map((user_list, key) => (
          <div
            className="flex flex-wrap p-3 justify-between items-center border-b-2 border-gray-400 cursor-pointer hover:bg-gray-200"
            key={user_list.id}
          >
            <div className="flex items-center">
              <div>
                <h1 className="text-lg">
                  <strong>{user_list.username}</strong>
                </h1>
                <p>
                  <small>{user_list.reqDate}</small>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap  gap-5 items-center">
              <div className="text-center">
                <h4>
                  <strong>Status</strong>
                </h4>
                <p className="bg-blue-400 rounded">
                  <small className="p-2 text-white">Pending</small>
                </p>
              </div>

              <div>
                <Button
                  name="Details"
                  onClick={() => onClick(user_list)}
                  hoverbgcolor="hover:bg-orange-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListofRequest;
