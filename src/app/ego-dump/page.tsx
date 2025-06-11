"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Comment {
  text: string;
  author: string;
  timestamp: string;
}

function EgoDumpContent() {
  const params = useSearchParams();
  const router = useRouter();
  const vcId = params.get("vc");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [roast, setRoast] = useState<string>("");
  const [vc, setVc] = useState<any>(null);

  // In-memory comments per VC (demo only)
  useEffect(() => {
    if (vcId) {
      const stored = localStorage.getItem(`ego-comments-${vcId}`);
      setComments(stored ? JSON.parse(stored) : []);
    }
    // Show last roast result if available
    const data = sessionStorage.getItem("roastResult");
    if (data) {
      const parsed = JSON.parse(data);
      setRoast(parsed.roast);
      setVc(parsed.vc);
    }
  }, [vcId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;
    const comment: Comment = {
      text: newComment,
      author,
      timestamp: new Date().toISOString(),
    };
    const updated = [comment, ...comments];
    setComments(updated);
    setNewComment("");
    setAuthor("");
    if (vcId) localStorage.setItem(`ego-comments-${vcId}`, JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Ego Dump</h1>
        {vc && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Roaster: <span className="text-pink-400">{vc.name}</span></h2>
            <div className="bg-gray-800 rounded-lg p-4 my-2 whitespace-pre-line">{roast}</div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <textarea
              placeholder="Your comment..."
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 px-4 py-2 rounded text-white font-bold mt-2"
            disabled={!newComment.trim() || !author.trim()}
          >
            Post Comment
          </button>
        </form>
        <div className="space-y-4">
          {comments.length === 0 && <div className="text-gray-400">No comments yet. Be the first!</div>}
          {comments.map((c, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-pink-400 font-semibold">{c.author}</span>
                <span className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleString()}</span>
              </div>
              <div className="text-gray-200 whitespace-pre-line">{c.text}</div>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-gray-700 px-4 py-2 rounded text-white" onClick={() => router.push("/")}>Back to Home</button>
      </div>
    </main>
  );
}

export default function EgoDump() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <EgoDumpContent />
    </Suspense>
  );
} 