import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setMessage(response.data.message || "Password reset link sent!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Active email address"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <p className="text-green-600 mt-3 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
