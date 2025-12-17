import React, { useState } from "react";

const Dashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: 1, title: "Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
  ]);

  // Handle returning a book
  const handleReturn = (id) => {
    setBorrowedBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">User Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>

      {borrowedBooks.length === 0 ? (
        <p className="text-gray-600">No books borrowed yet.</p>
      ) : (
        <ul className="space-y-2">
          {borrowedBooks.map((book) => (
            <li
              key={book.id}
              className="p-3 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              <span>
                <span className="font-semibold">{book.title}</span> –{" "}
                {book.author}
              </span>
              <button
                onClick={() => handleReturn(book.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
