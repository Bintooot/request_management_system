import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, fetchUser } = useOutletContext() || {
    user: null,
    setUser: null,
    fetchUser: null,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    address: user?.address || "",
    contactnumber: user?.contactnumber || "",
  });

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading user data...
        </h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No authentication token found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/user/update-profile/${user.accountid}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
        // Re-fetch the updated user data after the update
        fetchUser(); // Trigger a re-fetch of the user profile data
      }
    } catch (error) {
      alert("Error updating profile!");
      console.error(error);
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
            <p className="text-green-700 font-medium uppercase">
              PVO {user.position}
            </p>
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
        </div>

        {/* Settings Form */}
        <div className="bg-white p-8 shadow-lg border rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
          <hr className="mb-6" />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="contactnumber"
                value={formData.contactnumber}
                onChange={handleChange}
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
