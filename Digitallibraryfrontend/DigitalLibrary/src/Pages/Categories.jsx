import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/books");
        const fetchedBooks = res.data;

        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(
            fetchedBooks
              .map((book) => book.category)
              .filter((c) => c && c.trim() !== "")
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 2️⃣ Filter books by search & category
  useEffect(() => {
    let temp = books;

    if (activeCategory !== "All") {
      temp = temp.filter((book) => book.category === activeCategory);
    }

    if (search) {
      const normalizedSearch = search.toLowerCase();
      temp = temp.filter(
        (book) =>
          (book.title && book.title.toLowerCase().includes(normalizedSearch)) ||
          (book.author && book.author.toLowerCase().includes(normalizedSearch)) ||
          (book.category &&
            book.category.toLowerCase().includes(normalizedSearch))
      );
    }

    setFilteredBooks(temp);
  }, [books, search, activeCategory]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Browse by Categories
      </h1>

      {/* Category Tabs */}
      {loading ? (
        <p className="mb-6 text-gray-500">Loading categories...</p>
      ) : (
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium border transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 mb-6 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
      />

      {/* Books Grid */}
      {loading ? null : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
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

              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                by {book.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Category: {book.category}
              </p>
              <Link
                to={`/books/${book.id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          No books found for this category or search.
        </p>
      )}
    </div>
  );
};

export default Categories;
