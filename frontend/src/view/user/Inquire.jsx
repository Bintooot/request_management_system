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
  const [statusType, setStatusType] = useState("success"); // Default to success
  const [loading, setLoading] = useState(false);

  // Inquiry Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (user?.accountid && user?.username) {
      // Ensure user info is set before fetching inquiries
    }

    const fetchUserInquiry = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      try {
        setLoading(true); // Start loading
        const response = await axios.get(`/api/user/all-pending-inquiry`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const inquiries = response.data?.inquiryresponse || [];
        setUserInquiry(inquiries); // Update state with inquiries
      } catch (error) {
        console.error(
          "Error fetching inquiries:",
          error.response?.data || error.message
        );
        showNotification("Failed to load inquiries.", "error");
      } finally {
        setLoading(false); // Stop loading
      }
    };

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
    document.getElementById("fileInput").value = ""; // Reset file input visually
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
      setUserInquiry((prev) => [...prev, response.data]); // Add new inquiry
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Submit an Inquiry</h1>
      {notificationVisible && (
        <Notification message={statusMessage} type={statusType} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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

      <div className="mt-8">
        <h1 className="text-3xl font-semibold mb-6">Previous Inquiries</h1>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : userInquiry.length === 0 ? (
          <p>No inquiries available.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {userInquiry.map((items) => (
              <div
                className="border rounded-md p-4"
                key={items._id || items.subject}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {items.subject || "No Subject"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {items.message || "No inquiry message available."}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      items.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : items.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {items.status || "Unknown"}
                  </span>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  Submitted on:{" "}
                  {items.createdAt
                    ? format(new Date(items.createdAt), "MMMM dd, yyyy hh:mm a")
                    : "Unknown date"}
                </div>

                {items.adminReply ? (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700">Admin Reply</h4>
                    <div className="border-l-4 pl-4 mt-2 text-sm text-gray-700">
                      {items.adminReply}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-gray-600">
                    No reply yet from the admin.
                  </div>
                )}

                <div className="mt-2 text-sm text-end">
                  <button
                    type="button"
                    onClick={() => deleteInquiry(items._id)}
                    className="bg-red-600 text-sm text-white px-2 py-1 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquire;
