'use client';

import { useEffect, useState } from 'react';
import { vcPrompts } from '@/lib/vcPrompts';
import Image from 'next/image';

interface FeedbackDisplayProps {
  feedback: string;
  vcId: string;
}

export default function FeedbackDisplay({ feedback, vcId }: FeedbackDisplayProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const vcPrompt = vcPrompts.find(vc => vc.id === vcId);

  useEffect(() => {
    if (!feedback) return;

    setIsTyping(true);
    let currentText = '';
    const words = feedback.split(' ');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        return;
      }

      currentText += (currentIndex === 0 ? '' : ' ') + words[currentIndex];
      setDisplayedFeedback(currentText);
      currentIndex++;
    }, 100); // Adjust speed as needed

    return () => clearInterval(typingInterval);
  }, [feedback]);

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg p-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {vcPrompt?.name.charAt(0) || 'V'}
        </div>
        <div>
          <h3 className="font-bold text-lg">{vcPrompt?.name || 'VC'}</h3>
          <p className="text-sm text-gray-600">{vcPrompt?.firm || ''}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] whitespace-pre-wrap">
          {displayedFeedback}
          {isTyping && (
            <span className="inline-block">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse delay-100">•</span>
              <span className="animate-pulse delay-200">•</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 