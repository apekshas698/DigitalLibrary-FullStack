
import React from "react";
import { Link } from "react-router-dom";
import AIRecommendations from "../Components/AI/AIRecommendations"; 

const Home = () => {
    const userId = localStorage.getItem("userId") || null;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                Welcome to <span className="text-yellow-500">Digital Library</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                Explore a wide collection of books, browse by categories, and enjoy
                digital access anytime, anywhere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
                <Link
                    to="/books"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                    📚 Browse Books
                </Link>

                <Link
                    to="/categories"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                    📂 Categories
                </Link>
                {!userId ? (
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
                    >
                        🔑 Login
                    </Link>
                ) : (
                    <Link
                        to="/my-borrows"
                        className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                        My Borrows
                    </Link>
                )}
            </div>
            <div className="w-full max-w-6xl text-left px-4 sm:px-8">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                    AI Curated Picks
                </h2>
                <AIRecommendations userId={userId} />
            </div>
        </div>
    );
};

export default Home;