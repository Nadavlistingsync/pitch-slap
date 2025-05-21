'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';

export default function TestUploadPage() {
  const [error, setError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setError('');
    
    // Simulate server validation
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Here you would typically upload the file to your server
    console.log('File selected:', file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">File Upload Test</h1>
          
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedFileTypes={['image/*', 'application/pdf']}
            maxSize={5 * 1024 * 1024}
            maxFiles={1}
            error={error}
            label="Upload your profile picture or document"
          />

          {uploadedFile && !error && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h2 className="text-lg font-medium text-green-800">File Uploaded Successfully</h2>
              <p className="mt-2 text-sm text-green-700">
                Name: {uploadedFile.name}<br />
                Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)}MB<br />
                Type: {uploadedFile.type}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 