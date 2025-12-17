import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4"
      aria-label="Page Not Found"
    >
      <h1 className="text-7xl font-extrabold text-red-500 drop-shadow-md">404</h1>
      <p className="text-xl text-gray-700 mt-4 font-semibold">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="text-gray-500 mt-2">
        It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
