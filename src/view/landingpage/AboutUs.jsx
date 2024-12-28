import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Organization
          </h1>
          <p className="text-xl">
            Empowering farmers through sustainable poultry distribution
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To provide accessible and sustainable poultry resources to local
                farmers, promoting agricultural growth and community
                development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To become the leading organization in empowering agricultural
                communities through efficient poultry distribution and support
                systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
            Who We Are
          </h2>
          <div className="max-w-3xl mx-auto text-gray-600">
            <p className="mb-4">
              Founded in [Year], our organization has been dedicated to
              supporting local farmers through sustainable poultry distribution
              programs. We work closely with communities to ensure efficient and
              fair distribution of resources.
            </p>
            <p>
              Our team consists of dedicated professionals who understand the
              needs of local farmers and work tirelessly to improve our services
              and support systems.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
            Contact Us
          </h2>
          <div className="max-w-lg mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="font-bold w-24">Address:</span>
                  <span className="text-gray-600">
                    123 Agriculture Street, City, Country
                  </span>
                </p>
                <p className="flex items-center">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-600">
                    contact@organization.com
                  </span>
                </p>
                <p className="flex items-center">
                  <span className="font-bold w-24">Phone:</span>
                  <span className="text-gray-600">+1 234 567 890</span>
                </p>
                <p className="flex items-center">
                  <span className="font-bold w-24">Hours:</span>
                  <span className="text-gray-600">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
