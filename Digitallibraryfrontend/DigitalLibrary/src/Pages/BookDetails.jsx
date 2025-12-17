import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react"; 
import api from "../utils/axios";
import AIReviewSummary from "../Components/AI/AIReviewSummary"; 

const isUser = () => localStorage.getItem("role") === "USER";


const BookDetails = ({ theme }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState([]); 
  
  const [borrowDetails, setBorrowDetails] = useState({
    name: "",
    phone: "",
    dueDate: "", 
  });
  const [submitting, setSubmitting] = useState(false);
  
  const isBookInWishlist = wishlist.includes(id);

  useEffect(() => {
    const fetchBookAndWishlist = async () => {
      try {
        const bookRes = await api.get(`/books/${id}`);
        // 1. We now rely on bookRes.data.averageRating and bookRes.data.reviewCount
        setBook(bookRes.data);
        setReviews(bookRes.data.reviews || []); // Still keep reviews for the list/summary
        const token = localStorage.getItem("token");
        if (token && isUser()) {
        }

      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookAndWishlist();
  }, [id]);

  const handleToggleWishlist = async () => {
    if (!isUser()) {
      alert("Please log in as a USER to manage your wishlist.");
      return;
    }
    try {
      const res = await api.post("/user/wishlist", { bookId: id });
      setWishlist(res.data.wishlist || []);
      alert(res.data.message);
    } catch (err) {
      console.error("Wishlist update failed:", err);
      alert(`Failed to update wishlist. Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isUser()) {
        alert("You must be logged in as a USER to submit a review.");
        return;
    }
    if (!comment.trim() || rating === 0) {
        alert("Please provide a rating and a comment.");
        return;
    }

    try {
        setReviewSubmitting(true);
        const reviewPayload = {
            reviewText: comment.trim(), 
            rating: rating,
        };
        // The backend now returns the UPDATED book object, including the new averageRating!
        const res = await api.post(`/books/${id}/reviews`, reviewPayload);
        
        alert("Review submitted successfully!");
        // 2. Update both book and reviews state with the new data from the backend
        // This ensures the displayed rating updates immediately.
        setBook(res.data);
        setReviews(res.data.reviews || []); 
        setComment("");
        setRating(0);

    } catch (err) {
        console.error("Error submitting review:", err);
        const errorMessage = err.response?.data || "Failed to submit review. Please try again.";
        alert(errorMessage);
    } finally {
        setReviewSubmitting(false);
    }
  };
  
  const handleOpenModal = () => {
    if (!localStorage.getItem("token")) {
        alert("Please log in to borrow a book.");
        return;
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);
  
  const handleBorrowConfirm = async () => {
// ... (handleBorrowConfirm logic remains the same)
    const { name, phone, dueDate } = borrowDetails;
    if (!name?.trim() || !phone?.trim() || !dueDate) {
      alert("Please provide name, phone and expected return date.");
      return;
    }
    try {
      setSubmitting(true); 
      const payload = {
        bookId: id,
        name: name.trim(),
        phone: phone.trim(),
        dueDate: dueDate, 
      };
      await api.post("/borrow", payload);

      alert("Borrow request successfully recorded!");
      setShowModal(false);
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert(`Failed to borrow book. Error: ${err.response?.data || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!book) return <div className="p-6 text-center text-red-600">Book not found!</div>;

  // ⭐ KEY CHANGE: Use the persisted fields directly
  const avgRatingDisplay = book.averageRating ? book.averageRating.toFixed(1) : '0.0';
  const reviewCountDisplay = book.reviewCount || (book.reviews ? book.reviews.length : 0);

  return (
    <div
      className={`p-6 max-w-4xl mx-auto rounded-lg shadow-xl my-8 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Link to="/books" className="text-blue-500 mb-4 inline-block hover:underline">
        &larr; Back to Books
      </Link>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={book.imageUrl || "https://via.placeholder.com/400x600"}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {book.title}
          </h1>
          <p className="text-xl font-semibold">Author: {book.author}</p>
          <p className="text-gray-600 dark:text-gray-300">Category: {book.category || "Uncategorized"}</p>
          
          <div className="flex items-center space-x-2">
                {/* 3. Use the persisted fields */}
            <span className="text-2xl font-bold text-yellow-500">{avgRatingDisplay}</span>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={20} 
                        fill={i < Math.round(book.averageRating) ? "yellow" : "none"} 
                        stroke={i < Math.round(book.averageRating) ? "yellow" : "gray"}
                    />
                ))}
            </div>
            
            <span className="text-sm text-gray-500">({reviewCountDisplay} reviews)</span>
          </div>

          <p className="text-lg leading-relaxed">{book.description}</p>
          
          <p className="text-lg pt-2">
            <span className="font-bold">Availability:</span>{" "}
            <span className={book.available ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {book.available ? "Available for Borrow" : "Currently Out"}
            </span>
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleOpenModal}
              className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                book.available ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!book.available}
            >
              Borrow Book
            </button>
            {isUser() && (
                <button
                    onClick={handleToggleWishlist}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                        isBookInWishlist 
                            ? "bg-red-500 text-white hover:bg-red-600" 
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    {isBookInWishlist ? "❤️ Remove from Wishlist" : "🤍 Save to Wishlist"}
                </button>
            )}

          </div>
        </div>
      </div> 
      {reviewCountDisplay > 0 && ( // Use reviewCountDisplay instead of reviews.length for consistency
        <div className="mt-8">
            <AIReviewSummary bookId={id} />
        </div>
      )}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">User Reviews</h2>
        {isUser() ? (
            <form onSubmit={handleAddReview} className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-3">Add Your Review</h3>
                <div className="flex items-center mb-3">
                    <span className="mr-3 font-medium">Rating:</span>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                                key={star} 
                                size={24} 
                                fill={star <= rating ? "gold" : "none"} 
                                stroke="gold"
                                className="cursor-pointer transition-transform duration-100 hover:scale-110"
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    className="w-full p-3 border rounded-lg text-gray-900 dark:bg-gray-700 dark:text-white focus:ring-blue-500 outline-none"
                    required
                />
                <button
                    type="submit"
                    disabled={reviewSubmitting || rating === 0 || !comment.trim()}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        ) : (
            <p className="mb-6 p-3 bg-blue-50 dark:bg-gray-700 border rounded">
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                    Log in as a User
                </Link> to submit a review and borrow books.
            </p>
        )}
        <div className="space-y-4">
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews yet. Be the first!</p>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex items-center mb-1">
                            <div className="flex mr-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={16} 
                                        fill={i < review.rating ? "gold" : "none"} 
                                        stroke="gold"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 italic">"{review.reviewText}"</p>
                    </div>
                ))
            )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h2 className="text-xl font-semibold mb-4">Borrow - provide details</h2>

            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              value={borrowDetails.name}
              onChange={(e) => setBorrowDetails({ ...borrowDetails, name: e.target.value })}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Full name"
            />

            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="tel"
              value={borrowDetails.phone}
              onChange={(e) => setBorrowDetails({ ...borrowDetails, phone: e.target.value })}
              className="w-full border p-2 rounded mb-3 text-black"
              placeholder="Mobile number"
            />

            <label className="block mb-2 font-medium">Expected Return Date</label>
            <input
              type="date"
              value={borrowDetails.dueDate}
              onChange={(e) => setBorrowDetails({ ...borrowDetails, dueDate: e.target.value })}
              className="w-full border p-2 rounded mb-3 text-black"
              min={new Date().toISOString().split("T")[0]}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={handleBorrowConfirm}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:bg-gray-500"
              >
                {submitting ? "Submitting..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;