import React from "react";

const Profile = () => {
  // Later this data can come from backend (API or JWT token)
  const user = {
    name: "Apeksha Shukla",
    email: "apeksha@example.com",
    joined: "2024-01-15", // ISO date for better formatting
    avatar: "https://via.placeholder.com/150", // placeholder image
  };

  // Format joined date
  const formattedDate = new Date(user.joined).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-6">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-20 h-20 rounded-full border shadow"
        />

        {/* User Info */}
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Joined:</strong> {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
