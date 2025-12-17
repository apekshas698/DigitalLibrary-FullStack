import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Library Information</h3>
          <p className="mb-2">
            📍 <span className="font-medium">Address:</span> 123 Digital Street, Knowledge City
          </p>
          <p className="mb-2">
            📞 <span className="font-medium">Phone:</span> +91 9876543210
          </p>
          <p className="mb-2">
            ✉️ <span className="font-medium">Email:</span> support@digitallibrary.com
          </p>
          <p className="mt-4 text-gray-600">
            We’re here to help you with any questions about borrowing books,
            accessing resources, or using our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;


