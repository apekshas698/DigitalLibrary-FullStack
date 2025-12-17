import { useEffect, useState } from "react";
import api from "../utils/axios";
import AdminGenerateDescription from "../Components/AI/AdminGenerateDescription"; 

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    imageUrl: "",
    description: "", 
    tags: [] 
  });
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.category || !newBook.imageUrl || !newBook.description) {
      alert("Please fill all fields: Title, Author, Category, Image URL, AND Description!");
      return;
    }
    try {
      // ✅ The entire newBook state, including the 'tags' array, is sent to the backend
      await api.post("/admin/books", newBook); 
      
      // Reset form, including the tags field
      setNewBook({ title: "", author: "", category: "", imageUrl: "", description: "", tags: [] }); 
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/admin/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  // 🎯 Handler for AI-generated text - **LOGIC IS CORRECT**
  const handleGeneratedDescription = (generatedJsonText) => {
    try {
      // Attempt to parse the JSON output from the AI
      const parsed = JSON.parse(generatedJsonText); 
      
      // Construct the description using available fields
      const fullDescription = (parsed.tagline ? `Tagline: ${parsed.tagline}\n\n` : '') + 
                              (parsed.description || generatedJsonText);
        
      // ⭐ Correctly extracts the tags array, defaulting to []
      const generatedTags = parsed.tags || [];

      setNewBook(prev => ({ 
          ...prev, 
          description: fullDescription,
          tags: generatedTags // <--- Saves the extracted tags
      }));
      
    } catch (e) {
      // ✅ Robust fallback: If JSON parsing fails, use the raw text and ensure tags is an empty array.
      setNewBook(prev => ({ ...prev, description: generatedJsonText, tags: [] })); 
      console.warn("AI output was not valid JSON, using raw text. Tags set to [].", generatedJsonText);
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        📚 Manage Books
      </h2>

      {/* Add Book Form */}
      <div className="mb-6 flex flex-col gap-3 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">Add New Book</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Title Input */}
          <input
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300"
          />
          {/* Author Input */}
          <input
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300"
          />
          {/* Category Input */}
          <input
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="border rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300"
          />
          {/* Image URL Input */}
          <input
            placeholder="Image URL"
            value={newBook.imageUrl}
            onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
            className="border rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300"
          />
        </div>
        
        {/* 🎯 Description Textarea */}
        <textarea
            placeholder="Description (required)"
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            rows="5"
            className="border rounded px-3 py-2 w-full text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300"
        />

        {/* 🎯 AI Generation Button and Submit */}
        <div className="flex gap-4 items-center justify-between">
          <AdminGenerateDescription
            title={newBook.title}
            author={newBook.author}
            category={newBook.category}
            onGenerated={handleGeneratedDescription}
          />
          <button
            onClick={addBook}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            ➕ Add Book
          </button>
        </div>
      </div>

      {/* Books List */}
      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-500">No books found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow hover:shadow-md transition"
            >
              {b.imageUrl && (
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Author: {b.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: {b.category}
              </p>
              <button
                onClick={() => deleteBook(b.id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBooks;