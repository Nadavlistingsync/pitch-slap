'use client';

import { useState } from 'react';
import { vcPrompts } from '@/lib/vc-prompts';
import { VCPrompt } from '@/types/vc';

export default function VCPromptsPage() {
  const [selectedVC, setSelectedVC] = useState<VCPrompt | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleVCSelect = (vc: VCPrompt) => {
    setSelectedVC(vc);
    setUserInput('');
    setFeedback([]);
    setScore(null);
  };

  const handleSubmit = async () => {
    if (!selectedVC || !userInput) return;

    try {
      const response = await fetch('/api/vc-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vc: selectedVC,
          userInput,
        }),
      });

      const data = await response.json();
      setFeedback(data.feedback);
      setScore(data.score);
    } catch (error) {
      console.error('Error getting feedback:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VC Pitch Feedback</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select VC</h2>
          <div className="space-y-2">
            {vcPrompts.map((vc) => (
              <button
                key={vc.vc}
                onClick={() => handleVCSelect(vc)}
                className={`w-full text-left p-4 rounded-lg border ${
                  selectedVC?.vc === vc.vc
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-medium">{vc.vc}</h3>
                <p className="text-sm text-gray-600 mt-1">{vc.system}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          {selectedVC ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Pitch</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {selectedVC.user}
                  </p>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full h-48 p-4 border rounded-lg"
                  placeholder="Write your pitch here..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!userInput}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                Get Feedback
              </button>

              {feedback.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Feedback</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <span className="font-medium">Score: </span>
                      <span className="text-lg">{score}/10</span>
                    </div>
                    <ul className="space-y-2">
                      {feedback.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Select a VC to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 