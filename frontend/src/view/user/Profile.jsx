import React from "react";

const Profile = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white p-8 shadow-lg border rounded-lg">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">ID: 141572</p>
            <h1 className="text-3xl font-bold text-gray-800">
              BEN RAYMOND ANIASCO
            </h1>
            <p className="text-green-700 font-medium">PVO Head</p>
          </div>
          <hr className="my-6" />
          <div className="space-y-3">
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Email Address:</span>
              benaniasco@gmail.com
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Phone Number:</span>
              192319237182
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Address:</span>
              lisodpangitaon
            </p>
          </div>
        </div>

        {/* Settings Form Card */}
        <div className="bg-white p-8 shadow-lg border rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
          <hr className="mb-6" />
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-colors duration-200"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
