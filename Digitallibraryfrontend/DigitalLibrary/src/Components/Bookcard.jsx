import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={book.cover} alt={book.title} className="h-48 w-full object-cover rounded-md" />
      <h2 className="mt-2 text-lg font-bold">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">{book.genre}</p>
      <Link
        to={`/reader/${book.id}`}
        className="mt-2 block bg-blue-600 text-white px-3 py-1 rounded text-center hover:bg-blue-700"
      >
        Read Book
      </Link>
    </div>
  );
}

export default BookCard;
