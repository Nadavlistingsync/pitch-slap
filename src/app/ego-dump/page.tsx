'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EgoDump {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function EgoDumpPage() {
  const router = useRouter();
  const [dumps, setDumps] = useState<EgoDump[]>([]);
  const [newDump, setNewDump] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial dumps
  useEffect(() => {
    fetchDumps();
  }, []);

  const fetchDumps = async () => {
    try {
      const response = await fetch('/api/ego-dumps');
      if (!response.ok) throw new Error('Failed to fetch dumps');
      const data = await response.json();
      setDumps(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dumps');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDump.trim()) return;

    try {
      const response = await fetch('/api/ego-dumps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newDump }),
      });

      if (!response.ok) throw new Error('Failed to post dump');
      
      const newDumpData = await response.json();
      setDumps(prev => [newDumpData, ...prev]);
      setNewDump('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post dump');
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`/api/ego-dumps/${id}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to like dump');
      
      setDumps(prev => prev.map(dump => 
        dump.id === id ? { ...dump, likes: dump.likes + 1 } : dump
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like dump');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Ego Dump</h1>
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* New Dump Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <textarea
            value={newDump}
            onChange={(e) => setNewDump(e.target.value)}
            placeholder="What's on your mind? Share your thoughts..."
            className="w-full h-32 p-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-[#ff4154] focus:outline-none resize-none"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#ff4154] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#ff6b6b] transition-colors"
            >
              Post Dump
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4154] mx-auto"></div>
          </div>
        ) : (
          /* Dumps List */
          <div className="space-y-6">
            {dumps.map((dump) => (
              <div
                key={dump.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <p className="text-lg mb-4">{dump.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{new Date(dump.timestamp).toLocaleString()}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(dump.id)}
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                    >
                      <span>❤️</span>
                      <span>{dump.likes}</span>
                    </button>
                    <span className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{dump.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 