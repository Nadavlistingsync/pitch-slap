'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

export default function FileUpload({ 
  onFileSelect, 
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = { 'application/pdf': ['.pdf'] }
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const selectedFile = acceptedFiles[0];
    
    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
        return;
      }
      
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        sessionStorage.setItem('uploadedFile', base64);
        sessionStorage.setItem('uploadedFileName', selectedFile.name);
        setFile(selectedFile);
        onFileSelect(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [maxSize, onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
    sessionStorage.removeItem('uploadedFile');
    sessionStorage.removeItem('uploadedFileName');
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative rounded-2xl p-8 border-2 border-dashed transition-all duration-300 ${
          isDragActive 
            ? 'border-pink-500 bg-pink-500/10' 
            : 'border-gray-700 hover:border-pink-500/50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="text-center">
          <div
            className="mx-auto h-12 w-12 text-gray-400"
          >
            <FiUpload />
          </div>
          
          <p
            className="mt-4 text-lg text-gray-300"
          >
            {file ? file.name : 'Drag and drop your pitch deck here'}
          </p>
          
          <p className="mt-2 text-sm text-gray-400">
            or click to browse (PDF only)
          </p>
        </div>
      </div>

      {error && (
        <div
          className="mt-4 text-red-500 text-sm text-center"
        >
          {error}
        </div>
      )}

      {file && (
        <div
          className="mt-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FiFile className="w-6 h-6 text-gray-400" />
            <div>
              <p className="text-gray-200 font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
} 