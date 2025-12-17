import React, { useState } from "react";
import api from "../../utils/axios";

export default function AdminGenerateDescription({ title, author, category, onGenerated }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await api.post("/ai/generateDescription", {
        title, author, category, existingDescription: ""
      });
      onGenerated(res.data); // Send generated JSON/text to parent to prefill description
    } catch (err) {
      console.error(err);
      alert("Failed to generate description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGenerate} disabled={loading} className="bg-indigo-600 text-white px-3 py-1 rounded">
      {loading ? "Generating..." : "Generate Description (AI)"}
    </button>
  );
}
