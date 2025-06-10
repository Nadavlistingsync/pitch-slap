'use client';

import * as React from 'react';
import { useState } from 'react';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement upload logic (API call)
    setUploaded(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <form onSubmit={handleUpload} className="mb-4">
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={!file}>
            Upload
          </button>
        </form>
        {uploaded && <p className="text-green-600">Pitch deck uploaded! (Demo only)</p>}
        {/* TODO: List uploaded decks here */}
      </div>
    </div>
  );
} 