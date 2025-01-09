import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const { user } = useOutletContext() || { user: null };
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactNumber] = useState("");

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading user data...
        </h2>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email && !address && !contactnumber) {
      alert("Please fill at least one field to update");
      return;
    }

    setIsLoading(true);
    try {
      // Only send fields that have values
      const updateAccount = {};
      if (email) updateAccount.email = email;
      if (address) updateAccount.address = address;
      if (contactnumber) updateAccount.contactnumber = contactnumber;

      console.log(user.accountid);

      const response = await axios.put(
        `http://localhost:5000/api/updateAccount/${user.accountid}`,
        updateAccount,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update local user state
        window.location.reload(); // Refresh to show updated data
        alert("Profile updated successfully!");

        // Clear form
        setEmail("");
        setAddress("");
        setContactNumber("");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Update failed";
      alert(errorMessage);
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white p-8 shadow-lg border rounded-lg">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">ID: {user.accountid}</p>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.username}
            </h1>
            <p className="text-green-700 font-medium">PVO Head</p>
          </div>
          <hr className="my-6" />
          <div className="space-y-3">
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Email Address:</span>
              {user.email}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Phone Number:</span>
              {user.contactnumber}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium w-32">Address:</span>
              {user.address}
            </p>
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Delete Account
          </button>
        </div>

        {/* Settings Form Card */}
        <div className="bg-white p-8 shadow-lg border rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
          <hr className="mb-6" />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
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
                type="number"
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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
