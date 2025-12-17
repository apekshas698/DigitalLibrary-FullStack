import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { jwtDecode }from "jwt-decode";

const Navbar = ({ theme, setTheme }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [role, setRole] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) {
       try {
         const decoded = jwtDecode(token);
         const userRole = decoded.role ? decoded.role.replace("ROLE_", "") : "USER";
         
           // ⭐ ADDED LOGIC: Check for userId in the token claims and save it to localStorage.
           // This ensures userId persists across refreshes, even if not explicitly set in Login.
           const decodedUserId = decoded.userId || decoded.sub; // Assuming userId or email (sub) might hold the ID
           if (decodedUserId) {
               localStorage.setItem("userId", decodedUserId);
           }
           
         setRole(userRole);
       } catch (err) {
         console.error("Invalid token:", err);
         localStorage.removeItem("token");
         localStorage.removeItem("role");
           localStorage.removeItem("userId"); // <<< CLEAR userId on failure
         setRole(null); 
       }
     } else {
           localStorage.removeItem("userId"); // <<< CLEAR userId if no token is found
        setRole(null); 
     }
   }, [window.location.pathname]); 
    
   const navLinks = [
     { title: "Home", path: "/" },
     { title: "Books", path: "/books" },
     { title: "Categories", path: "/categories" },
   ];
   if (role === "USER") {
     navLinks.push({ title: "My Borrows", path: "/my-borrows" });
     navLinks.push({ title: "Wishlist", path: "/wishlist" }); 
   }

   const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("role");
       localStorage.removeItem("userId"); // <<< CLEAR userId on logout
     setRole(null);
     if (window.location.pathname.startsWith('/admin')) {
       navigate("/admin/login");
     } else {
       navigate("/"); 
     }
   };
    
   const dashboardText = role === "ADMIN" ? "Admin Panel" : "Dashboard";
   return (
     <nav className="bg-blue-900 dark:bg-gray-900 text-white shadow-md sticky top-0 z-50">
       <div className="container mx-auto flex justify-between items-center px-4 py-3">
         <Link to="/" className="text-2xl font-bold tracking-wide">
           Digital<span className="text-yellow-400">Library</span>
         </Link>
         <ul className="hidden md:flex space-x-6 text-lg items-center">
           {navLinks.map((link, idx) => (
             <li key={idx}>
               <NavLink
                 to={link.path}
                 className={({ isActive }) =>
                   `transition duration-200 ${
                     isActive
                       ? "text-yellow-400 font-semibold"
                       : "hover:text-yellow-400"
                   }`
                 }
               >
                 {link.title}
               </NavLink>
             </li>
           ))}
           {role && (
             <li>
                <span className="text-sm text-gray-300 mr-2">
                    {dashboardText}
                </span>
                <button
                 onClick={handleLogout}
                 className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
               >
                 Logout ({role})
               </button>
             </li>
           )}
         </ul>
         <div className="flex items-center gap-4">
           {theme === "dark" ? (
             <Sun
               size={24}
               className="cursor-pointer text-yellow-400"
               onClick={() => setTheme("light")}
             />
           ) : (
             <Moon
               size={24}
               className="cursor-pointer"
               onClick={() => setTheme("dark")}
             />
           )}
           <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
             {isOpen ? <X size={28} /> : <Menu size={28} />}
           </button>
         </div>
       </div>
       {isOpen && (
         <div className="md:hidden bg-blue-800 dark:bg-gray-800 px-4 pb-3">
           <ul className="space-y-3">
             {navLinks.map((link, idx) => (
               <li key={idx}>
                 <NavLink
                   to={link.path}
                   className={({ isActive }) =>
                     `block transition duration-200 ${
                       isActive
                         ? "text-yellow-300 font-semibold"
                         : "hover:text-yellow-400"
                     }`
                   }
                   onClick={() => setIsOpen(false)}
                 >
                   {link.title}
                 </NavLink>
               </li>
             ))}
             {role && (
               <li>
                 <button
                   onClick={() => {
                     handleLogout();
                     setIsOpen(false);
                   }}
                   className="w-full px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-center"
                 >
                   Logout ({role})
                 </button>
               </li>
             )}
           </ul>
         </div>
       )}
     </nav>
   );
};

export default Navbar;