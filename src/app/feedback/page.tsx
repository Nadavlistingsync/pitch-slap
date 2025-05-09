'use client';

import { Suspense } from 'react';
import FeedbackContent from './FeedbackContent';

export default function Feedback() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your VC Feedback</h1>
          <p className="text-xl text-gray-600">
            Here's what the VC thinks about your pitch deck
          </p>
        </div>

        <Suspense fallback={<div>Loading feedback...</div>}>
          <FeedbackContent />
        </Suspense>
      </div>
    </main>
  );
} 