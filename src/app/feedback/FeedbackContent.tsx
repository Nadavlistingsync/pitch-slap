'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedbackDisplay from '../components/FeedbackDisplay';

export default function FeedbackContent() {
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState('');
  const vcId = searchParams.get('vcId') || '';

  useEffect(() => {
    // Simulate getting feedback from the API
    const mockFeedback = `LMAO, just finished reviewing your deck and... where do I even begin? 😂

Your market sizing is straight up delusional. "Billion dollar market" my ass! You're not even close to product-market fit, and your burn rate is giving me anxiety.

But hey, I actually like your team. They seem smart enough to not completely fuck this up. Just... maybe don't quit your day job yet? 

Here's what you need to fix:
1. Your go-to-market strategy is basically "we'll figure it out" - that's not gonna cut it
2. Your competition slide is missing like 5 major players
3. Your financial projections are making me laugh harder than a Frenchman watching American football

Keep it real, and maybe we'll talk again when you've got some actual traction.`;

    // Simulate typing delay
    setTimeout(() => {
      setFeedback(mockFeedback);
    }, 1000);
  }, []);

  return <FeedbackDisplay feedback={feedback} vcId={vcId} />;
} 