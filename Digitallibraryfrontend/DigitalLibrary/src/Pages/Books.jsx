// src/Pages/Books.jsx

import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";
// 🎯 Import the AI Search Component
import AISearchBox from "../Components/AI/AISearchBox"; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiSearchMode, setAiSearchMode] = useState(false); // Tracks if we are showing AI search results
  
  // State to hold the final set of books to display (either all books or search results)
  const [displayedBooks, setDisplayedBooks] = useState([]); 

  // --- Fetch All Books on Mount ---
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/books");
        // Save the full list of books
        setBooks(res.data);
        // Initially display all books
        setDisplayedBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    // Only fetch on initial mount or when resetting from search
    if (!aiSearchMode) {
        fetchAllBooks();
    }
  }, [aiSearchMode]); // Depend on aiSearchMode to trigger re-fetch when switching back to "All"

  // 🎯 Handler for AI search results
  const handleSearchResults = (results) => {
    setAiSearchMode(true);
    setDisplayedBooks(results); // Display the search results immediately
  };

  // 🎯 Function to reset search mode
  const handleResetSearch = () => {
    setAiSearchMode(false);
    setDisplayedBooks(books); // Switch back to the full list (which will trigger useEffect to refetch latest data if needed)
  };

  // --- UI Rendering ---

  // Use 'role' from the parent component (though currently unused, keep it for consistency)
  const role = localStorage.getItem("role"); 
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📚 Books Collection</h1>

      {/* 🎯 Integrate the AI Search Component */}
      <div className="mb-6">
        {/* The component takes the search query and returns filtered results via onResults */}
        <AISearchBox onResults={handleSearchResults} />
      </div>
      
      {/* 🎯 Display a label and reset button when showing search results */}
      {aiSearchMode && (
        <div className="mb-4 flex justify-between items-center bg-yellow-100 p-3 rounded text-gray-900 border border-yellow-300">
          <p className="font-medium">
            Showing AI Search Results ({displayedBooks.length} matches).
          </p>
          <button onClick={handleResetSearch} className="text-sm text-yellow-800 font-semibold hover:underline">
            &times; Clear AI Search
          </button>
        </div>
      )}


      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading books...</p>
      ) : displayedBooks.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No books found in the collection.{" "}
          {aiSearchMode 
            ? "Try a different search query!" 
            : role === "ADMIN" ? "Please add books via the Admin Panel." : null}
        </p>
      ) : (
        // ✅ Books Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow hover:shadow-lg transition"
            >
              {/* ✅ Display book cover image */}
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500 mb-3 rounded">
                  No Image
                </div>
              )}

              <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                by {book.author}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Category: {book.category}
              </p>

              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/books/${book.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;