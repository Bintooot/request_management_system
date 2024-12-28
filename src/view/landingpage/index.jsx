import React from "react";
import { NavLink } from "react-router-dom";
import Chicks from "../../assets/Chicks.png";

const LandingPage = () => {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="md:flex min-h-[70vh] bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="md:w-1/2 flex justify-center items-center p-8">
          <img
            src={Chicks}
            alt="Poultry Management"
            className="max-w-md rounded-lg shadow-xl"
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center flex-col p-8 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Chicks Request Management System
          </h1>
          <p className="text-xl text-center max-w-lg">
            Streamline your chicks requests with our efficient management
            system. Get access to resources and support for your farming needs.
          </p>
          <div className="flex gap-6 justify-center">
            <NavLink
              to="/login"
              className="px-6 py-3 bg-white text-green-800 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors font-medium"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Request Management</h3>
              <p className="text-gray-600">
                Easy submission and tracking of chicks requests
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Resource Distribution
              </h3>
              <p className="text-gray-600">
                Efficient distribution of chicks resources
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Support System</h3>
              <p className="text-gray-600">
                24/7 support for all your farming needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">1</span>
              </div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-gray-600">Create your account</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">2</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Request</h3>
              <p className="text-gray-600">Fill out request form</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">3</span>
              </div>
              <h3 className="font-semibold mb-2">Track Status</h3>
              <p className="text-gray-600">Monitor your request</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">4</span>
              </div>
              <h3 className="font-semibold mb-2">Receive</h3>
              <p className="text-gray-600">Get your resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our platform today and streamline your poultry management
            process
          </p>
          <NavLink
            to="/register"
            className="inline-block px-8 py-4 bg-white text-green-800 rounded-lg hover:bg-green-100 transition-colors font-medium"
          >
            Create Account
          </NavLink>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
