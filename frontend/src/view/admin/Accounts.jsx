import React, { useEffect, useState } from "react";
import CardMenu from "../../components/Card/CardMenu";
import { FaUserPlus } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import Sidebar from "../../components/Navigation/Sidebar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import AdminProfileCard from "../../components/Card/AdminProfileCard";
import { format } from "date-fns";
import Notification from "../../components/Notification/Notification";

const Accounts = () => {
  const { adminData } = useOutletContext() || { adminData: null };
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const [email, setEmail] = useState(adminData?.email || "");
  const [contactNumber, setContactNumber] = useState(
    adminData?.contactnumber || ""
  );
  const [address, setAddress] = useState(adminData?.address || "");
  const [password, setPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(true);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // default is "success"

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchTotalUser = async () => {
      try {
        const response = await axios.get("/api/admin/total-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserCount(response.data.response);
      } catch (error) {
        console.error("Error fetching total of User:", error);
      }
    };

    const fetchTotalAdmin = async () => {
      try {
        const response = await axios.get("/api/admin/total-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminCount(response.data.response);
      } catch (error) {
        console.error("Error fetching total of Admin:", error);
      }
    };

    fetchTotalAdmin();
    fetchTotalUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      email,
      contactNumber,
      address,
      ...(isPasswordChanged && { password }), // apil ang password kung naay changes
    };

    console.log(password);
    console.log(updatedData);

    axios
      .put("/api/admin/update-profile", updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Profile updated", response.data);

        // check kong ang password kay gi change
        if (isPasswordChanged) {
          showNotification(
            "Password changed! You will be logged out.",
            "success"
          );
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        showNotification("Failed to update profile", "error");
      });
  };

  return (
    <>
      <div className="gap-3 p-5 md:flex">
        <div className="md:w-1/3 mb-5">
          <Sidebar />
        </div>
        <div className="flex-col w-full">
          <div className="flex justify-around items-center gap-2 mb-5 grow">
            <div className="w-1/2">
              <CardMenu
                icon={<FaUserPlus />}
                title="Users Accounts"
                number={userCount}
              />
            </div>
            <div className="w-1/2">
              <CardMenu
                icon={<RiAdminFill />}
                title="Admin Accounts"
                number={adminCount}
              />
            </div>
          </div>

          {notificationVisible && (
            <Notification
              message={statusMessage} // Pass the message to display
              type={statusType} // Pass the type of notification (success or error)
            />
          )}

          <div className="border-2 shadow-lg rounded-lg p-5 w-full flex flex-col gap-5">
            <AdminProfileCard
              id={adminData?.accountid || "No ID available"}
              username={adminData?.username || "No username available"}
              email={adminData?.email || "No email available"}
              namelabel="Admin ID:"
              address={adminData?.address || "No address available"}
              contactnumber={
                adminData?.contactnumber || "No contact number available"
              }
              createdAt={
                adminData?.createdAt
                  ? format(new Date(adminData?.createdAt), "MMMM dd, yyyy")
                  : "No creation date available"
              }
            />
            <div className="bg-white p-8 shadow-lg border rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Settings
              </h2>
              <hr className="mb-6" />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Change Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
