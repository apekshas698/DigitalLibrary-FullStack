import React, { useEffect, useState } from "react";
import api from "../../utils/axios"; 

export default function AIRecommendations({ userId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setLoading(true);
        const res = await api.post(`/ai/recommend/${userId}?topK=6`);
        setBooks(res.data || []);
      } catch (err) {
        console.error("AI recommend error", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRecs();
    else {
      (async () => {
        try {
          const res = await api.post(`/ai/recommend/guest?topK=6`);
          setBooks(res.data || []);
        } catch (e) { console.error(e); }
      })();
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div>Loading recommendations...</div>;
  if (!books || books.length === 0) return <div>No recommendations yet.</div>;

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-3">Recommended for you</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b.id} className="bg-white p-3 rounded shadow">
            <img src={b.imageUrl || "https://via.placeholder.com/150"} alt={b.title} className="h-40 w-full object-cover rounded" />
            <h4 className="mt-2 font-semibold">{b.title}</h4>
            <p className="text-sm text-gray-600">{b.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
