import { useEffect, useState } from "react";
import api from "../utils/axios";

function MyBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrows();
  }, []);

  // 🔹 Fetch all borrowed books of the logged-in user
  const fetchBorrows = async () => {
    try {
      setLoading(true); // Set loading true every time we fetch (on initial load and after return)
      const token = localStorage.getItem("token");
      if (!token) {
        // This should ideally be caught by ProtectedRoute, but good for defense
        alert("Please log in first.");
        return;
      }

      // The backend resolves the user ID from the JWT token and returns their records.
      const res = await api.get("/borrow/myrecords"); 
      setBorrows(res.data);
    } catch (err) {
      console.error("Error fetching borrow records:", err);
      alert("Failed to load your borrow records.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Mark a book as returned
  const handleReturn = async (id) => {
    if (!window.confirm("Are you sure you want to mark this book as returned?")) {
      return;
    }
    try {
      // The PUT request triggers the logic in BorrowService.java to set actualReturnDate
      await api.put(`/borrow/${id}/return`); 
      alert("Book returned successfully. Your records have been updated.");
      fetchBorrows(); // Re-fetch data to update the UI immediately
    } catch (err) {
      console.error("Failed to return book:", err);
      alert(`Failed to return book: ${err.response?.data || 'Server error'}`);
    }
  };

  // 🔹 Calculate number of days the book was kept
  const getDaysKept = (borrowDate, actualReturnDate) => {
    if (!actualReturnDate) return null;
    const diff =
      (new Date(actualReturnDate) - new Date(borrowDate)) /
      (1000 * 60 * 60 * 24);
    return Math.ceil(diff); // Use ceil to include the day of return
  };

  // 🔹 Determine current return status
  const getReturnStatus = (borrow) => {
    const { dueDate, actualReturnDate } = borrow;
    const today = new Date();
    // Normalize dates to day only for accurate comparison
    const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const due = new Date(dueDate);
    const normalizedDue = normalizeDate(due);
    const normalizedToday = normalizeDate(today);

    if (actualReturnDate) {
      const returned = new Date(actualReturnDate);
      const normalizedReturned = normalizeDate(returned);

      if (normalizedReturned > normalizedDue)
        return { text: "Returned Late", color: "bg-red-200 text-red-800" };
      return { text: "Returned On Time", color: "bg-green-200 text-green-800" };
    }

    if (normalizedToday > normalizedDue)
      return { text: "Overdue - Action Needed", color: "bg-red-300 text-red-900" };
    
    if (normalizedToday.getTime() === normalizedDue.getTime())
      return { text: "Due Today", color: "bg-yellow-200 text-yellow-800" };


    return { text: "Borrowed - Check Due Date", color: "bg-blue-200 text-blue-800" };
  };

  // 🔹 UI Rendering
  if (loading)
    return <p className="text-center text-gray-500">Loading your borrow history...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
        📚 My Borrowed Books
      </h2>

      {borrows.length === 0 ? (
        <p className="text-gray-500 text-center text-lg p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
          You haven’t borrowed any books yet. Explore the <a href="/books" className="text-blue-500 hover:underline">Books Collection</a>!
        </p>
      ) : (
        <div className="grid gap-6">
          {borrows.map((b) => {
            const status = getReturnStatus(b);
            const isReturned = !!b.actualReturnDate;

            return (
              <div
                key={b.id}
                className={`p-5 bg-white dark:bg-gray-800 border rounded-lg shadow-md transition ${isReturned ? 'opacity-70 border-green-400' : 'border-blue-400'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {b.book?.title || "Unknown Book"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      by {b.book?.author || "Unknown"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                  >
                    {status.text}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-medium">Borrowed On:</p> 
                    <p>{new Date(b.borrowDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Due Date:</p> 
                    <p className="text-red-500 font-semibold">{new Date(b.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">User Details:</p> 
                    <p>{b.userName || 'N/A'} ({b.userPhone || 'N/A'})</p>
                  </div>
                </div>

                {isReturned ? (
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm flex justify-between items-center">
                    <p className="text-green-600 font-medium">
                      ✅ Returned on:{" "}
                      {new Date(b.actualReturnDate).toLocaleDateString()}
                    </p>
                    <p className="text-blue-600 font-medium">
                      🕒 Days Kept: {getDaysKept(b.borrowDate, b.actualReturnDate)} days
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end">
                    <button
                      onClick={() => handleReturn(b.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      Mark As Returned
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBorrows;