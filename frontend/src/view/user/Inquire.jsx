import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import { format } from "date-fns";

const Inquire = () => {
  const { user } = useOutletContext() || { user: null };
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [userInquiry, setUserInquiry] = useState([]);
  const [statusType, setStatusType] = useState("success");
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const fetchUserInquiry = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/user/all-pending-inquiry`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const inquiries = response.data?.inquiryresponse || [];
      setUserInquiry(inquiries);
    } catch (error) {
      console.error(
        "Error fetching inquiries:",
        error.response?.data || error.message
      );
      showNotification("Failed to load inquiries.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.accountid && user?.username) {
      // Ensure user info is set before fetching inquiries
    }

    fetchUserInquiry();
  }, [user]);

  const deleteInquiry = async (requestId) => {
    try {
      await axios.delete(`/api/user/remove-inquiry/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setUserInquiry((prev) =>
        prev.filter((request) => request._id !== requestId)
      );
      showNotification("Inquiry successfully removed!", "success");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      showNotification("Failed to remove inquiry.", "error");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setFile(null);
    setFileName("");
    document.getElementById("fileInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      showNotification("Subject and message are required.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("requesterName", user?.username || "");
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("filename", fileName);
    if (file) formData.append("file", file);

    const token = localStorage.getItem("authToken");

    try {
      setLoading(true);
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
      setUserInquiry((prev) => [...prev, response.data]);
      fetchUserInquiry();
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error(
        "Error creating inquiry:",
        error.response?.data || error.message
      );
      showNotification("Failed to submit inquiry. Try again.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Submit an Inquiry
      </h1>
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="fileInput" className="block text-sm font-medium mb-1">
            Attachment (optional)
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>

      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          Previous Inquiries
        </h1>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : userInquiry.length === 0 ? (
          <p>No inquiries available.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {userInquiry.map((items) => (
              <div
                className="border rounded-md p-4 bg-white shadow-md"
                key={items._id || items.subject}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium text-lg">{items.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {items.message}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs mt-2 sm:mt-0 rounded-full ${
                      items.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : items.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {items.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-gray-500 text-sm">Attached File</p>
                  {items.file ? (
                    <a
                      href={`http://localhost:5000/${items.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-500 underline"
                    >
                      View File
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">No file attached</p>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Submitted on:{" "}
                  {items.createdAt
                    ? format(new Date(items.createdAt), "MMMM dd, yyyy hh:mm a")
                    : "Unknown date"}
                </div>

                {items.adminFeedback && (
                  <div className="mt-4 border-l-4 pl-4">
                    <h4 className="font-medium">Admin Reply</h4>
                    <p className="text-gray-600">{items.adminFeedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquire;
