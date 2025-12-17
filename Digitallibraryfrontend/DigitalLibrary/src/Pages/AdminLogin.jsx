import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or access denied.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role.replace("ROLE_", "")); // remove prefix for easier check

      if (data.role === "ROLE_ADMIN") {
        navigate("/admin/books");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setError("Access denied. This portal is for Administrators only.");
      }
    } catch (err) {
      setError(err.message || "Login failed! Please check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600 dark:text-red-400">
          Admin Portal Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-300"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
