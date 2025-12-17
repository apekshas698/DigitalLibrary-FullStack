import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Save token, role, AND userId (Mongo ID)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role.replace("ROLE_", "")); // Save role
      localStorage.setItem("userId", data.userId); // <<< ADDED: Save user ID

      // Redirect users to the books page, deny access if they are admin
      if (data.role === "ROLE_USER") {
        navigate("/books");
      } else if (data.role === "ROLE_ADMIN") {
        // Log out admin who tries to login via the user portal
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // Also remove userId if it was set temporarily
        localStorage.removeItem("userId"); 
        setError("Administrators must use the dedicated Admin login portal.");
      } else {
        navigate("/books");
      }
      
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
          User Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            User Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;