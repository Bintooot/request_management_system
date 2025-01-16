import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Notification from "../../components/Notification/Notification";

const Inquire = () => {
  const { user } = useOutletContext() || { user: null };
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // default is "success"
  const [loading, setLoading] = useState(false);

  // Requester Data info
  const [requesterid, setRequesterid] = useState("");
  const [requesterName, setRequesterName] = useState("");

  // Inquiry Message
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (user?.accountid && user?.username) {
      setRequesterid(user.accountid);
      setRequesterName(user.username);
    }
  }, [user]); // Runs when `user` changes

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message); // Set the notification message
    setStatusType(type); // Set the notification type ("success" or "error")
    setNotificationVisible(true); // Make the notification visible

    setTimeout(() => {
      setNotificationVisible(false); // Hide the notification after 5 seconds
    }, 5000);
  };

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setFile(null);
    setFileName("");
    // Reset file input visually
    document.getElementById("fileInput").value = ""; // Reset file input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("requesterName", user.username);
    formData.append("subject", subject);
    formData.append("message", message);
    if (file) formData.append("file", file); // Attach the file if selected

    const token = localStorage.getItem("authToken");

    console.log(token);
    console.log(user.username);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/submit-inquiry",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      showNotification("Inquiry successfully submitted!", "success");
      console.log("Inquiry created:", response.data);
      resetForm();
    } catch (error) {
      setLoading(false);
      showNotification("Fill in all the necessary fields.", "error"); // Show error notification
      console.error("Error creating Inquiry:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Submit an Inquiry</h1>
      {notificationVisible && (
        <Notification
          message={statusMessage} // Pass the message to display
          type={statusType} // Pass the type of notification (success or error)
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={subject}
            id="subject"
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            required
            value={message}
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attachment (optional)
          </label>
          <input
            type="file"
            id="fileInput" // Ensure ID is added here
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default Inquire;
