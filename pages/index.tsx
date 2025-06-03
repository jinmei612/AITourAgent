import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setItinerary(data.itinerary);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧳 AI私人旅行规划</h1>
      <textarea
        className="w-full border p-2 h-32"
        placeholder="例：我打算11月去冰岛玩5天，预算一万五，喜欢温泉和自然风光。"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={generate}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "生成中..." : "生成行程"}
      </button>
      {itinerary && (
        <div className="mt-6 prose">
          <ReactMarkdown>{itinerary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
