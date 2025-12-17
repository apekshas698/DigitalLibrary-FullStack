import { useEffect, useState } from "react";
import api from "../utils/axios";

function AdminBorrowRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      // This fetches ALL borrow records, including nested book details
      const res = await api.get("/borrow/all");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching borrow records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ✅ Helper: Compare due and return dates
  const getReturnStatus = (borrow) => {
    // 🎯 FIX: Use actualReturnDate from the Java model
    const { dueDate, actualReturnDate } = borrow; 
    const today = new Date();
    const due = new Date(dueDate);
    const returned = actualReturnDate ? new Date(actualReturnDate) : null;

    if (returned) {
      if (returned > due)
        return { text: "Returned Late", color: "bg-red-200 text-red-800" };
      return { text: "Returned On Time", color: "bg-green-200 text-green-800" };
    }

    if (today.toDateString() === due.toDateString())
      return { text: "Due Today", color: "bg-yellow-200 text-yellow-800" };
    if (today > due)
      return { text: "Overdue", color: "bg-red-300 text-red-900" };
    return { text: "Borrowed", color: "bg-blue-200 text-blue-800" };
  };

  // Helper to calculate how long the user kept the book
  const getDuration = (borrowDate, actualReturnDate) => {
    // 🎯 FIX: Use actualReturnDate from the Java model
    if (!actualReturnDate) return "-";
    const diff =
      (new Date(actualReturnDate).getTime() - new Date(borrowDate).getTime()) /
      (1000 * 60 * 60 * 24);
    return `${Math.ceil(diff)} days`; // Use ceil for clearer duration
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        📖 Borrow Records (Admin View)
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading records...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500">No borrow records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow rounded-lg">
            <thead>
              <tr className="bg-blue-100 dark:bg-gray-700 text-left">
                <th className="p-3 border">Borrower Name</th>
                <th className="p-3 border">Mobile</th>
                <th className="p-3 border">Book Title</th>
                <th className="p-3 border">Borrow Date</th>
                <th className="p-3 border">Due Date</th>
                {/* 🎯 FIX: Updated Header for clarity */}
                <th className="p-3 border">Actual Return Date</th> 
                <th className="p-3 border">Duration</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const status = getReturnStatus({
                    // 🎯 FIX: Pass the correct property name to the status helper
                  dueDate: r.dueDate,
                  actualReturnDate: r.actualReturnDate,
                });

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 border">{r.userName || "N/A"}</td>
                    <td className="p-3 border">{r.userPhone || "N/A"}</td>
                    <td className="p-3 border">
                      {r.book?.title || "Unknown Book"}
                    </td>
                    <td className="p-3 border">
                      {r.borrowDate
                        ? new Date(r.borrowDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 border">
                      {r.dueDate
                        ? new Date(r.dueDate).toLocaleDateString()
                        : "Not Provided"}
                    </td>
                    {/* 🎯 FIX: Display the correct property name */}
                    <td className="p-3 border"> 
                      {r.actualReturnDate
                        ? new Date(r.actualReturnDate).toLocaleDateString()
                        : "Not Returned"}
                    </td>
                    <td className="p-3 border text-center">
                        {/* 🎯 FIX: Pass the correct property name to the duration helper */}
                      {getDuration(r.borrowDate, r.actualReturnDate)}
                    </td>
                    <td className="p-3 border text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminBorrowRecords;