import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import { format } from "date-fns";

const Inquire = () => {
  const { user } = useOutletContext() || { user: null };
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [inquiryStatus, setInquiryStatus] = useState("All");
  const [userInquiry, setUserInquiry] = useState([]);

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
      console.log(inquiries);
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

  const filterInquiries = (status) => {
    if (status === "All") return userInquiry;
    return userInquiry.filter((inquiry) => inquiry.status === status);
  };

  useEffect(() => {
    if (user?.accountid && user?.username) {
    }

    fetchUserInquiry();
  }, [user]);

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
      const response = await axios.post("/api/user/submit-inquiry", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      showNotification("Inquiry successfully submitted!", "success");
      setUserInquiry((prev) => [...prev, response.data]);
      fetchUserInquiry();
      resetForm();
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      showNotification(errorMessage, "error");
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
            Previous Inquiries
          </h1>
          <select
            name="status"
            id="status"
            className="p-2 rounded-md border-2"
            onChange={(e) => setInquiryStatus(e.target.value)}
          >
            <option value="All">All Inquiries</option>
            <option value="Pending">Pending</option>
            <option value="Viewed">Viewed</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : userInquiry.length === 0 ? (
          <p>No inquiries available.</p>
        ) : filterInquiries(inquiryStatus).length === 0 ? (
          <p className="text-center text-gray-500">No data found.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filterInquiries(inquiryStatus).map((items) => (
              <div
                className="border rounded-md p-4 bg-white shadow-md"
                key={items._id || items.subject}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                  <div>
                    <h2 className="font-medium text-lg border-b-2 mb-2">
                      {items.inquiryId}
                    </h2>
                    <h3 className="font-semibold">Subject: {items.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Message: {items.message}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs mt-2 sm:mt-0 rounded-full ${
                      items.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : items.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : items.status === "Viewed"
                        ? "bg-blue-100 text-blue-800"
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
