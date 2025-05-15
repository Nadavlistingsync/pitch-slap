'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { vcPrompts } from '@/lib/vcPrompts';
import Image from 'next/image';
import { logger } from '@/lib/logger';

interface FeedbackDisplayProps {
  feedback: string;
  vcId: string;
}

const FeedbackDisplay = memo(({ feedback, vcId }: FeedbackDisplayProps) => {
  const [displayedFeedback, setDisplayedFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const vcPrompt = vcPrompts.find(vc => vc.id === vcId);

  useEffect(() => {
    logger.info('FeedbackDisplay mounted', {
      vcId,
      hasFeedback: !!feedback,
      vcName: vcPrompt?.name
    });
  }, [vcId, feedback, vcPrompt]);

  const typeFeedback = useCallback((text: string) => {
    if (!text) {
      logger.debug('No feedback text to display');
      return;
    }

    logger.debug('Starting feedback typing animation', {
      textLength: text.length
    });

    setIsTyping(true);
    let currentText = '';
    const words = text.split(' ');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        logger.debug('Feedback typing animation completed');
        return;
      }

      currentText += (currentIndex === 0 ? '' : ' ') + words[currentIndex];
      setDisplayedFeedback(currentText);
      currentIndex++;

      if (currentIndex % 10 === 0) {
        logger.debug('Feedback typing progress', {
          progress: Math.round((currentIndex / words.length) * 100),
          wordsTyped: currentIndex,
          totalWords: words.length
        });
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      logger.debug('Feedback typing animation cleanup');
    };
  }, []);

  useEffect(() => {
    const cleanup = typeFeedback(feedback);
    return () => {
      if (cleanup) cleanup();
    };
  }, [feedback, typeFeedback]);

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
});

FeedbackDisplay.displayName = 'FeedbackDisplay';

export default FeedbackDisplay; 