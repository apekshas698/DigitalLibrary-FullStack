import React, { useState } from "react";
import api from "../../utils/axios";

export default function AISearchBox({ onResults }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!q.trim()) return;
    try {
      setLoading(true);
      const res = await api.post("/ai/search", { query: q });
      onResults(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search (natural language)..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button onClick={handleSearch} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
