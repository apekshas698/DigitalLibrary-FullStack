import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Features from "./Components/Features/Features.jsx";
import About from "./Components/About/About.jsx";
import Service from "./Components/Service/Service.jsx";
import Testimonial from "./Components/Testimonial/Testimonial.jsx";
import AppStore from "./Components/AppStore/AppStore.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home.jsx"; 
import Login from "./Pages/Login.jsx"; 
import Register from "./Pages/Register.jsx"; 
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminLayout from "./Pages/AdminLayout.jsx"; 
import Books from "./Pages/Books.jsx";
import Categories from "./Pages/Categories.jsx";
import BookDetails from "./Pages/BookDetails.jsx";
import MyBorrows from "./Pages/MyBorrows.jsx";            
import AdminBooks from "./Pages/AdminBooks.jsx";          
import AdminBorrowRecords from "./Pages/AdminBorrowRecords.jsx"; 
import Wishlist from "./Pages/WishList.jsx"; 
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";

const LandingPageContent = ({ theme }) => (
    <>
        
        <Home /> 
        <section><Hero theme={theme} /></section>
        <section><Features /></section>
        <section><About /></section>
        <section><Service /></section>
        <section><Testimonial /></section>
        <section><AppStore /></section>
        <section><Contact /></section>
    </>
);

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black dark:text-white duration-300">
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route
          path="/"
          element={<LandingPageContent theme={theme} />}
        />

        <Route path="/books" element={<Books />} />
        <Route path="/categories" element={<Categories />} />
        {/* 🐛 FIX: Pass the theme prop to BookDetails */}
        <Route path="/books/:id" element={<BookDetails theme={theme} />} />
        {/* ---------------------------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-borrows"
          element={
            <ProtectedRoute element={<MyBorrows />} allowedRoles={["USER"]} />
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute element={<Wishlist />} allowedRoles={["USER"]} />
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<AdminLayout />} allowedRoles={["ADMIN"]} />}
        >
            <Route index element={<ProtectedRoute element={<AdminBooks />} allowedRoles={["ADMIN"]} />} /> 
            <Route path="books" element={<ProtectedRoute element={<AdminBooks />} allowedRoles={["ADMIN"]} />} />
            <Route path="borrows" element={<ProtectedRoute element={<AdminBorrowRecords />} allowedRoles={["ADMIN"]} />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;