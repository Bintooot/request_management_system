import React from "react";
import Button from "../Button";

const ChangeUsername = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Change Username</h1>
      </div>
      <hr />
      <div className="my-5">
        <form action="" method="put">
          <label htmlFor="username" className="font-semibold text-md">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 p-2 rounded-lg grow w-full my-2"
          />
          <div className="text-center">
            <Button name="Update Username" hoverbgcolor="hover:bg-green-500" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUsername;
