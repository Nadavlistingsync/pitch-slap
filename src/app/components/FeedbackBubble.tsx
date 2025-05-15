'use client';

import { useState } from 'react';
import { MessageSquare, Share2, X, Send } from 'lucide-react';

export default function FeedbackBubble() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setFeedback('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        <button
          className="glass px-4 py-3 rounded-full shadow-soft hover-lift flex items-center gap-2 text-sm font-medium"
          onClick={() => setOpen(true)}
          aria-label="Open feedback"
        >
          <MessageSquare className="w-5 h-5" />
          Feedback
        </button>
        <button
          className="glass px-4 py-3 rounded-full shadow-soft hover-lift flex items-center gap-2 text-sm font-medium"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: document.title,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          aria-label="Share this page"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* Feedback Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="card max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Send Feedback</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Help us improve by sharing your thoughts and suggestions.
                  </p>
                </div>
                <div>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What's on your mind?"
                    className="input-field min-h-[120px] resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Feedback
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-400">Your feedback has been submitted successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 