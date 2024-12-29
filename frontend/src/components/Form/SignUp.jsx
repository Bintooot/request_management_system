import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactnumber: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(formData);

      const response = await axios.post(
        "http://localhost:5000/api/submitregister",
        formData
      );

      setFormData({
        username: "",
        email: "",
        contactnumber: "",
        password: "",
      });

      //alert after sending the form
      alert("Message sent successfully!");

      console.log(response);
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response ? error.response.data.message : error.message
      );
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
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, contactnumber: e.target.value });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
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
