import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("authToken");

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/user/notification-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/api/user/mark-as-read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold text-3xl mb-5">Notifications</h3>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No new notifications</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id}
            className={`bg-white shadow-md rounded-lg p-4 mb-5 border-l-4 ${
              item.read ? "border-gray-400" : "border-blue-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                <strong> Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </span>
              {!item.read && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>

            <p className="text-md font-semibold text-blue-700 mt-2">
              {item.type}
            </p>

            <p className="text-sm text-gray-700 mt-1">
              <strong>Request ID:</strong> {item.id}
            </p>

            <p className="text-sm text-gray-700 mt-1">
              <strong>Message:</strong> {item.message}
            </p>

            {!item.read && (
              <button
                className="mt-3 text-sm border-2 p-1 rounded bg-gray-200 hover:bg-green-500 hover:text-white"
                onClick={() => markAsRead(item._id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
