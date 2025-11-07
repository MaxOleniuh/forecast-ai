import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ForecastCard from "./ForecastCard";

interface ForecastResponse {
  probability: number;
  analysis: string;
  uncertainties: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setLoading(true);

    try {
      console.log("[Client] Sending question:", input);

      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data: ForecastResponse = await response.json();
      console.log("[Client] Received forecast:", data);

      setForecast(data);
      setMessages((prev) => [
        ...prev,
        { text: "Forecast analysis received.", isUser: false },
      ]);
    } catch (err) {
      console.error("[Client] Error fetching forecast:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching forecast.", isUser: false },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        {forecast && <ForecastCard {...forecast} />}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a forecasting question..."
          className="flex-1 p-2 text-gray-800 border rounded-lg focus:outline-none focus:ring border-gray-300 focus:border-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-400 duration-300 transition text-white rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Ask"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
