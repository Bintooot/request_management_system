import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";

const SignUp = () => {
  const [formData, setFormData] = useState({
    accountid: "",
    username: "",
    email: "",
    contactnumber: "",
    password: "",
    position: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // default is "success"

  const showNotification = (message, type = "success") => {
    setStatusMessage(message); // Set the notification message
    setStatusType(type); // Set the notification type ("success" or "error")
    setNotificationVisible(true); // Make the notification visible

    setTimeout(() => {
      setNotificationVisible(false); // Hide the notification after 5 seconds
    }, 5000);
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const userAccount = {
        ...formData,
        accountid: generateID(),
      };

      const response = await axios.post(
        "http://localhost:5000/api/registerAccount",
        userAccount
      );

      console.log("Response from server:", response);
      showNotification("Regestration succesfully!", "success");
    } catch (error) {
      showNotification("Registration failed.", "error");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[500px] bg-green-50 p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Sign Up
      </h2>
      {notificationVisible && (
        <Notification
          message={statusMessage} // Pass the message to display
          type={statusType} // Pass the type of notification (success or error)
        />
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-900"
          >
            Fullname
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            required
            autoComplete="email"
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            autoComplete="new-password"
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Address Input */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Contact Number Input */}
        <div>
          <label
            htmlFor="contactnumber"
            className="block text-sm font-medium text-gray-900"
          >
            Contact Number
          </label>
          <input
            id="contactnumber"
            type="text"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
            required
            autoComplete="tel"
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Position Dropdown */}
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-900"
          >
            Position
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          >
            <option value="" disabled>
              Select Position
            </option>
            <option value="leader">Leader</option>
            <option value="member">Member</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-green-600 hover:text-green-500"
        >
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignUp;
