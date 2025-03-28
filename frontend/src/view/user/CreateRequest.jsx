import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiFileText, FiMapPin, FiSend } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification/Notification";

const CreateRequest = () => {
  const { user } = useOutletContext() || { user: null };
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // default is "success"
  const [validationErrors, setValidationErrors] = useState({});

  // Requester Data info
  const [requesterid, setRequesterid] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [postion, setPosition] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  // Request Details
  const [chicksType, setChicksType] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [numberofrequester, setNUmberofRequester] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  console.log({
    requesterid,
    requesterName,
    postion,
    contactnumber,
    email,
    chicksType,
    location,
    quantity,
    numberofrequester,
    description,
    file,
    fileName,
  });

  useEffect(() => {
    if (user?.accountid && user?.username) {
      setRequesterid(user.accountid);
      setRequesterName(user.username);
      setContactNumber(user.contactnumber);
      setEmail(user.email);
      setPosition(user.position);
    }

    if (numberofrequester !== "") {
      const totalChicks = chicksQuantity(numberofrequester);
      setQuantity(totalChicks);
    }
  }, [user, numberofrequester]); // Runs when `user` or `numberofrequester` changes

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  const chicksQuantity = (numberofrequester) => {
    return numberofrequester * 3;
  };

  const resetForm = () => {
    // Reset all the state to initial values
    setStep(1);
    setChicksType("");
    setLocation("");
    setQuantity("");
    setNUmberofRequester("");
    setDescription("");
    setFile(null);
    setFileName("");
  };

  const showNotification = (message, type = "success") => {
    setStatusMessage(message);
    setStatusType(type);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const errors = {};
    if (!chicksType) errors.chicksType = "Chicks type is required";
    if (!location) errors.location = "Location is required";
    if (!numberofrequester)
      errors.numberofrequester = "Number of persons is required";
    if (!description) errors.description = "Description is required";
    if (!file || file === null) errors.file = "File is required";

    const formData = new FormData();
    formData.append("requesterName", requesterName);
    formData.append("position", postion);
    formData.append("contactnumber", contactnumber);
    formData.append("email", email);
    formData.append("chicksType", chicksType);
    formData.append("location", location);
    formData.append("numberofrequester", numberofrequester);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("filename", fileName);
    if (file) formData.append("file", file); // Attach the file if selected

    const token = localStorage.getItem("authToken");
    console.log(formData);

    try {
      const response = await axios.post("/api/user/submit-request", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      showNotification("Request successfully submitted!", "success");
      resetForm();
    } catch (error) {
      setLoading(false);

      // Check if the error has a response and contains a message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Show error message from backend
        showNotification(error.response.data.message, "error");
      } else {
        // Show a generic error message if the backend doesn't return a message
        showNotification(error.response.data.message, "error");
      }

      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step >= item ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                {item === 1 ? (
                  <FiUser />
                ) : item === 2 ? (
                  <FiFileText />
                ) : item === 3 ? (
                  <FiMapPin />
                ) : (
                  <FiSend />
                )}
              </div>
              {item < 4 && (
                <div
                  className={`h-1 w-10 ${
                    step > item ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {notificationVisible && (
        <Notification
          message={statusMessage} // Pass the message to display
          type={statusType} // Pass the type of notification (success or error)
        />
      )}

      {validationErrors.chicksType && (
        <div className="text-red-500 text-sm">
          {validationErrors.chicksType}
        </div>
      )}

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6 sm:text-2xl">
              Personal Information
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID
                </label>
                <input
                  type="text"
                  disabled
                  value={user.accountid}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  disabled
                  value={user.username}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PVO Position
                </label>
                <input
                  type="text"
                  disabled
                  value={user.position}
                  className="mt-1 uppercase block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  disabled
                  value={user.contactnumber}
                  className="mt-1 uppercase block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  disabled
                  value={user.email}
                  className="mt-1 uppercase block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-green-600 text-sm text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6 sm:text-2xl">
              Request Details
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type of Chicks
                </label>
                <select
                  name="chicksType"
                  value={chicksType} // Controlled by state
                  onChange={(e) => setChicksType(e.target.value)}
                  className="mt-1 border-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Type of Chicks
                  </option>
                  <option value="Mix">Mix</option>
                  <option value="Broiler">Broiler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Persons
                </label>
                <input
                  required
                  type="number"
                  name="persons"
                  value={numberofrequester}
                  onChange={(e) => setNUmberofRequester(e.target.value)}
                  className="mt-1 border-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  required
                  type="text"
                  name="quantity"
                  value={quantity}
                  readOnly
                  className="mt-1 border-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Full-Width Fields */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  File or Letter
                </label>
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <span className="text-red-500 text-sm">
                  Allowed: PDF, DOC, DOCX, JPG, JPEG
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Set Location</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 border-2 block  p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6 sm:text-2xl">
              Confirmation <br />
              <span className="text-sm text-red-500 font-normal">
                Review your request before submitting
              </span>
            </h2>

            {/* Review Details */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Requester No:</span>
                <span className="text-right">{requesterid}</span>
              </div>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Requester:</span>
                <span className="text-right">{requesterName}</span>
              </div>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Location:</span>
                <input
                  id="location"
                  type="text"
                  required
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-right border-none focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Pending
                </span>
              </div>
            </div>

            {/* Requested Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold mb-4 sm:text-2xl">
                Requested Items/Services
              </h3>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Chicks Type:</span>
                <select
                  name="chicksType"
                  value={chicksType}
                  onChange={(e) => setChicksType(e.target.value)}
                  className="text-right border-none focus:outline-none"
                >
                  <option value="" disabled>
                    Type of Chicks
                  </option>
                  <option value="Mix">Mix</option>
                  <option value="Broiler">Broiler</option>
                </select>
              </div>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Persons:</span>
                <input
                  required
                  type="number"
                  name="persons"
                  value={numberofrequester}
                  onChange={(e) => setNUmberofRequester(e.target.value)}
                  className="text-right border-none appearance-none focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap justify-between border-b pb-2">
                <span className="text-gray-600">Quantity:</span>
                <input
                  required
                  type="number"
                  name="quantity"
                  value={quantity}
                  readOnly
                  className="text-right border-none appearance-none focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <textarea
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 p-2 resize-none block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Selected File</h3>
              <div className="flex flex-wrap justify-between items-center">
                <span className="truncate">{fileName}</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default CreateRequest;
