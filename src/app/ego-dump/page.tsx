'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

export default function EgoDump() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment,
          author: author,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Ego Dump</h1>
          <p className="text-gray-400">Dump your thoughts, feedback, or anything else on your mind.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                Your Comment
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-blue-400">{comment.author}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{comment.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 