import axios from "axios";
import React, { useState } from "react";
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
    role: "user",
    secretKey: "",
  });

  const resetFormData = {
    accountid: "",
    username: "",
    email: "",
    contactnumber: "",
    password: "",
    position: "",
    address: "",
    secretKey: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // default is "success"

  // Notification to show success or error messages
  const showNotification = (message, type = "success") => {
    setStatusMessage(message); // Set the notification message
    setStatusType(type); // Set the notification type ("success" or "error")
    setNotificationVisible(true); // Make the notification visible

    setTimeout(() => {
      setNotificationVisible(false); // Hide the notification after 5 seconds
    }, 5000);
  };

  // Generate unique account ID
  const generateID = () => {
    return Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(formData.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare user account data
      const userAccount = {
        ...formData,
        accountid: generateID(),
      };

      // Send request to register the user
      await axios.post("/api/auth/register", userAccount);

      resetFormData();
      showNotification("Registration successfully!", "success");
    } catch (error) {
      // Handle errors
      showNotification("The email you entered is already registered.", "error");
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[500px] bg-green-50 p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Sign Up
      </h2>

      {/* Notification */}
      {notificationVisible && (
        <Notification
          message={statusMessage} // Pass the message to display
          type={statusType} // Pass the type of notification (success or error)
        />
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Role Selection */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-900"
          >
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {formData.role === "admin" && (
            <input
              type="password"
              name="secretKey"
              placeholder="Enter Secret Key"
              value={formData.secretKey}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          )}
        </div>

        {/* Username Input */}
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
