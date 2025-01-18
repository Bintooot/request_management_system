import React from "react";

const UserList = ({ request, onClick }) => {
  return (
    <div>
      {request.map((userList, index) => {
        return (
          <div
            className="flex justify-between items-center border-b-2 cursor-pointer hover:bg-gray-100 rounded p-3"
            key={userList.id || index}
            onClick={() => onClick(userList)}
          >
            <div>
              <h1 className="font-semibold">{userList.username}</h1>
              <p className="text-gray-500">{userList.email}</p>
            </div>
            <div className="text-gray-500">
              {new Date(userList.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
