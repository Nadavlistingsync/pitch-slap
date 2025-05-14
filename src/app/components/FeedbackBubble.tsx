import { useState } from 'react';

export default function FeedbackBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        className="fixed right-6 bottom-32 z-50 bg-white text-black rounded-full shadow-xl flex items-center gap-2 px-5 py-3 text-lg font-semibold border-2 border-[#ff4154] hover:bg-[#ff4154] hover:text-white transition-colors duration-200"
        onClick={() => setOpen(true)}
        aria-label="Open chat or feedback"
      >
        💬 Feedback
      </button>
      {/* Floating Share Button */}
      <button
        className="fixed right-6 bottom-20 z-50 bg-[#ff4154] text-white rounded-full shadow-xl flex items-center gap-2 px-5 py-3 text-lg font-semibold border-2 border-[#ff4154] hover:bg-[#ff6b6b] transition-colors duration-200"
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
        🔗 Share
      </button>
      {/* Modal/Popover for Feedback (placeholder) */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-black relative">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-black"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4">Send Feedback</h3>
            <p className="mb-4 text-gray-700">This is a placeholder for live chat or feedback. You can integrate a chat widget or feedback form here.</p>
            <button
              className="bg-[#ff4154] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#ff6b6b] transition"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
} 