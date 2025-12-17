import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Keep the import for the fallback mechanism

const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Extract role and clean the prefix (e.g., ROLE_ADMIN -> ADMIN)
    const raw = decoded.role; // Assuming the 'role' claim holds the spring role string
    return raw ? raw.toString().replace("ROLE_", "") : null;
  } catch {
    // Token is invalid or expired
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return null;
  }
};

// Determines the user's role, prioritizing the quicker stored 'role'.
const getUserRole = () => {
    return localStorage.getItem("role") || getRoleFromToken();
}

/**
 * Protects a route based on authentication status and required roles.
 * @param {object} props
 * @param {React.ReactNode} props.element - The component to render if authorized.
 * @param {string[]} [props.allowedRoles=[]] - Array of roles allowed ('USER', 'ADMIN').
 */
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const role = getUserRole();
  const location = useLocation();

  // --- Phase 1: Authentication Check (No Role) ---
  if (!role) {
    console.log(`Access attempt to ${location.pathname} denied: Not authenticated.`);
    // Redirect based on the target path
    const isTargetingAdmin = location.pathname.startsWith('/admin');
    
    // Clear storage just in case a bad token was cached
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 

    if (isTargetingAdmin) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }
    // Default redirect to the general User login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // --- Phase 2: Authorization Check (Role Not Allowed) ---
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    console.log(`Access attempt to ${location.pathname} denied: Role ${role} not in ${allowedRoles.join(', ')}.`);
    
    // Specific handling for role mismatch:
    
    // Case A: Admin trying to access a regular User route (e.g., /my-borrows)
    if (role === "ADMIN") {
        // Redirect Admin to their default panel view
        return <Navigate to="/admin/books" replace />;
    }
    
    // Case B: User trying to access an Admin route (e.g., /admin/books)
    if (role === "USER" && location.pathname.startsWith('/admin')) {
        // Display a clear error message instead of redirecting
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <h1 className="text-3xl p-10 text-red-600 dark:text-red-400">
                    ❌ ACCESS DENIED: Only Administrators are allowed here.
                </h1>
            </div>
        );
    }
    
    // Fallback for any other unauthorized role mismatch
    return <Navigate to="/" replace />;
  }

  // --- Phase 3: Authorized ---
  // Role is authenticated AND authorized, render the element
  return element;
};

export default ProtectedRoute;