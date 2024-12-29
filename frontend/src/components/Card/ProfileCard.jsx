import * as React from "react";

const ProfileCard = ({ id, username, email }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl text-center font-semibold">PROFILE</h1>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-5">
        <h1>
          <strong>Admin ID:</strong> {id}
        </h1>
        <p>
          <strong>User Name:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
