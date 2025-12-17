import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import ProtectedRoute from "../Routes/ProtectedRoute"; 

function Wishlist() {
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true); 
            const res = await api.get("/user/wishlist");
            setWishlistBooks(res.data);
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            alert("Failed to load your wishlist.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []); 

    // ✅ FIX: Use local state filtering AFTER successful API response
    const handleRemove = async (bookId) => {
        if (!window.confirm("Are you sure you want to remove this book from your wishlist?")) return;

        // ⭐ DIAGNOSTIC: Log the state BEFORE attempting removal
        console.log("--- REMOVAL ATTEMPT ---");
        console.log("Target bookId:", bookId);
        console.log("Current list length:", wishlistBooks.length);
        console.log("------------------------");
        
        try {
            // 1. API Call: Execute the removal on the server.
            await api.post("/user/wishlist", { bookId });
            
            // 2. Local State Update: Filter out the item instantly.
            // Using the functional update form to guarantee we use the latest state.
            setWishlistBooks(prevBooks => {
                const newList = prevBooks.filter(book => book.id !== bookId);
                console.log("New list length after filter:", newList.length);
                return newList;
            });
            
            alert("Book removed from wishlist.");
            
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            // If the removal failed (e.g., server error), re-fetch to confirm status.
            fetchWishlist(); 
            alert("Failed to remove book. The list will be refreshed.");
        }
    };

    if (loading) 
        return <p className="text-center p-10 text-gray-500">Loading your favorites...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-8">
                ❤️ My Wishlist ({wishlistBooks.length})
            </h2>

            {wishlistBooks.length === 0 ? (
                <p className="text-gray-500 text-center text-lg p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    Your wishlist is empty. Start exploring the <Link to="/books" className="text-blue-500 hover:underline">Books Collection</Link>!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistBooks.map((book) => (
                        <div key={book.id} className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow transition hover:shadow-lg">
                            <Link to={`/books/${book.id}`}>
                                <img
                                    src={book.imageUrl || "https://via.placeholder.com/150"}
                                    alt={book.title}
                                    className="w-full h-40 object-cover rounded mb-3"
                                />
                                <h3 className="text-lg font-semibold truncate hover:text-blue-600">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">by {book.author}</p>
                            </Link>
                            <button
                                onClick={() => handleRemove(book.id)}
                                className="w-full mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;