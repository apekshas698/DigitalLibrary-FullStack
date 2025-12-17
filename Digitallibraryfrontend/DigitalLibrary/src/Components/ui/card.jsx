import React from "react";

const Card = ({ image, title, description, buttonText }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image */}
      <img
        src={image || "https://via.placeholder.com/300x200"}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {description?.slice(0, 80)}...
        </p>
        {buttonText && (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
