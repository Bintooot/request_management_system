import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiFileText, FiMapPin, FiCheck, FiSend } from "react-icons/fi";

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    requesterName: "John Doe",
    position: "Manager",
    chicksType: "",
    persons: "",
    quantity: "",
    description: "",
    location: "",
    requestDate: "",
    file: null,
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateQuantity = (persons) => {
    return persons * 3;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "persons" && { quantity: calculateQuantity(value) }),
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
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
                  className={`h-1 w-24 ${
                    step > item ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  disabled
                  value="John Doe"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  disabled
                  value="Manager"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
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
            <h2 className="text-2xl font-bold mb-6">Request Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type of Chicks
                </label>
                <select
                  name="chicksType"
                  value={formData.chicksType}
                  onChange={handleInputChange}
                  className="mt-1 border-2 block  p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Type</option>
                  <option value="mix">Mix</option>
                  <option value="broiler">Broiler</option>
                  <option value="layer">Layer</option>
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
                  value={formData.persons}
                  onChange={handleInputChange}
                  className="mt-1 border-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  File or Letter
                </label>
                <input
                  type="file"
                  required
                  className="mt-1 p-2 border-2 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
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
            <h2 className="text-2xl font-bold mb-6">Date & Location</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Request Date
                </label>
                <input
                  type="datetime-local"
                  name="requestDate"
                  value={formData.requestDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full  p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full  p-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Location</option>
                  <option value="tagum">Tagum City</option>
                  <option value="campostella">Campostella</option>
                  <option value="sto-tomas">Sto. Tomas</option>
                </select>
              </div>
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
            <h2 className="text-2xl font-bold mb-6">
              Confirmation <br />{" "}
              <span className="text-sm text-red-500 font-normal">
                Review your request before submiting
              </span>
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Request No:</span>
                <span className="font-mono">
                  #REQ-{Date.now().toString().slice(-6)}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Date & Time:</span>
                <input
                  type="datetime-local"
                  name="requestDate"
                  value={formData.requestDate}
                  onChange={handleInputChange}
                  className="text-right border-none"
                />
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Location:</span>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="text-right border-none"
                >
                  <option value="">Select Location</option>
                  <option value="tagum">Tagum City</option>
                  <option value="campostella">Campostella</option>
                  <option value="sto-tomas">Sto. Tomas</option>
                </select>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Pending
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Requester:</span>
                <span>{formData.requesterName || "Not specified"}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Requested Items/Services
              </h3>
              <div className="border-t border-b py-2">
                <div className="flex justify-between py-1">
                  <span>Item/Service Description</span>
                  <span>Quantity/Details</span>
                </div>
              </div>
            </div>

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
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default CreateRequest;
