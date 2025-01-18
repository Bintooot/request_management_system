import * as React from "react";

const ProfileCard = ({
  namelabel,
  _id,
  id,
  username,
  email,
  address,
  contactnumber,
  position,
  role,
  createdAt,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      {/* Profile Title */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
      </div>

      <hr className="border-gray-300 mb-4" />

      {/* Profile Details */}
      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">{namelabel}</span>
          <span className="font-medium text-gray-800">{id}</span>
        </div>

        <div>
          <span className="font-semibold">User Name:</span>
          <p className="text-gray-800 uppercase">{username}</p>
        </div>

        <div>
          <span className="font-semibold">Email:</span>
          <p className="text-gray-800 ">{email}</p>
        </div>

        <div>
          <span className="font-semibold">Address:</span>
          <p className="text-gray-800 uppercase">{address}</p>
        </div>

        <div>
          <span className="font-semibold">Contact No:</span>
          <p className="text-gray-800">{contactnumber}</p>
        </div>

        <div>
          <span className="font-semibold">Position:</span>
          <p className="text-gray-800 uppercase">{position}</p>
        </div>

        <div>
          <span className="font-semibold">Account Created:</span>
          <p className="text-gray-800">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
