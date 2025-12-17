import React from "react";

const Features = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 md:p-16">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-blue-700">Browse Books</h3>
        <p className="mt-2 text-gray-600">
          Search and explore a wide collection of books.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-blue-700">Categories</h3>
        <p className="mt-2 text-gray-600">
          Find books by categories and subjects.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-blue-700">Digital Access</h3>
        <p className="mt-2 text-gray-600">
          Access books anywhere, anytime with responsive design.
        </p>
      </div>
    </section>
  );
};

export default Features;
