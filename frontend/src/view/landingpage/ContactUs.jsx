import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with our team</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">
                  123 Agriculture Street, City, Country
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">contact@organization.com</p>
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              <a href="#" className="text-green-600 hover:text-green-700">
                Facebook
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                Twitter
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                LinkedIn
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
