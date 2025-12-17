import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

export default function AIReviewSummary({ bookId }) {
  const [summary, setSummary] = useState("Loading summary...");
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/ai/summarizeReviews/${bookId}`);
        setSummary(res.data);
      } catch (err) {
        console.error(err);
        setSummary("No summary available.");
      }
    };
    if (bookId) fetch();
  }, [bookId]);

  return (
    <div className="bg-gray-50 p-4 rounded mt-3">
      <h4 className="font-semibold mb-2">Reviews Summary</h4>
      <div className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</div>
    </div>
  );
}
