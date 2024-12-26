import React from "react";

const UserList = ({ request, onClick }) => {
  return (
    <div>
      {request.map((user_list, key) => {
        return (
          <div
            className="flex justify-between items-center border-b-2 cursor-pointer hover:bg-gray-100 rounded p-3"
            key={user_list.id}
            onClick={() => onClick(user_list)}
          >
            <div>
              <h1 className="font-semibold">{user_list.username}</h1>
              <p className="text-gray-500">{user_list.email}</p>
            </div>
            <div className="text-gray-500">{user_list.date_created}</div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
