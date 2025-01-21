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

    const fetchUserInquiry = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      try {
        setLoading(true); // Set loading to true when the fetch starts
        const response = await axios.get(`/api/user/all-pending-inquiry`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the data structure matches your expectation
        if (response.data?.inquiryresponse) {
          setUserInquiry(response.data.inquiryresponse); // Update the state
        } else {
          console.warn("Unexpected response structure:", response.data);
        }
      } catch (error) {
        // Enhanced error handling
        if (error.response) {
          console.error(
            "Server error while fetching user requests:",
            error.response.data
          );
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } finally {
        setLoading(false); // Ensure loading is false once the request is done
      }
    };

    fetchUserInquiry();
  }, [user]); // Runs when `user` changes

  const deleteInquiry = async (requestId) => {
    try {
      await axios.delete(`/api/user/remove-inquiry/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setUserInquiry((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      showNotification("Inquiry successfully removed!", "success");
    } catch (error) {
      showNotification("Inquiry failed to be removed!", "failed");
      console.error("Error deleting inquiry:", error);
    }
  };

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

      <div className="mt-8">
        <h1 className="text-3xl font-semibold mb-6">Previous Inquiries</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4 my-2">
          <select className="w-full sm:w-48 p-2 border shadow-sm">
            <option value="" disabled selected>
              Filter Status
            </option>
            <option value="Approved">Viewed</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name or ID"
            className="w-full sm:w-64 p-2 border shadow-sm"
          />
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {userInquiry.length === 0 ? (
            <p>No inquiries available.</p>
          ) : (
            userInquiry.map((items) => (
              <div className="border rounded-md p-4" key={items._id}>
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

                {/* Admin Reply Section */}
                {items.adminReply ? (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700">Admin Reply</h4>
                    <div className="border-l-4 pl-4 mt-2 text-sm text-gray-700">
                      {items.adminReply || "No reply yet."}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquire;
