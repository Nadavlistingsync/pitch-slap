'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EgoDump {
  id: string;
  content: string;
  likes: number;
  createdAt: string;
  author: string;
}

const gradientText =
  "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent";

export default function EgoDumpPage() {
  const [dumps, setDumps] = useState<EgoDump[]>([]);
  const [newDump, setNewDump] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDumps();
  }, []);

  const fetchDumps = async () => {
    try {
      const response = await fetch('/api/ego-dumps');
      const data = await response.json();
      setDumps(data);
    } catch (error) {
      console.error('Error fetching dumps:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDump.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ego-dumps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newDump }),
      });

      if (response.ok) {
        setNewDump('');
        fetchDumps();
      }
    } catch (error) {
      console.error('Error submitting dump:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`/api/ego-dumps/${id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        fetchDumps();
      }
    } catch (error) {
      console.error('Error liking dump:', error);
    }
  };

  // Optionally filter dumps (for dropdown, currently just UI)
  const filteredDumps = dumps; // Add filter logic if needed

  return (
    <main className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {/* Top Glow Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-3xl opacity-40" />
      </div>
      <div className="relative z-10 flex flex-col items-center px-4 pt-16 pb-8">
        {/* ROAST label */}
        <div className="mb-2 w-full max-w-2xl">
          <span className="uppercase font-bold text-lg tracking-widest text-blue-300 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            🔥 ROAST
          </span>
        </div>
        {/* Heading */}
        <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 text-center ${gradientText}`}>The Ego Dump</h1>
        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl mb-2">
          Even the biggest success stories faced countless rejections.
        </p>
        <p className="text-base md:text-lg text-white/70 text-center max-w-2xl mb-6">
          Your pitch deck might be perfect, but rejection is part of the journey. Share your best "rejection excuse" from VCs or angel investors.
        </p>
        {/* Divider with fire emoji */}
        <div className="flex flex-col items-center w-full mb-2">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent mb-2" />
          <span className="text-2xl">🔥</span>
        </div>
        {/* Dropdown */}
        <div className="relative mb-8">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium shadow-lg backdrop-blur-md hover:bg-white/20 transition-all"
          >
            Read rejection stories
            <svg
              className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-lg bg-black/90 border border-white/10 shadow-xl z-20">
              <button
                className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 rounded-t-lg"
                onClick={() => { setFilter("all"); setDropdownOpen(false); }}
              >All stories</button>
              <button
                className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10"
                onClick={() => { setFilter("vc"); setDropdownOpen(false); }}
              >VC Rejections</button>
              <button
                className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 rounded-b-lg"
                onClick={() => { setFilter("angel"); setDropdownOpen(false); }}
              >Angel Rejections</button>
            </div>
          )}
        </div>
        {/* Post Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mb-12 bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-md"
        >
          <textarea
            value={newDump}
            onChange={(e) => setNewDump(e.target.value)}
            placeholder="Share your rejection story..."
            className="w-full h-24 md:h-28 bg-black/60 text-white rounded-lg p-4 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 border border-white/10 placeholder:text-white/50 font-medium text-lg shadow-inner"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newDump.trim()}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
          >
            {isSubmitting ? "Posting..." : "Post Story"}
          </button>
        </form>
        {/* Stories List */}
        <div className="w-full max-w-2xl flex flex-col gap-8">
          {filteredDumps.length === 0 && (
            <div className="text-center text-white/60 italic">No stories yet. Be the first to share yours!</div>
          )}
          {filteredDumps.map((dump) => (
            <motion.div
              key={dump.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md flex flex-col items-center relative"
            >
              <p className="italic text-lg md:text-xl text-white text-center mb-4 max-w-xl" style={{textShadow: "0 2px 16px rgba(0,0,0,0.3)"}}>
                {dump.content}
              </p>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span>{dump.author}</span>
                <span>·</span>
                <span>{new Date(dump.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => handleLike(dump.id)}
                  className="flex items-center gap-1 text-pink-300 hover:text-pink-400 transition-colors ml-2"
                  aria-label="Like story"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{dump.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 