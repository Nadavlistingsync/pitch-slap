'use client';

import { Suspense } from 'react';
import FeedbackContent from './FeedbackContent';

export default function Feedback() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Mobile-like header */}
      <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Messages</h1>
            <p className="text-sm text-gray-400">VC Feedback</p>
          </div>
        </div>
      </div>

      {/* Message content area */}
      <div className="max-w-2xl mx-auto pt-20 pb-4 px-4">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center h-32">
              <div className="space-x-1">
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="inline-block w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          }
        >
          <FeedbackContent />
        </Suspense>
      </div>
    </main>
  );
} 