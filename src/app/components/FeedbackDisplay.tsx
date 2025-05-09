'use client';

import { useEffect, useState } from 'react';
import { vcPrompts } from '@/lib/vcPrompts';

interface FeedbackDisplayProps {
  feedback: string;
  vcId: string;
}

export default function FeedbackDisplay({ feedback, vcId }: FeedbackDisplayProps) {
  const [displayedFeedback, setDisplayedFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const vc = vcPrompts.find(v => v.id === vcId);

  useEffect(() => {
    if (!feedback) return;
    
    // Split feedback into sentences for more natural typing effect
    const sentences = feedback.split(/(?<=[.!?])\s+/);
    let currentIndex = 0;
    
    const typeNextSentence = () => {
      if (currentIndex < sentences.length) {
        setDisplayedFeedback(prev => prev + (currentIndex === 0 ? '' : ' ') + sentences[currentIndex]);
        currentIndex++;
        setTimeout(typeNextSentence, Math.random() * 1000 + 500); // Random typing speed
      } else {
        setIsTyping(false);
      }
    };

    typeNextSentence();
  }, [feedback]);

  if (!vc) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-100 rounded-2xl p-4 shadow-lg">
        {/* VC Profile Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-[#ff4154]">
              {vc.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{vc.name}</h3>
            <p className="text-sm text-gray-500">{vc.firm}</p>
          </div>
        </div>

        {/* Message Bubble */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-2">
          <div className="text-gray-800 whitespace-pre-wrap">
            {displayedFeedback}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse"></span>
            )}
          </div>
        </div>

        {/* Message Time */}
        <div className="text-xs text-gray-500 text-right">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
} 