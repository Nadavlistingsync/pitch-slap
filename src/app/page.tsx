'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import VCPrompts from './components/VCPrompts';
import { ArrowRight, Star, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [roastIntensity, setRoastIntensity] = useState<'gentle' | 'balanced' | 'brutal'>('balanced');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    }
  });

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roastIntensity', roastIntensity);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setFeedback(data.feedback);
      } else {
        setFeedback('Error: ' + data.error);
      }
    } catch (error) {
      setFeedback('Error processing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Pitch Deck Roaster
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-white">Selected: {file.name}</p>
            ) : (
              <p className="text-white">Drag & drop a PDF here, or click to select</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-white mb-2">Roast Intensity:</label>
            <select
              value={roastIntensity}
              onChange={(e) => setRoastIntensity(e.target.value as any)}
              className="w-full p-2 rounded bg-white/10 text-white border border-purple-500"
            >
              <option value="gentle">Gentle</option>
              <option value="balanced">Balanced</option>
              <option value="brutal">Brutal</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Roast My Pitch Deck'}
          </button>

          {feedback && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">Feedback:</h2>
              <p className="text-white/90 whitespace-pre-wrap">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 