import React from "react";

const Profile = () => {
  return (
    <main className="w-full flex justify-center">
      <div className="md:w-2/3 space-y-4">
        <div className="p-5 shadow-lg border-2 text-center w-full">
          <p>141572</p>
          <h1 className="font-semibold text-3xl">BEN RAYMOND ANIASCO</h1>
          <p>PVO Head</p>
          <br />
          <hr />
          <br />
          <div className="text-start space-y-5">
            <p>Email Address: benaniasco@gmail.com</p>
            <p>Phone Number: 192319237182</p>
            <p>Address: lisodpangitaon</p>
          </div>
        </div>
        <div className="p-5 shadow-lg border-2 w-full">
          <h1 className="font-semibold p-2">Settings</h1>
          <hr />
          <br />
          <div className="text-start space-y-5">
            <form action="#" method="PUT">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border-2"
                placeholder=""
                required
              />
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="w-full p-2 border-2"
                placeholder=""
                required
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="w-full p-2 border-2"
                placeholder=""
                required
              />
              <button className="p-2 bg-green-900 hover:bg-green-700 text-white w-1/3 rounded my-2">
                SAVE CHANGES
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
