"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RoastResult {
  roast: string;
  vc: {
    name: string;
    firm: string;
    knownFor: string;
    vibe: string;
  };
}

// Utility to ensure error is always a string
function toErrorString(err: unknown): string {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err, null, 2);
  } catch {
    return String(err);
  }
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roast = searchParams.get('roast');
    const storedResult = sessionStorage.getItem('roastResult');

    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult);
        if (!parsed || typeof parsed !== 'object' || !parsed.roast || !parsed.vc) {
          throw new Error('Malformed feedback data.');
        }
        setResult(parsed);
      } catch (e) {
        setError(toErrorString(e));
      }
    } else if (roast) {
      try {
        const vc = JSON.parse(sessionStorage.getItem('selectedVC') || '{}');
        if (!vc || typeof vc !== 'object' || !vc.name) {
          throw new Error('Malformed VC data.');
        }
        setResult({
          roast: decodeURIComponent(roast),
          vc
        });
      } catch (e) {
        setError(toErrorString(e));
      }
    } else {
      setError('No feedback found. Please try uploading your pitch deck again.');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sections = result.roast.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Pitch Deck Feedback</h1>
          <div className="flex items-center gap-2 text-gray-400">
            <span>From</span>
            <span className="text-pink-400 font-semibold">{result.vc.name}</span>
            <span>at</span>
            <span className="text-pink-400">{result.vc.firm}</span>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => {
            const [title, ...content] = section.split('\n');
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-xl font-semibold text-pink-400 mb-3">{title}</h2>
                <div className="space-y-2 text-gray-300">
                  {content.map((line, i) => (
                    <p key={i} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Get Another Roast
          </button>
        </div>
      </div>
    </div>
  );
} 