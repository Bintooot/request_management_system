import React, { useState } from "react";

const Inqure = () => {
  const [inquiry, setInquiry] = useState({
    subject: "",
    message: "",
    attachment: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(inquiry);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Submit an Inquiry</h1>

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
            id="subject"
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={inquiry.subject}
            onChange={(e) =>
              setInquiry({ ...inquiry, subject: e.target.value })
            }
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
            id="message"
            name="message"
            rows={6}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={inquiry.message}
            onChange={(e) =>
              setInquiry({ ...inquiry, message: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attachment (optional)
          </label>
          <input
            type="file"
            className="w-full p-2 border rounded-md"
            onChange={(e) =>
              setInquiry({ ...inquiry, attachment: e.target.files[0] })
            }
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
        <h2 className="text-xl font-semibold mb-4">Previous Inquiries</h2>
        <div className="space-y-4">
          {/* Sample inquiry card */}
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Sample Subject</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Sample inquiry message...
                </p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Submitted on: March 15, 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inqure;
