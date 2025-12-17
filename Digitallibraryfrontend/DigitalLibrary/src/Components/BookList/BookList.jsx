import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books (replace URL with your backend endpoint)
  useEffect(() => {
    fetch("http://localhost:8080/api/books") // or your API endpoint
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Books</h2>
      
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={book.imageUrl || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {book.description?.slice(0, 60)}...
                </p>
                <button className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Borrow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
