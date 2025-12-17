import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, BookA, ClipboardList } from "lucide-react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [activeView, setActiveView] = useState("books");

    const adminLinks = [
        { name: "Manage Books", path: "books", icon: BookA, component: "AdminBooks" },
        { name: "Borrow Records", path: "borrows", icon: ClipboardList, component: "AdminBorrowRecords" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/admin/login");
    };

    if (role !== 'ADMIN') {
        return (
            <div className="text-center p-10 text-red-500">
                Unauthorized access. Redirecting to admin login.
            </div>
        );
    }


    return (
        <div className="flex min-h-[85vh] dark:bg-gray-900 dark:text-white">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-gray-100 dark:bg-gray-800 p-6 shadow-xl border-r border-gray-300 dark:border-gray-700">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 border-b pb-2">
                    ADMIN PANEL
                </h3>
                
                <nav className="space-y-2">
                    {adminLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={`/admin/${link.path}`}
                            // Use 'replace' to prevent users from navigating back to login via history
                            replace={true} 
                            className={({ isActive }) => 
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? "bg-red-500 text-white shadow-lg"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/50"
                                }`
                            }
                        >
                            <link.icon size={20} className="mr-3" />
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                    >
                        <LogOut size={20} className="mr-2" />
                        Logout Admin
                    </button>
                </div>
            </div>

            {/* Content Area (renders AdminBooks or AdminBorrowRecords) */}
            <main className="flex-1 p-8">
                {/* The <Outlet /> component renders the child route's element.
                    In this case, it will render AdminBooks or AdminBorrowRecords. 
                */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
