import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loginAccount = { email, password };

      const response = await axios.post(
        "http://localhost:5000/api/loginAccount",
        loginAccount
      );

      const { token } = response.data;
      localStorage.setItem("authToken", token); // Save token in local storage
      alert("Login successful!");
      navigate("/user-dashboard"); // Redirect to dashboard
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      alert(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[500px] bg-green-50 p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Sign In
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-green-600 hover:text-green-500"
        >
          Sign up.
        </a>
      </p>
    </div>
  );
};

export default SignIn;
