import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !email || !contactnumber || !password) {
      alert("All fields are required.");
      setIsLoading(false);
      return;
    }

    const userAccount = { username, email, contactnumber, password };
    try {
      console.log("Sending registration request:", userAccount);

      const response = await axios.post(
        "http://localhost:5000/api/registerAccount",
        userAccount
      );

      if (response.data.success) {
        alert("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000); // Add delay to show alert
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      alert(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="md:w-[500px]  bg-slate-200 p-5  rounded-lg shadow-lg w-full">
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
        <hr className="border-black my-2" />
        <form className="space-y-5 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="number"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Contact Number
            </label>
            <div className="mt-2">
              <input
                id="number"
                name="number"
                onChange={(e) => setContactNumber(e.target.value)}
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account.
          <a
            href="#"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUp;
